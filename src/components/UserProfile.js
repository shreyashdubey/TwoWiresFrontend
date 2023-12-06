import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box, Center } from '@chakra-ui/react'
import {Image , Stack, Text,Avatar , Flex, Spacer , Heading , ChakraProvider, Input, InputGroup, InputLeftElement, Icon ,Button , IconButton , Tabs, TabList, TabPanels, Tab, TabPanel , VStack ,  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import TeamTab from './Team';
import pixels from './images/pixels.jpg'
import SkillComponent from './SkillComponent';
import EducationComponent from './EducationComponent';
import DashBoard from './DashBoard.js.js';
import Layout from './DashBoard.js.js';
import theme from '../utils/color';

const User = () => {

    const navigate = useNavigate();
    
    const handleTeamTabClick = () => {
        // Redirect to the "/user" route
         navigate('/team');
      };
   
  return (
    <Flex   ml = '400px' mt='100px'  >
        {/* <Box ml={200} bgColor={'red.100'}></Box> */}
       <Stack direction = 'column' w = {800}>
           <Flex > 
            <Stack direction='row'>
                <Image
                    src={pixels}
                    alt="Mrs. chamnd0"
                    boxSize="180px"
                    borderRadius="full"
                    objectFit="cover"
                />
                    <Box ml={2}  mt={7}>
                    <Stack spacing={3} direction={'column'}>
                        <Text fontSize='20' color='custom.white'> Mrs. chamnd0</Text>
                        <Text fontSize='15' color='custom.white'> Joined this platform 3years+ ago.</Text>
                        <Text fontSize='12' color='custom.white'> New Delhi , Delhi , INDIA</Text>
                        <Text fontSize='10' color='custom.white'> MASCOT’S team member</Text>
                    </Stack>
                    </Box>  
            </Stack>
            </Flex>
            
         </Stack>    

    </Flex>
  );
};
const UserProfile = ({ children }) => {
    return (
      <Layout>
        <Flex direction="column" >
          <User/>
          {children}
        </Flex>
      </Layout>  
    );
  };

export default UserProfile;