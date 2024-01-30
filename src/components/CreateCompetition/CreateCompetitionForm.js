import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  VStack,
  Center,
  Textarea,
  Flex,
  Card,
  Link,
  SimpleGrid,
  Tag,
  TagLabel,
  Image,
} from "@chakra-ui/react";
import { useOverview } from "../OverviewContext.js";
import { CREATE_CONTEST } from "../../utils/endpoints.js";
import { jwtDecode } from "jwt-decode";
import instance from "../../utils/api.js";
import Layout from "../DashBoard.js";
import { ACCESS_TOKEN } from "../../utils/siteConstants.js";
import CreateCompetitionSkeleton from "./CreateCompetitionSkeleton.js";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import plus from "../images/plus.png";
import close from "../images/close.png";
import Footer from "../Footer/FooterPage/Footer.js";

const CreateCompetitionForm = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState();
  const { isOverviewSaved } = useOverview();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [editContestId, setEditContestId] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  const { isSubmitted } = useOverview();

  console.log(isOverviewSaved);
  const [formData, setFormData] = useState({
    contestName: "",
    contestOrganizer: "",
    // contestCreator: [{}],
    startTime: "",
    endTime: "",
    description: "",
  });
  const contestDetail = {};

  const [userContests, setUserContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(true);

  console.log(isLoading, "isLoading");

  useEffect(() => {
    const fetchUserContests = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.user._id;

        const contestsResponse = await instance.get(
          `/api/contest/get-contests-by-user/${userId}?page=1&pageSize=50`
        );
        const contests = contestsResponse.contests;
        setUserContests(contests);
        setIsLoading(false);
        console.log(isLoading, "isLoading");
      } catch (error) {
        console.error("Error fetching user contests:", error);
        // Handle error cases if needed
      }
    };

    if (!initialFetch) {
      // Fetch education entries only when initialFetch is false
      fetchUserContests();
      setInitialFetch(true); // Set initialFetch to true after the initial fetch
    }
  }, [initialFetch]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the API request
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;

      const contestName = formData.contestName;
      const contestOrganizer = formData.contestOrganizer;
      const contestCreator = [userId]; // Assuming contestCreator is a single value, adjust as needed
      const startTime = formData.startTime;
      const endTime = formData.endTime;

      // Make the API request
      const response = await instance.post(
        CREATE_CONTEST,
        { contestName, contestOrganizer, contestCreator, startTime, endTime },
        { "Content-Type": "application/json" }
      );

      // Handle the response from the API
      console.log("API Response:", response.data);

      // Assuming the API response is successful, you can redirect to the overview page
      if (response.success) {
        // Optionally, you can set isOverviewSaved in the context or component state
        // to update the Save button logic if needed
        setIsFormVisible(false);
        setInitialFetch(false);
        //navigate('/overview');
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error("API Request Error:", error);
      // Handle error cases if needed
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the API request
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id;

      const contestName = formData.contestName;
      const contestOrganizer = formData.contestOrganizer;
      const contestCreator = [userId]; // Assuming contestCreator is a single value, adjust as needed
      const startTime = formData.startTime;
      const endTime = formData.endTime;
      const isPublished = false;

      // Make the API request
      const response = await instance.put(
        `/api/contest/edit-contest/${editContestId}`,
        {
          contestName,
          contestOrganizer,
          contestCreator,
          startTime,
          endTime,
          isPublished,
        },
        { "Content-Type": "application/json" }
      );

      // Handle the response from the API
      console.log("API Response:", response.data);

      // Assuming the API response is successful, you can redirect to the overview page
      if (response.success) {
        // Optionally, you can set isOverviewSaved in the context or component state
        // to update the Save button logic if needed
        setIsFormVisible(false);
        setEditContestId(null);
        setInitialFetch(false);
        //navigate('/overview');
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error("API Request Error:", error);
      // Handle error cases if needed
    }
  };

  const handleEditButtonClick = (contestId, contestName) => {
    // Find the contest with the given ID from userContests
    const contestToEdit = userContests.find(
      (contest) => contest._id === contestId
    );

    // Set the form data with the contest details
    setFormData({
      contestName: contestToEdit.contestName,
      contestOrganizer: contestToEdit.contestOrganizer,
      startTime: "", // Add other fields as needed
      endTime: "",
      description: "",
    });

    // Set the contest ID to track which contest is being edited
    setEditContestId(contestId);

    // Open the form
    setIsFormVisible(true);
  };

  const handleDeleteButtonClick = async (contestId, contestCreatorId) => {
    try {
      // Make the API request to delete the contest
      const response = await instance.delete(
        `/api/contest/delete-contest/${contestId}/${contestCreatorId}`
      );

      // Handle the response from the API
      console.log("API Response:", response.data);

      // Assuming the API response is successful
      if (response.success) {
        // Trigger a re-fetch of user contests or update the UI as needed
        setIsFormSubmitted(!isFormSubmitted);
        setInitialFetch(false);
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error("API Request Error:", error);
      // Handle error cases if needed
    }
  };

  const handlePlusButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseButtonClick = () => {
    setIsFormVisible(false);
  };

  const handleCardClick = (contestId, index) => {
    // Navigate to the overview page with user ID and contest ID
    const constestIndex = userContests[index];
    const name = constestIndex.contestName;
    const contestOrganizer = constestIndex.contestOrganizer;
    const submitted = constestIndex.isSubmitted;
    const published = constestIndex.isPublished;
    let ok = 0;
    if (constestIndex.contestDescription) {
      ok = 1;
      console.log(ok);
    }

    navigate(`/discription/${contestId}/${ok}`, {
      state: {
        organizer: contestOrganizer,
        name: name,
        submitted: submitted,
        published: published,
      },
    });
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      <Layout>
        {/* <CreateCompetitionSkeleton cardsNo={6}/> */}
        <VStack>
          <VStack>
            {isFormVisible ? (
              <Box
                p={8}
                w={["250px", "300px", "300px", "500px", "500px", "500px"]}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                mt="20px"
              >
                <Button
                  bgColor="custom.button"
                  size="20px"
                  marginLeft="95%"
                  onClick={handleCloseButtonClick}
                  borderRadius="50%"
                >
                  <Image
                    boxSize="22px"
                    objectFit="cover"
                    src={close}
                    alt="close"
                  />
                </Button>
                <Heading mb={4}>Create a Competition</Heading>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Contest Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter contest name in at max 15 words"
                        value={formData.contestName}
                        onChange={(e) =>
                          handleInputChange("contestName", e.target.value)
                        }
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Contest Organizer</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter contest organizer in at max 12 words"
                        value={formData.contestOrganizer}
                        onChange={(e) =>
                          handleInputChange("contestOrganizer", e.target.value)
                        }
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Contest Creator</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter contest creator"
                        value={formData.contestCreator}
                        onChange={(e) =>
                          handleInputChange("contestCreator", e.target.value)
                        }
                        required
                      />
                    </FormControl>

                    <Flex direction="column">
                      <FormControl flex="1">
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          type="datetime-local"
                          value={formData.startTime}
                          onChange={(e) =>
                            handleInputChange("startTime", e.target.value)
                          }
                          required
                        />
                        {/* <DatePicker
                        render={<Icon />}
                        format="MM/DD/YYYY HH:mm A"
                        animations={[transition()]}
                        plugins={[
                          <TimePicker
                            position="bottom"
                            hideSeconds
                            width="100%"
                          />,
                        ]}
                      /> */}
                      </FormControl>

                      <FormControl flex="1">
                        <FormLabel>End Time</FormLabel>
                        <Input
                          type="datetime-local"
                          value={formData.endTime}
                          onChange={(e) =>
                            handleInputChange("endTime", e.target.value)
                          }
                          required
                        />

                        {/* <DatePicker
                        render={<Icon />}
                        format="MM/DD/YYYY HH:mm A"
                        animations={[transition()]}
                        plugins={[
                          <TimePicker
                            position="bottom"
                            hideSeconds
                            width="100%"
                          />,
                        ]}
                      /> */}
                      </FormControl>
                    </Flex>

                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        placeholder="Enter contest description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        resize="vertical"
                        rows={4}
                      />
                    </FormControl>

                    <Center>
                      {editContestId ? (
                        <Button
                          type="submit"
                          colorScheme="teal"
                          size="lg"
                          onClick={handleUpdate}
                        >
                          Update Competition
                        </Button>
                      ) : (
                        <Button type="submit" colorScheme="teal" size="lg">
                          Create Competition
                        </Button>
                      )}
                    </Center>
                  </VStack>
                </form>
              </Box>
            ) : (
              <Box mt="22px" display="flex" gap="10px" alignItems="center">
                <Text fontSize="20px">Create Contest</Text>
                <Button bgColor="custom.button" onClick={handlePlusButtonClick}>
                  <Image
                    boxSize="35px"
                    objectFit="cover"
                    src={plus}
                    alt="plus"
                  />
                </Button>
              </Box>
            )}
          </VStack>
          <VStack spacing={4} align="stretch">
            <Flex
              centerContent
              mt={10}
              w={["100%", "100%", "100%", "100%", "100%"]}
              direction="column"
              alignItems="center"
            >
              <SimpleGrid columns={[1, 1, 1, 2, 3, 3]} spacing={4} mt="10px">
                {isLoading ? (
                  <CreateCompetitionSkeleton cardNo={6} />
                ) : (
                  userContests.map((contest, index) => (
                    <Link
                      key={contest._id}
                      _hover={{ textDecoration: "none" }}
                      onClick={() => handleCardClick(contest._id, index)}
                    >
                      <Card
                        p={8}
                        borderWidth={1}
                        borderRadius="lg"
                        boxShadow="lg"
                        w={[
                          "250px",
                          "300px",
                          "320px",
                          "300px",
                          "200px",
                          "300px",
                        ]}
                        h="200px"
                        justifyContent="space-between"
                      >
                        <Heading mb={4} fontSize="medium">
                          {contest.contestName}
                        </Heading>
                        <Text fontSize="medium" overflow="hidden">
                          Organizer: {contest.contestOrganizer}
                        </Text>
                        {!contest.isPublished && contest.isSubmitted && (
                          <Tag mt="30px">
                            <TagLabel>Waiting for review</TagLabel>
                          </Tag>
                        )}
                        {contest.isPublished && (
                          <Tag bgColor="green" mt="30px">
                            <TagLabel color="black">Published</TagLabel>
                          </Tag>
                        )}
                        {/* Add other contest details as needed */}
                      </Card>
                    </Link>
                  ))
                )}
              </SimpleGrid>
            </Flex>
          </VStack>
        </VStack>
      </Layout>
    </>
  );
};

export default CreateCompetitionForm;
