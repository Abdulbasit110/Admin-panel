import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';


const Side = ({ chartData, handleConnect, handleDisconnect }) => {
    const [latestValues, setLatestValues] = useState({
        x: 0,
        y: 0,
        z: 0,
        total: 0
    });

    useEffect(() => {
        const updateLatestValues = () => {
            if (chartData && chartData.length > 0) {
                const lastData = chartData[chartData.length - 1];
                console.log('lastData:', lastData); // Log the last data point
                setLatestValues({
                    x: lastData.avg_x !== undefined ? lastData.avg_x.toFixed(2) : 0,
                    y: lastData.avg_y !== undefined ? lastData.avg_y.toFixed(2) : 0,
                    z: lastData.avg_z !== undefined ? lastData.avg_z.toFixed(2) : 0,
                    total: lastData.avg_total !== undefined ? lastData.avg_total.toFixed(2) : 0
                });
            } else {
                console.log('No data available.');
            }
        };

        updateLatestValues();
    }, [chartData]);

    return (
        <div className='w-1/4'>
            <div>
                <fieldset className='border border-slate-600 p-5 m-2' >
                    <legend>Parameters Setting</legend>
                    <div className='mb-3'>
                        <div>
                            <label htmlFor="duration" className='font-bold'>Display duration</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="duration" id="duration" />

                        </div>
                    </div>
                    <div className='mb-3'>
                        <div>
                            <label htmlFor="port" className='font-bold'>serial port selection</label>
                        </div>
                        <div>
                            {/* <label for="cars">Choose a car:</label> */}
                            <select name="port" id="port" className='w-32 border border-slate-600 rounded-sm'>
                                <option value="volvo">1</option>
                                <option value="saab">2</option>
                                <option value="opel">3</option>
                                <option value="audi">4</option>
                            </select>

                        </div>
                    </div>
                    <div className='mb-3' >
                        <div>
                            <h4 className='font-bold'>Measuring Mode</h4>
                        </div>
                        <div>
                            <input type="radio" name="mode" id="mode" value={'absolute'} />
                            <label htmlFor="mode">Absolute value measurement</label>
                        </div>
                        <div>
                            <input type="radio" name="mode" id="mode" value={'relative'} />
                            <label htmlFor="mode">Relative value measurement</label>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='border border-slate-600 p-5 m-2' >
                    <legend>Magnetic Field Value</legend>
                    <div className='mb-4'>
                        <label htmlFor="xValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="xValue" id="xValue" value={latestValues.x} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="yValue" className='font-bold'>y-axis:</label>
                        <input type="text" name="yValue" id="yValue" value={latestValues.y} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="zValue" className='font-bold'>z-axis:</label>
                        <input type="text" name="zValue" id="zValue" value={latestValues.z} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="tValue" className='font-bold'>T-axis:</label>
                        <input type="text" name="tValue" id="tValue" value={latestValues.total} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                </fieldset>
                <fieldset className='border border-slate-600 p-5 m-2  ' >
                    <legend>Operations Instruction</legend>
                    <div className='flex gap-4 mb-4'>
                        <div>
                            <Button className='w-36' variant="contained" onClick={handleConnect}>Connect</Button>
                        </div>
                        <div>
                            <Button className='w-36' variant="contained">Collect</Button>

                        </div>
                    </div>
                    <div className='flex gap-4  mb-4'>
                        <div>
                            <Button className='w-36' variant="contained">Reset Zoom</Button>
                        </div>
                        <div>
                            <Button className='w-36' variant="contained">Start saving</Button>

                        </div>
                    </div>
                    <div className='flex gap-4  mb-4'>
                        <div>
                            <Button className='w-36' variant="contained">Data Replay</Button>
                        </div>
                        <div>
                            <Button className='w-36' variant="contained" onClick={handleDisconnect}>Exit</Button>

                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Side