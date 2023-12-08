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
import Layout from './DashBoard.js';
import OverviewSection from './OverviewSection.js';

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
    <Layout>
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
        <Box p={4} bg="gray.100" w = '75%'  ml='175px' bgColor='darkSlateBlue'>
            <HStack>
                <Tabs w = '20%'>
                    <TabList>
                    <Tab><Text color='custom.white'>Overview</Text></Tab>
                    <Tab><Text color='custom.white'>Leaderboard</Text></Tab>
                    </TabList>
                </Tabs>
                <Spacer/>
                {!hideJoinButton && (
        <Button bgColor='custom.button' onClick={handleJoinClick}>
          <Text  color='custom.white' >Join Competition</Text>
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Competition Rules</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add competition rules content here */}
            <p><Text color='custom.white'></Text>Rules go here.</p>
          </ModalBody>
          <ModalFooter>
            <Button bgColor='custom.button' mr={3} onClick={handleAcceptClick}>
            <Text color='custom.white'></Text>I Understand and Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showSubmissionTab && (
        <>
          <Tabs>
            <TabList>
              <Tab><Text color='custom.white'>Submission</Text></Tab>
            </TabList>
          </Tabs>
          <Input type="file" onChange={handleFileChange} mt={2} w='10%' />
          <Button colorScheme="teal" mt={2} onClick={handleFileSubmit}>
            <Text color='custom.white'>Submit</Text>
          </Button>
        </>
      )}
            </HStack>    
        </Box>
        <Box w='75%' ml='165px'>
      <OverviewSection/>  
      </Box>

    </Layout>
  );
};

export default ContestDiscription;
