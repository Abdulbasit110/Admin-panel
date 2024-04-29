import React from 'react'
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
    }
}

export const Highchart = () => <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
</div>
