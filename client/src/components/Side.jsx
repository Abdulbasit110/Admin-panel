import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

const Side = () => {
    const [latestValues, setLatestValues] = useState({
        x: 0,
        y: 0,
        z: 0,
        total: 0
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/normalValues');
                const fetchedData = response.data;

                if (fetchedData.length > 0) {
                    const lastData = fetchedData[fetchedData.length - 1];
                    setLatestValues({
                        x: lastData.x.toFixed(2),
                        y: lastData.y.toFixed(2),
                        z: lastData.z.toFixed(2),
                        total: lastData.total.toFixed(2)
                    });
                } else {
                    console.log('No data available.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        setInterval(() => {
            fetchData();

        }, 3000);
    }, []);

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
                        <label htmlFor="yValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="yValue" id="yValue" value={latestValues.y} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="zValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="zValue" id="zValue" value={latestValues.z} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="tValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="tValue" id="tValue" value={latestValues.total} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                </fieldset>
                <fieldset className='border border-slate-600 p-5 m-2  ' >
                    <legend>Operations Instruction</legend>
                    <div className='flex gap-4 mb-4'>
                        <div>
                            <Button className='w-36' variant="contained">Connect</Button>
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
                            <Button className='w-36' variant="contained">Exit</Button>

                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Side