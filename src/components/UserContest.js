// UserContest.js
import React from 'react';
import About from './About';
import { Box, Container, Card, Text, Image , Link , Badge , HStack , Spacer , SimpleGrid ,useColorModeValue , Heading , Flex, Center} from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'

const UserContest = () => {
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
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
    {
      imageSrc: contest1,
      heading: 'Contest 1',
      description: 'Solve interesting problems and win exciting prizes.',
      prize: 1000,
      monthsLeft: 2,
    },
   
    // Add more contests as needed
  ];

  return (
    <About>
      <Flex  centerContent mt={10} w={['100%' , '100%' , '100%' , '100%', '75%']}   direction='column' alignItems="center" ml={['0px' ,'0px','0px','0px','180px', '230px']}  >
      <Heading mb={7} fontSize={20} fontWeight={50} color='custom.white' mt='10px' >My Competition</Heading>
        <SimpleGrid columns={[1,1,1,2,3,3]} spacing={4}>
        {contestData.map((contest, index) => (
          <Link key={index} to={`/contest/${index}`}>
            <Card boxShadow="lg" transition="transform 0.3s" _hover={{ transform: 'scale(1.05)' }} w={['250px' , '300px' , '320px' , '300px' , '200px' , '300px']} h="300px" borderRadius="15px" overflow="hidden" bgColor='custom.darkSlateBlue'>
              <Box borderRadius="50px 50px 0 0" h='25%'>
                <Image src={contest.imageSrc} alt={`Contest ${index + 1}`} height="100%" width="100%" objectFit="cover" />
              </Box>

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" bgColor='custom.completed'>
                    <Text color='custom.white'>Completed</Text>
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  <Heading color='custom.white' fontSize='md'>{contest.heading}</Heading>
                </Box>

                <Text mt={2} color='custom.white'>
                  {contest.description}
                </Text>

                {/* Add a boundary after the problem description */}
               
                <Box mt='30px' borderTop="1px solid #e1e1e1" pt={2}>
                  <Link color='custom.white'>Know More</Link>
                </Box>
               
              </Box>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
      </Flex>
      {/* <Box bgColor={chakraUIColorLastbox} width={1280} height={250}mt={50} ml={120}>
              <Text>Damn you mother fucker</Text>
      </Box>
      <Box  width={1440} height={5}mt={50} ml={50}>
      </Box> */}
    </About>
  );
};

export default UserContest;
