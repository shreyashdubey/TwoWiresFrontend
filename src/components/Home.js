import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  useParams,
  Link as ChakraLink,
  Link,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../UserContext"; // Import the UserContext
import { Box } from "@chakra-ui/react";
import {
  Image,
  Stack,
  Text,
  Avatar,
  Flex,
  Spacer,
  Heading,
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaHome, FaEnvelope, FaBell, FaUser } from "react-icons/fa";
import TeamTab from "./Team";
import pixels from "./images/pixels.jpg";
import SkillComponent from "./SkillComponent";
import EducationComponent from "./EducationComponent";
import UserProfile from "./UserProfile";
import Layout from "./DashBoard.js";

const Home = () => {
  return (
    <Layout>
        <Box>{/* Your page content goes here */}</Box>
    </Layout>
  );
};

export default Home;
