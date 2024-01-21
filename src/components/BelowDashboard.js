import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Link as ChakraLink,
  Spacer,
  Hide,
  Text,
  Center,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaHome, FaEnvelope, FaBell, FaUser } from "react-icons/fa";
import trophy from "./images/trophy.png";
import theme from "../utils/color";
import user from "./images/home.png";
import logout from "./images/logout.png";
import team from "./images/team.png";

import trophydark from "./images/trophydark.png";
import userdark from "./images/homedark.png";
import logoutdark from "./images/logoutdark.png";
import teamdark from "./images/teamdark.png";
import Search from "./Search";
import { ACCESS_TOKEN } from "../utils/siteConstants";

const BelowDashBoard = ({ isSearchSelected, setIsSearchSelected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let activeTab = 0;
  const [contestImage, setContestImage] = useState(false);
  const [homeImage, sethomeImage] = useState(false);
  const [teamImage, setTeamImage] = useState(false);
  const [logoutImage, setLogoutImage] = useState(false);
  const [isBelow720px] = useMediaQuery("(max-width: 720px)");

  const handleUserTabClick = () => {
    navigate("/about");
  };

  const handleContestTabClick = () => {
    navigate("/contest");
  };

  const handleUserContestTabClick = () => {
    navigate("/createcompetition");
  };

  const handleUserLogoutTabClick = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    // Redirect to the login page or any other desired page
    navigate("/login");
  };

  const handleSearchSelect = () => {
    setIsSearchSelected(true);
  };
  const [isVisible, setIsVisible] = useState(true);
  let prevScrollY = 0;

  const handleScroll = () => {
    const scrolledY = window.scrollY;
    const isScrollingUp = scrolledY < prevScrollY;
    console.log(scrolledY, isScrollingUp);

    // You can adjust the threshold value based on your requirements
    setIsVisible(isScrollingUp);
    prevScrollY = scrolledY;
  };

  useEffect(() => {
    const { pathname, params } = location;

    // Check if the pathname matches the expected pattern
    const match = pathname.match(/^\/discription\/(.+)\/(\d+)$/);

    if (match) {
      // Extract the contestId and tabIndex from the matched groups
      const contestId = match[1];
      const tabIndex = match[2];

      // Set activeTab to 2 if the route matches
      if (contestId && tabIndex) {
        activeTab = 2;
      }
    } else {
      // Handle other routes if needed
      switch (pathname) {
        case "/about":
          console.log("yolokaminaki daki");
          activeTab = 1;
          break;
        case "/team":
          activeTab = 3;
          break;
        case "/contest":
          activeTab = 0;
          break;
        case "/createcompetition":
          activeTab = 2;
          break;
        default:
          // Set a default value if no match is found
          activeTab = 0;
          break;
      }
    }
    if (activeTab === 0) {
      setContestImage(true);
      sethomeImage(false);
      setTeamImage(false);
      setLogoutImage(false);
      console.log("contest", contestImage, "active", activeTab);
    } else if (activeTab === 1) {
      sethomeImage(true);
      setContestImage(false);
      setTeamImage(false);
      setLogoutImage(false);
      console.log("home", homeImage, "active", activeTab);
    } else if (activeTab === 2) {
      setTeamImage(true);
      setContestImage(false);
      sethomeImage(false);
      setLogoutImage(false);
      console.log("team", teamImage, "active", activeTab);
    } else if (activeTab === 3) {
      setContestImage(false);
      sethomeImage(false);
      setTeamImage(false);
      setLogoutImage(true);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const handleTabChange = (index) => {
    activeTab = index;
    console.log("index", index);
  };

  return (
    <Flex
      bgColor="custom.charcoal"
      h="55px"
      align="center"
      style={{ position: "sticky", bottom: "0", zIndex: 1000 }}
      as="header"
      width="100%"
      backdropFilter="saturate(180%) blur(5px)"
      justifyContent="center"
      visibility={isVisible && isBelow720px ? "visible" : "hidden"}
    >
      <Tabs
        variant="unstyled"
        mt="40px"
        index={activeTab}
        onChange={handleTabChange}
        Color="custom.darkStateBlue"
      >
        <TabList
          style={{
            display: "flex",
            gap: "10px", // Adjust the value to set the desired spacing
          }}
        >
          <Tab onClick={handleContestTabClick} Color="custom.darkStateBlue">
            {contestImage ? (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={trophy}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            ) : (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={trophydark}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            )}
          </Tab>
          <Tab onClick={handleUserTabClick}>
            {homeImage ? (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={user}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            ) : (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={userdark}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            )}
          </Tab>
          <Tab onClick={handleUserContestTabClick}>
            {teamImage ? (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={team}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            ) : (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={teamdark}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            )}
          </Tab>
          <Tab onClick={handleUserLogoutTabClick}>
            {logoutImage ? (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={logout}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            ) : (
              <Image
                boxSize="25px"
                objectFit="cover"
                src={logoutdark}
                alt="Dan Abramov"
                border="5px" // Adjust the border width as needed
                borderColor="custom.white"
              />
            )}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default BelowDashBoard;
