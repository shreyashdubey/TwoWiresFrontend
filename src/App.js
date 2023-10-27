import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup'; // Your Signup component
import Login from './components/Login_com/login'; // Your Login component
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import FriendRequest from './components/FriendRequest';
import Create_new from './components/create_new/Create_new';
import Forge from './components/Forget/Forge';
import Verify from './components/sendotp/Verify';
import Pass_change from './components/pass_change/Pass_change';
const App = () => {

  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:userId" component={UserProfile} />
      <Route path="/friend-requests" element={<FriendRequest/>} />
      <Route path="/Create_new" element={<Create_new />} />
      <Route path="/Forge" element={<Forge/>} />
      <Route path="/Verify" element={<Verify/>} />
      <Route path="/Pass_change" element={<Pass_change/>} />
      {/* Add other routes for different pages */}

    </Routes>
  );
};

export default App;