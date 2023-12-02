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
  Image ,
} from '@chakra-ui/react';
import plus from './images/plus.png'
import theme from '../utils/color';
const SkillComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSkill, setNewSkill] = useState('');
  const [submittedSkills, setSubmittedSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSkillChange = () => {
    onOpen();
  };

  const handleSaveSkill = () => {
    // Implement logic to post newSkill to the server
    if (!newSkill) {
      setErrorMessage('Skill is required');
      return; // Prevent form submission
    }
    console.log('Skill saved:', newSkill);
    setSubmittedSkills([...submittedSkills, newSkill]);
    setNewSkill('');
    setErrorMessage('');
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
        <Button mt={2} onClick={handleSkillChange} bgColor='custom.button' > 
          <Image
          boxSize='25px'
          objectFit='cover'
          src={plus}
          alt='plus'
          />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={() => {
          setNewSkill('');
          setErrorMessage('');
          onClose();
        }}>
        <ModalOverlay />
        <ModalContent bgColor='custom.mccolor'>
          <ModalHeader color='custom.white'>Change Skill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter your new skill"
              _placeholder={{ color: 'custom.white' }} 
              color = 'custom.white'
              value={newSkill}
              isRequired = 'true'
              onChange={(e) => setNewSkill(e.target.value)}
            />
            {!newSkill && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  {errorMessage}
                </Text>
              )}
          </ModalBody>

          <ModalFooter>
            <Button bgColor='custom.mbutton' mr={3} onClick={handleSaveSkill}>
                <Text color='custom.white'>Save</Text>
            </Button>
            <Button bgColor='custom.mbutton' onClick={onClose}><Text color='custom.white'>Cancel</Text></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SkillComponent;
