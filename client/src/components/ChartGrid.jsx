import React from 'react'
import LineChart from './LineChart'
import { Highchart } from './Highchart'

const ChartGrid = () => {
    return (
        <div className='flex justify-center gap-6'>
            <div className='w-1/2'>
                <LineChart titleText={'X-axis Magnetic Field Waveform'} yTitle={'X-axis Magnetic Field/nT'} />
                <LineChart titleText={'Y-axis Magnetic Field Waveform'} yTitle={'Y-axis Magnetic Field/nT'} />
            </div>
            <div className='w-1/2'>
                <LineChart titleText={'Z-axis Magnetic Field Waveform'} yTitle={'Z-axis Magnetic Field/nT'} />
                {/* <LineChart titleText={'Total axis Magnetic Field Waveform'} yTitle={'Total axis Magnetic Field/nT'} /> */}
                <Highchart />
            </div>
        </div>
    )
}

export default ChartGrid