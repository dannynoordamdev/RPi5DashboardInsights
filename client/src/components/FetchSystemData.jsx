import React, { useEffect, useState } from "react";

function FetchSystemData() {
  const [fetchedData, setFetchedData] = useState(null);


  // Function to fetch the latest system data
  const fetchData = async () => {
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/sysinfo/latest');
      const data = await response.json(); // Parse the response as JSON
      setFetchedData(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };


  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);



    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      <h3>Latest System Information</h3>
      {fetchedData ? (
        <ul>
          <li>
            <strong>CPU Usage:</strong> {fetchedData.cpuUsage} <br />
            <strong>Memory Usage:</strong> {fetchedData.memoryUsage} <br />
            <strong>Temperature:</strong> {fetchedData.temperature} <br />
            <strong>Time Stamp:</strong> {new Date(fetchedData.timeStamp).toLocaleString()}
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchSystemData;
