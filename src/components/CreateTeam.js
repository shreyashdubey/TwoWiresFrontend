// CreateNewTeam.js
import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import instance from '../utils/api';
import { LOGIN, SIGNUP , CREATE_TEAM } from '../utils/endpoints';
import InviteUsers from './InviteUser';
import { jwtDecode } from "jwt-decode";
import Layout from './DashBoard.js';

const CreateNewTeam = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const decodedToken = jwtDecode(accessToken);
        const owner = decodedToken.user._id
        const response = await instance.post(CREATE_TEAM ,{teamName,owner}, {'Content-Type': 'application/json'})
        const teamID = response._id;
        if (response) {
          alert('team created')
          navigate(`/invite-users?t=${teamID}&v=${encodeURIComponent(teamName)}`);
        } else {
          // Signup failed
          alert('Some error');
        }
    } catch (error) {
      console.log(error)
      alert('An error occurred during team creation. Please try again later.');
    }
      const handleCreateTeam = async () => {
        navigate("/team");
      };
  };

  

  return (
    <Layout>
      <Center>
        <Box  w='50%' mt='150px' h='300px' >
          <Heading as="h3" size="lg" mb={4}>
            Create New Team
          </Heading>
          <FormControl mb={4} w='30%'>
            <FormLabel>Team Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={handleTeamNameChange}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleCreateTeam}>
            Create Team
          </Button>
        </Box>
      </Center>  
    </Layout>    
  );
};

export default CreateNewTeam;
