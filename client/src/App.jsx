import { useState } from 'react';
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  const fetchApi = async () => {
    // Write this function to fetch our test API of our asp.net core server.
    try{
      const response = await fetch("http://localhost:6710/api/test");
      const data = await response.text();
      setMessage(data);
    }
    catch (error){
      console.error("Failed to fetch:", error);
    }
  }

  return (
    <>
      <h1>RPi5 Dashboard</h1>
      <p>Work in progress..</p>
      <p>In the meantime, test this button:</p>
      <button onClick={fetchApi}>Trigger API</button>
      <p>{message}</p>
    </>
  )
}

export default App
