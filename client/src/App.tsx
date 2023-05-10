import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store'

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

  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const email = useSelector((state: RootState) => state.auth.email);

  const isProduction = process.env.REACT_APP_ENV === 'production';

  const dispatch = useDispatch();

  const location = useLocation();

  interface CustomWindow extends Window {
    dataLayer: any[];
  }

  useEffect(() => {
    (window as unknown as CustomWindow).dataLayer = (window as unknown as CustomWindow).dataLayer || [];
    (window as unknown as CustomWindow).dataLayer.push({
      event: 'pageview',
      page_path: location.pathname + location.search,
    });
  }, [location]);

  useEffect(() => {
    const storedDataString = localStorage.getItem('userDatax');
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);

      if (storedData && storedData.token) {
        dispatch(login(storedData));
      }
    }

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (token && userId && email) fetchUser(userId, email);
  }, [userId, email])

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const value = parts.pop();
      if (value) {
        return value.split(";").shift();
      }
    }
    return '';
  }

  async function fetchCsrfToken() {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/csrf-token", {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  }

  async function fetchUser(userId: string, email: string) {
    let csrfToken = getCookie("xsrf-token") || '';

    if (!csrfToken) {
      csrfToken = await fetchCsrfToken();
      document.cookie = `xsrf-token=${csrfToken}; path=/; samesite=${isProduction ? 'strict' : 'lax'}${isProduction ? '; secure' : ''}`;
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/all', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        email: email
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "CSRF-Token": csrfToken,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      dispatch(setUser(data.result));
    }
  }

  return (
    <div className="app">
      {error != '' && <ErrorModal onClose={() => setError('')} error={error} />}
      {!isLoading && token && <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<Problems />} />
        <Route path='/new-problem' element={<AddProblem />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>}
      {!isLoading && !token && <Routes>
        <Route path='/landing' element={<Landing />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>}
    </div>
  )
}

export default App
