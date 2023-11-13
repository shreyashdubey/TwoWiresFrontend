// InviteUsers.js
import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const InviteUsers = () => {
  const { teamName } = useParams();
  const [username, setUsername] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    // Simulate updating the status when the component mounts or when invitedUsers changes
   // updateStatusForAcceptedUsers();
   // fetchTeamMember();
  }, [invitedUsers]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleInviteUser = async (e) =>{
  //   e.preventDefault();
  //   // Add your user invitation logic here
  //   try {
  //     const accessToken = localStorage.getItem('ACCESS_TOKEN');
  //     const decodedToken = jwtDecode(accessToken);
  //     const owner = decodedToken.user._id
  //     const response = await instance.post(INVITE_USER ,{username,owner}, {'Content-Type': 'application/json'})
  //     if (response) {
  //       setInvitedUsers(User)
  //     } else {
  //       alert('Some error');
  //     }
  // } catch (error) {
  //   console.log(error)
  //   alert('An error occurred during inviting user. Please try again later.');
  // }

    // Update the invitedUsers state with the new user
   // setInvitedUsers((prevUsers) => [...prevUsers, { user: username, status: 'Invited' }]);
    
    // Clear the input field after inviting the user
    const User = {
      user: username,
      status: 'Invited',
      action: '', // You can modify this based on your requirements
    };
  
    // Update the invitedUsers state with the new user
    setInvitedUsers((prevUsers) => [...prevUsers,User]);
    setUsername('');
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

// const fetchTeamMember = async () => {
//   try {
//    // Replace the URL with your actual API endpoint
//     const accessToken = localStorage.getItem('ACCESS_TOKEN');
//     const decodedToken = jwtDecode(accessToken);
//     const owner = decodedToken.user._id
//     const response = await instance.get(GET_TEAM_MEMBER ,{teamName ,owner}, {'Content-Type': 'application/json'})
//     if(response){
//       const teammember = response.teammember
//       setInvitedUsers(teammember)
//     }
//   } catch (error) {
//     console.error('Error fetching team data:', error);
//   }
// };

  return (
    <Box p={4}>
      <Heading as="h3" size="lg" mb={4}>
        Invite Users to Team {teamName}
      </Heading>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleInviteUser}>
        Invite User
      </Button>

      {/* Display the invited users in a table */}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invitedUsers.map((user, index) => (
            <Tr key={index}>
              <Td>{user.user}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleRemoveUser(index)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InviteUsers;
