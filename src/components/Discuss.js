import React, { useState } from 'react';
import { IconButton, Button, Flex, Box, Text , Link } from '@chakra-ui/react';
import { FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@fontsource/inter/400.css'; // Import Inter font for Chakra UI

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
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    console.log('PlainText:', plainText);
  
    setSavedContents([...savedContents, plainText]);
    setVotes({ ...votes, [currentIndex]: { upvotes: 0, downvotes: 0 } });
    setCurrentIndex(currentIndex + 1); // Increment the index
    setShowEditor(false);
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
        downvotes: votes[index].downvotes +1,
      },
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" bgColor="gray.800" minHeight="100vh" color="white" p={4}>
      <IconButton icon={<FaPlus />} size="lg" colorScheme="teal" aria-label="Add" onClick={handleToggleEditor} mb={4} />

      {showEditor && (
        <Flex direction="column" align="center" width="100%" bgColor="yellow">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            wrapperStyle={{ backgroundColor: 'grey', width: '1200px', height: '300px' }}
            editorStyle={{ border: '1px solid black', height: '300px' }}
            toolbarStyle={{ backgroundColor: 'white', color: 'green' }}
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />

        <Button mt={4} colorScheme="teal" onClick={() => handleSave()}>
          Save
        </Button>

        </Flex>
      )}

      {savedContents.map((content, index) => (
        <>
         <Link key={index} href={'/execution'} _hover={{ textDecoration: 'none' }}>
        <Box key={index} mt={4} p={4} bgColor="white" color="black">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Saved Content {index + 1}:</Text>
          <Text>{content}</Text>
        </Box>
         </Link>
         <Flex mt={2}>
         <IconButton  color='black' icon={<FaArrowUp />} aria-label="Upvote" onClick={() => handleUpvote(index)} />
         <IconButton   color='black' icon={<FaArrowDown />} aria-label="Downvote" onClick={() => handleDownvote(index)} />
         <Text mx={2}>{(votes[index]?.upvotes -votes[index]?.downvotes) || 0}</Text>
       </Flex>
       </>
      ))}
    </Flex>
  );
};

export default Discuss;
