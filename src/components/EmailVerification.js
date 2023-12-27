import { ChakraProvider, Box, Input, Button, VStack, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from '../utils/api';
import { VERIFICATION } from "../utils/endpoints";

function EmailVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
        const otp_user = otp
        const response = await instance.post(VERIFICATION,{otp_user:otp}, {'Content-Type': 'application/json'})
        if(response.success)
        {
            navigate('/contest')
        }
        else
        {
            console.log('error')
        }
    } catch (error) {
      console.log(error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        boxShadow="lg"
        mt={8}
      >
        <Heading mb={4} textAlign="center">
          Email Verification
        </Heading>
        <VStack spacing={4}>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            textAlign="center"
          />
          <Button colorScheme="teal" onClick={handleSubmit} w="100%">
            Submit OTP
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default EmailVerification;
