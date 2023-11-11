import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from './components/Signup'; // Your Signup component
import Login from './components/login' // Your Login component
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import FriendRequest from './components/FriendRequest';
import Forgot from './components/Forgot';
import Authentication from './components/Authentication'
import PasswordReset from './components/PasswordReset'

const App = () => {
  const [auth, setAuth] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth(token);
    } else {
      navigate("/login");
    }
  },[])

  return (
    <Routes>
      {/* Define your routes here */}
      {auth && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:userId" component={UserProfile} />
          <Route path="/friend-requests" element={<FriendRequest />} />
          <Route path="account/password/reset" element={<Forgot />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/account/password/confirm" element={<PasswordReset />} />
        </>
      )}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Add other routes for different pages */}
    </Routes>
  );
};

export default App;