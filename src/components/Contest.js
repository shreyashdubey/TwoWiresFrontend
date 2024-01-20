// ActiveCompetitions.js
import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Heading, SimpleGrid, Card, Box, Badge, Text, Image, VStack, HStack, Spacer ,useColorModeValue ,  useBreakpointValue, Center, Flex, Link} from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'
import contest2  from './images/contest2.jpeg'
import Layout from './DashBoard.js';
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import { ACCESS_TOKEN } from '../utils/siteConstants.js';

const ActiveCompetitions = () => {
  const chakraUIColor = useColorModeValue('rgba(0, 87, 255, 1)', 'rgba(0, 87, 255, 1)');
  const chakraUIColorLastbox = useColorModeValue('#FFBA93', '#FFBA93');
  const navigate = useNavigate();
 
const [contestData , setContestData]  = useState([''])
  useEffect(() => {
    const fetchUserContests = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;
        instance.defaults.headers.common['Authorization'] = 'key '+localStorage.getItem(ACCESS_TOKEN);
        const contestsResponse = await instance.get(`/api/contest/get-all-contests?page=1&pageSize=30`);
        const contests = contestsResponse.contests;
        setContestData(contests);
      } catch (error) {
        console.error('Error fetching user contests:', error);
        // Handle error cases if needed
      }
    };
    fetchUserContests()

  }, []);
 
   
  // const cardWidth = useBreakpointValue({
  //   base: '250px', // on smaller screens, take up the full width
  //   sm: '300px', // on small screens and up, take up the full width
  //   md: '320px', // on medium screens and up, take up half the width
  //   lg: '300px', // on large screens and up, take up one-third of the width
  //   xl: '300px',
  //   '2xl': '300px'
  // });
  const ok=1
  const handleCardClick = (contestId,index) => {
    // Navigate to the overview page with user ID and contest ID
    console.log('12345bfhjndv')
    const constestIndex = contestData[index]
    const name = constestIndex.contestName;
    const contestOrganizer =  constestIndex.contestOrganizer
    const showTab = true
    navigate(`/discription/${contestId}/${ok}` ,  {state:{organizer:contestOrganizer,name: name , published :true , showTab }});
  };
  return (
    <Layout>
      <Center>
    <Flex  centerContent mt={10} w={['100%' , '100%' , '100%' , '10s0%', '75%']}  direction='column' alignItems="center">
      <Heading mb={7} fontSize={20} fontWeight={50} color='custom.white' mt='10px' >Active Competition</Heading>
      <SimpleGrid  columns={[1,1,1,2,3,3]}  spacing={4}  mt='10px'>
        {contestData.map((contest, index) => (
        <Link
        key={contest._id}
        _hover={{ textDecoration: 'none' }}
        onClick={() => handleCardClick(contest._id, index)}
      >
            <Box
              as={Card}
              boxShadow="lg"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
              w={['250px' , '300px' , '320px' , '300px' , '200px' , '300px']}
              h="300px"
              borderRadius="15px"
              overflow="hidden"
              textDecoration='none'
            >
              <Box borderRadius="50px 50px 0 0" h='25%'>
                <Image src={contest1} alt={`Contest ${index + 1}`} height="100%" width="100%" objectFit="cover" />
              </Box>

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal" bgColor='custom.active'>
                    <Text color='custom.white'>Active</Text>
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  <Text color='custom.white'>contestname : {contest.contestName}</Text>
                </Box>

                <Text mt={2} color='custom.white'>
                  organizer : {contest.contestOrganizer}
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
