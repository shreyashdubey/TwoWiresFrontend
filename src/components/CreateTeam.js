// CreateNewTeam.js
import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { LOGIN, SIGNUP, CREATE_TEAM } from "../utils/endpoints";
import InviteUsers from "./InviteUser";
import { jwtDecode } from "jwt-decode";
import Layout from "./DashBoard.js";
import { ACCESS_TOKEN } from "../utils/siteConstants.js";

const CreateNewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  const [isTeamNameValid, setIsTeamNameValid] = useState(true);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
    setIsTeamNameValid(true);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (teamName.trim() === "") {
      setIsTeamNameValid(false);
      return;
    }
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const owner = decodedToken.user._id;
      const response = await instance.post(
        CREATE_TEAM,
        { teamName, owner },
        { "Content-Type": "application/json" },
      );
      const teamID = response._id;
      if (response) {
        alert("team created");
        navigate(`/invite-users?t=${teamID}&v=${encodeURIComponent(teamName)}`);
      } else {
        // Signup failed
        alert("Some error");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during team creation. Please try again later.");
    }
    const handleCreateTeam = async () => {
      navigate("/team");
    };
  };

  return (
    <Layout>
      <Center>
        <Box w="50%" mt="150px" h="300px">
          <Heading as="h3" size="lg" mb={4} color="custom.white">
            Create New Team
          </Heading>
          <FormControl mb={4} w="30%">
            <FormLabel>Team Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={handleTeamNameChange}
              color="custom.white"
            />
            {!isTeamNameValid && (
              <Text color="red.500" fontSize="sm" mt={1}>
                Team name is required
              </Text>
            )}
          </FormControl>
          <Button bgColor="custom.button" onClick={handleCreateTeam}>
            <Text color="custom.white">Create Team</Text>
          </Button>
        </Box>
      </Center>
    </Layout>
  );
};

export default CreateNewTeam;
