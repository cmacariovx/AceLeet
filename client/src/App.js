import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Home from './Pages/Home'
import Problems from './Pages/Problems'
import AddProblem from './Pages/AddProblem'
import Recommended from './Pages/Recommended'
import ErrorModal from './Components/ErrorModal'

import { login } from './redux/slices/authSlice'
import { setUser } from './redux/slices/userSlice'
import Landing from './Pages/Landing'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const email = useSelector(state => state.auth.email);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageview',
      page_path: location.pathname + location.search,
    });
  }, [location]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userDatax'));

    if (storedData && storedData.token) {
      dispatch(login(storedData));
    }

    setIsLoading(false)
  }, [dispatch]);

  useEffect(() => {
    if (token && userId && email) fetchUser(userId, email);
  }, [userId, email])

  async function fetchUser(userId, email) {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('_csrf')).split('=')[1];

    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/all', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "CSRF-Token": csrfToken,
      }
    })

    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    else {
      dispatch(setUser(data.result));
    }
  }

  return (
    <div className="app">
      {error != '' && <ErrorModal onClose={() => setError('')} error={error} />}
      {!isLoading && token && <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/history' exact element={<Problems />} />
        <Route path='/new-problem' exact element={<AddProblem />} />
        {/* <Route path='/recommended' exact element={<Recommended />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>}
      {!isLoading && !token && <Routes>
        <Route path='/landing' exact element={<Landing />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>}
    </div>
  )
}

export default App
