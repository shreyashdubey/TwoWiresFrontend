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
  NumberInputStepper
} from '@chakra-ui/react';

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

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };

  const handleAddEducation = () => {
    setEducationData([...educationData, newEducation]);
    setNewEducation({
      college: '',
      degree: '',
      fieldOfStudy: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    });
    handleCloseModal();
  };

  return (
    <Box  mt={5}>
      <Text fontSize="xl" fontWeight="bold" mb={4} bgColor='custom.darkSlateBlue' color='custom.white' w='14%'>
        Education
      </Text>
      <Button onClick={handleOpenModal} bgColor='custom.darkSlateBlue'><Text color='custom.white'>Add Education</Text></Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Education</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="College"
                value={newEducation.college}
                onChange={(e) => handleInputChange('college', e.target.value)}
              />
              <Input
                placeholder="Degree"
                value={newEducation.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
              />
              <Input
                placeholder="Field of Study"
                value={newEducation.fieldOfStudy}
                onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
              />
              <Box position="relative" h="100vh" >
                 <SimpleGrid gap={12} p={12} columns={2}>
                   <Box >
                      <NumberInput variant="filled" min={1} max={12}>
                        <NumberInputField placeholder="month" 
                        value={newEducation.startMonth}
                        onChange={(e) => handleInputChange('startMonth', e.target.value)}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
             <Box >
              <NumberInput variant="filled" min={1970} max={2023}>
                <NumberInputField placeholder="year" 
                value={newEducation.startYear}
                onChange={(e) => handleInputChange('startYear', e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          <Box >
            <NumberInput variant="filled" min={1} max={12}>
              <NumberInputField placeholder="month" 
              value={newEducation.endMonth}
              onChange={(e) => handleInputChange('endMonth', e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box >
            <NumberInput variant="filled" min={1970} max={2023}>
              <NumberInputField placeholder="year" 
              value={newEducation.endYear}
              onChange={(e) => handleInputChange('endYear', e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </SimpleGrid>
      </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddEducation}>
              Save
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {educationData.map((education, index) => (
        <Card key={index} p={4} mt={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">
            {education.degree} in {education.fieldOfStudy}
          </Text>
          <Text>{education.college}</Text>
          <Text>
            {education.startMonth}/{education.startYear} - {education.endMonth}/{education.endYear}
          </Text>
        </Card>
      ))}
    </Box>
  );
};

export default EducationComponent;
