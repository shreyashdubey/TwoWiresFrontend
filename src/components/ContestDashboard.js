
import React , {useState , useEffect } from 'react';
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
  Stack , Flex, FormControl, FormHelperText, FormLabel
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
import { useParams } from 'react-router-dom';
import { MdOutlineDoNotDisturbOnTotalSilence } from 'react-icons/md';

const ContestDashboard = () => {
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
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const decodedToken = jwtDecode(accessToken);
  const {contestId ,ok} = useParams();
  const [title, setTitle] = useState('');
  const me='faiez'
 
  const [forData, setForData] = useState({
    title: "",
    file: null
  });
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


  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleAcceptClick = () => {
    setIsModalOpen(false);
    setShowSubmissionTab(true);
    setHideJoinButton(true);
  };
 
  
  const contestDetails = {
    name: 'Contest Name',
    description: 'Short description of the problem goes here.',
    prize: '$1000',
    monthsLeft: 2,
    imageSrc: contest1, // Replace with the actual image source
  };

  const handleFileChange = (event) => {
    setForData(prevState => ({
        ...prevState,
        file: event.target.files[0]
      }));
      console.log('File state:', forData);
  };

  const handleTitleChange = (event) => {
    setForData({
      ...forData,
      title: event.target.value
    });
    console.log('Title state:', forData);
  };

  const handleFileSubmit = async() => {
    setIsDisabled(false)
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
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
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
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

  const handleUpload = async () => {
    try {
     
      console.log('co', forData)

      const response = await instance.post('/api/upload-submission/upload-files' ,{forData}, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },})
      // Handle success, e.g., show a success message or redirects
      console.log('File uploaded successfully');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error uploading file:', error);
    }
    console.log('co', forData)
    setForData({
        title : "" , 
        file : null
      })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload();
  };


  


  return (
    <Layout>
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
            <Text fontSize="lg">Prize: {contestDetails.prize}</Text>
            <Text fontSize="lg">Time Left: {contestDetails.monthsLeft} Months</Text>
            </VStack>
        </Center>
        </Box>
        <Box p={4} bg="gray.100" w = '75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']} bgColor='darkSlateBlue'>
            <HStack>
                <Tabs w = '20%'>
                    <TabList>
                    <Tab><Text color='custom.white'>Overview</Text></Tab>
                    <Tab><Text color='custom.white'>Leaderboard</Text></Tab>
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
          <form onSubmit={handleSubmit}>
      <Input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        mt={2}
        w="10%"
      />
      <Input
        type="text"
        placeholder="Enter title"
        value={forData.title}
        onChange={handleTitleChange}
      />
      <Button type="submit" colorScheme="teal" mt={2}>
        <Text color="white">Submit</Text>
      </Button>
    </form>
        </>
      )}
            </HStack>    
        </Box>
        
        <Box w='75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']}>

      </Box>

    </Layout>
  );
};

export default ContestDashboard;
