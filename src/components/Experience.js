import React, { useState , useEffect } from 'react';
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
  NumberInputStepper,
  Heading ,
  Grid ,
  Flex ,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { FaItalic } from 'react-icons/fa';
import plus from './images/plus.png'
import edit from './images/edit.png'
import remove from './images/delete.png'
import { ADD_EXPERIENCE, DELETE_EXPERIENCE } from '../utils/endpoints';
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import { GET_EXPERIENCE_ENTRIES } from '../utils/endpoints';
import { EDIT_EXPERIENCE } from '../utils/endpoints';

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [newEducation, setNewEducation] = useState({
    Title: '',
    EmploymentType: '',
    CompanyName: '',
    Location : '' ,
    LocationType: '' ,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    Product : '' ,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 80 }, (_, index) => index + 1960);
  const [initialFetch, setInitialFetch] = useState(false);
  const [editedEducationIndex, setEditedEducationIndex] = useState(null);



  useEffect(() => {
    // Fetch education entries when the component mounts
    const fetchEducationEntries = async () => {
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;
        const response = await instance.get(
          `${GET_EXPERIENCE_ENTRIES}?user=${userId}&page=1&pageSize=10`
        );
        const { experienceEntries } = response;
        console.log(experienceEntries)
        setEducationData(experienceEntries );
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
      Title: '',
      EmploymentType: '',
      CompanyName: '',
      Location : '' ,
      LocationType: '' ,
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      Product : '' ,
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
    if (!newEducation.Title) {
      console.log('hey')
      setErrorMessage('College name is required');
      return; // Prevent form submission
    }
    console.log('hey2')
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id
      const industry = newEducation.industry
      const employmentType = newEducation.EmploymentType
      const locationType = newEducation.LocationType
      const location=  'Lucknow'
      const startMonth = newEducation.startMonth
      const startYear =  newEducation.startYear
      const title = newEducation.Title
      const endMonth = newEducation.endMonth
      const endYear = newEducation.endYear


      const response = await instance.post( ADD_EXPERIENCE,{title, industry, employmentType, locationType, location, startMonth, startYear, endMonth, endYear, userId}, {'Content-Type': 'application/json'})
      const data = response;
      const { success, message } = data;
      if (success) {
        // Handle success
        console.log('Data successfully posted to the backend');
  
        // Clear form data and reset state after successful post
        setNewEducation({
          Title: '',
          EmploymentType: '',
          CompanyName: '',
          Location : '' ,
          LocationType: '' ,
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          Product : '' ,
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
    console.log(startDate)
    console.log(endDate)
    const what = startDate <= endDate;
    console.log(what)
    return startDate <= endDate;
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
  
    // Remove the existing education data from the arra
    
  };

  const handleDeleteEducation = async(index) => {
    try {
      const experienceId = educationData[index]._id;
      console.log('heydelete')
      // Make a DELETE request to the backend
      const response = await instance.delete(`${DELETE_EXPERIENCE}/${experienceId}`);
  
      const { success, message } = response;
      if (success) {
        console.log(message);
        setInitialFetch(false)
        // If the delete request is successful, update the state to reflect the deletion
        // const updatedEducationData = [...educationData];
        // updatedEducationData.splice(index, 1);
        // setEducationData(updatedEducationData);
        
      } else {
        console.error('Failed to delete education entry on the backend');
      }
    } catch (error) {
      console.error('Error occurred while deleting education entry:', error);
    }
  };


  const handleUpdateEducation = async () => {
    if (!newEducation.Title) {
      setErrorMessage('College name is required');
      return; // Prevent form submission
    }

    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;
      const educationId = educationData[editedEducationIndex]._id;
      const industry = newEducation.industry
      const employmentType = newEducation.EmploymentType
      const locationType = newEducation.LocationType
      const location=  'Lucknow'
      const startMonth = newEducation.startMonth
      const startYear =  newEducation.startYear
      const title = newEducation.Title
      const endMonth = newEducation.endMonth
      const endYear = newEducation.endYear
      console.log('hey')  
      const response = await instance.put(
        `${EDIT_EXPERIENCE}/${educationId}`,
        {
          userId,title, industry, employmentType, locationType, location, startMonth, startYear, endMonth, endYear
        },
        { 'Content-Type': 'application/json' }
      );

      const { success, message, education } = response.data;
      if (success) {
        // Handle success
        console.log('Data successfully updated on the backend');

        // Update the educationData array with the updated education entry
        // const updatedEducationData = [...educationData];
        // updatedEducationData.push(education);
        // setEducationData(updatedEducationData);
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
    <Box  mt={2}>
      <Text fontSize="xl" fontWeight="bold" mb={4} color='custom.white' > 
        Experience
      </Text>
      <Button onClick={handleOpenModal} bgColor='custom.button'>
      <Image
        boxSize='25px'
        objectFit='cover'
        src={plus}
        alt='plus'
        />
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent bgColor='custom.mccolor'>
          <ModalHeader color='custom.white'>Add Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <VStack spacing={4}>
              <Flex  direction="column" align="flex-start" w='100%'>
              <Input
                placeholder="Title"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.Title}
                isRequired={true}
                onChange={(e) => handleInputChange('Title', e.target.value)}
              />
              {!newEducation.Title && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessage}
                </Text>
              )}
            </Flex>
              <Select
                placeholder="EmploymentType"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.button'
                value={newEducation.EmploymentType}
                onChange={(e) => handleInputChange('EmploymentType', e.target.value)}
               >
                <option  value='FULL_TIME'>Full-Time</option>
                <option value='PART_TIME'>Part-Time</option>
                <option value='SELF_EMPLOYED'>Self-Employed</option>
                <option value='FREELANCE'>Freelance</option>
                <option value='INTERNSHIP'>Internshiip</option>
                <option value='TRAINEE'>Trainee</option>
               </Select>
               <Flex  direction="column" align="flex-start" w='100%'>
              <Input
                placeholder="CompanyName"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.CompanyName}
                isRequired={true}
                onChange={(e) => handleInputChange('CompanyName', e.target.value)}
              />
              {!newEducation.CompanyName && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessage}
                </Text>
              )}
            </Flex>
              
               <Input
                placeholder="Product"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.Product}
                onChange={(e) => handleInputChange('Product', e.target.value)}
              />
              <Input
                placeholder="Location"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.Location}
                onChange={(e) => handleInputChange('Location', e.target.value)}
              />
              <Select
                placeholder="LocationType"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.button'
                value={newEducation.LocationType}
                onChange={(e) => handleInputChange('LocationType', e.target.value)}
               >
                <option  value='ON_SITE'>Full-Time</option>
                <option value='REMOTE'>Part-Time</option>
                <option value='HYBRID'>Self-Employed</option>
                
               </Select>
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
                      _placeholder={{ color: 'custom.white' }} 
                      color = 'custom.white'
                      value={newEducation.startMonth}
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
                      _placeholder={{ color: 'custom.white' }} 
                      color = 'custom.white'
                      value={newEducation.startYear}
                      onChange={(e) => handleInputChange('startYear', e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
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
                      _placeholder={{ color: 'custom.white' }} 
                      color = 'custom.white'
                      value={newEducation.endYear}
                      onChange={(e) => handleInputChange('endYear', e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    <Text color="red.500" mt={2}>
                      {getValidationMessage()}
                    </Text>
                  </Grid>

                </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
          <Button
            bgColor='custom.mbutton'
            onClick={() =>
              editedEducationIndex === null
                ? handleAddEducation()
                : handleUpdateEducation()
            }
          >
            <Text color='custom.white'>
              {editedEducationIndex === null ? 'Save' : 'Update'}
            </Text>
          </Button>

            <Button  bgColor='custom.mbutton' onClick={handleCloseModal}> <Text color='custom.white'>Cancel</Text></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {educationData.map((education, index) => (
        <Card key={index} p={4} mt={4} boxShadow="md">
          <HStack>
          <Text fontSize="xl" fontWeight="bold">
            {education.Title} in {education.CompanyName}
          </Text>
          <Spacer/>
          <Button  onClick={() => handleEditEducation(index)} bgColor='custom.button' variant='solid' w='10%' >
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
          {education.Product && (
          <Text>I have built {education.Product}</Text>
          )}

          {education.Location &&
          (<Text>{education.Location}</Text>)}
            
          {education.startMonth && education.startYear && education.endMonth && education.endYear &&  (
              <Text>
                {education.startMonth}/{education.startYear} - {education.endMonth}/{education.endYear}
              </Text>
                )}
        </Card>
      ))}
      
    </Box>
  );
};

export default Experience;
