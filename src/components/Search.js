import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Spacer,
  Heading,
  Box,
  Grid,
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

import { Country, State, City } from "country-state-city";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSelectSelected, setIsSelectSelected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const filterKeywords = ["Username", "Profession", "Expertise"];

  function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSelectSelected, setIsSelectSelected] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    console.log(Country.getAllCountries());
    console.log(State.getAllStates());

    const handleCountryChange = (event) => {
      const country = event.target.value;
      setSelectedCountry(country);
      setSelectedState("");
      setSelectedCity("");
    };
    const handleStateChange = (event) => {
      const state = event.target.value;
      setSelectedState(state);
      setSelectedCity("");
    };
    const handleCityChange = (event) => {
      const city = event.target.value;
      setSelectedCity(city);
    };

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      setIsSelectSelected(true);
    };

    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
      setIsDrawerOpen(true);

      console.log(e.target.value);
    };

    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    const [value, setValue] = React.useState("1");

    return (
      <>
        {/* <InputGroup w="250px" mr="125px" bgColor="custom.darkStateBlue">
          <Select
              onChange={handleSelectChange}
              value={selectedOption}
              color="custom.white"
            >
              <option value="username">Username</option>
              <option value="profession">Profession</option>
              <option value="expertise">Expertise</option>
            </Select>
         
        </InputGroup> */}

        <Stack spacing={4} direction="row" align="center">
          <ButtonGroup gap="4">
            {filterKeywords.map((element) => (
              <Button
                backgroundColor="custom.white"
                color="custom.black"
                size="sm"
                borderRadius="full"
                fontSize="14px"
                onClick={handleSelectChange}
                value={element}
                _hover={{
                  backgroundColor: "custom.blue", // Change this to the desired hover background color
                  color: "custom.white", // Change this to the desired hover text color
                  // Add any other styles you want to apply on hover
                }}
              >
                {element}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>

        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={handleCloseDrawer}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{selectedOption}</DrawerHeader>
            <DrawerBody>
              <Box>
                <Heading fontSize="1xl">Sort by</Heading>
                <RadioGroup onChange={setValue} value={value} name="form-name">
                  <Stack direction="row" spacing="90px">
                    <Radio value="1">First</Radio>
                    <Radio value="2">Second</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box w="100%">
                <Heading>Date Posted</Heading>
                <Grid
                  templateColumns="repeat(3, 2fr)"
                  gap={10}
                  p={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <RadioGroup
                    onChange={setValue}
                    value={value}
                    name="form-name"
                  >
                    <Radio value="1">First</Radio>
                    <Radio value="2">Second</Radio>
                    <Radio value="3">First</Radio>
                    <Radio value="4">Second</Radio>
                  </RadioGroup>
                </Grid>
              </Box>
              <Box>
                <Heading>Location</Heading>
                <div>
                  <label>Country:</label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>

                  {selectedCountry && (
                    <div>
                      <label>State:</label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                      >
                        <option value="">Select State</option>
                        {State.getStatesOfCountry(selectedCountry).map(
                          (state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  )}

                  {selectedState && (
                    <div>
                      <label>City:</label>
                      <select value={selectedCity} onChange={handleCityChange}>
                        <option value="">Select City</option>
                        {City.getCitiesOfState(
                          selectedCountry,
                          selectedState,
                        ).map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </Box>
              <Box>
                <Heading>School</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Company</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Profession</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Expertise</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Spoken Language</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Contest Name</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Contest tag</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Skill</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              <Box>
                <Heading>Remote</Heading>
                <Stack spacing={5} direction="column">
                  <Checkbox colorScheme="red" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                  <Checkbox colorScheme="green" defaultChecked>
                    Checkbox
                  </Checkbox>
                </Stack>
              </Box>
              Search results for {selectedOption} with term: {searchTerm}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
}

export default Search;
