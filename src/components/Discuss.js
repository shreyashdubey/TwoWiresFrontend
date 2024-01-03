
import React , {useState , useEffect   } from 'react';
import { useNavigate  , useLocation} from "react-router-dom";
import Scrollspy from 'react-scrollspy';
import { Box,
  Center,
  Image,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  Modal,
  TabPanel,
  TabPanels,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Spacer,
  Button,
  Input,
  Stack , Flex, FormControl, FormHelperText, FormLabel ,
  useDisclosure , Tag , TagCloseButton , TagLabel ,
} from '@chakra-ui/react';
import contest1 from './images/contest3.jpg'
import Layout from './DashBoard.js';
import OverviewSection from './OverviewSection.js';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { jwtDecode } from "jwt-decode";
import instance from '../utils/api'
import { Navigate, useParams } from 'react-router-dom';
import ContestLayout from './ContestLayout.js';
import { useToast } from '@chakra-ui/react'
import plus from './images/plus.png'


const Discuss = () => {
  // Assuming you have contest details available
  const location = useLocation();
  const variable= location.state;
  console.log(variable)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSkill, setNewSkill] = useState('');
  const [submittedSkills, setSubmittedSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [initialFetch, setInitialFetch] = useState(false);
  const toast = useToast()
  const handleSkillChange = () => {
    onOpen();
  };


  const fetchSkills = async () => {
    
  };

  useEffect(() => {
   
  }, []);
  
  const handleSaveSkill = async () => {
   
  };

  const handleRemoveSkill = async (index, skillId) => {
   
  };
  

  return (
    <>
        <ContestLayout/> 
        <Heading fontSize={20} color='custom.white'>
        Skills
      </Heading>
      <Box mt={4}  w={['250px' , '300px' , '320px' , '300px' , '500px' , '700px']} >
        <Box align='center'>
          <HStack align='flex-start' spacing={2} ml={2} flexWrap='wrap' >
            {submittedSkills.map((skill, index) => (
              <Tag key={index} bgColor='custom.darkSlateBlue' mb={2} size={'lg'} >
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

    </>    
  );
};

export default Discuss;
