import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack, Divider } from '@chakra-ui/react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Stuck = () => {
  const [questions, setQuestions] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleAskQuestion = () => {
    const contentState = editorState.getCurrentContent();
    const questionText = contentState.getPlainText();

    setQuestions([...questions, { text: questionText, answers: [] }]);
    setEditorState(EditorState.createEmpty());
  };

  const handleAnswerQuestion = (questionIndex) => {
    const contentState = editorState.getCurrentContent();
    const answerText = contentState.getPlainText();

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push(answerText);
    
    setQuestions(updatedQuestions);
    setEditorState(EditorState.createEmpty());
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Heading mb={4}>QnA Forum</Heading>

        <VStack align="stretch" spacing={4}>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Ask a question..."
          />
          <Button colorScheme="teal" onClick={handleAskQuestion} disabled={editorState.getCurrentContent().hasText()}>
            Ask
          </Button>
        </VStack>

        <Divider my={8} />

        {questions.map((q, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="lg">{q.text}</Text>
            
            <VStack mt={2} align="stretch" spacing={2}>
              {q.answers.map((a, ansIndex) => (
                <Box key={ansIndex} border="1px" borderColor="gray.200" p={2} borderRadius="md">
                  <Text>{a}</Text>
                </Box>
              ))}
            </VStack>

            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Your Answer..."
            />

            <Button
              mt={2}
              colorScheme="blue"
              size="sm"
              onClick={() => handleAnswerQuestion(index)}
              disabled={!editorState.getCurrentContent().hasText()}
            >
              Answer
            </Button>
          </Box>
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default Stuck;
