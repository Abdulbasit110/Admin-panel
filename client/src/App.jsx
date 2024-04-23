import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Side from './components/Side'

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