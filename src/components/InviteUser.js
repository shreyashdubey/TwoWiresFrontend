// InviteUsers.js
import React, { useState, useEffect ,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center ,
  Text
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import instance from '../utils/api';
import {GET_USERID} from '../utils/endpoints';
import {INVITE_USER} from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import { GET_TEAM_MEMBER } from '../utils/endpoints';
import Layout from './DashBoard.js';
import { TeamContext } from './CreateTeam.js';
import { ACCESS_TOKEN } from '../utils/siteConstants.js';

const InviteUsers = () => {
  const [username, setUsername] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const team = searchParams.get('t'); // Get the team paramete
  const teamName=searchParams.get('v')
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simulate updating the status when the component mounts or when invitedUsers changes
   // updateStatusForAcceptedUsers();
    console.log(team)
     fetchTeamMember();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handleInviteUser = async (e) =>{
    e.preventDefault();
    if (!username.trim()) {
      setErrorMessage('Username is required');
      return;
    }

    // Add your user invitation logic here
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const sender = decodedToken.user._id;
      const response_username = await instance.get(`${GET_USERID}${username}`);
      console.log('kaka' , response_username)
      const reciever = response_username.data._id
      const response_team = await instance.post(INVITE_USER ,{reciever,sender ,team}, {'Content-Type': 'application/json'})
      if (response_team) {
        const status = response_team.inviteStatus; 
        const User = {
          username: username,
          inviteStatus: status,
          action: '', // You can modify this based on your requirements
        };
        setInvitedUsers((prevUsers) => [...prevUsers,User]);
        setUsername('');
        setErrorMessage('');
      } else {
        alert('Some error');
      }
  } catch (error) {
    console.log(error)
    alert('An error occurred during inviting user. Please try again later.');
  }

    // Update the invitedUsers state with the new user
   // setInvitedUsers((prevUsers) => [...prevUsers, { user: username, status: 'Invited' }]);
    
    // Clear the input field after inviting the user
    // Update the invitedUsers state with the new user
    
    // You can add additional logic or API calls here based on your needs
  };

  const handleRemoveUser = (index) => {
    // Remove the user at the specified index from the invitedUsers state
    setInvitedUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(index, 1);
      return updatedUsers;
    });
  };

  const updateStatusForAcceptedUsers = () => {
    // Simulate updating the status to 'Accepted' for users who have accepted the invitation
    setInvitedUsers((prevUsers) => {
      return prevUsers.map((user) => {
        // Simulate accepting the invitation for a user whose name contains 'accept'
        if (user.user.toLowerCase().includes('accept')) {
          return { ...user, status: 'Accepted' };
        }
        return user;
      });
    });
  };

const fetchTeamMember = async () => {
  try {
   // Replace the URL with your actual API endpoint
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const decodedToken = jwtDecode(accessToken);
    const owner = decodedToken.user._id
   // const response = await instance.get(GET_TEAM_MEMBER/`${team}` ,{team ,owner}, {'Content-Type': 'application/json'})
    const response = await instance.get(`${GET_TEAM_MEMBER}${team}`);
    if(response){
      const teammember = response.members;
      setInvitedUsers(teammember)
    }
  } catch (error) {
    console.error('Error fetching team data:', error);
  }
};

  return (
    <Layout > 
    <Center>
        <Box p={4} mt="150px" w="50%" borderColor="red.900">
          <Heading as="h3" size="lg" mb={4} color='custom.white' borderColor='custom.darkSlateBlue'>
            Invite Users to Team {teamName}
          </Heading>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              color='custom.white'
            />
             {!username && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errorMessage}
              </Text>
            )}
          </FormControl>
          <Button bgColor='custom.button' onClick={handleInviteUser}>
             <Text color='custom.white'>Invite User</Text>
          </Button>

          {/* Display the invited users in a table */}
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th><Text color='custom.white'>User</Text></Th>
                <Th><Text color='custom.white'>Status</Text></Th>
                <Th><Text color='custom.white' >Action</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {invitedUsers.map((user, index) => (
                <Tr key={index}>
                  <Td><Text color='custom.white'>{user.username}</Text></Td>
                  <Td><Text color='custom.white'>{user.inviteStatus}</Text></Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemoveUser(index)}
                      bgColor='custom.button'
                    >
                       <Text color='custom.white' >Remove</Text>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </Layout>
  );
};

export default InviteUsers;
