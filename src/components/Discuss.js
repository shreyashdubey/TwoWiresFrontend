import React, { useState } from "react";
import {
  IconButton,
  Button,
  Flex,
  Box,
  Text,
  Link,
  Heading,
  Center,
} from "@chakra-ui/react";
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/inter/400.css"; // Import Inter font for Chakra UI

const Discuss = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [savedContents, setSavedContents] = useState([]);
  const [votes, setVotes] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    // Get the current content state of the editor
    const contentState = editorState.getCurrentContent();

    // Convert the content state to a raw object
    const rawContentState = convertToRaw(contentState);

    // Update the state to include the new raw content state
    setSavedContents([...savedContents, rawContentState]);

    // Initialize or update the votes for the current index with upvotes and downvotes set to 0
    setVotes({ ...votes, [currentIndex]: { upvotes: 0, downvotes: 0 } });

    // Increment the index for the next saved content
    setCurrentIndex(currentIndex + 1);

    // Hide the editor by setting showEditor to false
    setShowEditor(false);
    setEditorState(EditorState.createEmpty());
  };

  const handleUpvote = (index) => {
    setVotes({
      ...votes,
      [index]: {
        ...votes[index],
        upvotes: votes[index].upvotes + 1,
      },
    });
  };

  const handleDownvote = (index) => {
    setVotes({
      ...votes,
      [index]: {
        ...votes[index],
        downvotes: votes[index].downvotes + 1,
      },
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bgColor="gray.800"
      minHeight="100vh"
      color="white"
      p={4}
    >
      <Heading>Write a plan to execute the startup</Heading>
      <IconButton
        icon={<FaPlus />}
        size="lg"
        colorScheme="teal"
        aria-label="Add"
        onClick={handleToggleEditor}
        mb={4}
      />

      {showEditor && (
        <Flex direction="column" align="center" width="100%">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            wrapperStyle={{ backgroundColor: "black", width: "1200px" }}
            editorStyle={{ border: "1px solid black" }}
            toolbarStyle={{ backgroundColor: "white", color: "green" }}
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />

          <Button mt={4} colorScheme="teal" onClick={() => handleSave()}>
            Save
          </Button>
        </Flex>
      )}

      {savedContents.map((rawContentState, index) => (
        <React.Fragment key={index}>
          <Box mt={4} p={4} bgColor="black" w="75%">
            <Link
              key={index}
              href={"/execution"}
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2} color="black">
                Saved Content {index + 1}:
              </Text>
              {/* Render the Editor with the raw content state */}
              <Editor
                toolbarHidden="true"
                readOnly={!showEditor}
                editorState={EditorState.createWithContent(
                  convertFromRaw(rawContentState),
                )}
              />
            </Link>
          </Box>
          <Flex mt={2}>
            <IconButton
              color="black"
              icon={<FaArrowUp />}
              aria-label="Upvote"
              onClick={() => handleUpvote(index)}
            />
            <IconButton
              color="black"
              icon={<FaArrowDown />}
              aria-label="Downvote"
              onClick={() => handleDownvote(index)}
            />
            <Text mx={2}>
              {votes[index]?.upvotes - votes[index]?.downvotes || 0}
            </Text>
          </Flex>
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Discuss;
