import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Card,
  HStack,
  Center,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import upvote from "./images/upvote.png";
import downvote from "./images/downvote.png";
import {
  ADD_CONTEST_PLAN,
  ADD_EXECUTION_STEP,
  GET_ALL_PLAN,
} from "../utils/endpoints";
import { jwtDecode } from "jwt-decode";
import instance from "../utils/api";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../utils/siteConstants";

const PlanComponent = () => {
  const location = useLocation();
  const variable = location.state;
  console.log("var", variable);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planName, setPlanName] = useState("");
  const [planContent, setPlanContent] = useState("");
  const [plans, setPlans] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);
  const contestId = variable.contestId;

  useEffect(() => {
    console.log("worked");
    // Fetch education entries when the component mounts
    const fetchContestPlans = async () => {
      try {
        console.log("workedwithinfunction");
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;
        const response = await instance.get(
          `${GET_ALL_PLAN}?contestId=${contestId}&page=1&pageSize=10`,
        );
        const { plans } = response.data; // Assuming plans are present in the response data
        setPlans(plans);
      } catch (error) {
        console.error(
          "Error occurred while fetching education entries:",
          error,
        );
      }
    };

    if (!initialFetch) {
      console.log("withinif");
      fetchContestPlans();
      // Fetch education entries only when initialFetch is false
      setInitialFetch(true); // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);

  const [executionSteps, setExecutionSteps] = useState([]);
  const {
    isOpen: isExecutionModalOpen,
    onOpen: onExecutionModalOpen,
    onClose: onExecutionModalClose,
  } = useDisclosure();
  const [executionStepContent, setExecutionStepContent] = useState("");
  const [executionStepName, setExecutionStepName] = useState("");
  const [currentPlanIndex, setCurrentPlanIndex] = useState(null);
  const [currentPlanId, setCurrentPlanId] = useState(null);

  const handleAddExecutionStep = (index, planId) => {
    console.log("plan", planId);
    setCurrentPlanIndex(index); // Set the current plan index
    setCurrentPlanId(planId);
    onExecutionModalOpen();
  };

  const handleSaveExecutionStep = async () => {
    console.log("maakaxchi", currentPlanIndex);
    if (executionStepContent.trim() === "") {
      // Validation: Don't save if executionStepContent is empty
      return;
    }

    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const planId = currentPlanId;
      const executionStep = plans[currentPlanIndex].executionSteps;
      const stepNumber = executionStep.length;
      const stepName = executionStepName;
      const stepDescription = executionStepContent;

      const response = await instance.post(
        `${ADD_EXECUTION_STEP}`,
        {
          planId,
          stepNumber,
          stepName,
          stepDescription,
        },
        { "Content-Type": "application/json" },
      );
      const data = response;
      const { success, message } = data;
      if (success) {
        // Handle success
        console.log("Data successfully posted to the backend");

        // Clear form data and reset state after successful post
      } else {
        // Handle error
        console.error("Failed to post data to the backend");
      }
    } catch (error) {
      console.error("Error occurred while posting data:", error);
    }

    // Clear input field
    setExecutionStepContent("");
    setExecutionStepName("");

    // Close the modal
    onExecutionModalClose();
    setInitialFetch(false);
  };

  const handleSave = async () => {
    if (planName.trim() === "" || planContent.trim() === "") {
      // Validation: Don't save if either planName or planContent is empty
      return;
    }

    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;

      const planDescription = planContent;

      const response = await instance.post(
        `${ADD_CONTEST_PLAN}?contestId=${contestId}&userId=${userId}`,
        {
          planName,
          planDescription,
        },
        { "Content-Type": "application/json" },
      );
      const data = response;
      const { success, message } = data;
      if (success) {
        // Handle success
        console.log("Data successfully posted to the backend");

        // Clear form data and reset state after successful post
      } else {
        // Handle error
        console.error("Failed to post data to the backend");
      }
    } catch (error) {
      console.error("Error occurred while posting data:", error);
    }

    // Save the plan to the state with an empty executionSteps array

    // Reset the input fields
    setPlanName("");
    setPlanContent("");

    // Close the modal
    onClose();
    setInitialFetch(false);
  };

  const handleUpvote = (index) => {
    const updatedPlans = [...plans];
    updatedPlans[index].upvotes = (updatedPlans[index].upvotes || 0) + 1;
    if (!updatedPlans[index].downvotes) updatedPlans[index].downvotes = 0;
    setPlans(updatedPlans);
  };

  // const handleDownvote = (index) => {
  //   const updatedPlans = [...plans]
  //   updatedPlans[index].downvotes = (updatedPlans[index].downvotes || 0) - 1
  //   if (!updatedPlans[index].upvotes) updatedPlans[index].upvotes = 0
  //   setPlans(updatedPlans)
  // }

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Plan
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Text mb={2}>Plan Name:</Text>
              <ReactQuill
                value={planName}
                onChange={(value) => setPlanName(value)}
              />
            </Box>
            <Box>
              <Text mb={2}>Plan Content:</Text>
              <ReactQuill
                value={planContent}
                onChange={(value) => setPlanContent(value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {plans.map((plan, index) => (
        <Card key={index} my={4} p={4}>
          <HStack>
            <HStack>
              <Text fontSize="md" fontWeight="bold">
                Plan Name:
              </Text>
              <div dangerouslySetInnerHTML={{ __html: plan.planName }} />
            </HStack>
            <Spacer />
            <Flex w="10%">
              <Button
                variant="solid"
                size="sm"
                onClick={() => handleUpvote(index)}
              >
                <Image src={upvote} alt="Upvote" boxSize="20px" />
              </Button>
              <Button
                variant="solid"
                size="sm"
                onClick={() => handleDownvote(index)}
              >
                <Image src={downvote} alt="Downvote" boxSize="20px" />
              </Button>
              <Text ml="10px">
                {plan.upvotes + plan.downvotes >= 0 ? (
                  <>{plan.upvotes + plan.downvotes}</>
                ) : (
                  <>0</>
                )}
              </Text>
            </Flex>
          </HStack>
          <HStack>
            <Text fontSize="md" fontWeight="bold">
              Plan Content:
            </Text>
            <div dangerouslySetInnerHTML={{ __html: plan.planDescription }} />
          </HStack>
          {plan.executionSteps.map((step, stepIndex) => (
            <Card key={stepIndex} my={4} p={4}>
              <Box mb={4}>
                <HStack>
                  <Text fontSize="md" fontWeight="bold">
                    E{stepIndex + 1}:
                  </Text>
                  <div dangerouslySetInnerHTML={{ __html: step }} />
                </HStack>
              </Box>
            </Card>
          ))}
          <Center>
            <Button
              onClick={() => handleAddExecutionStep(index, plan._id)}
              colorScheme="teal"
              size="sm"
              mt={2}
              w="10%"
            >
              Add Execution Step
            </Button>
          </Center>
          <Modal isOpen={isExecutionModalOpen} onClose={onExecutionModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Execution Step</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mb={4}>
                  <Text mb={2}>Execution Step name:</Text>
                  <ReactQuill
                    value={executionStepName}
                    onChange={(value) => setExecutionStepName(value)}
                  />
                  <Text mb={2}>Execution Step Content:</Text>
                  <ReactQuill
                    value={executionStepContent}
                    onChange={(value) => setExecutionStepContent(value)}
                  />
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={handleSaveExecutionStep}
                >
                  Save
                </Button>
                <Button onClick={onExecutionModalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
      ))}
    </Box>
  );
};

export default PlanComponent;
