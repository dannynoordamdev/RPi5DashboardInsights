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
                    <p className="label">Welcome, {userName}</p>
                    <p className="label">Current time: {currentTime}</p>
                </div>
                <hr className="content-divider" />
                
                <div className="grid grid-3">
                    <div className="card">
                        <h2 className="card-title">System Stats</h2>
                        <p className="card-data ">CPU Temp: {fetchedSystemData?.temperature ?? 'Loading...'}</p>
                        <p className="card-data">CPU Usage: {fetchedSystemData?.cpuUsage ?? 'Loading...'}%</p>
                        <p className="card-data">Memory Usage: {fetchedSystemData?.memoryUsage ?? 'Loading...'}%</p>
                    </div>
                    <div className="card">
                        <h2 className="card-title">Database Stats</h2>
                        <p className="card-data">Database Size: {fetchedDbData?.sizeMB ?? 'Loading...'}MB</p>
                        <p className="card-data">Database Rows: {fetchedDbData?.totalRows ?? 'Loading...'} entries</p>

                    </div>
                    <div className="card">
                        <h2 className="card-title">Raspberry Pi Storage</h2>
                        <p className="card-data">Internal Storage: { 'Loading... '}</p>
                        <p className="card-data">External Storage: { 'Loading... '}</p>

                    </div>
                    
                    
                </div>
                <hr className="content-divider" />

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
                
                <div className="app-status-card">
                    <h3 className="card-title">Current running services:</h3>
                    <div className="grid grid-4">
                        {fetchedAppStatus?.map((app) => (
                        <div key={app.id} className="card service-card">
                            <div className="service-row">
                            <span className="label">Service:</span>
                            <span className="value">{app.name}</span>
                            </div>
                            <div className="service-row">
                            <span className="label">Uptime:</span>
                            <span className="value">{app.uptime}</span>
                            </div>
                            <div className="service-row">
                            <span className="label">Status:</span>
                            <span className={`value status-text ${app.status === 'online' ? 'online' : 'offline'}`}>
                                {app.status.toUpperCase()}
                            </span>
                            </div>
                        </div>
                        )) ?? <p>Loading...</p>}
                    </div>
                    </div>

                <hr className="content-divider" />


            </div>
        </div>
    );
}

export default Dashboard;
