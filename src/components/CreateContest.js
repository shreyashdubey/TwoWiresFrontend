import {
    Box,
    IconButton,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    SimpleGrid,
    useColorMode,
    Text
  } from "@chakra-ui/react";
  import { FaMoon, FaSun } from "react-icons/fa";
  
  export default function CreateConcept() {
  
    return (
      <Box position="relative" h="100vh" >
        <SimpleGrid gap={12} p={12} columns={2}>
          <Box >
           
            <NumberInput variant="filled" min={1} max={12}>
              <NumberInputField placeholder="month" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box >
           
            <NumberInput variant="filled" min={1970} max={2023}>
              <NumberInputField placeholder="year" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box >
            
            <NumberInput variant="filled" min={1} max={12}>
              <NumberInputField placeholder="month" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box >
            
            <NumberInput variant="filled" min={1970} max={2023}>
              <NumberInputField placeholder="year" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </SimpleGrid>
      </Box>
    );
  }