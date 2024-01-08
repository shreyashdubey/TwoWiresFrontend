import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box, Center } from '@chakra-ui/react'
import { Image, Stack, Text, Avatar, Flex, Spacer, Heading, ChakraProvider, Input, InputGroup, InputLeftElement, Icon, Button, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import TeamTab from './Team';
import pixels from './images/pixels.jpg'
import SkillComponent from './SkillComponent';
import EducationComponent from './EducationComponent';
import DashBoard from './DashBoard.js';
import Layout from './DashBoard.js';
import theme from '../utils/color';
import axios from '../utils/api';
import { GET_USER_INFO } from '../utils/endpoints';
import { getDecodedUserData } from '../utils/helper';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { MdLocationOn } from "react-icons/md";

const User = () => {
  const [userData, setUserData] = useState({
    data: null,
    isFetching: false
  });
  const navigate = useNavigate();

  const handleTeamTabClick = () => {
    // Redirect to the "/user" route
    navigate('/team');
  };

  const fetchUserData = async () => {
    try {
      const user = getDecodedUserData();
      if (!user) {
        throw new Error("User not found in JWT token");
      }
      setUserData({
        data: null,
        isFetching: true
      });
      const userName = user.username;
      const response = await axios.get(`${GET_USER_INFO}/${userName}`);
      setUserData({
        data: response.data,
        isFetching: false
      });
    } catch (e) {
      console.log(e);
    }finally{
      setUserData((prevState) => ({
        ...prevState,
        isFetching: false
      }));
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Flex ml={['400px', '10px', '30px', '210px', '300px', '400px']} mt='100px'  >
      {/* <Box ml={200} bgColor={'red.100'}></Box> */}
      <Stack direction='column' w={800}>
        <Flex >
          <Stack direction='row'>
            {
              !userData.data && userData.isFetching ?
              <SkeletonCircle size='180' />
              :
              <Image
                src={pixels}
                alt="Mrs. chamnd0"
                boxSize="180px"
                borderRadius="full"
                objectFit="cover"
              />
            }
            <Box ml={2} mt={7}>
              {
               !userData.data && userData.isFetching ?
                <Stack width="350px">
                  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Stack>
                :
                <Stack spacing={3} direction={'column'}>
                  <Text fontSize='20' color='custom.white'>
                    {userData?.data?.firstName}&nbsp;{userData?.data?.middleName}&nbsp;{userData?.data?.lastName}
                  </Text>
                  {
                    userData?.data?.tagLine ?
                    <Text fontSize='15' color='custom.white'>{userData.data.tagLine}</Text>  
                    : null
                  }
                  {
                    userData?.data?.about ?
                    <Text fontSize='12' color='custom.white'>{userData.data.about}</Text>  
                    : null
                  }
                  {
                    userData?.data?.currentLocation ?
                    <Text fontSize='12' color='custom.white' display="flex" flexDirection="row" alignItems="center">
                      <Icon as={MdLocationOn} />&nbsp;{userData.data.currentLocation}
                    </Text>  
                    : null
                  }
                </Stack>
              }
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
        <User />
        {children}
      </Flex>
    </Layout>
  );
};

export default UserProfile;