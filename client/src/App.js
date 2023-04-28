import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Home from './Pages/Home'
import Problems from './Pages/Problems'
import AddProblem from './Pages/AddProblem'
import Recommended from './Pages/Recommended'

import { login } from './redux/slices/authSlice'

function App() {
  const token = useSelector(state => state.auth.token)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))

    if (storedData && storedData.token) {
      dispatch(login(storedData))
    }
  }, [dispatch])

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
