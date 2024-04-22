import React from 'react'


const Side = () => {
    return (
        <div className='w-1/4'>
            <div>
                <fieldset className='border border-slate-600 p-5 m-2' >
                    <legend>Parameters Setting</legend>
                    <div>
                        <div>
                            <label htmlFor="duration">Display duration</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="duration" id="duration" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="port">serial port selection</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="port" id="port" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Measuring Mode</h4>
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
                    <legend>Parameters Setting</legend>
                    <div>
                        <div>
                            <label htmlFor="duration">Display duration</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="duration" id="duration" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="port">serial port selection</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="port" id="port" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Measuring Mode</h4>
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
                    <legend>Parameters Setting</legend>
                    <div>
                        <div>
                            <label htmlFor="duration">Display duration</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="duration" id="duration" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="port">serial port selection</label>
                        </div>
                        <div>
                            <input className='border border-slate-500 rounded-sm' type="number" name="port" id="port" />

                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Measuring Mode</h4>
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
            </div>
        </div>
    )
}

export default Side