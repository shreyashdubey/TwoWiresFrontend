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
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
  HStack,
  Heading,
  Text ,
} from '@chakra-ui/react';
import theme from '../utils/color';
const SkillComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSkill, setNewSkill] = useState('');
  const [submittedSkills, setSubmittedSkills] = useState([]);

  const handleSkillChange = () => {
    onOpen();
  };

  const handleSaveSkill = () => {
    // Implement logic to post newSkill to the server
    console.log('Skill saved:', newSkill);
    setSubmittedSkills([...submittedSkills, newSkill]);
    setNewSkill('');
    onClose();
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...submittedSkills];
    updatedSkills.splice(index, 1);
    setSubmittedSkills(updatedSkills);
  };

  return (
    <Box>
      <Heading fontSize={20} color='custom.white'>Skills</Heading>
      <Box mt={4} w = '30%'>
        <Box align="center">
          <HStack align="flex-start" spacing={2} ml={2} flexWrap="wrap">
            {submittedSkills.map((skill, index) => (
              <Tag key={index} colorScheme="teal" mb={2}>
                <TagLabel>{skill}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveSkill(index)} />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Button mt={2} onClick={handleSkillChange} bgColor='custom.darkSlateBlue' > 
           <Text color='custom.white'>Change</Text>
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Skill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter your new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveSkill}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SkillComponent;
