// ActiveCompetitions.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Heading, SimpleGrid, Card, Box, Badge, Text, Image, VStack, HStack, Spacer ,useColorModeValue ,  useBreakpointValue, Center, Flex,} from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'
import contest2  from './images/contest2.jpeg'
import Layout from './DashBoard.js';

const ActiveCompetitions = () => {
  const chakraUIColor = useColorModeValue('rgba(0, 87, 255, 1)', 'rgba(0, 87, 255, 1)');
  const chakraUIColorLastbox = useColorModeValue('#FFBA93', '#FFBA93');
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

  // const cardWidth = useBreakpointValue({
  //   base: '250px', // on smaller screens, take up the full width
  //   sm: '300px', // on small screens and up, take up the full width
  //   md: '320px', // on medium screens and up, take up half the width
  //   lg: '300px', // on large screens and up, take up one-third of the width
  //   xl: '300px',
  //   '2xl': '300px'
  // });
  
  return (
    <Layout>
      <Center>
    <Flex  centerContent mt={10} w={['100%' , '100%' , '100%' , '100%', '75%']}  direction='column' alignItems="center">
      <Heading mb={7} fontSize={20} fontWeight={50} color='custom.white' mt='10px' >Active Competition</Heading>
      <SimpleGrid  columns={[1,1,1,2,3,3]}  spacing={4}  mt='10px'>
        {contestData.map((contest, index) => (
          <Link key={index} to={`/contest/${index}`}>
            <Box
              as={Card}
              boxShadow="lg"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
              w={['250px' , '300px' , '320px' , '300px' , '200px' , '300px']}
              h="300px"
              borderRadius="15px"
              overflow="hidden"
            >
              <Box borderRadius="50px 50px 0 0" h='25%'>
                <Image src={contest.imageSrc} alt={`Contest ${index + 1}`} height="100%" width="100%" objectFit="cover" />
              </Box>

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal" bgColor='custom.active'>
                    <Text color='custom.white'>Active</Text>
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  <Text color='custom.white'>{contest.heading}</Text>
                </Box>

                <Text mt={2} color='custom.white'>
                  {contest.description}
                </Text>

                <Box mt='30px' borderTop="1px solid #e1e1e1" pt={2}>
                  <Link color={chakraUIColor}><Text color='custom.white'>Know More</Text></Link>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
    {/* <Box bgColor={chakraUIColorLastbox} width="100%" height={250} mt={50} ml={['0', '0', '120px']}>
      <Text>Damn you mother fucker</Text>
    </Box>
    <Box width="100%" height={5} mt={50} ml={['0', '0', '50px']} /> */}
    </Center>
  </Layout>
  );
};



export default ActiveCompetitions;
