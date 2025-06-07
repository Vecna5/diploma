import React from 'react';
import AuthForm from '../../components/sections/AuthForm';
import whiteMoon from '../../assets/icons/Moon(white).svg';
import whiteSun from '../../assets/icons/Sun(white).svg';
import '../Login/Login.css'; 

const Register = () => (
  <div className="login-page">
    <div className="login-icons">
      <img src={whiteMoon} alt="Moon Icon" className="login-icon" />
      <img src={whiteSun} alt="Sun Icon" className="login-icon" />
    </div>
    <h1 className="login-title">DreamDiary</h1>
    <AuthForm
      welcomeText="Create Account"
      submitLabel="Submit"
      showConfirm={true} 
      linkText="Already have an account?"
      linkHref="/auth/login"
      linkLabel="Log in"
    />
  </div>
);

export default Register;