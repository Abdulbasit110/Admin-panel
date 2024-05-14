import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import moment from 'moment';
const Apex = ({ axis }) => {

    const [chartData, setChartData] = useState([]);


    const sendRandomData = async () => {
        const randomValue = () => Math.floor(Math.random() * 100);
        const x = randomValue();
        const y = randomValue();
        const z = randomValue();
        const total = x + y + z;
        const date = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        const time = new Date().toISOString().slice(11, 19);
        const doc = {
            x, y, z, total, date, time
        }
        // console.log(doc)
        await fetch('http://localhost:3000/device-data', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    // function generateRandomData() {
    //     const randomValue = () => Math.floor(Math.random() * 100);
    //     const x = randomValue();
    //     const y = randomValue();
    //     const z = randomValue();
    //     const total = x + y + z;
    //     const date = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    //     const time = new Date().toISOString().slice(11, 19); // Get current time in HH:MM:SS format
    //     return { x, y, z, total, date, time };
    // }

    // const sendRandomData = async () => {
    //     const randomData = generateRandomData();
    //     try {
    //         const response = await axios.post('http://localhost:3000/device-data', randomData); // Assuming your server endpoint for receiving data is '/device-data'
    //         console.log('Data sent successfully:', randomData);
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };
    // sendRandomData()
    // const startSendingData = () => {
    //     if (!timer) {
    //         const interval = setInterval(() => {
    //             sendRandomData();
    //         }, 1000); // Send data every 1 second
    //         setTimer(interval);
    //     }
    // };

    // startSendingData();



    // const handleStartInterval = () => {
    //     clearInterval(timer); // Clear any existing interval
    //     timer = setInterval(() => {
    //         fetchData();
    //     }, 1000); // Fetch data every 1 second
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/values');
                setChartData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const timer = setInterval(() => {
            fetchData();
        }, 1000);
        // fetchData();

        return () => { clearInterval(timer) }

    }, []);

    useEffect(() => {
        const timer2 = setInterval(() => { sendRandomData() }, 1000);
        return () => { clearInterval(timer2) }
    }, [])

    // const options = {
    //     chart: {
    //         id: 'realtime',
    //         height: 350,
    //         type: 'line',
    //         animations: {
    //             enabled: true,
    //             easing: 'linear',
    //             dynamicAnimation: {
    //                 speed: 1000
    //             }
    //         },
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: false
    //         }
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     stroke: {
    //         curve: 'smooth'
    //     },
    //     title: {
    //         text: 'Dynamic Updating Chart',
    //         align: 'left'
    //     },
    //     xaxis: {
    //         tickAmount: 6,
    //         // type: 'datetime', // Specify that x-axis values are of datetime type
    //         categories: chartData.map(data => new Date(`${data.date}T${data.time}`).getTime()), // Convert date and time to milliseconds since Unix epoch
    //         labels: {

    //             formatter: function (value) {
    //                 // Format the timestamp to display time in the desired format
    //                 const date = new Date(value);
    //                 return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    //             }
    //         }
    //     },
    //     yaxis: {
    //         labels: {
    //             formatter: function (value) {
    //                 return value.toFixed(2); // Format y-axis labels to two decimal places
    //             }
    //         },
    //         title: {
    //             text: axis, // Y-axis label
    //             style: {
    //                 fontSize: '14px',
    //                 fontWeight: 'bold'
    //             }
    //         }
    //     },
    //     // Other ApexCharts options as needed
    // };
    const options = {
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            },

        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Dynamic Updating Chart',
                align: 'left'
            },
            xaxis: {
                tickAmount: 6,
                categories: chartData.map(data => new Date(`${data.date}T${data.time}`).getTime()),// Initially empty, will be populated dynamically
                labels: {
                    formatter: function (value) {
                        const date = new Date(value);
                        return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value.toFixed(2);
                    }
                },
                title: {
                    text: axis, // Initially empty, will be updated dynamically
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                }
            }
        }
    }


    function getXAxisLabels(data) {
        const xAxisLabels = [];
        let index = 0;

        while (index < data.length) {
            const currentItem = data[index];
            if (currentItem && currentItem.time) {
                const timeParts = currentItem.time.split(':');
                if (timeParts.length === 3) {
                    const seconds = parseInt(timeParts[2]);
                    const group = Math.floor(seconds / 10) * 10;
                    xAxisLabels.push(`${group}s`);
                }
            }
            index += 11; // Skip 10 values
        }

        // console.log('X-Axis Labels:', xAxisLabels); // Log the extracted labels for debugging
        return xAxisLabels;
    }


    const series = [
        {
            name: axis,
            data: chartData.map(data => data[axis].toFixed(3))
        }
    ];


    return (
        <div className="chart-container">
            <Chart options={options} series={series} type="line" />
        </div>
    );
};

export default Apex;
