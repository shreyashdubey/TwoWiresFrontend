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
import Layout from './DashBoard.js';
import Experience from './Experience.js';
import Team from "./Team.js";
import Competition from "./Contest.js";

const User = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    const handleTeamTabClick = () => {
        // Redirect to the "/user" route
        //  navigate("</Team>");
         navigate('/team');
      };
      const handleAboutTabClick = () => {
        // Redirect to the "/user" route
         navigate('/about');
      };
      const handleCompetitionTabClick = () => {
        // Redirect to the "/user" route
        //  navigate(Competition(ActiveCompetitions));
         navigate('/competition ');

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
        console.log("active Tab.....................", index)
        setActiveTab(index);
      };

    return(
        <Box w='50%' margin="auto" alignItems="center" justifyContent="center" > 
            <Flex mt='15px' w='100%'> 
                    <Tabs ml={3} mt="20px" w ='100%' index={activeTab}
                            onChange={handleTabChange} >
                        <TabList>
                            <Tab onClick={handleAboutTabClick}><Text color='custom.white'>About</Text></Tab>
                            <Spacer/>
                            <Tab  onClick={handleCompetitionTabClick}
                            > 
                            <Text color='custom.white'>Competition</Text>
                            </Tab>
                            <Spacer/>
                            <Tab 
                            onClick={handleTeamTabClick}
                            >
                              <Text color='custom.white'>Team</Text>
                            </Tab>

                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SkillComponent/>
                                <EducationComponent/>
                                <Experience/>
                            </TabPanel>
                        </TabPanels>
                        </Tabs>
                </Flex>
        {/* Your page content goes here */}
        </Box>
        
    )

}

const About = ({ children }) => {
  return (
    <UserProfile>
    <Flex direction="column" alignItems="center" justifyContent="center"  >
      <User />
      {children}
    </Flex>
    </UserProfile>
  );
};

export default About;