import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Heading,
  IconButton,
  Text,
  Button,
  Input,
  Center,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useOverview } from "./OverviewContext";
import Layout from "./DashBoard.js";
import instance from "../utils/api.js";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import ContestDiscription from "./ContestDescription.js";
import ContestDashboard from "./ContestDashboard.js";
import { ACCESS_TOKEN } from "../utils/siteConstants.js";

const ReviewDiscription = () => {
  const [isOverviewEditing, setIsOverviewEditing] = useState(false);
  const [isDiscriptionEditing, setIsDiscriptionEditing] = useState(false);
  const [isEvaluationTextEditing, setIsEvaluationTextEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contestDescription, setContestDescription] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  const [publish, setPublish] = useState(false);
  const { contestId, ok } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [overviewText, setOverviewText] = useState(null); // Provide initial HTML content
  const { setOverviewSaved } = useOverview();

  const [descriptionText, setDescriptionText] = useState(null);

  const [evaluationText, setEvaluationText] = useState(null);
  const check = parseInt(ok, 10);
  useEffect(() => {
    const fetchContestDescription = async () => {
      try {
        // Make the API request to fetch contest description
        const response = await instance.get(
          `/api/contest-description/get-contest-description/${contestId}`,
        );

        // Check if the API request was successful
        if (response.success) {
          setOverviewText(response.contestDescription.overview);
          setDescriptionText(response.contestDescription.description);
          setEvaluationText(response.contestDescription.evaluation);
          // setPublish(response.isPublish)
        } else {
          console.error(
            "Failed to fetch contest description:",
            response.message,
          );
        }
      } catch (error) {
        console.error("API Request Error:", error);
      }
    };
    const check = parseInt(ok, 10);
    if (!initialFetch) {
      // Fetch education entries only when initialFetch is false
      if (check) {
        fetchContestDescription();
        setInitialFetch(true);
      } // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);

  const handleContestUpdate = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the API request
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;

      // Make the API request
      const response = await instance.put(
        `/api/contest/publish-contest?contestId=${contestId}`,
      );

      // Handle the response from the API
      console.log("API Response:", response.data);

      // Assuming the API response is successful, you can redirect to the overview page
      if (response.success) {
        // Optionally, you can set isOverviewSaved in the context or component state
        // to update the Save button logic if needed
        // navigate('/overview');
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error("API Request Error:", error);
      // Handle error cases if needed
    }
  };

  return (
    <>
      <ContestDashboard />
      <Button onClick={handleContestUpdate} colorScheme="teal" mt={4}>
        Publish
      </Button>
      <Box p={4} w="100%">
        <Box w="100%">
          <Heading mt="50px">Overview </Heading>
          <Text dangerouslySetInnerHTML={{ __html: overviewText }} />
        </Box>
        <Box mt="20px">
          <Heading mb={4}>Description </Heading>
          <Text dangerouslySetInnerHTML={{ __html: descriptionText }} />
        </Box>

        <Box mt="20px">
          <Heading mb={4}>Evaluation </Heading>
          <Text dangerouslySetInnerHTML={{ __html: evaluationText }} />
        </Box>
      </Box>
    </>
  );
};

export default ReviewDiscription;
