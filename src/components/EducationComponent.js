import React, { useState ,useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Card,
  Text,
  SimpleGrid ,
  NumberDecrementStepper ,
  NumberIncrementStepper ,
  NumberInputStepper ,
  Grid ,
  Flex ,
  Image, 
  Spacer,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import plus from './images/plus.png'
import edit from './images/edit.png'
import remove from './images/delete.png'
import instance from '../utils/api'
import { ADD_EDUCATION } from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import { GET_EDUCATION_ENTRIES } from '../utils/endpoints';
import { EDIT_EDUCATION } from '../utils/endpoints';
import { DELETE_EDUCATION } from '../utils/endpoints';
import { FaMoon, FaSun } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { ACCESS_TOKEN } from '../utils/siteConstants';


const EducationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const { toggleColorMode, colorMode } = useColorMode();
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 80 }, (_, index) => index + 1960);
  const [editedEducationIndex, setEditedEducationIndex] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  
  useEffect(() => {
    // Fetch education entries when the component mounts
    const fetchEducationEntries = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;
        const response = await instance.get(
          `${GET_EDUCATION_ENTRIES}?user=${userId}&page=1&pageSize=10`
        );
        const { educationEntries } = response;
        setEducationData(educationEntries);
      } catch (error) {
        console.error('Error occurred while fetching education entries:', error);
      }
    };

    if (!initialFetch) {
      // Fetch education entries only when initialFetch is false
      fetchEducationEntries();
      setInitialFetch(true); // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setNewEducation({
      school: '',
      degree: '',
      fieldOfStudy: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',

    })
    setErrorMessage('')
    setIsOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };

  const handleAddEducation = async() => {
    if (!newEducation.school) {
      setErrorMessage('College name is required');
      return; // Prevent form submission
    }
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id
      const school = newEducation.school
      const degree= newEducation.degree
      const fieldOfStudy= newEducation.fieldOfStudy
      const location=  'Lucknow'
      const startMonth = newEducation.startMonth
      const startYear =  newEducation.startYear

      const response = await instance.post(ADD_EDUCATION,{school , degree ,fieldOfStudy , location , startMonth , startYear, userId}, {'Content-Type': 'application/json'})
      const data = response;
      const { success, message } = data;
      if (success) {
        // Handle success
        console.log('Data successfully posted to the backend');
  
        // Clear form data and reset state after successful post
        setNewEducation({
          school: '',
          degree: '',
          fieldOfStudy: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
        });
    
      } else {
        // Handle error
        console.error('Failed to post data to the backend');
      }
    } catch (error) {
      console.error('Error occurred while posting data:', error);
    }
    setInitialFetch(false)
    setErrorMessage('');
    setEditedEducationIndex(null);
    handleCloseModal();
  };

  const isEndDateValid = () => {
    const { startMonth, startYear, endMonth, endYear } = newEducation;
    if (!startMonth || !startYear || !endMonth || !endYear) {
      return true; // Not enough information for validation
    }

    const startDate = new Date(`${startYear}-${startMonth}`);
    const endDate = new Date(`${endYear}-${endMonth}`);
    return startDate <= endDate;
  };

  const formatDateRange = (startDate, endDate) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = endDate ? new Date(endDate).getFullYear() : 'present';
  
    return endDate
      ? `${startYear}-${endYear}`
      : `${startYear}-${endYear}`;
  };

  const getValidationMessage = () => {
    if (!isEndDateValid()) {
      return 'End date can’t be earlier than start date';
    }
    return '';
  }

  const handleEditEducation = (index) => {
    const editedEducation = educationData[index];
    setNewEducation(editedEducation);
    setIsOpen(true);
  
    // Set the index of the education entry being edited
    setEditedEducationIndex(index);
    
  };

  const handleDeleteEducation = async (index) => {
    try {
      const educationIdToDelete = educationData[index]._id;
  
      // Make a DELETE request to the backend
      const response = await instance.delete(`${DELETE_EDUCATION}/${educationIdToDelete}`);
  
      const { success, message } = response;
      if (success) {
        setInitialFetch(false)
        // If the delete request is successful, update the state to reflect the deletion
        
      } else {
        console.error('Failed to delete education entry on the backend');
      }
    } catch (error) {
      console.error('Error occurred while deleting education entry:', error);
    }
  };
  


  const handleUpdateEducation = async () => {
    if (!newEducation.school) {
      setErrorMessage('College name is required');
      return; // Prevent form submission
    }

    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;
      const educationId = educationData[editedEducationIndex]._id;
      const school=newEducation.school
      const degree = newEducation.degree
      const fieldOfStudy= newEducation.fieldOfStudy
      const location = 'Lucknow'
      const startMonth = newEducation.startMonth
      const startYear= newEducation.startYear
      const endMonth= newEducation.endMonth
      const endYear= newEducation.endYear
      const response = await instance.put(
        `${EDIT_EDUCATION}/${educationId}`,
        {
          userId,
          school,
          degree,
          fieldOfStudy,
          location,
          startMonth,
          startYear,
          endMonth,
          endYear,
        },
        { 'Content-Type': 'application/json' }
      );

      const { success, message, education } = response.data;
      if (success) {
        // Handle success
        
      
      } else {
        // Handle error
        console.error('Failed to update education entry on the backend');
      }
    } catch (error) {
      console.error('Error occurred while updating education entry:', error);
    }

    setErrorMessage('');
    setEditedEducationIndex(null);
    handleCloseModal();
    setInitialFetch(false)
  };


  return (
    <Box  mt={5}>
      <Text fontSize="lg" fontWeight="bold" mb={4} bgColor='custom.darkSlateBlue' color='custom.white' >
        Education
      </Text>
      <Button onClick={handleOpenModal} bgColor='custom.button' variant='solid'>
        <Image
        boxSize='25px'
        objectFit='cover'
        src={plus}
        alt='plus'
        />
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}  >
        <ModalOverlay />
        <ModalContent bgColor='custom.darkSlateBlue' w={['300px' , '300px' , '380px' , '600px', '700px']}>
          <ModalHeader color='custom.white'>Add Education</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
            <Flex  direction="column" align="flex-start" w='100%'>
              <Input
                placeholder="school"
                color='custom.white'
                value={newEducation.school}
                isRequired={true}
                onChange={(e) => handleInputChange('school', e.target.value)}
                _placeholder={{ color: 'custom.white' }} 
              />
              {!newEducation.college && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessage}
                </Text>
              )}
            </Flex>
              <Input
                placeholder="Degree"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
              />
              <Input
                placeholder="Field of Study"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
              />
             
                <Box  w='100%'>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    p={4}
                    alignItems="center"
                    justifyContent='center'
                  >
                    <Select
                      placeholder="Start Month"
                      value={newEducation.startMonth}
                      _placeholder={{ color: 'custom.white' }} 
                      onChange={(e) => handleInputChange('startMonth', e.target.value)}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder="Start Year"
                      color = 'custom.white'
                      colorScheme='gray'
                      value={newEducation.startYear}
                      onChange={(e) => handleInputChange('startYear', e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}   >
                          {year}
                        </option>
                      ))}
                    </Select>

                    <Select
                      placeholder="End Month"
                      _placeholder={{ color: 'custom.white' }} 
                      color = 'custom.white'
                      value={newEducation.endMonth}
                      onChange={(e) => handleInputChange('endMonth', e.target.value)}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder="End Year"
                      value={newEducation.endYear}
                      _placeholder={{ color: 'custom.white' }} 
                       color = 'custom.white'
                      onChange={(e) => handleInputChange('endYear', e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}  >
                          {year}
                        </option>
                      ))}
                    </Select>
                    <Text   noOfLines={1} color="red.500" mt={2} w='100%'> 
                      {getValidationMessage()}
                    </Text>
                  </Grid>

                </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
          <Button
            bgColor='custom.charcoal'
            onClick={() =>
              editedEducationIndex === null
                ? handleAddEducation()
                : handleUpdateEducation()
            }
            right='10px'
          >
            <Text color='custom.white'>
              {editedEducationIndex === null ? 'Save' : 'Update'}
            </Text>
          </Button>

            <Button bgColor='custom.charcoal' onClick={handleCloseModal}><Text color='custom.white'>Cancel</Text></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {educationData.map((education, index) => (
  <Card key={index} p={4} mt={4} boxShadow="md" bgColor='custom.darkSlateBlue' w={['250px' , '300px' , '320px' , '300px' , '500px' , '700px']} >
    <HStack>
      {education.degree && education.fieldOfStudy && (
        <Text fontSize="xl" fontWeight="bold" color='custom.white' >
          {education.degree} in {education.fieldOfStudy}
        </Text>
      )}
      <Spacer/>
      <Button onClick={() => handleEditEducation(index)} bgColor='custom.button' variant='solid' w='10%' >
        <Image
          boxSize='25px'
          objectFit='cover'
          src={edit}
          alt='plus'
        />
      </Button>
      <Button
        onClick={() => handleDeleteEducation(index)}
        bgColor="custom.button"
        variant="solid"
        w="10%"
      >
        <Image
          boxSize='25px'
          objectFit='cover'
          src={remove}
          alt='remove'
        />
      </Button>
    </HStack>

    <Text color='custom.white'>{education.school}</Text>
    {education.startDate && (
      <Text color='custom.white'>
        {formatDateRange(education.startDate, education.endDate)}
      </Text>
    )}
  </Card>
))}

    </Box>
  );
};
export default EducationComponent;