import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCircles = ({ onClick , index }) => {
  const circleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const lineVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 , scaleY:1 },
  };
  const ind = index > 0 
  
  return (
    <>
    {ind && (
      <motion.div
      variants={lineVariants}
      initial="initial"
      animate="animate"
      style={{
        width: '2px',
        height: '20px',
        backgroundColor: 'blue',
      }}
    ></motion.div>
    )}
    <motion.div
      variants={circleVariants}
      initial="initial"
      animate="animate"
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'blue',
        cursor: 'pointer',
        margin: '10px',
      }}
    ></motion.div>
    </>
  );
};

export default AnimatedCircles;
