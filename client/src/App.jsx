import { useState } from 'react';
import './App.css'


function App() {
  const [fetchedData, setFetchedData] = useState();

  

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
      <button type="button" onClick={fetchApi}></button>
      <p>{fetchedData}</p>
    </>
  )
}

export default App
