import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Center,
  Box,
  Button,
  Spinner,
  Hide,
  Text,
  AbsoluteCenter,
} from "@chakra-ui/react";
import axios from "../utils/api";

// Instead of the default import, you can also use this:
// import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./styles.css";

function Key() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [clickedButton, setClickedButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    setClickedButton(button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    console.log("input", input);
    keyboard.current.setInput(input);
    console.log("keyboard", keyboard);
  };

  const dynamicButtonTheme = [
    {
      class: "hg-highlight",
      buttons: "",
    },
    {
      class: "hg-row0",
      buttons: "0 1 2 3 4 5 6 7 8 9",
    },

    {
      class: "hg-row1",
      buttons: "Q W E R T Y U I O  P q w e r t y u i o p",
    },
    {
      class: "hg-row2",
      buttons: "A S D F G H J K L a s d f g h j k l #",
    },
    {
      class: "hg-row3",
      buttons: "Z X C V B N M z x c v b n m 0 1 2 3 4 5 6 7 8 9 @ .com %",
    },
  ];
  if (clickedButton) {
    console.log(dynamicButtonTheme);
    dynamicButtonTheme.push({
      class: "hg-highlight",
      buttons: clickedButton,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      // Make the POST request to save the email to the database
      const email = input;
      const response = await axios.post(
        "http://localhost:3001/api/landing-page/subscribe",
        {
          email,
        },
      );

      // Update the state with the response message
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error("Error subscribing email:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bgColor="black" height="500px">
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl mb="3" mt="20">
            <Input
              type="email"
              // value={input}
              placeholder={"Tap on the virtual keyboard to start"}
              onChange={onChangeInput}
              required
            />
          </FormControl>
          <Center>
            <Button type="submit" colorScheme="blue">
              {isLoading ? <Spinner size="sm" /> : "Enter"}
            </Button>
          </Center>
        </form>
      </Center>
      <Hide below="720px">
        <Center>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            onChange={onChange}
            onKeyPress={onKeyPress}
            theme={"hg-theme-default hg-layout-default myTheme"}
            disableRowButtonContainers={true}
            layout={{
              default: [
                "1 2 3 4 5 6 7 8 9 0",
                "q w e r t y u i o p",
                "a s d f g h j k l #",
                "z x c v b n m .com @ %",
              ],
              shift: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M .com @",
              ],
            }}
            buttonTheme={dynamicButtonTheme}
            buttonAttributes={[
              {
                attribute: "aria-label",
                value: "bee",
                buttons: "b B c C",
              },
              // ... additional buttonAttributes objects ...
            ]}
            physicalKeyboardHighlight={true}
            physicalKeyboardHighlightPress={true}
          />
        </Center>
      </Hide>
    </Box>
  );
}

export default Key;
