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
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import { ADD_SKILL } from '../utils/endpoints';
import { GET_ALL_SKILL } from '../utils/endpoints';
import { DELETE_SKILL } from '../utils/endpoints';

const SkillComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSkill, setNewSkill] = useState('');
  const [submittedSkills, setSubmittedSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [initialFetch, setInitialFetch] = useState(false);
  const handleSkillChange = () => {
    onOpen();
  };


  const fetchSkills = async () => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;

      const response = await instance.get(`${GET_ALL_SKILL}?user=${userId}&page=1&pageSize=10`);

      if (response.skillEntries) {
        setSubmittedSkills(response.skillEntries);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  useEffect(() => {
    if (!initialFetch) {
      // Fetch education entries only when initialFetch is false
      fetchSkills();
      setInitialFetch(true); // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);
  
  const handleSaveSkill = async () => {
    if (!newSkill) {
      setErrorMessage('Skill is required');
      return; // Prevent form submission
    }

    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id
      const skillName = newSkill
      const response = await instance.post(ADD_SKILL,{skillName , userId}, {'Content-Type': 'application/json'})

      if (response.success) {
        // Update the UI with the new skill
        setNewSkill('');
        setErrorMessage('');
        onClose();
        setInitialFetch(false)
      } else {
        // Handle error from the server
        setErrorMessage('Failed to add skill. Please try again.');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleRemoveSkill = async (index, skillId) => {
    try {

      const skillId = submittedSkills[index]._id;
      const response = await instance.delete(`${DELETE_SKILL}/${skillId}`);

      if (response.success) {
        // Update the UI to remove the deleted skill
        setInitialFetch(false)
      } else {
        // Handle error from the server
        console.error('Failed to delete skill. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <Box>
      <Heading fontSize={20} color='custom.white'>
        Skills
      </Heading>
      <Box mt={4} w='65%'>
        <Box align='center'>
          <HStack align='flex-start' spacing={2} ml={2} flexWrap='wrap' >
            {submittedSkills.map((skill, index) => (
              <Tag key={index} bgColor='custom.darkSlateBlue' mb={2}>
                <TagLabel>{skill.skillName}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveSkill(index)} />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Button mt={2} onClick={handleSkillChange} bgColor='custom.button'>
          <Image boxSize='25px' objectFit='cover' src={plus} alt='plus' />
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
