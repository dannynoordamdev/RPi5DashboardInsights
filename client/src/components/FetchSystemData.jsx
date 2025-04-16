import React, { useEffect, useState } from "react";

function FetchSystemData() {
  const [fetchedSystemData, setFetchedSystemData] = useState(null);
  const [fetchedDbData, setFetchedDbData] = useState(null)


  // Function to fetch the latest system data
  const fetchSysData = async () => {
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/sysinfo/latest');
      const data = await response.json(); // Parse the response as JSON
      setFetchedSystemData(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };

    // Function to fetch the latest Database data
  const fetchDbData = async () => {
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/dbhealth');
      const data = await response.json(); // Parse the response as JSON
      setFetchedDbData(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };


  useEffect(() => {
    fetchSysData();
    const intervalId = setInterval(fetchSysData, 10000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchDbData();
    const intervalId = setInterval(fetchDbData, 10000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 



  return (
  <></>
  );
}

export default FetchSystemData;
