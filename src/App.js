import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPage from './pages/UserPage/UserPage';
import FullDream from './pages/DreamPage/FullDream';
import Account from './pages/AccountPage/Account';
import CreateDream from './pages/CreateDream/CreateDream';
import OnlineSection from './pages/Online/OnlineSection';
import PublicDream from './pages/Online/PublicDream';

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
      <Route path="/dreams/:id" element={<FullDream />} />
      <Route path="/account" element={<Account />} />
      <Route path="/create" element={<CreateDream />} />
      <Route path="/online" element={<OnlineSection />} />
      <Route path="/public-dream/:id" element={<PublicDream />} />
    </Routes>
  );
}

export default App;