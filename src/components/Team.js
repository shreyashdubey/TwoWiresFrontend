// TeamTab.js
import React, { useState, useEffect } from 'react';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Button , TableContainer, Card, Center, HStack,Text, VStack} from '@chakra-ui/react';
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
  const handlePrevPage = () => {
    setCurrentPage(currentPage -1);
  };

  return (
    <About>
      <Flex direction="column" w='50%' ml='385px' mt='20px'>
      <Center>
          <ChakraLink to="/create-new-team">
          <Button colorScheme='teal' variant='link'>
              Create a team
          </Button>
        </ChakraLink>
        </Center> 
        <Card ml='13px' mt='20px' borderColor="black" borderTopColor={'blackAlpha.900'}>
        <TableContainer ml='55px' >
          <Table  variant='unstyled' 
          mt={4} color={'blackAlpha.900'}>
            <Thead>
              <Tr>
                <Th w="5%">#</Th>
                <Th w='30%'>Team Name</Th>
                <Th w='40%'>Team Members</Th>
              </Tr>
            </Thead>
            <Tbody>
               {teamData.map((team, index) => (
                <Tr key={team._id}>
                  <Td>{index + 1}</Td>
                  <Td>{team.teamName}</Td>
                  <Td>
                      {team.members.map((member) => (
                          <Td>{member.username}</Td>
                      ))}
                  </Td>
                  <Td>
                    <ChakraLink to={`/invite-users/${team._id}`}>Edit</ChakraLink>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>  
        </Card>
        <Center>
          <VStack>
          <Text>{`Page ${currentPage}`}</Text>
          <HStack>
          <Button onClick={handlePrevPage} mt={4}>
              Prev Page
            </Button>
            <Button onClick={handleNextPage} mt={4}>
              Next Page
            </Button>
            </HStack>  
            </VStack>
        </Center>  
      </Flex>
      </About>
  );
};

export default TeamTab;
