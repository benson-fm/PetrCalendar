import { useState, useEffect, useCallback, useMemo } from "react";
import { createEvent } from "ics";
import date from "date-and-time";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  let [baseDay, setBaseDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);

  // values for the start of the quarter
  const dates = useMemo(() => [
    new Date(2023, 8, 28),
    new Date(2024, 0, 8),
    new Date(2024, 3, 1),
  ], []);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      // const now = new Date();
      // date.format(now, "ddd, MMM DD YYYY");
      // formData.append("isOverlayRequired", "true");
      // formData.append("apikey", "K81624200688957");
      // formData.append("language", "eng");

      const response = await axios.post(
        "/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setData(response.data["ParsedResults"][0]["TextOverlay"]["Lines"]);

      fetchFile();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchFile = useCallback(async () => {
    setLoading(true);
    if (!data) return;
    try {
      const now = new Date();

      let selectedBaseDay = null;
      for (let i = 0; i < dates.length; i++) {
        if (!(now > dates[i])) {
          selectedBaseDay = dates[i];
          break;
        }
      }

      if (selectedBaseDay === null) {
        selectedBaseDay = dates[dates.length - 1];
      }

      setBaseDay(selectedBaseDay);

      const weekNumber = parseInt(data[0]["LineText"].split(" ")[1]);

      let curDate = date.addDays(baseDay, weekNumber * 7);
      for (let i = 0; i < 5; i++) {
        curDate = date.addDays(curDate, 1);
      }

      let eventss = new Map();
      let day = "";
      let content = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i]["Words"]["length"] === 1) {
          if (day !== "") {
            eventss.set(day, content);
            day = "";
            content = [];
          }

          day = data[i]["LineText"];
        } else {
          content.push(data[i]["LineText"]);
        }
      }
      eventss.set(day, content);

      setEvents(eventss);
      console.log(events);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [data, dates, baseDay]);



  useEffect(() => {
    if (data) {
      console.log(data);
      fetchFile();
    }
  }, [data, fetchFile]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      <p>yess</p>
      <input type="file" onChange={handleUpload} />
      <button onClick={fetchData}>Submit</button>
      {data &&
        data.map((line, index) => <li key={index}>{line["LineText"]}</li>)}
    </ul>
  );
}
