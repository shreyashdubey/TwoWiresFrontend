import "./style"
import { motion } from "framer-motion";
import Login from "../login";
import Signup from "../Signup";
import React, { useState , useEffect } from 'react';

const textVariants = {
    hidden: { opacity: 0, y: -20 },
   // visible: { opacity: 1, y: 100},
    visible: (i) => {
        const delay = 1 + i * 0.5;
        return {
          opacity: 1, 
          transition: {
            delay,
            type: "spring",
            duration: 4.5,
            bounce: .5,
          },
        };
      },
  };

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function Cross() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleComponentClick = (componentId) => {
    setSelectedComponent(componentId);
  };
  return (
  <>
        <motion.svg
        width="100%"
        height="100%"
        viewBox="-1000 0 3000 3000"
        initial="hidden"
        animate="visible"
        >
     <motion.circle
        cx="150"
        cy="150"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={1}
        onClick={() => handleComponentClick(1)}
      />    

      {/* <motion.circle
        cx="150"
        cy="150"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={1}
        onClick={() => handleComponentClick(1)}
      /> */}
      <motion.line
        x1="230"
        y1="150"
        x2="360"
        y2="220"
        stroke="#00cc88"
        variants={draw}
        custom={2}
      />
       <motion.circle
        cx="420"
        cy="220"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={3}
        onClick={() => handleComponentClick(2)}

      />
       <motion.line
        x1="360" 
        y1="275"
        x2="230"
        y2="345"
        stroke="#00cc88"
        variants={draw}
        custom={4}
      />
       <motion.circle
        cx="180"
        cy="400"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={5}
        onClick={() => handleComponentClick(3)}

      />
      <motion.line
        x1="250" 
        y1="440"
        x2="800"
        y2="550"
        stroke="#00cc88"
        variants={draw}
        custom={7}
      />
      <motion.circle
        cx="850"
        cy="618"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={6}
        onClick={() => handleComponentClick(4)}

      />
       <motion.line
        x1="815" 
        y1="695"
        x2="690"
        y2="770"
        stroke="#00cc88"
        variants={draw}
        custom={7}
      />
      <motion.circle
        cx="650"
        cy="845"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={8}
        onClick={() => handleComponentClick(5)}

      />
       <motion.line
        x1="875" 
        y1="698"
        x2="1020"
        y2="790"
        stroke="#00cc88"
        variants={draw}
        custom={9}
      />
      <motion.circle
        cx="1050"
        cy="845"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={10}
        onClick={() => handleComponentClick(6)}

      />
      <motion.line
        x1="600" 
        y1="910"
        x2="470"
        y2="990"
        stroke="#00cc88"
        variants={draw}
        custom={11}
      />
      <motion.circle
        cx="450"
        cy="1070"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={12}
        onClick={() => handleComponentClick(7)}

      />
       <motion.line
        x1="450" 
        y1="1155"
        x2="600"
        y2="1250"
        stroke="#00cc88"
        variants={draw}
        custom={13}
      />
      <motion.circle
        cx="640"
        cy="1330"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={14}
        onClick={() => handleComponentClick(8)}

      />
      <motion.line
        x1="1025" 
        y1="920"
        x2="895"
        y2="990"
        stroke="#00cc88"
        variants={draw}
        custom={15}
      />
       <motion.circle
        cx="905"
        cy="1070"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={16}
        onClick={() => handleComponentClick(9)}

      />
       <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={17} y = '160'   x = '-150' >
           Enter The Game
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={18} y='130' x = '300'>
           Create Your Player
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={19} y='450' x = '400'>
            Start the Game
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={20} y='700' x = '500'>
            Create a Contest
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={21} y='740' x = '950'>
            Give a Contest
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={22} y='950' x = '250'>
            Create Description
        </motion.text>
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={23} y='1250' x = '310'>
           Wait for Review
        </motion.text>
      {/* <motion.line
        x1="220"
        y1="170"
        x2="360"
        y2="30"
        stroke="#00cc88"
        variants={draw}
        custom={2.5}
      /> */}
      {/* <motion.rect
        width="140"
        height="140"
        x="410"
        y="30"
        rx="20"
        stroke="#0099ff"
        variants={draw}
        custom={3}
      />
      <motion.circle
        cx="100"
        cy="300"
        r="80"
        stroke="#0099ff"
        variants={draw}
        custom={2}
      />
      <motion.line
        x1="220"
        y1="230"
        x2="360"
        y2="370"
        stroke="#ff0055"
        custom={3}
        variants={draw}
      />
      <motion.line
        x1="220"
        y1="370"
        x2="360"
        y2="230"
        stroke="#ff0055"
        custom={3.5}
        variants={draw}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="230"
        rx="20"
        stroke="#00cc88"
        custom={4}
        variants={draw}
      />
      <motion.circle
        cx="100"
        cy="500"
        r="80"
        stroke="#00cc88"
        variants={draw}
        custom={3}
      />
      <motion.line
        x1="220"
        y1="430"
        x2="360"
        y2="570"
        stroke="#0099ff"
        variants={draw}
        custom={4}
      />
      <motion.line
        x1="220"
        y1="570"
        x2="360"
        y2="430"
        stroke="#0099ff"
        variants={draw}
        custom={4.5}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="430"
        rx="20"
        stroke="#ff0055"
        variants={draw}
        custom={5}
      /> */}
    </motion.svg>
    {selectedComponent === 1 && <Signup  />}
    </>
  );
}
