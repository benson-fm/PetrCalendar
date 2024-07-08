
import { useState, useEffect } from 'react';
import { createEvent } from 'ics';
import date from 'date-and-time';
import axios from 'axios';



export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  let [baseDay, setBaseDay] = useState(null);
  const [loading, setLoading] = useState(false);

  // values for the start of the quarter 
  const dates = [new Date(2023, 8, 28), new Date(2024, 0, 8), new Date(2024, 3, 1)];

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const now = new Date();
      date.format(now, 'ddd, MMM DD YYYY'); 
      console.log(now.getDay());

      console.log(file);
      const formData = new FormData();

      formData.append('file', file);
      formData.append('isOverlayRequired', 'true');
      formData.append('apikey', 'K81624200688957');
      formData.append('language', 'eng');

      const response = await axios.post('https://api.ocr.space/parse/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data['ParsedResults'][0]['TextOverlay']['Lines']);
      setData(response.data['ParsedResults'][0]['TextOverlay']['Lines']);
      console.log('finished')
      fetchFile();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  const fetchFile = async () => {
    setLoading(true);
    try {
      // I would get the day that user is doing this on
      const now = new Date();
      
      for(let i = 0; i < dates.length; i++){
        if(!(now > dates[i])) {
          setBaseDay(dates[i]);
          break;
        }
      }

      if (baseDay === null) {
        setBaseDay(dates[dates.length - 1]);
      }

      const weekNumber = parseInt(data[0]['LineText'].split(' ')[1]);

      let curDate = date.addDays(baseDay, weekNumber * 7);

      for(let i = 0; i < 5; i++){
        // add events function
        curDate = date.addDays(curDate, 1);
      }

      console.log(curDate);
      console.log(data[1]['Words']['length'])
      formatDaysToEvents();
      
    } catch {
      console.log('error');
    }
  }

  const formatDaysToEvents = () => {
     // format the data to make it where each day has their corresponding 
    // use i = 1 to skip the week number
    let events = new Map();
    let day = "";
    let content = [];

    for(let i = 1; i < data.length; ++i) {
      if (data[i]['Words']['length'] === 1) {
        if (day !== "") {
          events.set(day, content);
          day = "";
          content = []
        }

        day = data[i]['LineText'];
      }
      else {
        content.push(data[i]['LineText'])
      }
    }

    console.log(events)
     
  }


  if(loading){
    return (
      <p>Loading...</p>
    );
  }


  return (
    <ul>
      <p>yess</p>
      <input type="file" onChange={handleUpload}/>
      <button onClick={fetchData}>Submit</button>
      {data && data.map((line, index) => (
        <li key={index}>{line['LineText']}</li>
      ))}
    </ul>
  );
}