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
import Forgot from "./Forgot";

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isBelow500px] = useMediaQuery("(max-width: 500px)");
  const [isabove1000px] = useMediaQuery("(max-Hight: 900px)");
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/home");
    try {
      const response = await fetch("http://localhost:3001/api/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Password changes");
        navigate("/home");
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
        <Text fontSize="2xl" fontWeight="i" mb="4" textAlign="center">
          Sparrow
        </Text>
        <Text fontSize="13.5px" mt="2" textAlign="center">
          change your password
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb="3" mt="20">
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              bg="#F7FAFC"
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
              placeholder="confirmPassword"
              bg="#F7FAFC"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            mt="30px"
            w="270px"
            type="Submit"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            align="center"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default PasswordReset;
