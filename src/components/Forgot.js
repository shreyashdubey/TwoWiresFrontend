import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box,
  Button,
  ButtonGroup,
  Hide,
  Image,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import startup from "../images/startup.jpg";
import Signup from "./Signup";

function Forgot() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:3001/api/password/reset", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/authentication");
      } else {
        const data = await response.json();
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again later.");
    }
  };
  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box
        ml="10px"
        width="300px"
        height="400px"
        p="4"
        border="1px"
        borderColor="gray.200"
        borderRadius="8px"
        boxShadow="md"
      >
        <Text fontSize="20" fontWeight="i" mb="4" textAlign="center">
          Reset your password
        </Text>
        <Text fontSize="14" fontWeight="i" mt="10" textAlign="center">
          please enter your email linked with your account
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb="8" mt="20">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              bg="#F7FAFC"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            mt="15px"
            w="270px"
            padding="4px"
          >
            Send otp
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Forgot;
