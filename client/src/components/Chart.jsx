import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Chart = () => {
    // const [chart, setChart] = useState({})
    // var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    // var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";



    // useEffect(() => {
    //     const fetchCoins = async () => {
    //         await fetch(`${proxyUrl}${baseUrl}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': `${apiKey}`,
    //                 'Access-Control-Allow-Origin': "*"
    //             }
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     response.json().then((json) => {
    //                         console.log(json.data);
    //                         setChart(json.data)
    //                     });
    //                 }
    //             }).catch((error) => {
    //                 console.log(error);
    //             });
    //     };
    //     fetchCoins()
    // }, [baseUrl, proxyUrl, apiKey])

    // console.log("chart", chart);
    var data = {
        labels: ['x', 'Magnetic field', 'y'],
        datasets: [{
            label: `Magnetic field1`,
            data: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    var options = {
        maintainAspectRatio: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '',

                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Magnetic field'
                }

            }
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        },

    }

    return (
        <div>
            <Line
                data={data}
                options={options}

            />
        </div>
    )
}

export default Chart