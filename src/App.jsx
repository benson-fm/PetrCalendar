
import { useState, useEffect } from 'react';
import { createEvent } from 'ics';
import date from 'date-and-time';
import axios from 'axios';



export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  let [baseDay, setBaseDay] = useState(null);
  const [loading, setLoading] = useState(false);
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
      fetchDays();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  const fetchDays = async () => {
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
      let startDate = null;
      for(let i = 0; i < weekNumber; i++){
        startDate = date.addDays(baseDay, i * 7);
      }

      console.log(startDate);
      // and if that value is greater compared to that of the dates provided as the quarter starters
      // then you would go for the latest data to be started
      // from tehre append from that start date to the given week number (do add (7 days) from the start date for x (the week nubmer) times)
      // from there this would consist of the dates from monday to sunday for that whole week
      // add those registed dates to an array and retrieve that date when you iterate through the line results [Monday: date, Tuesday: date, ...]
      // add the events to the ics calendar object 
      // make a feature to download the ics file 
    } catch {
      console.log('error');
    }
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