import './App.css'
import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './Pages/Home'
import Problems from './Pages/Problems'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/problems' exact element={<Problems />} />
      </Routes>
    </div>
  )
}

export default App
