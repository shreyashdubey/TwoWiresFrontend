import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup'; // Your Signup component
import Login from './components/login'; // Your Login component
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import FriendRequest from './components/FriendRequest';
const App = () => {

  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:userId" component={UserProfile} />
      <Route path="/friend-requests" element={<FriendRequest/>} />
      {/* Add other routes for different pages */}
    </Routes>
  );
};

export default App;