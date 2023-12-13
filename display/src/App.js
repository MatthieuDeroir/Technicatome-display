import React, { useEffect, useState } from 'react';
import './App.css';
import AccidentInfo from "./Components/AccidentInfo";
import ScrollingText from "./Components/ScrollingText";
import DateTime from "./Components/DateTime";


function App() {
  const [accidentData, setAccidentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/accident/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAccidentData(data);
      } catch (error) {
        console.error('Error fetching the accident data', error);
      }
    };
    fetchData();

    setInterval(() => {
        fetchData();
    }, 5000);
  }, []);

  return (
      <div>

        {accidentData ? (
            <div>
              <DateTime/>
              <AccidentInfo accidentData={accidentData}/>
              <ScrollingText text={accidentData.scrollingText}/>
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
}

export default App;
