import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Styling/Dashboardstyling.css';
import useSystemData from '../FetchSystemData';
// import SystemStatsChart from '../Charts/SystemStatsChart';

function Dashboard() {
    const [currentTime, setCurrentTime] = useState("");
    const [userName, setUserName] = useState("Danny");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignout = async (e) => {
        e.preventDefault(); // 

        try{
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // include because we send the cookie to asp
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Unable to logout");
            } else {
                alert("Signed out successfully!")
                navigate("/");
            }
        } catch (error) {
            setError("Error during logout: " + error.message);
        }
    };
        
    

    const {
        fetchSysData,
        fetchDbData,
        fetchSysDataHourly,
        fetchAppStatus,
        fetchedSystemDataHourly,
        fetchedSystemData,
        fetchedDbData,
        fetchedAppStatus
      } = useSystemData(); // custom hook useSysData || Seperation of concerns
      
    

    return (
        
        <div className="dashboard-wrapper">
            <div className="dashboard-card">
                <div className="information-part">
                    <p className="label">Welcome, {userName}</p>
                    <span className="logout" onClick={handleSignout}>Logout</span>

                </div>
                <hr className="content-divider" />
                
                <div className="grid grid-3">
                    <div className="card">
                        <h2 className="card-title">Current RPi Health </h2>
                        <p className="card-data ">CPU Temp: {fetchedSystemData?.temperature ?? 'Loading...'}°</p> 
                        <p className="card-data">CPU Usage: {fetchedSystemData?.cpuUsage ?? 'Loading...'}%</p>
                        <p className="card-data">Memory Usage: {fetchedSystemData?.memoryUsage  ?? 'Loading...'}% | { (8 - (fetchedSystemData?.memoryUsage / 100) * 8).toFixed(2)} GB RAM left</p>
                    </div>
                    <div className="card">
                        <h2 className="card-title">Database Insights</h2>
                        <p className="card-data">Database Size: {fetchedDbData?.sizeMB.toFixed(2) ?? 'Loading...'}MB</p>
                        <p className="card-data">Database Rows: {fetchedDbData?.totalRows ?? 'Loading...'} entries</p>

                    </div>
                    <div className="card">
                        <h2 className="card-title">Raspberry Pi Storage</h2>
                        <p className="card-data">Internal Storage: { 'Loading... '}</p>
                        <p className="card-data">External Storage: { 'Loading... '}</p>

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



// Chart component in progress...
// <hr className="content-divider" />
// <div className="grid grid-1">
// <div className="card">
//     <h3 className="card-title">12H Stats</h3>
//     {fetchedSystemDataHourly && fetchedSystemDataHourly.length > 0 ? (
//     <SystemStatsChart data={fetchedSystemDataHourly} />
//     ) : (
//     <p>Loading chart...</p>
//     )}
// </div>
// </div>