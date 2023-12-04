import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Text, Flex, Box } from '@chakra-ui/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { Button, ButtonGroup , Hide , Image , Link as ChakraLink , useMediaQuery ,useColorMode ,ColorModeScript} from '@chakra-ui/react'
import startup from '../images/startup.jpg'
import Forgot from './Forgot'
import instance from '../utils/api';
import { LOGIN, SIGNUP } from '../utils/endpoints';
import theme from '../utils/color';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isBelow500px] = useMediaQuery("(max-width: 500px)");
    const [isabove1000px] = useMediaQuery("(max-Hight: 900px)");
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const { toggleColorMode } = useColorMode();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
 
    const handleLoginClick = () => {
      // Perform login logic here if needed
      // Then toggle the color mode
      toggleColorMode();
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post(LOGIN,formData, {'Content-Type': 'application/json'})
            const { accessToken, userId} = response;
            if (accessToken) {
              localStorage.setItem("ACCESS_TOKEN", accessToken)
              localStorage.setItem("USER_ID", userId)
                alert('Login successful');
                navigate('/contest');
            } else{
                alert('Login failed. Please try again.');
            }
        } catch (error) {
          console.log(error);
          alert("An error occurred during signup. Please try again later.");
        }
    };

    if (user) {
        window.location.href = '/home';
    }

  useEffect(() => {
    window.otpless = (otplessUser) => {
      alert(JSON.stringify(otplessUser));
    };
  }, []);
	

    return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="100vh"
        >
          <Flex direction="row" align="center" justify="center">
            <Hide below='500px'>
              <Image src={startup} alt="Your Image" width = "300px" height="550px" objectFit="cover" borderRadius="8px" mr = '10px' /> {/* Replace with your actual image component */}
            </Hide>
            <Box
              ml = "10px"
              width="300px"
              height="550px"
              p="4"
              border="1px"
              borderColor="gray.200"
              borderRadius="8px"
              boxShadow="md"
            >
              <Text fontSize="2xl" fontWeight="i" mb="4" textAlign="center">
                Sparrow
              </Text>
               <form  onSubmit={handleSubmit}>
              <FormControl mb="3" mt = "20">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl mb="3">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Text fontSize="13.5px" mt="2" textAlign="center">
                  By signing up you agree to our{' '}
                  <ChakraLink href="/terms" color="blue.500">
                    Terms and Conditions
                  </ChakraLink>{' '}
                  and{' '}
                  <ChakraLink href="/privacy" color="blue.500">
                    Privacy Policy
                  </ChakraLink>
              </Text>
              <Button type="submit" colorScheme="blue" mt="15px" w='270px' padding="4px" >
              Log in
               </Button>
    
            </form>
            <Text fontSize="ms" mb="2" textAlign="center">
                or
            </Text>
            <GoogleOAuthProvider clientId="632513094925-n7la27bd3ocj32qnue8v0asa954ds9t8.apps.googleusercontent.com">
                <GoogleLogin setUser={setUser}></GoogleLogin>
            </GoogleOAuthProvider>
            <Text mt="8" textAlign="center">
                <ChakraLink href = "account/password/reset" color="grey" fontSize='13.5'>
                    forgotten your password?
                </ChakraLink>
              </Text>
              <Text mt="8" textAlign="center">
                Don't Have an account?{' '}
                <ChakraLink href = "Signup" color="blue.500">
                  Sign up
                </ChakraLink>
              </Text>
            </Box>
          </Flex>
        </Flex>
      );
    };

export default Login;
