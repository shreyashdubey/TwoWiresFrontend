import React, { useState } from 'react';
import { Select, Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Stuck = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [link, setLink] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [savedLink, setSavedLink] = useState('');
  const [savedContent, setSavedContent] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSaveLink = () => {
    setSavedLink(link);
    setLink('');
  };

  const handleSaveContent = () => {
    const contentState = convertToRaw(editorState.getCurrentContent());
    const contentText = contentState.blocks.map((block) => block.text).join('\n');
    setSavedContent(contentText);
    setEditorState(EditorState.createEmpty()); // Clear the editor
  };

  return (
    <>
      <Select placeholder='Select option' onChange={handleSelectChange} value={selectedOption}>
        <option value='option1'>Share a Resource Link</option>
        <option value='option2'>Create a tutorial</option>
      </Select>

      {selectedOption === 'option1' && (
        <Box mt={4}>
          <Text>Paste your link:</Text>
          <Flex>
            <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder='Enter your link' />
            <Button ml={2} colorScheme='teal' onClick={handleSaveLink}>
              Save Link
            </Button>
          </Flex>
        </Box>
      )}

      {selectedOption === 'option2' && (
        <Box mt={4}>
          <Text>Write your tutorial:</Text>
          <Editor
            editorState={editorState}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
          />
          <Button mt={2} colorScheme='teal' onClick={handleSaveContent}>
            Save Content
          </Button>
        </Box>
      )}

      {savedLink && (
        <Box mt={4}>
          <Text>Saved Link:</Text>
          <Box bgColor='lightgray' p={2} borderRadius='md'>
            <a href={savedLink} target='_blank' rel='noopener noreferrer'>
              {savedLink}
            </a>
          </Box>
        </Box>
      )}

      {savedContent && (
        <Box mt={4}>
          <Text>Saved Content:</Text>
          <Box bgColor='lightgray' p={2} borderRadius='md'>
            {savedContent}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Stuck;
