import React from "react";
import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import Layout from "../../DashBoard";

const Career = () => {
  return (
    <Layout>
      <Wrap>
        <WrapItem>
          <Text>Front-end Team</Text>
        </WrapItem>
        <WrapItem>
          <Text>Backend Team</Text>
        </WrapItem>
        <WrapItem>
          <Text>UI/UX Team</Text>
        </WrapItem>
        <WrapItem>
          <Text>Data Management Team</Text>
        </WrapItem>
      </Wrap>
    </Layout>
  );
};

export default Career;
