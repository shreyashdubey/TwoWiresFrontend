import React from "react";
import Layout from "../../components/DashBoard";
import OverviewSection from "../../components/OverviewSection";
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Plans from "./components/Plans";

const ContestDescription = () => {
  const location = useLocation();
  const variable = location.state;
  return (
    <Layout>
      <Box>
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Plans</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OverviewSection
                published={variable.published}
                submitted={variable.submitted}
              />
            </TabPanel>
            <TabPanel>
              <Plans />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default ContestDescription;
