import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Divider,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { Button } from "@react-pdf-viewer/core";
import facebook from "../../images/facebook.png";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";



const Footer = () => {

  const navigate = useNavigate();

  const handleOnclickSS = () => {
    navigate("/contest")
  }

  const handleAboutUs = () => {
    navigate("/aboutstartup")
  }

  return (
    <Flex flexDirection="column" padding="20px 0 0 0" bgGradient="linear(to top, custom.midnightBlue, custom.darkSlateBlue)">
      {/* <Text
        display="flex"
        justifyContent="center"
        letterSpacing="1px"
        fontSize="20px"
      >
        Chasing dreams in small steps.
      </Text> */}

      <Button>
        <Text
        marginLeft="-36%"
          fontSize="30"
          fontFamily="monospace"
          width="100%"
          onClick={handleOnclickSS}
        >
          SourcedStartup
        </Text>
      </Button>
      <Divider backgroundColor="custom.white" width="90%" margin="auto" />
      <Flex width="100%">
        <Box
          width="50%"
          margin="50px auto"
          display="flex"
          flexDirection="row"
          gap="8%"
          justifyContent="center"
          fontSize="18px"
        >
          <Button onClick={handleAboutUs}>
            <Text fontWeight="600" fontSize="20px">About</Text>
          </Button>
          <Button>
            <Text fontWeight="600" fontSize="20px">Privacy Policy</Text>
          </Button>
          <Button>
            <Text fontWeight="600" fontSize="20px">Career</Text>
          </Button>
          <Button>
            <Text fontWeight="600" fontSize="20px">Contact Us</Text>
          </Button>
        </Box>
        <Box
          width="40%"
          margin="50px auto"
          display="flex"
          flexDirection="row"
          gap="2%"
          justifyContent="center"
          alignItems="center"
        >
          <Text marginRight="30px" fontSize="18px" fontWeight="400">Connect with us</Text>
          <Button>
            <Image src={facebook} backgroundColor="white" borderRadius="full" width="30px" height="30px"/>
          </Button>
          <Button>
            <Image src={linkedin} backgroundColor="white" borderRadius="full" width="30px" height="30px"/>
          </Button>
          <Button>
            <Image src={twitter} padding="2.5px" backgroundColor="white" borderRadius="full" width="30px" height="30px"/>
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
