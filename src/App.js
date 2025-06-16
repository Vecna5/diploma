import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPage from './pages/UserPage/UserPage';
import DreamPage from './pages/DreamPage/DreamPage';
import Account from './pages/AccountPage/Account';

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/dreams" element={<UserPage />} />
      <Route path="/dreams/:id" element={<DreamPage />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;