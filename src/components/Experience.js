import React, { useState } from 'react';
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

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [newEducation, setNewEducation] = useState({
    Title: '',
    EmploymentType: '',
    CompanyName: '',
    Location : '' ,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    Product : '' ,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 80 }, (_, index) => index + 1960);

  const [editedEducationIndex, setEditedEducationIndex] = useState(null);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  
  const handleCloseModal = () => {
    setNewEducation({
      Title: '',
      EmploymentType: '',
      CompanyName: '',
      Location : '' ,
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

  const handleAddEducation = () => {
    if (!newEducation.Title && !newEducation.CompanyName) {
      setErrorMessage(' is required');
      return; // Prevent form submission
    }
    if (editedEducationIndex !== null) {
      educationData[educationData.length] = newEducation;
    } else {
      setEducationData([...educationData, newEducation]);
    }
    setNewEducation({
        Title: '',
        EmploymentType: '',
        CompanyName: '',
        Location : '' ,
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        Product : ''
    });
    setEditedEducationIndex(null)
    setErrorMessage('');
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
  
    // Remove the existing education data from the array
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
    
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
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
              <Input
                placeholder="EmploymentType"
                _placeholder={{ color: 'custom.white' }} 
                color = 'custom.white'
                value={newEducation.EmploymentType}
                onChange={(e) => handleInputChange('EmploymentType', e.target.value)}
              />
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
            <Button bgColor='custom.mbutton' onClick={handleAddEducation}>
               <Text color='custom.white'>Save</Text>
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
