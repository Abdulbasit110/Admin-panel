import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Apex = ({ axis }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/values'); // Replace '/api/getAvgData' with your actual API endpoint
                setChartData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        xaxis: {
            tickAmount: 6,
            // type: 'datetime', // Specify that x-axis values are of datetime type
            categories: chartData.map(data => new Date(`${data.date}T${data.time}`).getTime()), // Convert date and time to milliseconds since Unix epoch
            labels: {

                formatter: function (value) {
                    // Format the timestamp to display time in the desired format
                    const date = new Date(value);
                    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value.toFixed(2); // Format y-axis labels to two decimal places
                }
            },
            title: {
                text: axis, // Y-axis label
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            }
        },
        // Other ApexCharts options as needed
    };

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
