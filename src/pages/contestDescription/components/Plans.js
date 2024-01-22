import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import AddNewPlan from "./AddNewPlan";

const Plans = () => {
  const [addPlanDisplay, setAddPlanDisplay] = useState(false);
  const handleAddPlanDisplay = (display) => {
    setAddPlanDisplay(display);
  }
  return (
    <Stack>
      <Stack direction="row" gap="10px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Seach plan" />
        </InputGroup>
        <Button onClick={()=>handleAddPlanDisplay(true)} leftIcon={<AddIcon />} colorScheme="white" variant="outline">
          Add Plan
        </Button>
      </Stack>
      {
        addPlanDisplay ? <AddNewPlan closeAddPlan={()=>handleAddPlanDisplay(false)}  /> : null
      }
      
    </Stack>
  );
};

export default Plans;
