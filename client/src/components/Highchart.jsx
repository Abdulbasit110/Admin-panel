import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsExporting from 'highcharts/modules/exporting'
import highchartsCSV from 'highcharts/modules/export-data'
import highchartsFullscreen from 'highcharts/modules/full-screen'

// Initialize Highcharts modules
highchartsExporting(Highcharts)
highchartsCSV(Highcharts)
highchartsFullscreen(Highcharts)



export const Highchart = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/xValues')
            .then(response => response.json())
            .then(data => setData(data))

    }, [])



    const options = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }],
        exporting: {
            csv: {
                dateFormat: '%Y-%m-%d %H:%M:%S',
                itemDelimiter: ','
            }
        },
        navigation: {
            buttonOptions: {
                enabled: true
            }
        },
        credits: {
            enabled: false
        }

    }


    return (
        <div>
            {
                console.log(data)
            }
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
