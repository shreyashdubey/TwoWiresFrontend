import React, { useEffect, useState  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image ,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import trophy from './images/trophy.png'
import theme from '../utils/color';
import user from './images/home.png'

const DashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState();

  const handleUserTabClick = () => {
    navigate('/about');
  };

  const handleContestTabClick = () => {
    navigate('/contest');
  };

  const handleUserContestTabClick = () => {
    navigate('/createcompetition');
  };


  useEffect(() => {
    const { pathname, params } = location;
    
    // Check if the pathname matches the expected pattern
    const match = pathname.match(/^\/discription\/(.+)\/(\d+)$/);
    
    if (match) {
      // Extract the contestId and tabIndex from the matched groups
      const contestId = match[1];
      const tabIndex = match[2];
  
      // Set activeTab to 2 if the route matches
      if (contestId && tabIndex) {
        setActiveTab(2);
      }
    } else {
      // Handle other routes if needed
      switch (pathname) {
        case '/about':
          setActiveTab(1);
          break;
        case '/team':
          setActiveTab(3);
          break;
        case '/contest':
          setActiveTab(0);
          break;
        case '/createcompetition':
          setActiveTab(2);
          break;
        default:
          // Set a default value if no match is found
          setActiveTab(0);
          break;
      }
    }
  }, [location]);
  

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex
      bgColor = 'custom.charcoal'
      h='55px'
      align="center"
      style={{ position: 'sticky', top: '0', zIndex: 1000 }}
      as="header"
      width="100%"
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Heading ml={8} fontSize={30} fontWeight={10} color='custom.white'>
      <ChakraLink href="/contest"   _hover={{ textDecoration: 'none' }} >
          SourcedStartup
       </ChakraLink>
      </Heading>
      <InputGroup w="250px" ml="20px" bgColor="custom.darkStateBlue" left="400px">
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={SearchIcon} bgcolor="#custom.darkStateBlue" />}
        />
        <Input type="text" placeholder="Search..." color="custom.white" />
      </InputGroup>
      <Tabs
        ml={5}
        mt="20px"
        left="750px"
        index={activeTab}
        onChange={handleTabChange}
        Color='custom.darkStateBlue'
      >
        <TabList>
        <Tab  onClick={handleContestTabClick} Color='custom.darkStateBlue'>
          <Image
            boxSize='25px'
            objectFit='cover'
            src={trophy}
            alt='Dan Abramov'
            border='5px' // Adjust the border width as needed
            borderColor='custom.white'
          />
          </Tab>
          <Tab  onClick={handleUserTabClick}>
          <Image
            boxSize='25px'
            objectFit='cover'
            src={user}
            alt='Dan Abramov'
            border='5px' // Adjust the border width as needed
            borderColor='custom.white'
          />
          </Tab>
          <Tab  onClick={handleUserContestTabClick}>
          <Image
            boxSize='25px'
            objectFit='cover'
            src={user}
            alt='Dan Abramov'
            border='5px' // Adjust the border width as needed
            borderColor='custom.white'
          />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight='100vh' bgColor="custom.midnightBlue">
      <DashBoard />
      {children}
    </Flex>
  );
};

export default Layout;
