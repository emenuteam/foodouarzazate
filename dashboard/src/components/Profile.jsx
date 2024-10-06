import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import './Profile.scss';

const Profile = () => {
  const Global_URL = import.meta.env.VITE_GLOBAL_URL;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

    const getCookie = (name)=> {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
      
        // get token
        const token = getCookie('Pa#Ss#ToK');
        setToken(token);
    
        fetchuserData();

  }, [token]);

  const handleInputPasswordChange = (e) => {
    setNewPassword(e.target.value);

    if (e.target.value.length < 8) {
        setError('password must be at least 8 characters long');
      } else {
        setError(''); // Clear error if valid
      }
};

  const fetchuserData = async () => {
    try {
      const response = await axios.get(`${Global_URL}/api/user/${token}`);
      const { user } = response.data;
      setFullName(user.full_name);
      setEmail(user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Global_URL}/api/user/${token}`, {
        full_name:fullName,
        email:email
      });
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Global_URL}/api/user/reset-password/${token}`, {
        newPassword
      });
      Swal.fire("Success", "Password reset successfully", "success");
      setNewPassword(''); // Clear password field
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="form">
      <div className="input-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
      </div>
      <button className="update-btn" onClick={handleUpdateProfile}>Update info</button>

      <div className="input-group mt-5">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleInputPasswordChange}
          placeholder="New password"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
      <button className={`update-btn ${error === '' ? '' : 'disabled'}`} disabled={error === 'password must be at least 8 characters long'} onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default Profile;
