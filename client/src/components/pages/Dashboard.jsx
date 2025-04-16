import React, { useEffect, useState } from "react";
import '../../Styling/Dashboardstyling.css';
import useSystemData from '../FetchSystemData';
import SystemStatsChart from '../Charts/SystemStatsChart';

function Dashboard() {
    const [currentTime, setCurrentTime] = useState("");
    const [userName, setUserName] = useState("Danny");

    const {
        fetchSysData,
        fetchDbData,
        fetchSysDataHourly,
        fetchAppStatus,
        fetchedSystemDataHourly,
        fetchedSystemData,
        fetchedDbData,
        fetchedAppStatus
      } = useSystemData();
      
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0'); 
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        setCurrentTime(formatTime(new Date()));

        const interval = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 60000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-card">
                <div className="information-part">
                    <p>Welcome, {userName}</p>
                    <p>Current time: {currentTime}</p>
                </div>
                <hr className="content-divider" />
                
                <div className="grid grid-3">
                    <div className="card">
                        <h3 className="card-title">System Stats</h3>
                        <h1 className="card-data">CPU Temp: {fetchedSystemData?.temperature ?? 'Loading...'}</h1>
                        <h1 className="card-data">CPU Usage: {fetchedSystemData?.cpuUsage ?? 'Loading...'}%</h1>
                        <h1 className="card-data">Memory Usage: {fetchedSystemData?.memoryUsage ?? 'Loading...'}%</h1>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Database Stats</h3>
                        <h1 className="card-data">Database Size: {fetchedDbData?.sizeMB ?? 'Loading...'}MB</h1>
                        <h1 className="card-data">Database Rows: {fetchedDbData?.totalRows ?? 'Loading...'} entries</h1>

                    </div>
                    <div className="card">
                        <h3 className="card-title">Raspberry Pi Storage</h3>
                        <h1 className="card-data">Internal Storage: { 'Loading... '}</h1>
                        <h1 className="card-data">External Storage: { 'Loading... '}</h1>

                    </div>
                    
                    
                </div>
                <hr />
                <div className="grid grid-1">
                <div className="card">
                    <h3 className="card-title">12H Stats</h3>
                    {fetchedSystemDataHourly && fetchedSystemDataHourly.length > 0 ? (
                    <SystemStatsChart data={fetchedSystemDataHourly} />
                    ) : (
                    <p>Loading chart...</p>
                    )}
                </div>
                </div>

                <hr className="content-divider" />
                
                <div className="grid grid-1">
                    <div className="card">
                        <h3 className="card-title">Running Applications:</h3>
                        <h1 className="card-data-service"><strong>Service:</strong> {fetchedAppStatus?.name ?? 'Loading...'} | <strong>Status:</strong> {fetchedAppStatus?.status ?? 'Loading...'} | <strong>Uptime:</strong> {fetchedAppStatus?.uptime ?? 'Loading...'}</h1>
                    </div>
                    
                    
                    
                    
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
