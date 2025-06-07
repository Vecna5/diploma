import React from 'react';
import AuthForm from '../../components/sections/AuthForm';
import whiteMoon from '../../assets/icons/Moon(white).svg';
import whiteSun from '../../assets/icons/Sun(white).svg';
import './Login.css';

const Login = () => (
  <div className="login-page">
    <div className="login-icons">
      <img src={whiteMoon} alt="Moon Icon" className="login-icon" />
      <img src={whiteSun} alt="Sun Icon" className="login-icon" />
    </div>
    <h1 className="login-title">DreamDiary</h1>
    <AuthForm
      welcomeText="Welcome Back!"
      submitLabel="Submit"
      linkText="Don't have account?"
      linkHref="/auth/register"
      linkLabel="Register"
    />
  </div>
);

export default Login;