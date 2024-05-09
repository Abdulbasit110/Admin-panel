import React from 'react';
import Chart from 'react-apexcharts';

const ChartContainer = ({ chartData }) => {
    const options = {
        chart: {
            type: 'line'
        },
        // Add your ApexCharts options here
    };

    const series = [
        {
            name: 'avg_x',
            data: chartData.map(data => data.avg_x)
        },
        {
            name: 'avg_y',
            data: chartData.map(data => data.avg_y)
        },
        {
            name: 'avg_z',
            data: chartData.map(data => data.avg_z)
        },
        {
            name: 'avg_total',
            data: chartData.map(data => data.avg_total)
        }
    ];

    return (
        <div className="chart-container">
            <Chart options={options} series={series} type="line" />
        </div>
    );
};

export default ChartContainer;
