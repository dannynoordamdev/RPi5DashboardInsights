import React from "react";
import { useNavigate } from "react-router-dom"; 
import '../../Styling/homestyling.css'

function Home () {
    const navigate = useNavigate(); 


const handleNavigation = () =>{

    navigate("/dashboard")
    
}

    return(
    <>
    <div className="home-main-content">

        <h1 className="title">RPi Dashboard</h1>
        <h2 className="subtitle">Statics, Insights & Performance.</h2>
        <h3 className="subtitle-followup"> Directly fetched from Raspberry Pi.</h3>
        <p className="footer-text">
            Programmed by Dannynoordamdev       
        </p>

        <button className="home-button-to-dashboard" onClick={handleNavigation}>Enter Dashboard</button>
    </div>
    </>)
}

export default Home