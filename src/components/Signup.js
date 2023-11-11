import React, { useState } from 'react';
import { Button, Input, Text, Link as ChakraLink, Flex, Box, FormControl, FormLabel  , Image } from '@chakra-ui/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { useNavigate } from "react-router-dom";

import instance from '../utils/api';
import { LOGIN, SIGNUP } from '../utils/endpoints';

import startup from '../images/startup.jpg'
import { Show, Hide } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/react";
import Login from './login'

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isBelow500px] = useMediaQuery("(max-width: 500px)");
  const [isabove1000px] = useMediaQuery("(max-Hight: 900px)");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
        // If it's the final step, submit the form
        console.log("Just for a check");
        // const response = await fetch('http://localhost:3001/api/users/signup', {
        //   method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        //   body: JSON.stringify(formData),
        // });

        const response = await instance.post(SIGNUP,formData, {'Content-Type': 'application/json'})
        const data = response;
        const { success, message } = data;
        
        if (success) {
          alert(message);
          navigate("/home");
        } else {
          // Signup failed
          alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
      console.log(error)
      alert('An error occurred during signup. Please try again later.');
    }
  };

  if (user) {
    navigate("/home");
  }

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
          width={isBelow500px ? "100%" : "300px"}
          hight={isabove1000px? "550" : "100%"}
          p="4"
          border="1px"
          borderColor="gray.200"
          borderRadius="8px"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="i" mb="4" textAlign="center">
            Sparrow
          </Text>
          <Text fontSize="sm" mb="4" textAlign="center">
            Sign up for the entrepreneurial haven
          </Text>
          <GoogleOAuthProvider clientId="632513094925-n7la27bd3ocj32qnue8v0asa954ds9t8.apps.googleusercontent.com">
            <GoogleLogin setUser={setUser}></GoogleLogin>
          </GoogleOAuthProvider>
          <Text fontSize="ms" mb="2" textAlign="center">
            or
          </Text>
           <form onSubmit={handleSubmit}>
          <FormControl mb="3">
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              bg = '#F7FAFC'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="3">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              bg = '#F7FAFC'
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
              bg = '#F7FAFC'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mb="3">
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              bg = '#F7FAFC'
              value={formData.confirmPassword}
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
          <Button type="submit" colorScheme="blue" mt="15px" w='270px' padding="4px">
               Sign up
          </Button>

        </form>
          <Text mt="4" textAlign="center">
            Have an account?{' '}
            <ChakraLink href='Login' color="blue.500">
              Sign in
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
