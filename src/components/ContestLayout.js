
import React , {useState , useEffect   } from 'react';
import { useNavigate  , useLocation} from "react-router-dom";
import Scrollspy from 'react-scrollspy';
import { Box,
  Center,
  Image,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  Modal,
  TabPanel,
  TabPanels,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Spacer,
  Button,
  Input,
  Stack , Flex, FormControl, FormHelperText, FormLabel , Tooltip , 
} from '@chakra-ui/react';
import contest1 from './images/contest3.jpg'
import Layout from './DashBoard.js';
import OverviewSection from './OverviewSection.js';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import { Navigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN } from '../utils/siteConstants.js';

const ContestLayout = ({showTab , comefrom}) => {
  // Assuming you have contest details available
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubmissionTab, setShowSubmissionTab] = useState(false);
  const [hideJoinButton, setHideJoinButton] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [file, setFile] = useState(null);
  const [joinAsTeam, setJoinAsTeam] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [teamName, setTeamName] = useState('');
  const [soccerWinner, setSoccerWinner] = useState('');
  const [teamSuggestions, setTeamSuggestions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    id:'',
    teamName : '' ,
  });
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.user._id;
  const {contestId ,ok} = useParams();
  const me='faiez'
  const navigate = useNavigate();
  const location = useLocation();
  const variable= location.state;
  console.log('svs ',variable)

  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  // useEffect(() => {
  //   // Make the backend call when soccerWinner is updated
  //   if (soccerWinner) {
  //     submitSoccerWinner();
  //   }
  // }, [soccerWinner]);

  console.log('haha', comefrom)
  const handleJoinClick = () => {
    if(comefrom ==='signup')   setIsModalOpen(true);
    else navigate('/' , {state:{organizer:variable.organizer,name: variable.name , published :true  , contestId : contestId , ok: ok  , showTab}})
    
  };

  const handleAcceptClick = () => {
    setIsModalOpen(false);
    setShowSubmissionTab(true);
    setHideJoinButton(true);
  };
 
  
  const contestDetails = {
    name: variable.name,
    organizer : variable.organizer,
    monthsLeft: 2,
    imageSrc: contest1, // Replace with the actual image source
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async() => {
    setIsDisabled(false)
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;
      // Replace 'your_backend_api_url' with the actual endpoint for fetching team names
      const response = await instance.post(`api/contest-description/add-participant/${contestId}`,{userId}, {'Content-Type': 'application/json'})

      if (response) {
        console.log('resposne')
      } else {
        console.error('Failed to fetch team names');
      }
    } catch (error) {
      console.error('Error during fetchTeamNames:', error);
    }
  };
   
  const fetchTeamNames = async () => {
    console.log('worked')
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;
      // Replace 'your_backend_api_url' with the actual endpoint for fetching team names
      const response = await instance.get(`/api/users/get-all-teams?userId=${userId}&page=1&pageSize=10`);

      if (response) {
        console.log('hey69')
        setTeamSuggestions(response.teamEntries);
        console.log(teamSuggestions)
      } else {
        console.error('Failed to fetch team names');
      }
    } catch (error) {
      console.error('Error during fetchTeamNames:', error);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      // Make the API request to delete the contest
      const response = await instance.delete(`/api/contest/delete-contest/${contestId}/${userId}`);
      navigate('/createcompetition')
      // Handle the response from the API
      console.log('API Response:', response);
  
      // Assuming the API response is successful
      if (response.success) {
        navigate('/createcompetition')
        // Trigger a re-fetch of user contests or update the UI as needed
       // setIsFormSubmitted(!isFormSubmitted);
       // setInitialFetch(false)
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error('API Request Error:', error);
      // Handle error cases if needed
    }
  };

  const handleDiscussTabClick = () => {
    navigate('/discuss' , {state:{variable : variable}});
  };

  


  return (
    <>
        <Box
        backgroundImage={`url(${contestDetails.imageSrc})`}
        backgroundSize="cover"
        backgroundPosition="center"
        ml={['95px' , '90px' , '100px','110px','130px','190px']}
        backgroundRepeat="no-repeat"
        mt='100px'
        w="75%"
        h="35vh"  // Adjust the height as needed
        position="relative"
        borderRadius='10px'
        >
        <Center h="100%">
            <VStack spacing={4} align="center" color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)">
            <Text fontSize="xl" fontWeight="bold">
                {contestDetails.name}
            </Text>
            <Text>{contestDetails.description}</Text>
            <Text fontSize="lg">Organizer: {contestDetails.organizer}</Text>
            <Text fontSize="lg">Time Left: {contestDetails.monthsLeft} Months</Text>
            </VStack>
        </Center>
        </Box>
        {showTab ?(
           <Box p={4} bg="gray.100" w = '75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']} bgColor='darkSlateBlue'>
           <HStack>
               <Tabs w = '20%'>
                   <TabList>
                   <Tab  ><Text color='custom.white'>Overview</Text></Tab>
                   <Tooltip label='write a detailed plan'>
                   <Tab  onClick={handleDiscussTabClick} ><Text color='custom.white'>Plan</Text></Tab>
                   </Tooltip>
                   </TabList>
               </Tabs>
               <Spacer/>
               {!hideJoinButton && (
       <Button bgColor='custom.button' onClick={handleJoinClick}>
         <Text  color='custom.white' >Join Competition</Text>
       </Button>
     )}
       
     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
       <ModalOverlay />
       <ModalContent>
         <ModalHeader>Participant Option</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
         <Stack spacing={2} direction='column'>
           <Checkbox  onChange={(e) => {
              if (e.target.checked) {
                // Only call fetchTeamNames() when "Join as team" is checked
                handleFileSubmit();
              }
           }}>join as individual</Checkbox>
           <Checkbox onChange={(e) => {
              setJoinAsTeam(e.target.checked);
              if (e.target.checked) {
                // Only call fetchTeamNames() when "Join as team" is checked
                fetchTeamNames();
              }
           }}>
             Join as team
           </Checkbox>
         </Stack>
           {joinAsTeam && (
             <Flex pt="48" justify="center" align="center" w="full">
               <FormControl w="60">
               <AutoComplete openOnFocus 
              onChange={(value) => {
               handleFileSubmit();
             }}>
                   <AutoCompleteInput
                     variant="filled"
                   />
                   <AutoCompleteList>
                     {teamSuggestions.map((soccerWinner, cid) => (
                       <AutoCompleteItem
                         key={`option-${cid}`}
                         value={soccerWinner.teamName}
                         textTransform="capitalize"
                       >
                         {soccerWinner.teamName}
                       </AutoCompleteItem>
                     ))}
                   </AutoCompleteList>
                 </AutoComplete>

                 <FormHelperText>Who do you support.</FormHelperText>
               </FormControl>
             </Flex>
           )}

         </ModalBody>
         <ModalFooter>
           <Button bgColor='custom.button' mr={3} onClick={handleAcceptClick} isDisabled={isDisabled}>
           <Text color='custom.white'>Register</Text>
           </Button>
         </ModalFooter>
       </ModalContent>
     </Modal>

     {showSubmissionTab && (
       <>
         <Tabs>
           <TabList>
             <Tab><Text color='custom.white'>Submission</Text></Tab>
           </TabList>
         </Tabs>
         <Input type="file" onChange={handleFileChange} mt={2} w='10%' />
         <Button colorScheme="teal" mt={2} onClick={handleFileSubmit}>
           <Text color='custom.white'>Submit</Text>
         </Button>
       </>
     )}
           </HStack>    
       </Box>
        ):
        (
          <></>
        )}
        
        
        <Box w='75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']}>
        {!variable.published && (
               <Button onClick={handleDeleteButtonClick}>Delete</Button>
        )}
      {/* <OverviewSection  published  ={variable.published} submitted = {variable.submitted}/>   */}
      </Box>

    </>
  );
};

export default ContestLayout;
