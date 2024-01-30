import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  HStack,
  Text,
  Button,
  Spacer,
  Image,
  Stack,
} from "@chakra-ui/react";
import Layout from "./DashBoard";
import { useOverview } from "./OverviewContext";
import { EDIT_INVITE, DELETE_INVITE } from "../utils/endpoints";
import instance from "../utils/api";
import { formatDistanceToNow } from "date-fns";
import { HttpStatusCode } from "axios";

const Notification = () => {
  const { notifications } = useOverview();
  const [request, setRequest] = useState("");
  const [isAcceptedOrRejected, setIsAcceptedOrRejected] = useState(false);

  const handleAcceptSubmt = async (inviteId) => {
    try {
      const response = await instance.put(`${EDIT_INVITE}/${inviteId}`);

      if (response) {
        // Handle success
        setRequest("accepted");
        console.log(request);
        setIsAcceptedOrRejected(true);
        console.log("koko", isAcceptedOrRejected);
      } else {
        // Handle error
        console.error("Failed to update education entry on the backend");
      }
    } catch (error) {
      console.error("Error occurred while updating education entry:", error);
    }
  };

  const handleDeleteSubmt = async (inviteId) => {
    console.log("yoamkaa");
    try {
      const response = await instance.delete(`${DELETE_INVITE}/${inviteId}`);

      if (response) {
        // Handle success
        setRequest("rejected");
        setIsAcceptedOrRejected(true);
      } else {
        // Handle error
        console.error("Failed to update education entry on the backend");
      }
    } catch (error) {
      console.error("Error occurred while updating education entry:", error);
    }
  };
  const calculateTimeDifference = (updatedAt) => {
    const updatedTime = new Date(updatedAt);
    return formatDistanceToNow(updatedTime, { addSuffix: true });
  };

  return (
    <Layout>
      <Box bgColor="black">
        <Center>
          <Card
            w={{
              base: "100%",
              sm: "100%",
              md: "60%",
              lg: "40%",
              xl: "40%",
              "2xl": "40%",
            }}
            bgColor="gray.600"
            mt={{
              base: "20px",
              sm: "20px",
              md: "40px",
              lg: "40px",
              xl: "40px",
              "2xl": "40px",
            }}
          >
            {notifications.map((notification) => (
              <Box
                key={notification._id}
                borderColor="gray.600"
                borderWidth="1px"
                p={4}
                mb={4}
                borderRadius="md"
                _hover={{
                  backgroundColor: "#4D90FE",
                }}
              >
                {notification.notificationType === "TEAM_INVITE" && (
                  <>
                    {!isAcceptedOrRejected ? (
                      <Stack
                        spacing={4}
                        direction={{
                          base: "column",
                          sm: "row",
                          md: "row",
                          lg: "column",
                          xl: "row",
                          "2xl": "row",
                        }}
                      >
                        <Image
                          borderRadius="full"
                          boxSize="50px"
                          src="https://bit.ly/dan-abramov"
                          alt="Dan Abramov"
                        />
                        <Text color="white">{notification.sourceUserName}</Text>

                        <Button
                          onClick={() =>
                            handleAcceptSubmt(notification.sourceId)
                          }
                          colorScheme="green"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            handleDeleteSubmt(notification.sourceId)
                          }
                          colorScheme="red"
                        >
                          Reject
                        </Button>

                        <Spacer />
                        <Text color="white">
                          {calculateTimeDifference(notification.createdAt)}
                        </Text>
                      </Stack>
                    ) : (
                      <>
                        <Image
                          borderRadius="full"
                          boxSize="50px"
                          src="https://bit.ly/dan-abramov"
                          alt="Dan Abramov"
                        />
                        <Text>
                          {notification.sourceUserName} request {request}
                        </Text>
                        <Spacer />
                        <Text color="white">
                          {calculateTimeDifference(notification.createdAt)}
                        </Text>
                      </>
                    )}
                  </>
                )}
                {notification.notificationType === "TEAM_INVITE_ACCEPTED" && (
                  <HStack>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                    <Text>
                      {notification.sourceUserName} accepted your invitation
                    </Text>
                    <Spacer />
                    <Text color="white">
                      {calculateTimeDifference(notification.createdAt)}
                    </Text>
                  </HStack>
                )}
                {notification.notificationType ===
                  "CONTEST_SUBMITTED_FOR_REVIEW" && (
                  <HStack>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                    <Text>
                      {notification.sourceUserName} accepted your invitation
                    </Text>
                    <Spacer />
                    <Text color="white">
                      {calculateTimeDifference(notification.createdAt)}
                    </Text>
                  </HStack>
                )}
                {notification.notificationType ===
                  "CONTEST_REVIEW_ACCEPTED" && (
                  <HStack>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                    <Text>
                      {notification.sourceContestName} contest review accepted
                    </Text>
                    <Spacer />
                    <Text color="white">
                      {calculateTimeDifference(notification.createdAt)}
                    </Text>
                  </HStack>
                )}
              </Box>
            ))}
          </Card>
        </Center>
      </Box>
    </Layout>
  );
};

export default Notification;
