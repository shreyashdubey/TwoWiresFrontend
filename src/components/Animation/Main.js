import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCircles from "./AnimatedCircles";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

const Main = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleCircleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <AnimatePresence>
        {currentPage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatedCircles
              index={0}
              onClick={() => handleCircleClick("signup")}
            />
            <AnimatedCircles
              index={1}
              onClick={() => handleCircleClick("login")}
            />
          </motion.div>
        )}

        {currentPage === "signup" && (
          <SignupPage onBack={() => handleCircleClick("home")} />
        )}

        {currentPage === "login" && (
          <LoginPage onBack={() => handleCircleClick("home")} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
