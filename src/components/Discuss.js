import React, { useState } from 'react';
import { IconButton, Button, Flex } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@fontsource/inter/400.css'; // Import Inter font for Chakra UI

const Discuss = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    // Get raw content state
    const contentState = convertToRaw(editorState.getCurrentContent());
    console.log('Saved content:', contentState);

    // Optionally, you can convert it back to EditorState if needed
    // const newEditorState = EditorState.createWithContent(convertFromRaw(contentState));

    setShowEditor(false); // Hide the editor after saving
  };

  return (
    <Flex direction="column" align="center" justify="center" bgColor="gray.800" minHeight="100vh" color="white" p={4}>
      <IconButton icon={<FaPlus />} size="lg" colorScheme="teal" aria-label="Add" onClick={handleToggleEditor} mb={4} />

      {showEditor && (
        <Flex direction="column" align="center" width="100%"  bgColor='yellow'>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            wrapperStyle={{ backgroundColor: 'grey'   ,  width : '1200px' , height : '300px'}} // Apply inline styles to the outer wrapper
            editorStyle={{ border: '1px solid black' , height:'300px'}} // Apply inline styles to the editor area
            toolbarStyle={{ backgroundColor: 'white'  , color : 'green'}} // Apply inline styles to the toolbar
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />

          <Button mt={4} colorScheme="teal" onClick={handleSave}>
            Save
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Discuss;
