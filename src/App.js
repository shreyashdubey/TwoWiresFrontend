import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from './components/Signup'; // Your Signup component
import Login from './components/login' // Your Login component
import Home from './components/Home';
import DashBoard from './components/DashBoard.js.js';
import FriendRequest from './components/FriendRequest';
import Forgot from './components/Forgot';
import Authentication from './components/Authentication'
import PasswordReset from './components/PasswordReset'
import Team from './components/Team'
import CreateNewTeam from './components/CreateTeam';
import InviteUsers from './components/InviteUser';
import ModalTesting from './components/ModalTesting';
import SkillComponent from './components/SkillComponent';
import EducationComponent from './components/EducationComponent';
import UserProfile from './components/UserProfile.js';
import About from './components/About.js';
import ActiveCompetitions from './components/Contest.js';
import UserContest from './components/UserContest.js'
import ContestDiscription from './components/ContestDescription.js';
import CreateCompetitionForm from './components/CreateCompetitionForm.js'
import Experience from './components/Experience.js';
import TestCalendar from './components/TestCalendar.js';
import OverviewSection from './components/OverviewSection.js';
import { OverviewProvider } from './components/OverviewContext.js';

const App = () => {
  const [auth, setAuth] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    console.log('hey')
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      console.log('hey3')
      setAuth(token);
    } else {
      navigate("/login");
    }
  },[])

  return (
    <>
    <Routes>
      {/* Define your routes here */}
      {/* {auth && ( */}
        {/* <> */}
          <Route path="/home" element={<Home />} />
          <Route path="/user/:userId" component={UserProfile} />
          <Route path="/friend-requests" element={<FriendRequest />} />
          <Route path="account/password/reset" element={<Forgot />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/account/password/confirm" element={<PasswordReset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<UserProfile/>} />
          <Route path="/friend-requests" element={<FriendRequest/>} />
          <Route path="account/password/reset" element={<Forgot/>} />
          <Route path="/authentication" element={<Authentication/>} />
          <Route path="/account/password/confirm" element={<PasswordReset/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/create-new-team" element={<CreateNewTeam/>} />
          <Route path="/invite-users" element={<InviteUsers />} />
          <Route path="/modaltesting" element={<ModalTesting />} />
          <Route path="/skill" element={<SkillComponent />} />
          <Route path="/education" element={<EducationComponent />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contest" element={<ActiveCompetitions />} />
          <Route path="/competition" element={<UserContest />} />
          {/* <Route path="/create" element={<CreateConcept />} /> */}
          <Route path="/calendar" element={<TestCalendar />} />
          

        {/* </> */}

      {/* )}: */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Add other routes for different pages */}
    </Routes>
    {auth && (
  // <OverviewProvider>
  //   <Routes> 
  //     <Route path="/createcompetition" element={<CreateCompetitionForm />} />
  //     <Route path="/overview/:contestId/:ok" element={<OverviewSection />} />
  //     <Route path="/discription/:contestId/:ok" element={<ContestDiscription />} />
  //   </Routes>

  // </OverviewProvider>
) 
}


    
    </>
  );
  
};

export default App;