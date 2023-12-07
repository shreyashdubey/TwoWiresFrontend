import React, { useState } from 'react';
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
  
} from '@chakra-ui/react';
import { useOverview } from './OverviewContext';
import { CREATE_CONTEST } from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import Layout from './DashBoard.js';

const CreateCompetitionForm = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { isOverviewSaved } = useOverview();
  console.log(isOverviewSaved)
  const [formData, setFormData] = useState({
    contestName: '',
    contestOrganizer: '',
   // contestCreator: [{}],
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the API request
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id

        const contestName =  formData.contestName
        const contestOrganizer= formData.contestOrganizer
        const contestCreator = [userId] // Assuming contestCreator is a single value, adjust as needed
        const startTime = formData.startTime
        const endTime = formData.endTime

      // Make the API request
       const response = await instance.post(CREATE_CONTEST,{contestName , contestOrganizer , contestCreator ,startTime , endTime }, {'Content-Type': 'application/json'})

      // Handle the response from the API
        console.log('API Response:', response.data);

      // Assuming the API response is successful, you can redirect to the overview page
      if (response.success) {
        // Optionally, you can set isOverviewSaved in the context or component state
        // to update the Save button logic if needed
        navigate('/overview');
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error('API Request Error:', error);
      // Handle error cases if needed
    }
  };

  const handlePlusButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseButtonClick = () => {
    setIsFormVisible(false);
  };

  return (
    <Layout>
    <Center dir='column'>
      <VStack>
        <HStack mt='20px' >
     <Button onClick={handlePlusButtonClick} colorScheme="teal" size="lg" mb={4}>
        Open Form
      </Button>
      <Button onClick={handleCloseButtonClick} colorScheme="teal" size="lg" mb={4}>
        Close Form
      </Button>
      </HStack>
      {isFormVisible && (
    <Box p={8} maxW="xl" borderWidth={1} borderRadius="lg" boxShadow="lg" mt='20px'>
      <Heading mb={4}>Create a Competition</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Contest Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter contest name"
              value={formData.contestName}
              onChange={(e) => handleInputChange('contestName', e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contest Organizer</FormLabel>
            <Input
              type="text"
              placeholder="Enter contest organizer"
              value={formData.contestOrganizer}
              onChange={(e) =>
                handleInputChange('contestOrganizer', e.target.value)
              }
              required
            />
          </FormControl>

          {/* <FormControl>
            <FormLabel>Contest Creator</FormLabel>
            <Input
              type="text"
              placeholder="Enter contest creator"
              value={formData.contestCreator}
              onChange={(e) =>
                handleInputChange('contestCreator', e.target.value)
              }
              required
            />
          </FormControl> */}

          <Flex>
            <FormControl flex="1">
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) =>
                  handleInputChange('startTime', e.target.value)
                }
                required
              />
            </FormControl>

            <Spacer />

            <FormControl flex="1">
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter contest description"
              value={formData.description}
              onChange={(e) =>
                handleInputChange('description', e.target.value)
              }
              resize="vertical"
              rows={4}
            />
          </FormControl>

          <Center>
            <Button type="submit" colorScheme="teal" size="lg">
              Create Competition
            </Button>
            {isOverviewSaved ? (
                <Button onClick={() => navigate('/complete-overview')} colorScheme="teal" size="lg" mr={4}>
                  Save
                </Button>
              ) : (
                <Button onClick={() => navigate('/overview')} colorScheme="teal" size="lg" mr={4}>
                  Create
                </Button>
              )}
          </Center>
        </VStack>
      </form>
    </Box>
    )}
    </VStack>
    </Center>
    </Layout>

  );
};

export default CreateCompetitionForm;
