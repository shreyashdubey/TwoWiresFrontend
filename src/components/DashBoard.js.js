import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams , Link as ChakraLink  , Link , useNavigate}  from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box } from '@chakra-ui/react'
import {Image , Stack, Text,Avatar , Flex,useColorMode, Spacer , Heading , ChakraProvider, Input, InputGroup, InputLeftElement, Icon ,Button , IconButton , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import TeamTab from './Team';
import pixels from './images/pixels.jpg'
import SkillComponent from './SkillComponent';
import EducationComponent from './EducationComponent';
import UserProfile from './UserProfile';
import { useLocation } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const location = useLocation();
  const handleUserTabClick = () => {
    // Redirect to the "/user" route
     navigate('/user');
  };
  useEffect(() => {
    // Get the pathname from the current location
    const { pathname } = location;

    // Use the pathname to set the active tab based on the route
    if (pathname === '/') {
      // set active tab for home route
      // you can add more conditions for other routes
    } else if (pathname === '/inbox') {
      // set active tab for inbox route
    } else if (pathname === '/notifications') {
      // set active tab for notifications route
    } else if (pathname === '/user') {
      // set active tab for user route
    }
  }, [location]);

  return (
    <Flex direction="column" h="100vh" > {/* Parent Flex for the whole screen */}
    {/* Dashboard Flex */}
    <Flex bg="green.100" h={16} align="center">
      <Heading ml={4} fontSize={30} fontWeight={10}>
        Sparrow
      </Heading>
      <InputGroup w="250px" ml="20px" borderColor="blackAlpha.400" left="720">
        <InputLeftElement pointerEvents="none" children={<Icon as={SearchIcon} color="black.300" />} />
        <Input type="text" placeholder="Search..." color="blackAlpha.300" />
      </InputGroup>
      <Tabs ml={5} mt="20px" left="750px">
        <TabList>
          <Tab>
            <FaHome size={20} />
          </Tab>
          <Tab>
            <FaEnvelope size={20} />
          </Tab>
          <Tab>
            <FaBell size={20} />
          </Tab>
          <Tab>
            <Tab onClick={handleUserTabClick}><FaUser size={20} /></Tab>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
   
  </Flex>
    
  );
};

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="50vh">
      <DashBoard />
      {children}
    </Flex>
  );
};

export default Layout;
