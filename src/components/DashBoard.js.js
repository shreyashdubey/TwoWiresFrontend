import React, { useEffect, useState } from 'react';
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
  Image
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaHome, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import trophy from './images/trophy.png'

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


  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/about':
        setActiveTab(1);
        break;
      case '/team':
        setActiveTab(3)  
        break;
      case '/contest':
        setActiveTab(0)  
        break;  
    }
  }, [location]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex
      bg="green.100"
      h='55px'
      align="center"
      style={{ position: 'sticky', top: '0', zIndex: 1000 }}
      as="header"
      width="100%"
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Heading ml={8} fontSize={30} fontWeight={10}>
        SourcedStartup
      </Heading>
      <InputGroup w="250px" ml="20px" borderColor="blackAlpha.400" left="400px">
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={SearchIcon} color="black.300" />}
        />
        <Input type="text" placeholder="Search..." color="blackAlpha.300" />
      </InputGroup>
      <Tabs
        ml={5}
        mt="20px"
        left="750px"
        index={activeTab}
        onChange={handleTabChange}
      >
        <TabList>
        <Tab  onClick={handleContestTabClick}>
          <Image
            boxSize='25px'
            objectFit='cover'
            src={trophy}
            alt='Dan Abramov'
          />
          </Tab>
          <Tab  onClick={handleUserTabClick}>
              <FaUser size={20} />
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
    <Flex direction="column" minHeight='100vh' >
      <DashBoard />
      {children}
    </Flex>
  );
};

export default Layout;
