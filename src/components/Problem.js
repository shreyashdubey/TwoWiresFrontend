import {Box, Input, Button, VStack , Text } from "@chakra-ui/react";
import React, { useState } from "react";

function Problem() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Do something with the input value (you can add your logic here)
    console.log("Input Value:", inputValue);
  };

  return (
   
      <Box p={8}>
        <VStack spacing={4}>
           <Text>Write down the problems or ideas that you would like entrepreneurs to execute</Text> 
          <Input
            placeholder="Enter something..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button colorScheme="teal" onClick={handleButtonClick}>
            Submit
          </Button>
        </VStack>
      </Box>
  );
}

export default Problem;
