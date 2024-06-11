import React from 'react'
import LineChart from './LineChart'
import { Highchart } from './Highchart'
import Apex from './Apex'

const ChartGrid = ({ chartData }) => {
    return (
        <div className='flex justify-center gap-6'>
            <div className='w-1/2'>
                <Apex axis={"avg_x"} chartData={chartData} />
                <Apex axis={"avg_y"} chartData={chartData} />
                {/* <LineChart titleText={'X-axis Magnetic Field Waveform'} yTitle={'X-axis Magnetic Field/nT'} />
                <LineChart titleText={'Y-axis Magnetic Field Waveform'} yTitle={'Y-axis Magnetic Field/nT'} /> */}
            </div>
            <div className='w-1/2'>
                <Apex axis={"avg_z"} chartData={chartData} />
                <Apex axis={"avg_total"} chartData={chartData} />
                {/* <LineChart titleText={'Z-axis Magnetic Field Waveform'} yTitle={'Z-axis Magnetic Field/nT'} /> */}
                {/* <LineChart titleText={'Total axis Magnetic Field Waveform'} yTitle={'Total axis Magnetic Field/nT'} /> */}
                {/* <Highchart /> */}

            </div>
        </div>
    )
}

export default ChartGrid