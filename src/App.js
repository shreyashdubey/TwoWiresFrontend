import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup'; // Your Signup component
import Login from './components/login' // Your Login component
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import FriendRequest from './components/FriendRequest';
import Forgot from './components/Forgot';
import Authentication from './components/Authentication'
import PasswordReset from './components/PasswordReset'
import Team from './components/Team'
import CreateNewTeam from './components/CreateTeam';
import InviteUsers from './components/InviteUser';
import ModalTesting from './components/ModalTesting';

const App = () => {

  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user" element={<UserProfile/>} />
      <Route path="/friend-requests" element={<FriendRequest/>} />
      <Route path="account/password/reset" element={<Forgot/>} />
      <Route path="/authentication" element={<Authentication/>} />
      <Route path="/account/password/confirm" element={<PasswordReset/>} />
      <Route path="/team" element={<Team/>} />
      <Route path="/create-new-team" element={<CreateNewTeam />} />
      <Route path="/invite-users/:teamName" element={<InviteUsers />} />
      <Route path="/modaltesting" element={<ModalTesting />} />
      {/* Add other routes for different pages */}

    </Routes>
  );
};

export default App;