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
            type: 'line'
        },
        xaxis: {
            categories: getXAxisLabels(chartData),
            labels: {
                rotate: -45, // Rotate labels by -45 degrees
                // tickAmount: 5 // Limit to 5 labels initially (adjust as needed)
            },
            title: {
                text: 'Time (s)', // X-axis label
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
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
            const timeParts = data[index].time.split(':');
            const seconds = parseInt(timeParts[2]);
            const group = Math.floor(seconds / 10) * 10;
            xAxisLabels.push(`${group}s`);
            index += 11; // Skip 10 values
        }

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
