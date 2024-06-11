import React from 'react'
import ChartGrid from './ChartGrid'
import Record from './Record'

const Body = ({ chartData }) => {
    return (
        <div className='w-3/4 mx-3'>
            <ChartGrid chartData={chartData} />
            <Record />
        </div>
    )
}

export default Body