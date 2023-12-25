import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import {
  FormControl,
  FormLabel,
  Input ,
  FormErrorMessage,
  FormHelperText,
  Center,
  Box,
} from '@chakra-ui/react'

// Instead of the default import, you can also use this:
// import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./styles.css";

function Key() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [clickedButton, setClickedButton] = useState(false);

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);
    setClickedButton(button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    console.log('input' , input)
    keyboard.current.setInput(input);
    console.log('keyboard' , keyboard)
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
    console.log(dynamicButtonTheme)
    dynamicButtonTheme.push({
      class: "hg-highlight",
      buttons: clickedButton,
    });
  }


  return (
    <Box bgColor = 'black' >
      <Center >
      <FormControl  width='15%'>
    <FormLabel>Email address</FormLabel>
      <Input
       type='email'
       //value={input}
       placeholder={"Tap on the virtual keyboard to start"}
       onChange={onChangeInput}
       />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
    </Center>
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
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
            "z x c v b n m .com @ %"
          ],
          shift: [
            "Q W E R T Y U I O P",
            'A S D F G H J K L',
            "Z X C V B N M .com @"
          ]
        }}
        // buttonTheme={[
        //   {
        //     class: "hg-red",
        //     buttons: `Q W E R T Y U q w e r t y u i o p v x j  ${alpha} `
        //   },
        //   {
        //     class: "hg-highlight",
        //     buttons: "Q q A B C"
        //   }
        // ]}
        buttonTheme={dynamicButtonTheme}
        buttonAttributes = { [
          {
            attribute: "aria-label",
            value: "bee",
            buttons: "b B c C"
          },
          // ... additional buttonAttributes objects ...
        ]}
        physicalKeyboardHighlight = {true}
        physicalKeyboardHighlightPress =  {true}
      />
    </Box>
  );
}

export default Key