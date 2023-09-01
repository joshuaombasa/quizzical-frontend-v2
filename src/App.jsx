import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import './App.css'
import Welcome from './pages/Welcome'
import Questions from './pages/Questions'
import Answers from './pages/Asnwers'
const URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple"

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
