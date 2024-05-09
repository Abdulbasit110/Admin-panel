import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Side from './components/Side'
import Apex from './components/Apex'

const App = () => {

  return (
    <>
      <Header />
      <div className='flex'>
        <Body />
        <Side />
      </div>
    </>
  )
}

export default App;