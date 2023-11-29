import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams , Link as ChakraLink  , Link , useNavigate , useLocation}  from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box } from '@chakra-ui/react'
import {Image , Stack, Text,Avatar , Flex, Spacer , Heading , ChakraProvider, Input, InputGroup, InputLeftElement, Icon ,Button , IconButton , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import TeamTab from './Team';
import pixels from './images/pixels.jpg'
import SkillComponent from './SkillComponent';
import EducationComponent from './EducationComponent';
import UserProfile from './UserProfile';
import UserContest from './UserContest.js';
import Layout from './DashBoard.js.js';
import Experience from './Experience.js';

const About = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    const handleTeamTabClick = () => {
        // Redirect to the "/user" route
         navigate('/team');
      };
      const handleAboutTabClick = () => {
        // Redirect to the "/user" route
         navigate('/about');
      };
      const handleCompetitionTabClick = () => {
        // Redirect to the "/user" route
         navigate('/competition');
      };


      useEffect(() => {
        console.log('mey')
        const { pathname } = location;
        switch (pathname) {
          case '/about':
            setActiveTab(0);
            break;
          case '/competition':
            setActiveTab(1);
            break;
          case '/team':
            setActiveTab(2);
            break;
          case '/statisctics':
            setActiveTab(3);
            break;
        }
      }, [location]);
    
      const handleTabChange = (index) => {
        console.log(index)
        setActiveTab(index);
      };

    return(
    
    <UserProfile>
        <Box>
            <Flex mt='15px' w='100%'> 
                    <Tabs ml={3} mt="20px" w ='100%' index={activeTab}
                            onChange={handleTabChange} >
                        <TabList>
                            <Tab onClick={handleAboutTabClick}>About</Tab>
                            <Spacer/>
                            <Tab  onClick={handleCompetitionTabClick}
                            > 
                            Competition   
                            </Tab>
                            <Spacer/>
                            <Tab 
                            onClick={handleTeamTabClick}
                            >
                                Team
                            </Tab>
                            <Spacer/>
                            <Tab>
                            Statistics
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SkillComponent/>
                                <EducationComponent/>
                                <Experience/>
                            </TabPanel>
                            <TabPanel>
                                
                            </TabPanel>
                            <TabPanel>
                            </TabPanel>
                        </TabPanels>
                        </Tabs>
                </Flex>
        {/* Your page content goes here */}
        </Box>
    </UserProfile>
        
    )

}

export default About;