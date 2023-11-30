// TeamTab.js
import React, { useState, useEffect } from 'react';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Link as ChakraLink } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import instance from '../utils/api';
import { GET_ALL_TEAM } from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import UserProfile from './UserProfile'
import About from './About';

const TeamTab = () => {
  const [teamData, setTeamData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
         const pageSize = 10;
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const decodedToken = jwtDecode(accessToken);
        const owner = decodedToken.user._id
        // const params = {
        //   owner  : owner ,
        //   page: "1",
        //   pageSize: "10",
        // };
         const response = await instance.get(`${GET_ALL_TEAM}?page=${currentPage}&pageSize=${pageSize}&owner=${owner}`);
        // const response = await instance.get(GET_ALL_TEAM, {params});
         setTeamData(response.teams);
      } catch (error) {
        console.log('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <About>
      <Flex direction="column">
        <ChakraLink to="/create-new-team">Create New Team</ChakraLink>

        <Table variant="simple" mt={4} bg={'gray.200'}>
          <Thead>
            <Tr>
              <Th w='30%'>Team Name</Th>
              <Th w='70%'>Team Members</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamData.map((team) => (
              <Tr key={team._id}>
                <Td>{team.teamName}</Td>
                <Td>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Member Name</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {team.members.map((member) => (
                        <Tr key={member._id}>
                          <Td>{member.username}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Td>
                <Td>
                  <ChakraLink to={`/invite-users/${team._id}`}>Edit</ChakraLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleNextPage} mt={4}>
          Next Page
        </Button>
      </Flex>
      </About>
  );
};

export default TeamTab;
