import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'


import './App.css'
import Welcome from './pages/Welcome'
import Questions from './pages/Questions'
import Answers from './pages/Answers'


function App() {

  return (
    <div className='container'>
     <Routes>
       <Route path="/" element={<Welcome/>}/>
       <Route path="/questions"  element={<Questions/>}/>
       <Route path="/answers" element={<Answers/>}/>
     </Routes>
    </div>
  )
}

export default App
