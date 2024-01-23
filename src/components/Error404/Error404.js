import React from "react";
import { Image, Box, Text, Wrap, Stack } from "@chakra-ui/react";
import error404 from "../images/error404.png";
import Layout from "../DashBoard";
import { Button } from "@react-pdf-viewer/core";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Error404 = () => {
  const navigation = useNavigate();

  const handlebackToHomePage = () => {
    navigation("/contest");
  };

  return (
    <Layout>
      <Box>
        <Image
          objectFit="cover"
          margin="auto"
          maxHeight="450px"
          maxWidth="70%"
          src={error404}
          alt="Error 404"
        />
        <Wrap>
          <Text fontSize="40px" margin="auto" fontFamily="Fuzzy Bubbles">
            404: Cyber hiccup.
          </Text>
        </Wrap>
      </Box>
      <Stack fontSize="20px" color="custom.pureBlue">
        <Button onClick={handlebackToHomePage} size="lg">
          <ArrowBackIcon marginRight="10px"/>
          Back To HomePage
        </Button>
      </Stack>
    </Layout>
  );
};

export default Error404;
