import { useState } from 'react';

import './App.css'


function App() {
  const [systemTemperature, setSystemTemperature] = useState([]);
  const [systemCpuUsage, setSystemCpuUsage] = useState([]);
  const [systemMemoryUsage, setSystemMemoryUsage] = useState([]);
  const [fetchedData, setFetchedData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      temperature: parseInt(systemTemperature),
      cpuUsage: systemCpuUsage,
      memoryUsage: systemMemoryUsage
    };
  
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/sysinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Successful:', result);
      } else {
        console.error('Failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };
  

  const fetchApi = async () => {
    try{
      const response = await fetch('https://dashboard.northdev.xyz/api/sysinfo');
      const data  = await response.text();
      setFetchedData(data);
    }
    catch (error){
      console.error("failed to fetch", error)
    }
  }



  




  
  return (
    <>
      <h1>RPi5 Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          CPU Usage:
          <input type="text" value={systemCpuUsage} onChange={(e) => setSystemCpuUsage(e.target.value)} />
        </label>
        <br/>
        <label>
          Temperature Usage:
          <input type="text" value={systemTemperature} onChange={(e) => setSystemTemperature(e.target.value)} />
        </label>
        <br/>
        <label>
          Memory Usage:
          <input type="text" value={systemMemoryUsage} onChange={(e) => setSystemMemoryUsage(e.target.value)} />
        </label>
        <br/>
        <button type='submit'>Send</button>
        <hr/>
        <button type="button" onClick={fetchApi}></button>
        <p>{fetchedData}</p>
      </form>


    </>
  )
}

export default App
