import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Divider, Box, Text, Image } from "@chakra-ui/react";
import { Button } from "@react-pdf-viewer/core";
import facebook from "../../images/facebook.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleOnclickSS = () => {
    navigate("/contest");
  };

  const handleAboutUs = () => {
    navigate("/aboutstartup");
  };

  const handlePrivacyPolicy = () => {
    navigate("/privacypolicy");
  };

  const handleCareers = () => {
    navigate("/career");
  };

  const handleContactUs = () => {
    navigate("/contactus");
  };

  return (
    <Flex
      flexDirection="column"
      padding="10px 0 0 0"
      bgGradient="linear(to top, custom.midnightBlue, custom.darkSlateBlue)"
    >
      <Button>
        <Text
          fontSize={{ base: "20px", md: "30px" }}
          fontFamily="monospace"
          width="100%"
          onClick={handleOnclickSS}
        >
          SourcedStartup
        </Text>
      </Button>
      <Divider backgroundColor="custom.white" width="90%" margin="auto" />
      <Flex
        display="flex"
        flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }}
        width={{ base: "100%", sm: "100%", md: "100%" }}
        justifyContent="center"
        alignItems="center"
        padding="20px"
      >
        <Box
          width={{ base: "100%", sm: "100%", md: "100%" }}
          margin={{ base: "20px 0", sm: "20px 0", md: "50px 0" }}
          display="flex"
          flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
          gap={{ base: "10px", md: "8%" }}
          justifyContent={{ base: "center", sm: "center", md: "center" }}
          fontSize={{ base: "12px", sm: "14px", md: "18px" }}
        >
          <Button onClick={handleAboutUs}>
            <Text fontWeight="600" fontSize="20px">
              About
            </Text>
          </Button>
          <Button onClick={handlePrivacyPolicy}>
            <Text fontWeight="600" fontSize="20px">
              Privacy Policy
            </Text>
          </Button>
          <Button onClick={handleCareers}>
            <Text fontWeight="600" fontSize="20px">
              Career
            </Text>
          </Button>
          <Button onClick={handleContactUs}>
            <Text fontWeight="600" fontSize="20px">
              Contact Us
            </Text>
          </Button>
        </Box>
        <Box
          width={{ base: "100%", sm: "100%", md: "100%", lg: "50%" }}
          margin={{ base: "20px 0", md: "50px 0" }}
          display="flex"
          flexDirection={{ base: "row", sm: "row", md: "row" }}
          gap={{ base: "3%", md: "3%" }}
          justifyContent={{ base: "center", md: "center" }}
          alignItems="center"
        >
          <Text
            marginBottom={{ base: "10px", md: "0" }}
            fontSize="18px"
            fontWeight="400"
          >
            Connect with us
          </Text>
          <Flex gap="10px">
            <Button>
              <Image
                src={facebook}
                backgroundColor="white"
                borderRadius="full"
                width="30px"
                height="30px"
              />
            </Button>
            <Button>
              <Image
                src={linkedin}
                backgroundColor="white"
                borderRadius="full"
                width="30px"
                height="30px"
              />
            </Button>
            <Button>
              <Image
                src={twitter}
                padding="2.5px"
                backgroundColor="white"
                borderRadius="full"
                width="30px"
                height="30px"
              />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
