// components/SystemStatsChart.jsx

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function SystemStatsChart({ data }) {
  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cpuUsage: parseFloat(item.cpuUsage),
    memoryUsage: parseFloat(item.memoryUsage),
    temperature: item.temperature
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#FF4F4F" name="Temperature (°C)" />
          <Line type="monotone" dataKey="cpuUsage" stroke="#4FBEFF" name="CPU Usage (%)" />
          <Line type="monotone" dataKey="memoryUsage" stroke="#82ca9d" name="Memory Usage (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    
  );
}
