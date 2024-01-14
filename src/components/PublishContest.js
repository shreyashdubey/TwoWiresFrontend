import React, { useState  , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  VStack,
  Center,
  Select,
  Textarea,
  Flex,
  Spacer,
  HStack,
  Card , 
  Link,
  Grid ,  
  SimpleGrid
} from '@chakra-ui/react';
import { useOverview } from './OverviewContext.js';
import { CREATE_CONTEST } from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import Layout from './DashBoard.js';
import UserContest from './UserContest.js';
import { ACCESS_TOKEN } from '../utils/siteConstants.js';

const PublishContest = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form , setForm] = useState()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [editContestId, setEditContestId] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  const [userContests, setUserContests] = useState([]);
  const {setContesttDetail} = useOverview();

  useEffect(() => {
   
    const fetchUserContests = async () => {
      try {
      
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;
  
        const contestsResponse = await instance.get(`/api/contest/get-all-submitted-contests?page=1&pageSize=20`);
        const contests = contestsResponse.contests;
      setUserContests(contests)
      } catch (error) {
        console.error('Error fetching user contests:', error);
        // Handle error cases if needed
      }
    };

    if (!initialFetch) {
      // Fetch education entries only when initialFetch is false
      fetchUserContests();
      setInitialFetch(true); // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);

  

  const handleCardClick = (contestId,index) => {
    // Navigate to the overview page with user ID and contest ID
    const constestIndex = userContests[index]
    setContesttDetail(constestIndex)
    let ok =0;
    if(constestIndex.contestDescription){
      ok=1
      console.log(ok)
    }
    navigate(`/reviewdiscription/${contestId}/${ok}`);
  };

  
  return (
    <Layout>

        <Flex  centerContent mt={10} w={['100%' , '100%' , '100%' , '100%', '100%']}  direction='column' alignItems="center">
      <SimpleGrid  columns={[1,1,1,2,3,3]}  spacing={4}  mt='10px'>
          {userContests.map((contest, index) => (
            <Link
              key={contest._id}
              _hover={{ textDecoration: 'none' }}
              onClick={() => handleCardClick(contest._id, index)}
            >
              <Card p={8} borderWidth={1} borderRadius="lg" boxShadow="lg"   w={['250px' , '300px' , '320px' , '300px' , '200px' , '300px']} h='200px' >
                <Heading mb={4}>{contest.contestName}</Heading>
                <Text>Organizer: {contest.contestOrganizer}</Text>
          
              </Card>
            </Link>
          ))}
        </SimpleGrid>
        </Flex>
        
    </Layout>

  );
};

export default PublishContest;
