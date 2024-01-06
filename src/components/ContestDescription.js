
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
  Stack , Flex, FormControl, FormHelperText, FormLabel ,
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
import ContestLayout from './ContestLayout.js';

const ContestDiscription = () => {
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


  const handleJoinClick = () => {
    setIsModalOpen(true);
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
    <Layout>
      <Box>
      <ContestLayout/> 
      <OverviewSection  published  ={variable.published} submitted = {variable.submitted}/>  
      </Box>
    </Layout> 
  );
};

export default ContestDiscription;
