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
  NumberInputStepper ,
  Grid ,
  Flex ,
  Image, 
  Spacer,
} from '@chakra-ui/react';
import plus from './images/plus.png'
import edit from './images/edit.png'
import remove from './images/delete.png'

const EducationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [newEducation, setNewEducation] = useState({
    college: '',
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
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setNewEducation({
      college: '',
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

  const handleAddEducation = () => {
    if (!newEducation.college) {
      setErrorMessage('College name is required');
      return; // Prevent form submission
    }
    if (editedEducationIndex !== null) {
      educationData[educationData.length] = newEducation;
    } else {
      setEducationData([...educationData, newEducation]);
    }
    

    setNewEducation({
      college: '',
      degree: '',
      fieldOfStudy: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    });
    setErrorMessage('');
    setEditedEducationIndex(null)
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
    <Box  mt={5}>
      <Text fontSize="xl" fontWeight="bold" mb={4} bgColor='custom.darkSlateBlue' color='custom.white' w='14%'>
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

      <Modal isOpen={isOpen} onClose={handleCloseModal} >
        <ModalOverlay />
        <ModalContent bgColor='custom.mccolor'>
          <ModalHeader color='custom.white'>Add Education</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
            <Flex  direction="column" align="flex-start" w='100%'>
              <Input
                placeholder="College"
                color='custom.white'
                value={newEducation.college}
                isRequired={true}
                onChange={(e) => handleInputChange('college', e.target.value)}
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
                       color = 'custom.white'
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
            <Button bgColor='custom.mbutton' onClick={handleAddEducation}>
                <Text color='custom.white'>Save</Text>
            </Button>
            <Button bgColor='custom.mbutton' onClick={handleCloseModal}><Text color='custom.white'>Cancel</Text></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {educationData.map((education, index) => (
        <Card key={index} p={4} mt={4} boxShadow="md">
             <HStack>
             
             {education.degree && education.fieldOfStudy && (
              <Text fontSize="xl" fontWeight="bold">
                {education.degree} in {education.fieldOfStudy}
              </Text>
                )}
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

          <Text>{education.college}</Text>
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

export default EducationComponent;
