import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import { Box, Center } from '@chakra-ui/react'
import { Image, Stack, Text, Avatar, Flex, Spacer, Heading, ChakraProvider, Input, InputGroup, InputLeftElement, Icon, Button, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel, VStack,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure ,
} from '@chakra-ui/react'
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
import edit from './images/edit.png'

const User = () => {
  const [userData, setUserData] = useState({
    data: null,
    isFetching: false
  });
  const [errorMessageFirstName, setErrorMessageFirstName] = useState('');
  const [errorMessageLastName, setErrorMessageLastName] = useState('');
  const [errorMessageCountry, setErrorMessageCoutry] = useState('');
  const [errorMessageCity, setErrorMessageCity] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [update , setUpdate] = useState(false)
  const [userDetail , setUserDetail] = useState({
    firstName  :  "" , 
    lastName : "" , 
    about : "" , 
    country : '' , 
    city : "" ,
  })

  const navigate = useNavigate();

  const handleTeamTabClick = () => {
    // Redirect to the "/user" route
    navigate('/team');
  };

  const handleInputChange = (field, value) => {
    setUserDetail((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };
  const user = getDecodedUserData();

  const fetchUserData = async () => {
    try {
      
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
  }, [update]);

  const handleUpdateEducation = async () => {

    if (!userDetail.firstName) {
      setErrorMessageFirstName('first name is required');
      return; // Prevent form submission
    }
    if (!userDetail.lastName) {
      setErrorMessageLastName('last name is required');
      return; // Prevent form submission
    }
    if (!userDetail.country) {
      setErrorMessageCoutry('country name is required');
      return; // Prevent form submission
    }
    if (!userDetail.city) {
      setErrorMessageCity('city name is required');
      return; // Prevent form submission
    }

    try {
      // Replace this with the actual user ID and details you want to update
      
   
      const firstName = userDetail.firstName
      const lastName = userDetail.lastName
      const currentLocation = `${userDetail.city}.${userDetail.country}`
      const about = userDetail.about
      const userId = user._id
      // Make the PUT request to update user details
      const response = await axios.put('/api/users/update-user-details', {
         userId ,firstName , lastName , currentLocation , about ,
      });
      if(response){
        onClose()
        setUpdate(true)

      }
      setUserDetail({
        firstName  :  "" , 
        lastName : "" , 
        about : "" , 
        country : '' , 
        city : "" ,
      })
      // Update the state with the response data
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error('Error updating user details:', error.message);
    }
  };

  return (  
    <Flex ml={['400px', '10px', '30px', '210px', '300px', '400px']} mt='100px'   w='50%' >
      {/* <Box ml={200} bgColor={'red.100'}></Box> */}
      <Stack direction='colummn' w={800}>
        <Flex  >
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
        <Spacer/>
        <Button onClick={onOpen} bgColor='custom.button' variant='solid'  mt = '30px'>
            <Image
            boxSize='25px'
            objectFit='cover'
            src={edit}
            alt='plus'
            />
         </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  w = {['300px' , '300px' , '380px' , '600px', '700px']}>
          <ModalHeader>Edit intro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stack  spacing={6} direction='column' >
           
            <Input
                placeholder="first name"
                color='custom.white'
                value={userDetail.firstName}
                isRequired={true}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
               {!userDetail.firstName && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessageFirstName}
                </Text>
              )}
              <Input
                placeholder="last name"
                color='custom.white'
                value={userDetail.lastName}
                isRequired={true}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
               {!userDetail.lastName && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessageLastName}
                </Text>
              )}
              <Input
                placeholder="Country"
                color='custom.white'
                value={userDetail.country}
                isRequired={true}
                onChange={(e) => handleInputChange('country', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
               {!userDetail.country && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessageCountry}
                </Text>
              )}
              <Input
                placeholder="City"
                color='custom.white'
                value={userDetail.city}
                isRequired={true}
                onChange={(e) => handleInputChange('city', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
               {!userDetail.city && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessageCity}
                </Text>
              )}
              <Input
                placeholder="about"
                color='custom.white'
                value={userDetail.about}
                isRequired={true}
                onChange={(e) => handleInputChange('about', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
        <Button bgColor='custom.charcoal' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          bgColor='custom.charcoal'
          onClick={() => {
            handleUpdateEducation();
           // onClose();
          }}
          right='10px'
        >
          <Text color='custom.white'>
            Update
          </Text>
        </Button>
      </ModalFooter>

        </ModalContent>
      </Modal> 
        
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