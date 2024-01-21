import React, { useState } from "react";
import {
  Flex,
  Heading,
  PinInput,
  PinInputField,
  Button,
  Text,
  Box,
  HStack,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PasswordReset from "./PasswordReset";

const Authentication = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleChange = (value) => {
    // Allow only numeric input
    const sanitizedValue = value.replace(/\D/g, "");
    setOtp(sanitizedValue);
  };

  const handleSubmit = async () => {
    navigate("/account/password/confirm");
    try {
      // Add your OTP submission logic here, e.g., make an API call
      const response = await fetch("http://http:localhost:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      // Assuming the server responds with JSON
      const data = await response.json();

      // Handle the response data based on your server's API
      if (true) {
        navigate("/PasswordReset");
      } else {
        // Error: Handle the error response data
        console.error("OTP verification failed:", data.error);
      }

      // You can add additional logic or API calls here based on your needs
    } catch (error) {
      // Handle any network or other errors
      console.log("Error submitting OTP:");
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
        <Heading as="h2" size="lg" mt="12" align="center">
          OTP Verification
        </Heading>
        <Text mt="15" textAlign="center">
          Enter the 4-digit code sent to your email address
        </Text>
        <HStack ml="40px" mt="30px">
          <PinInput value={otp} onChange={(value) => handleChange(value)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Center mt="10">
          <Button colorScheme="blue" onClick={handleSubmit} w="240px">
            Submit
          </Button>
        </Center>
        <Center>
          <Button
            colorScheme="blue"
            variant="link"
            onClick={handleSubmit}
            mt="5"
            w="150px"
          >
            Resend OTP
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default Authentication;
