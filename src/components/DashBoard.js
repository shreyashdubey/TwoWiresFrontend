import React, { useEffect, useRef, useState } from "react";
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
  Tooltip,
  Wrap,
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
import BelowDashBoard from "./BelowDashboard";
import Notifications from "./images/notification.png";
import { useOverview } from "./OverviewContext";
import instance from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { GET_ALL_NOTIFICATION } from "../utils/endpoints";
import { ACCESS_TOKEN } from "../utils/siteConstants";
import FilterBar from "./FilterBar";
import useOutsideClick from "../Hooks/UseOutsideClick";


const DashBoard = ({ isSearchSelected, setIsSearchSelected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let activeTab = 0;
  const [contestImage, setContestImage] = useState(false);
  const [homeImage, sethomeImage] = useState(false);
  const [teamImage, setTeamImage] = useState(false);
  const [logoutImage, setLogoutImage] = useState(false);
  const { setNotify } = useOverview();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [notification, setNotification] = useState([]);
  const [notificationClicked, setNotificationClicked] = useState(true);
  const [isFocused, setIsfocused] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const handleUserTabClick = () => {
    navigate("/about");
  };

  const handleContestTabClick = () => {
    navigate("/contest");
  };

  const handleUserContestTabClick = () => {
    navigate("/createcompetition");
  };

  const handleUserNotificationClick = () => {
    setNotificationClicked(false);
    navigate("/notification");
  };

  const handleUserLogoutTabClick = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    // Redirect to the login page or any other desired page
    navigate("/login");
  };

  const handleSearchSelect = () => {
    // isSearchSelected ? setIsSearchSelected(false) : setIsSearchSelected(true)
    setIsSearchSelected(true);
    setIsfocused(true);
    console.log(isSearchSelected, "i am here ........");
  };

  const handleFocused = () => {
    setIsfocused(true);
    setIsSearchSelected(true);
    console.log(isSearchSelected, "i am here Focus........");
  };

  const handleBlur = () => {
    setIsfocused(false);
    setIsSearchSelected(false);
    console.log(isSearchSelected, "i am here Blur........");
  };
  const headerRef = useRef();
  useOutsideClick(headerRef, handleBlur);

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

    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        console.log("decode", decodedToken);
        const userId = decodedToken.user._id;
        const response = await instance.get(
          `${GET_ALL_NOTIFICATION}?userId=${userId}&page=1&pageSize=100`
        );

        const notifications = response.notifications;

        setNotify(notifications);
        setNotification(notifications);
        // You can also set other state variables like page, pageSize, etc. based on the response.
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location, page, pageSize]);
  const notificationsSize = notification.length;
  console.log("1234", notificationsSize);

  const handleTabChange = (index) => {
    activeTab = index;
    console.log("index", index);
  };

  return (
    <Box ref={headerRef}>
      <Flex
        bgColor="custom.charcoal"
        h="55px"
        align="center"
        style={{ position: "sticky", top: "0", zIndex: 1000 }}
        as="header"
        width="100%"
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Hide below="720px">
          <Heading ml={8} fontSize={30} fontWeight={10} color="custom.white">
            <ChakraLink href="/contest" _hover={{ textDecoration: "none" }}>
              SourcedStartup
            </ChakraLink>
          </Heading>
        </Hide>
        <Spacer />
        <Center>
          <Wrap onFocus={handleFocused}>
            <Spacer />
            <InputGroup w="250px" ml="20px" bgColor="custom.darkStateBlue">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Icon as={SearchIcon} bgcolor="#custom.darkStateBlue" />
                }
              />
              <Input
                type="text"
                placeholder="Search..."
                color="custom.white"
                onClick={handleSearchSelect}
              />
            </InputGroup>
          </Wrap>
        </Center>
        <Spacer />
        <Hide below="720px">
          <Tabs
            variant="unstyled"
            mt="40px"
            mr="100px"
            index={activeTab}
            onChange={handleTabChange}
            Color="custom.darkStateBlue"
          >
            <TabList
              style={{
                display: "flex",
                gap: "16px", // Adjust the value to set the desired spacing
              }}
            >
              <Tooltip label="Contest">
                <Tab
                  onClick={handleContestTabClick}
                  Color="custom.darkStateBlue"
                >
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
              </Tooltip>
              <Tooltip label="User">
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
              </Tooltip>
              <Tooltip label="user can list problem as contest which they have experienced in life so enterprenueurs can solve ">
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
              </Tooltip>
              <Tooltip label="notification">
                <Tab onClick={handleUserNotificationClick}>
                  <Box position="relative">
                    <Image
                      boxSize="25px"
                      objectFit="cover"
                      src={Notifications}
                      alt="Dan Abramov"
                      border="5px" // Adjust the border width as needed
                      borderColor="custom.white"
                    />
                    {notificationClicked && (
                      <Box
                        position="absolute"
                        top="-1"
                        right="-1.5"
                        backgroundColor="red"
                        height="16px"
                        width="16px"
                        borderRadius="50%"
                      >
                        <Text fontSize="x-small" height="1px" color="black">
                          {notificationsSize}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Tab>
              </Tooltip>
              <Tooltip label="Logout">
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
              </Tooltip>
            </TabList>
            <TabPanels>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </Hide>
      </Flex>
      {isSearchSelected ? <FilterBar /> : null}
    </Box>
  );
};

const Layout = ({ children, notificationsSize }) => {
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  return (
    <Flex direction="column" minHeight="100vh" bgcolor="custom. midnightBlue">
      <DashBoard
        isSearchSelected={isSearchSelected}
        setIsSearchSelected={setIsSearchSelected}
      />

      {children}
      <BelowDashBoard />
    </Flex>
  );
};

export default Layout;
