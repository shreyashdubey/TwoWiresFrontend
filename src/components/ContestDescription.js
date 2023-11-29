// ContestDetailsPage.js
import React , {useState , useEffect } from 'react';
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
  Input,} from '@chakra-ui/react';
import contest1 from './images/contest3.jpg'

const ContestDiscription = () => {
  // Assuming you have contest details available
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubmissionTab, setShowSubmissionTab] = useState(false);
  const [hideJoinButton, setHideJoinButton] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [file, setFile] = useState(null);
 





  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleAcceptClick = () => {
    setIsModalOpen(false);
    setShowSubmissionTab(true);
    setHideJoinButton(true);
  };


  const contestDetails = {
    name: 'Contest Name',
    description: 'Short description of the problem goes here.',
    prize: '$1000',
    monthsLeft: 2,
    imageSrc: contest1, // Replace with the actual image source
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = () => {
    // You can now use the 'file' state to upload the file to your backend server
    // Implement your file upload logic here
    console.log('File submitted:', file);
  };

  return (
    <>
        <Box
        backgroundImage={`url(${contestDetails.imageSrc})`}
        backgroundSize="cover"
        backgroundPosition="center"
        ml='175px'
        backgroundRepeat="no-repeat"
        mt='100px'
        w="75%"
        h="35vh"  // Adjust the height as needed
        position="relative"
        borderRadius='10px'
        >
        <Center h="100%">
            <VStack spacing={4} align="center" color="white" textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)">
            <Text fontSize="xl" fontWeight="bold">
                {contestDetails.name}
            </Text>
            <Text>{contestDetails.description}</Text>
            <Text fontSize="lg">Prize: {contestDetails.prize}</Text>
            <Text fontSize="lg">Time Left: {contestDetails.monthsLeft} Months</Text>
            </VStack>
        </Center>
        </Box>
        <Box p={4} bg="gray.100" w = '75%'  ml='175px'>
            <HStack>
                <Tabs w = '20%'>
                    <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Leaderboard</Tab>
                    </TabList>
                </Tabs>
                <Spacer/>
                {!hideJoinButton && (
        <Button colorScheme="teal" onClick={handleJoinClick}>
          Join Competition
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Competition Rules</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add competition rules content here */}
            <p>Rules go here.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAcceptClick}>
              I Understand and Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showSubmissionTab && (
        <>
          <Tabs>
            <TabList>
              <Tab>Submission</Tab>
            </TabList>
          </Tabs>
          <Input type="file" onChange={handleFileChange} mt={2} w='10%' />
          <Button colorScheme="teal" mt={2} onClick={handleFileSubmit}>
            Submit
          </Button>
        </>
      )}
            </HStack>    
        </Box>

    </>
  );
};

export default ContestDiscription;
