import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box } from '@chakra-ui/react'
import { Flex, Spacer , Heading , ChakraProvider, Input, InputGroup, InputLeftElement, Icon ,Button , IconButton , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { AiOutlineHome } from 'react-icons/ai';
import TeamTab from './Team';

const UserProfile = () => {
  

  return (
    <Flex bg={'green.100'} h={16}>
       <Heading mt={2.5} ml='150px' fontSize={30} fontWeight={10}>
         Sparrow
       </Heading>
      <InputGroup w='250px' ml='20px' mt={2.5} borderColor={'blackAlpha.400'}>
        <InputLeftElement pointerEvents="none" children={<Icon as={SearchIcon} color="black.300" />} />
        <Input type="text" placeholder="Search..."  color={'blackAlpha.300'}/>
      </InputGroup>
      <IconButton
        ml={5}
        mb={1.5}
        aria-label="Home"
        icon={<Icon as={AiOutlineHome} boxSize={10} />}
        size={4.5}
        variant="link"
      />
      <Tabs ml={5} mt={2.5}> 
      <TabList>
        <Tab>Team</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
           <TeamTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Flex>
  );
};

export default UserProfile;