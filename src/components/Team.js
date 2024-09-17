// TeamTab.js
import React, { useState, useEffect } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Card,
  Center,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "react-router-dom";
import { EditIcon, ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import axios from "axios"; // Import axios for making API requests
import instance from "../utils/api";
import { GET_ALL_TEAM } from "../utils/endpoints";
import { jwtDecode } from "jwt-decode";
import About from "./About";

const TeamTab = () => {
  const [teamData, setTeamData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const pageSize = 10;
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const decodedToken = jwtDecode(accessToken);
        const owner = decodedToken.user._id;
        // const params = {
        //   owner  : owner ,
        //   page: "1",
        //   pageSize: "10",
        // };
        const response = await instance.get(
          `${GET_ALL_TEAM}?page=${currentPage}&pageSize=${pageSize}&owner=${owner}`,
        );
        // const response = await instance.get(GET_ALL_TEAM, {params});
        setTeamData(response.teams);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <About>
      <Flex
        direction="column"
        w={["100%", "100%", "100%", "100%", "75%"]}
        mt="20px"
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <ChakraLink to="/create-new-team">
            <Button bgColor="custom.button" mt="8px">
              <Text color="custom.white">Create a Team</Text>
            </Button>
          </ChakraLink>
        </Center>
        <Center>
          <Card
            mt="20px"
            bgColor="custom.darkSlateBlue"
            w={["300px", "300px", "500px", "768px", "800px", "1000px"]}
          >
            <TableContainer>
              <Table variant="striped" mt={4}>
                <Thead>
                  <Tr>
                    <Th w="5%">
                      <Text color="custom.white">#</Text>
                    </Th>
                    <Th w="25%">
                      <Text color="custom.white">Team Name</Text>
                    </Th>
                    <Th w="40%">
                      <Text color="custom.white">Team Members</Text>
                    </Th>
                    <Th w="5%">
                      <Text color="custom.white"></Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teamData.map((team, index) => (
                    <React.Fragment key={team._id}>
                      <Tr key={team._id}>
                        <Td>
                          <Text color="custom.white">
                            {(currentPage - 1) * 10 + index + 1}
                          </Text>
                        </Td>
                        <Td>
                          <Button colorScheme="teal" variant="link">
                            <Text color="custom.white">{team.teamName}</Text>
                          </Button>
                        </Td>
                        <Td>
                          {/* TODO: If team member is more than 5 then show +X more */}
                          {team.members.map((member) => (
                            <Button colorScheme="teal" variant="link">
                              <Text color="custom.white">
                                {member.username}
                              </Text>
                            </Button>
                          ))}
                        </Td>
                        <Td>
                          <ChakraLink
                            to={`/invite-users?t=${
                              team._id
                            }&v=${encodeURIComponent(team.teamName)}`}
                          >
                            <Button variant="link">
                              <EditIcon />
                            </Button>
                          </ChakraLink>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </Center>
        <Center>
          <HStack>
            <Button
              padding="1"
              borderRadius="full"
              bgColor="custom.button"
              onClick={handlePrevPage}
              mt={4}
              display={currentPage === 1 ? "none" : "inline-block"}
            >
              <ArrowLeftIcon boxSize={2.5} />
            </Button>
            <Text color="custom.white" mt="17px">{`Page ${currentPage}`}</Text>
            <Button
              padding="1"
              borderRadius="full"
              bgColor="custom.button"
              onClick={handleNextPage}
              mt={4}
              display={currentPage === totalPages ? "none" : "inline-block"}
            >
              <ArrowRightIcon boxSize={2.5} />
            </Button>
          </HStack>
        </Center>
      </Flex>
    </About>
  );
};

export default TeamTab;
