import './App.css'
import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './Pages/Home'
import Problems from './Pages/Problems'
import AddProblem from './Pages/AddProblem'
import Recommended from './Pages/Recommended'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/history' exact element={<Problems />} />
        <Route path='/new-problem' exact element={<AddProblem />} />
        <Route path='/recommended' exact element={<Recommended />} />
      </Routes>
    </div>
  )
}

export default App
