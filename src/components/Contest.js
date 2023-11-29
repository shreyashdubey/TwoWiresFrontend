// ActiveCompetitions.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Heading, SimpleGrid, Card, Box, Badge, Text, Image, VStack, HStack, Spacer } from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'
import contest2  from './images/contest2.jpeg'
import Layout from './DashBoard.js';

const ActiveCompetitions = () => {
  const contestData = [
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },
    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },


    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },

    {
      imageSrc: contest2,
      heading: 'Contest 2',
      description: 'Test your skills in this challenging competition.',
      prize: 500,
      monthsLeft: 1,
    },
    // Add more contests as needed
  ];

  
  return (
    <Layout>
    <Container maxW="container.xl" centerContent mt='40' > 
      <Heading mb={4}>Active Competitions</Heading>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={4} mt={5}>
        {contestData.map((contest, index) => (
          <Link key={index} to={`/contest/${index}`}>
            <Card boxShadow="lg" transition="transform 0.3s" _hover={{ transform: 'scale(1.05)' }} w="300px" h="300px" borderRadius="50px" overflow="hidden">
              <Box borderRadius="50px 50px 0 0" h='25%'>
                <Image src={contest.imageSrc} alt={`Contest ${index + 1}`} height="100%" width="100%" objectFit="cover" />
              </Box>

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    Active
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {contest.heading}
                </Box>

                <Text mt={2} color="gray.600">
                  {contest.description}
                </Text>

                {/* Add a boundary after the problem description */}
               
                <Box mt='30px' borderTop="1px solid #e1e1e1" pt={2}>
                <HStack>
                  <Text>${contest.prize} Prize</Text>
                  <Spacer/>
                  <Text>{contest.monthsLeft} Months Left</Text> 
                </HStack>
                </Box>
               
              </Box>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
    </Layout>
  );
};



export default ActiveCompetitions;
