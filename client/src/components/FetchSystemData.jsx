import { useEffect, useState } from "react";

function useSystemData() {
  const [fetchedSystemData, setFetchedSystemData] = useState(null);
  const [fetchedDbData, setFetchedDbData] = useState(null)
  const [fetchedSystemDataHourly, setfetchedSystemDataHourly] = useState(null)
  const [fetchedAppStatus, setFetchedAppStatus] = useState(null)

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
      const response = await fetch("https://dashboard.northdev.xyz/api/dbhealth/latest");
      const data = await response.json(); // Parse the response as JSON
      setFetchedDbData(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };

  const fetchSysDataHourly = async () => {
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/sysinfo/hourly/latest');
      const data = await response.json(); // Parse the response as JSON
      setfetchedSystemDataHourly(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };

  const fetchAppStatus = async () => {
    try {
      const response = await fetch('https://dashboard.northdev.xyz/api/appstatus/latest');
      const data = await response.json(); // Parse the response as JSON
      setFetchedAppStatus(data); // Store the data in state
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };

  useEffect(() => {
    fetchSysData();
    const intervalId = setInterval(fetchSysData, 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchDbData();
    const intervalId = setInterval(fetchDbData, 10000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchSysDataHourly();
    const intervalId = setInterval(fetchDbData, 10000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchAppStatus();
    const intervalId = setInterval(fetchAppStatus, 30000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 

  return {
    fetchSysData,
    fetchDbData,
    fetchSysDataHourly,
    fetchAppStatus,
    fetchedSystemData,
    fetchedDbData,
    fetchedSystemDataHourly,
    fetchedAppStatus
  };
  }

export default useSystemData;
