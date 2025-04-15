import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../src/components/pages/Home'
import Login from '../src/components/pages/Login'
import Dashboard from '../src/components/pages/Dashboard'
import NotFound from '../src/components/pages/NotFound'


function App(){

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />


      </Routes>
    </Router>
  )
}

export default App