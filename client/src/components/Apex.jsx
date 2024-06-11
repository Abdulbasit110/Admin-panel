import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import io from 'socket.io-client';
import moment from 'moment';



const Apex = ({ axis, chartData }) => {

    const options = {
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
            },
        },
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: '',
            align: 'left'
        },
        xaxis: {
            tickAmount: 6,
            // type: 'datetime', // Specify that x-axis values are of datetime type
            categories: chartData.map(data => new Date(`${data.date}T${data.time}`).getTime()),
            labels: {

                formatter: function (value) {
                    // Format the timestamp to display time in the desired format
                    const date = new Date(value);
                    return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
                }
            },
            title: {
                text: "Time"
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value.toFixed(2);
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
    };

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
