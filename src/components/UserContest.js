// UserContest.js
import React from 'react';
import About from './About';
import { Table, Thead, Tbody, Tr, Th, Td, Container } from "@chakra-ui/react";

const UserContest = () => {
  const contestEntries = [
    { name: "Contest1", rank: 1, participant: "Participant1", startTime: "YYYY-MM-DD HH:mm" },
    { name: "Contest2", rank: 2, participant: "Participant2", startTime: "YYYY-MM-DD HH:mm" },
    { name: "Contest3", rank: 3, participant: "Participant3", startTime: "YYYY-MM-DD HH:mm" },
    // Add more entries as needed
  ];

  return (
    <>
      <About/>  
      <Container maxW="container.xl" centerContent>
        <Table variant="simple" ml='10px' mr='25px' w='50%' align='center' borderColor="gray.300" borderWidth="1px" mt='30px'>
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Name</Th>
              <Th>Rank</Th>
              <Th>Participant</Th>
              <Th>Start Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contestEntries.map((entry, index) => (
              <Tr key={index} bg={index % 2 === 0 ? "gray.200" : "gray.300"}>
                <Td>{index + 1}</Td>
                <Td>{entry.name}</Td>
                <Td>{entry.rank}</Td>
                <Td>{entry.participant}</Td>
                <Td>{entry.startTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserContest;
