import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Side from './components/Side'
import axios from 'axios';
import io from 'socket.io-client';
import Apex from './components/Apex'

const socket = io.connect('ws://localhost:8080');

const App = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/values');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const connectToSocket = () => {
    socket.on("dataReceived", (receivedData) => {
      setChartData([...chartData, receivedData])
    })
  }

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <>
      <Header />
      <div className='flex'>
        <Body chartData={chartData} />
        <Side chartData={chartData} handleConnect={connectToSocket} handleDisconnect={handleDisconnect} />
      </div>
    </>
  )
}

export default App;