import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button } from "@chakra-ui/react";

const Stuck = () => {
  const [questionContent, setQuestionContent] = useState("");
  const [questionContentShow, setQuestionContentShow] = useState("");
  const [answers, setAnswers] = useState([]);
  const [newAnswerContent, setNewAnswerContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleAnswer = () => {
    // You may want to sanitize or validate the HTML content before saving it to the state
    setAnswers([...answers, newAnswerContent]);
    console.log(answers);
    setNewAnswerContent("");
  };

  const handleQuestion = () => {
    // You may want to sanitize or validate the HTML content before saving it to the state
    setQuestionContentShow(questionContent);
    setQuestionContent("");
    setShowEditor(true);
  };

  return (
    <>
      <Box borderColor="white" borderWidth="medium">
        <ReactQuill
          theme="snow"
          value={questionContent}
          onChange={setQuestionContent}
          placeholder="Ask a Question"
        />
        <Button onClick={handleQuestion}>Submit Question</Button>
      </Box>
      {showEditor && (
        <Box mt="20px" borderColor="white" borderWidth="medium">
          <h2>Question:</h2>
          <div dangerouslySetInnerHTML={{ __html: questionContentShow }} />

          <h2>Answers:</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <div dangerouslySetInnerHTML={{ __html: answer }} />
              </li>
            ))}
          </ul>
          <ReactQuill
            theme="snow"
            value={newAnswerContent}
            onChange={setNewAnswerContent}
            placeholder="Your Answer"
          />
          <Button onClick={handleAnswer}>Submit Answer</Button>
        </Box>
      )}
    </>
  );
};

export default Stuck;
