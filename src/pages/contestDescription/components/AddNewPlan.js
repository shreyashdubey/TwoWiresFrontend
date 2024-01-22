import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Text,
  Input,
  CardBody,
  CardFooter,
  Button,
  Stack
} from "@chakra-ui/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from '../../../utils/api';
import { ADD_PLAN } from "../../../utils/endpoints";
import { getDecodedUserData } from "../../../utils/helper";

// TODO: Move React quill to common component
const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

const AddNewPlan = ({closeAddPlan}) => {
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const handlePlanName = event => {
    setPlanName(event.target.value);
  }
  const handlePlanDescription = value => {
    setPlanDescription(value);
  }
  const onCancel = () => {
    closeAddPlan();
  }
  const onAddNewPlan = async () => {
    try{
      const data = {
        planName: planName,
        planDescription: planDescription
      };
      const user = getDecodedUserData();
      
      const response = await axios.post(ADD_PLAN, data);

    }catch(e){
      console.log(e);
    }
  }

  return (
    <Box>
      <Card maxW="lg">
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack>
            <Input
              value={planName}
              onChange={handlePlanName}
              placeholder="Plan Name"
              size="sm"
            />
            <ReactQuill
              theme="snow"
              value={planDescription}
              onChange={handlePlanDescription}
              modules={modules}
              formats={formats}
            />
          </Stack>
        </CardBody>
        <CardFooter justifyContent={"end"}>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="ghost">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default AddNewPlan;
