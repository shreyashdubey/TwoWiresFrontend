import React from "react";
import { Text, Flex, WrapItem } from "@chakra-ui/react";
import Layout from "../../DashBoard";

const ContactUs = () => {
  return (
    <Layout>
      <Flex
        flexDirection="row"
        gap="50px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex flexDirection="column" gap="10px">
          <Text>Name: Mohd Faeiz</Text>
          <Text>Email: .....</Text>
          <Text>Position: Founder</Text>
        </Flex>
        <Flex flexDirection="column" gap="10px">
          <Text>Name: Shreyash Dubey</Text>
          <Text>Email: .....</Text>
          <Text>Position: Co-Founder</Text>
        </Flex>
        <Flex flexDirection="column" gap="10px">
          <Text>Name: Shrey Trivedi</Text>
          <Text>Email: .....</Text>
          <Text>Position: Developer</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ContactUs;
