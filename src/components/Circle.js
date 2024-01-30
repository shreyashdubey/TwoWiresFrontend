import React from "react";
import { Box } from "@chakra-ui/react";

const Circl = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      background="#162434"
    >
      <Box
        position="relative"
        width="100px"
        height="100px"
        borderRadius="50%"
        background="linear-gradient(#00FF00, #00FF00, #00FF00)"
        animation="animate 1s linear infinite"
      >
        {[1, 2, 3, 4].map((index) => (
          <Box
            key={index}
            position="absolute"
            width="100px"
            height="100px"
            borderRadius="50%"
            background="linear-gradient(#00b2ff, #00b2ff, #6bff6b)"
            filter={`blur(${index * 5}px)`}
          />
        ))}
        <Box
          content=""
          position="absolute"
          top="10px"
          left="10px"
          right="10px"
          bottom="10px"
          background="#162434"
          borderRadius="50%"
        />
      </Box>
    </Box>
  );
};

export default Circl;
