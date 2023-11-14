import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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


const UserProfile = () => {
  

  return (
    <Layout>
    <Flex   ml = {300} mt={10} >
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
                        <Text fontSize='20'> Mrs. chamnd0</Text>
                        <Text fontSize='15'> Joined this platform 3years+ ago.</Text>
                        <Text fontSize='12'> New Delhi , Delhi , INDIA</Text>
                        <Text fontSize='10'> MASCOT’S team member</Text>
                    </Stack>
                    </Box>  
            </Stack>
            </Flex>
            <Flex mt='15px' w='100%'>
                <Tabs ml={3} mt="20px" w ='100%'>
                    <TabList>
                        <Tab>
                        About     
                        </Tab>
                        <Spacer/>
                        <Tab>
                        Competition   
                        </Tab>
                        <Spacer/>
                        <Tab>
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
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
            </Flex>
         </Stack>    

    </Flex>
    </Layout>
  );
};

export default UserProfile;