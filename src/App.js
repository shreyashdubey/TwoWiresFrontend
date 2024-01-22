import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Signup from "./components/Signup"; // Your Signup component
import Login from "./components/login"; // Your Login component
import Home from "./components/Home";
import DashBoard from "./components/DashBoard.js";
import FriendRequest from "./components/FriendRequest";
import Forgot from "./components/Forgot";
import Authentication from "./components/Authentication";
import PasswordReset from "./components/PasswordReset";
import Team from "./components/Team";
import CreateNewTeam from "./components/CreateTeam";
import InviteUsers from "./components/InviteUser";
import SkillComponent from "./components/SkillComponent";
import EducationComponent from "./components/EducationComponent";
import UserProfile from "./components/UserProfile.js";
import About from "./components/About.js";
import ActiveCompetitions from "./components/Contest.js";
import UserContest from "./components/UserContest.js";
import ContestDiscription from "./components/ContestDescription.js";
import CreateCompetitionForm from "./components/CreateCompetitionForm.js";
import Experience from "./components/Experience.js";
import TestCalendar from "./components/TestCalendar.js";
import OverviewSection from "./components/OverviewSection.js";
import { OverviewProvider } from "./components/OverviewContext.js";
import PublishContest from "./components/PublishContest.js";
import ReviewDiscription from "./components/ReviewDiscription.js";
import AboutStartup from "./components/AboutStartup.js";
import MyUploader from "./components/MyUploader.js";
import Starfeild from "./components/StartFeild.js";
import ActiveContestDiscription from "./components/ActiveContestDiscription.js";
import Search from "./components/Search.js";
import Main from "./components/Animation/Main.js";
import Tre from "./components/Animation/Tree.js";
import Cross from "./components/Animation/Cross.js";
import OneSignal from "react-onesignal";
import { Button } from "@chakra-ui/react";
import Key from "./components/KeyBoard.js";
import Problem from "./components/Problem.js";
import EmailVerification from "./components/EmailVerification.js";
import Notification from "./components/Notification.js";
import Discuss from "./components/Discuss.js";
import ExcecutingStep from "./components/ExecutingStep.js";
import Tutorial from "./components/Tutorial.js";
import Stuck from "./components/Stuck.js";
import { ACCESS_TOKEN } from "./utils/siteConstants.js";

const App = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  useEffect(() => {
    if (
      !accessToken &&
      pathname != "/contest" &&
      pathname != "/aboutstartup" &&
      pathname != "/"
    ) {
      // Redirect to login if accessToken is null
      console.log("come");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken && pathname === "/") {
      navigate("/contest");
    }
  }, [accessToken, pathname, navigate]);

  useEffect(() => {
    // runOneSignal();
    OneSignal.push(() => {
      OneSignal.init(
        {
          appId: "12fedbe1-46f0-44fb-893a-b765cbabf575", // STEP 9
          promptOptions: {
            slidedown: {
              enabled: true,
              actionMessage:
                "We'd like to show you notifications for the latest news and updates about the following categories.",
              acceptButtonText: "OMG YEEEEESS!",
              cancelButtonText: "NAHHH",
              categories: {
                tags: [
                  {
                    tag: "react",
                    label: "ReactJS",
                  },
                  {
                    tag: "angular",
                    label: "Angular",
                  },
                  {
                    tag: "vue",
                    label: "VueJS",
                  },
                  {
                    tag: "js",
                    label: "JavaScript",
                  },
                ],
              },
            },
          },
          welcomeNotification: {
            title: "One Signal",
            message: "Thanks for subscribing!",
          },
        },
        // Automatically subscribe to the new_app_version tag
        OneSignal.sendTag("new_app_version", "new_app_version", (tagsSent) => {
          // Callback called when tag has finished sending
          console.log("new_app_version TAG SENT", tagsSent);
        }),
      );
    });
  }, []);

  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;

  return (
    <>
      <OverviewProvider>
        <Routes>
          {/* Define your routes here */}
          {accessToken && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/user/:userId" component={UserProfile} />
              <Route path="/friend-requests" element={<FriendRequest />} />
              <Route path="account/password/reset" element={<Forgot />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route
                path="/account/password/confirm"
                element={<PasswordReset />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/friend-requests" element={<FriendRequest />} />
              <Route path="account/password/reset" element={<Forgot />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route
                path="/account/password/confirm"
                element={<PasswordReset />}
              />
              <Route path="/team" element={<Team />} />
              <Route path="/create-new-team" element={<CreateNewTeam />} />
              <Route path="/invite-users" element={<InviteUsers />} />
              <Route path="/skill" element={<SkillComponent />} />
              <Route path="/education" element={<EducationComponent />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/about" element={<About />} />
              <Route path="/competition" element={<UserContest />} />
              {/* <Route path="/create" element={<CreateConcept />} /> */}
              <Route path="/calendar" element={<TestCalendar />} />
              <Route path="/search" element={<Search />} />
              <Route path="/main" element={<Main />} />
              <Route path="/tree" element={<Tre />} />
              <Route path="/cross" element={<Cross />} />
              <Route path="/key" element={<Key />} />
              <Route path="/problem" element={<Problem />} />
              <Route path="/verification" element={<EmailVerification />} />
              <Route path="/notification" element={<Notification />} />
              <Route
                path="/createcompetition"
                element={<CreateCompetitionForm />}
              />
              <Route
                path="/overview/:contestId/:ok"
                element={<OverviewSection />}
              />
              <Route path="/review" element={<PublishContest />} />
              <Route
                path="/reviewdiscription/:contestId/:ok"
                element={<ReviewDiscription />}
              />
              <Route path="/myuploader" element={<MyUploader />} />
              <Route path="/startfeild" element={<Starfeild />} />
              <Route
                path="/activediscription/:contestId"
                element={<ActiveContestDiscription />}
              />
              <Route path="/discuss" element={<Discuss />} />
              <Route path="/execution" element={<ExcecutingStep />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/stuck" element={<Stuck />} />
            </>
          )}
          :
          <Route path="/" element={<Signup />} />
          <Route path="/aboutstartup" element={<AboutStartup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contest" element={<ActiveCompetitions />} />
          <Route
            path="/discription/:contestId/:ok"
            element={<ContestDiscription />}
          />
          {/* Add other routes for different pages */}
        </Routes>
        {/* {auth && ( */}
      </OverviewProvider>
      {/* )  */}
      {/* } */}
    </>
  );
};

export default App;
