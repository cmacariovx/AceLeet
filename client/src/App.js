import './App.css'
import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './Pages/Home'
import Problems from './Pages/Problems'
import AddProblem from './Pages/AddProblem'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/problems' exact element={<Problems />} />
        <Route path='/add-problem' exact element={<AddProblem />} />
      </Routes>
    </div>
  )
}

export default App
