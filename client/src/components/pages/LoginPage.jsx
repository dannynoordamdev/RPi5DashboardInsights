import React, { useState } from "react";
import '../../Styling/RegisterStyling.css';

const LoginPage = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return(
        <div className="login-container">
            <h1>Login to continue</h1>
                <div className="input-group">
                    <label htmlFor="Username">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="Password">Password</label>
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </div>
        </div>
    )
}

export default LoginPage;