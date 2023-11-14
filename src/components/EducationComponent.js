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
    <Box  mt={2}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Education
      </Text>
      <Button onClick={handleOpenModal}>Add Education</Button>

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
              <HStack>
                <Select
                  placeholder="Start Month"
                  value={newEducation.startMonth}
                  onChange={(e) => handleInputChange('startMonth', e.target.value)}
                >
                  {/* Include your month options here */}
                </Select>
                <NumberInput
                  placeholder="Start Year"
                  value={newEducation.startYear}
                  onChange={(value) => handleInputChange('startYear', value)}
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
              <HStack>
                <Select
                  placeholder="End Month"
                  value={newEducation.endMonth}
                  onChange={(e) => handleInputChange('endMonth', e.target.value)}
                >
                  {/* Include your month options here */}
                </Select>
                <NumberInput
                  placeholder="End Year"
                  value={newEducation.endYear}
                  onChange={(value) => handleInputChange('endYear', value)}
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
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
            {education.startMonth} {education.startYear} - {education.endMonth} {education.endYear}
          </Text>
        </Card>
      ))}
    </Box>
  );
};

export default EducationComponent;
