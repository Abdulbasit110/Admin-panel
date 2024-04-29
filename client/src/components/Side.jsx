import React from 'react'
import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

const Side = () => {
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
                        <input type="text" name="xValue" id="xValue" value={' 0.00'} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="xValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="xValue" id="xValue" value={' 0.00'} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="xValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="xValue" id="xValue" value={' 0.00'} className='border border-slate-500 rounded-sm mx-5' />
                        <span>nT</span>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="xValue" className='font-bold'>X-axis:</label>
                        <input type="text" name="xValue" id="xValue" value={' 0.00'} className='border border-slate-500 rounded-sm mx-5' />
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