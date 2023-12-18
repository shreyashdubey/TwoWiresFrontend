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
import StartFieldBg from './StartFeild';


const Login = ( ) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isBelow500px] = useMediaQuery("(max-width: 500px)");
    const [isabove1000px] = useMediaQuery("(max-Hight: 900px)");
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const { toggleColorMode } = useColorMode();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
       
        setErrorMessage('');
        if (name === 'email') {
          setEmailError(false);
        } else if (name === 'password') {
          setPasswordError(false);
        }
        
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
            const { accessToken , refreshToken} = response;
            if (accessToken) {
              localStorage.setItem("ACCESS_TOKEN", accessToken)
              localStorage.setItem("REFRESH_TOKEN", refreshToken)
                navigate('/contest');
            } else{
                alert('Login failed. Please try again.');
            }
        } catch (error) {
          if (error.response) {
            // Handle specific error messages from the backend
            const { errors } = error.response.data;
            const errorMessage = errors[0].msg;
            setErrorMessage(errorMessage);
    
            // Set error styling for email or password
            if (errorMessage === 'Invalid credentials') {
              setPasswordError(true);
            }
          } else {
            alert('An error occurred during login. Please try again later.');
          }
        
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
      <StartFieldBg>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="100vh"
          position="relative" 
        >
          <Flex direction="row" align="center" justify="center"   position="relative" 
              zIndex="1000"  >
            <Hide below='500px'>
              <Image src={startup} alt="Your Image" width = "300px" height="550px" objectFit="cover" borderRadius="8px" mr = '10px'  /> {/* Replace with your actual image component */}
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
                Sourced Startup
              </Text>
               <form  onSubmit={handleSubmit}  >
              <FormControl mb="3" mt = "20">
                <Input
                  type="email"
                  id="email-id"
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
                  id="password-id"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={passwordError}
                  required
                />
                 {passwordError && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    {errorMessage}
                  </Text>
                )}
              </FormControl>
              
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
                <ChakraLink href = "/" color="blue.500">
                  Sign up
                </ChakraLink>
              </Text>
            </Box>
          </Flex>
        </Flex>
        </StartFieldBg>
      );
    };

export default Login;
