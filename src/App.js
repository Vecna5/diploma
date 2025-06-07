import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPage from './pages/UserPage/UserPage';
import DreamPage from './pages/DreamPage/DreamPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/dreams" element={<UserPage />} />
      <Route path="/dreams/:id" element={<DreamPage />} />
    </Routes>
  );
}

export default App;