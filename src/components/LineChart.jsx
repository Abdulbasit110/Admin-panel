import React from 'react';
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



const labels = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];

export const data = {
    labels,
    datasets: [
        {
            data: [0, 20, 10, 30, 50],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.2,
            borderWidth: 1
        },
    ],
};

export default function LineChart({ titleText, yTitle }) {
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time/s'
                }
            },
            y: {
                title: {
                    display: true,
                    text: yTitle
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: titleText,
                align: 'end'
            },
        },

    };
    return <Line options={options} data={data} />;
}
