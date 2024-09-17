import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link as ChakraLink, useNavigate, useLocation } from "react-router-dom"; // Import the UserContext
import { Box } from "@chakra-ui/react";
import {
  Text,
  Flex,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import SkillComponent from "./SkillComponent";
import EducationComponent from "./EducationComponent";
import UserProfile from "./UserProfile";
import Experience from "./Experience.js";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleTeamTabClick = () => {
    // Redirect to the "/user" route
    //  navigate("</Team>");
    navigate("/team");
  };
  const handleAboutTabClick = () => {
    // Redirect to the "/user" route
    navigate("/about");
  };
  const handleCompetitionTabClick = () => {
    // Redirect to the "/user" route
    //  navigate(Competition(ActiveCompetitions));
    navigate("/competition ");
  };

  useEffect(() => {
    setIsLoading(false);
    console.log("mey");
    const { pathname } = location;
    switch (pathname) {
      case "/about":
        setActiveTab(0);
        break;
      case "/competition":
        setActiveTab(1);
        break;
      case "/team":
        setActiveTab(2);
        break;
      case "/statisctics":
        setActiveTab(3);
        break;
    }
  }, [location]);

  const handleTabChange = (index) => {
    console.log("active Tab.....................", index);
    setActiveTab(index);
  };

  return (
    <Box w="50%" margin="auto" alignItems="center" justifyContent="center">
      {isLoading ? (
        <Flex mt="15px" w="100%">
          <Tabs
            ml={3}
            mt="20px"
            w="100%"
            index={activeTab}
            onChange={handleTabChange}
          >
            <TabList>
              <Tab onClick={handleAboutTabClick}>
                <Text color="custom.white">
                  <Skeleton>About</Skeleton>
                </Text>
              </Tab>
              <Spacer />
              <Tab onClick={handleCompetitionTabClick}>
                <Text color="custom.white">
                  <Skeleton>Competition</Skeleton>
                </Text>
              </Tab>
              <Spacer />
              <Tab onClick={handleTeamTabClick}>
                <Text color="custom.white">
                  <Skeleton>Team</Skeleton>
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <SkeletonText>
                <TabPanel>
                  <SkillComponent />
                  <EducationComponent />
                  <Experience />
                </TabPanel>
              </SkeletonText>
            </TabPanels>
          </Tabs>
        </Flex>
      ) : (
        <Flex mt="15px" w="100%">
          <Tabs
            ml={3}
            mt="20px"
            w="100%"
            index={activeTab}
            onChange={handleTabChange}
          >
            <TabList>
              <Tab onClick={handleAboutTabClick}>
                <Text color="custom.white">About</Text>
              </Tab>
              <Spacer />
              <Tab onClick={handleCompetitionTabClick}>
                <Text color="custom.white">Competition</Text>
              </Tab>
              <Spacer />
              <Tab onClick={handleTeamTabClick}>
                <Text color="custom.white">Team</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SkillComponent />
                <EducationComponent />
                <Experience />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      )}
      {/* Your page content goes here */}
    </Box>
  );
};

const About = ({ children }) => {
  return (
    <UserProfile>
      <Flex direction="column" alignItems="center" justifyContent="center">
        <User />
        {children}
      </Flex>
    </UserProfile>
  );
};

/*

*/

export default About;
