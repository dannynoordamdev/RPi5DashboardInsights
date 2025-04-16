import React, { useEffect, useState } from "react";
import '../../Styling/Dashboardstyling.css';
import FetchSystemData from "../FetchSystemData";

function Dashboard() {
    const [currentTime, setCurrentTime] = useState("");
    const [userName, setUserName] = useState("Danny");

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
                        <h1 className="card-data">CPU:</h1>
                    </div>
                    <div className="card">
                    <h1 className="card-data">CPU:</h1>
                    </div>
                    <div className="card">
                    <h1 className="card-data">CPU:</h1>
                    </div>

                </div>
                <hr />
                <div className="grid grid-2">
                <div className="card"></div>
                <div className="card"></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
