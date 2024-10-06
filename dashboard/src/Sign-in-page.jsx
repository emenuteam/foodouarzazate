import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import './Sign-in-page.scss';

const Signinpage = () => {
  const Global_URL = import.meta.env.VITE_GLOBAL_URL;
  const [formType, setFormType] = useState('login'); // 'login', 'register', 'forgotPassword'
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [restPassword, setRestPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check for token and redirect if authenticated
  useEffect(() => {
    const token = Cookies.get('Pa#Ss#ToK');
    if (token) {
      navigate('/all-meals');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'password' && value.length < 8) {
      setError('password must be at least 8 characters long');
    } else {
      setError(''); // Clear error if valid
    }
  };

  // Handle Log In form submission
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Global_URL}/api/login`, {
        email: formData.email,
        password: formData.password
      });
      const token = response.data.token;
      // Store the token in cookies
      Cookies.set('Pa#Ss#ToK', token, { expires: 1, secure: false, sameSite: 'lax' });
      navigate('/all-meals');
      window.location.reload();
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    }
  };

  // Handle Register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Global_URL}/api/register`, {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      navigate('/admin/sign-in#login');
      setFormType('login');
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    }
  };

  // Handle Forgot Password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${Global_URL}/api/forgot-password`, {
        email:restPassword
      });
      setMessage(response.data.message);
      setError('');
      setLoading(false);
      setRestPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  const handleToggle = (type) => {
    setFormType(type);
    setError('');
    setMessage('');
  };

  useEffect(() => {
    // Hide sidebar and navbar when component mounts
    const sidebar = document.querySelector('.sidebar');
    const navbar = document.querySelector('.navbar');

    if (sidebar) sidebar.style.display = 'none';
    if (navbar) navbar.style.display = 'none';

    // Clean up: Show sidebar and navbar again when component unmounts
    return () => {
      if (sidebar) sidebar.style.display = '';
      if (navbar) navbar.style.display = '';
    };
  }, []);

  return (
    <div className="signup-container">
      {formType === 'login' && (
        <form className="signup-form" onSubmit={handleLogIn}>
          <h2>Log-In</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Log-In</button>
          {error && <div className="alert alert-warning mt-2">{error}</div>}

        
          <p className='mt-2'>
            Don't have an account?{" "}
            <a href="#register" onClick={() => handleToggle('register')}>
              Register
            </a>
          </p>
            <a href="#forgot-password" onClick={() => handleToggle('forgotPassword')}>
            Forgot password
            </a>
        </form>
      )}

      {formType === 'register' && (
        <form className="signup-form" onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Register</button>
          {error && <div className="alert alert-warning mt-2">{error}</div>}
          <p className='mt-2'>
            Already have an account?{" "}
            <a href="#login" onClick={() => handleToggle('login')}>
              Login
            </a>
          </p>
        </form>
      )}

      {formType === 'forgotPassword' && (
        <form className="signup-form" onSubmit={handleForgotPassword}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={restPassword}
            onChange={(e)=> setRestPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} >
          {loading ? (
          <img src="/img/Rolling.gif" alt="Loading..." style={{ width: '45px', height: '45px' }} />
        ) : (
          'Send'
        )}
          </button>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <div className="alert alert-warning mt-2">{error}</div>}
          <p className='mt-2'>
          Remember password?{" "}
            <a href="#login" onClick={() => handleToggle('login')}>
              Log In
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Signinpage;
