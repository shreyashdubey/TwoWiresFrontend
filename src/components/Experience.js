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
  Heading
} from '@chakra-ui/react';
import { FaItalic } from 'react-icons/fa';

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
    handleCloseModal();
  };

  return (
    <Box  mt={2}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Experience
      </Text>
      <Button onClick={handleOpenModal}>Add Experience</Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                value={newEducation.Title}
                onChange={(e) => handleInputChange('Title', e.target.value)}
              />
              <Input
                placeholder="EmploymentType"
                value={newEducation.EmploymentType}
                onChange={(e) => handleInputChange('EmploymentType', e.target.value)}
              />
              <Input
                placeholder="CompanyName"
                value={newEducation.CompanyName}
                onChange={(e) => handleInputChange('CompanyName', e.target.value)}
              />
              <Heading>Product</Heading>
              <Text >Add your company’s products that you focus on (e.g. build, sell, or support) in this role.</Text>
               <Input
                placeholder="Product"
                value={newEducation.Product}
                onChange={(e) => handleInputChange('Product', e.target.value)}
              />
              <Input
                placeholder="Location"
                value={newEducation.Location}
                onChange={(e) => handleInputChange('Location', e.target.value)}
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
            {education.Title} in {education.CompanyName}
          </Text>
          <Text>I have built {education.Product}</Text>
          <Text>{education.Location}</Text>
          <Text>
            {education.startMonth}/{education.startYear} - {education.endMonth}/{education.endYear}
          </Text>
        </Card>
      ))}
    </Box>
  );
};

export default Experience;
