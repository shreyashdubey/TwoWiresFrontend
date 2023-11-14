import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box, Center } from '@chakra-ui/react'
import {Image , Stack, Text,Avatar , Flex, Spacer , Heading , ChakraProvider, Input, InputGroup, InputLeftElement, Icon ,Button , IconButton , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import TeamTab from './Team';
import pixels from './images/pixels.jpg'
import SkillComponent from './SkillComponent';
import EducationComponent from './EducationComponent';

const UserProfile = () => {
  

  return (
    <Flex  mt = '150px' bgColor={'blackAlpha.400'} >
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
            <Flex>
                <Tabs ml={5} mt="20px" w ='35%'>
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
    </Flex>
  );
};

export default UserProfile;