import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Heading, IconButton, Text , Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useOverview } from './OverviewContext';
import Layout from './DashBoard.js';

const OverviewSection = () => {
  const [isOverviewEditing, setIsOverviewEditing] = useState(false);
  const [isDiscriptionEditing, setIsDiscriptionEditing] = useState(false);
  const [isEvaluationTextEditing, setIsEvaluationTextEditing] = useState(false);
  const [overviewText, setOverviewText] = useState(
    '<p>This is the default overview text.</p>'
  ); // Provide initial HTML content
  const { setOverviewSaved } = useOverview();

  const [descriptionText, setDescriptionText] = useState(
    '<p>This is the default description text.</p>'
  );

  const [evaluationText, setEvaluationText] = useState(
    '<p>This is the default evaluation text.</p>'
  );

  const handleOverviewEditClick = () => {
    setIsOverviewEditing(true);
  };
  const handleDiscriptionEditClick = () => {
    setIsDiscriptionEditing(true);
  };
  const handleEvaluationTextEditClick = () => {
    setIsEvaluationTextEditing(true);
  };



  const handleOverviewSaveClick = () => {
    setIsOverviewEditing(false);
    setOverviewSaved(true);
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleDiscriptionSaveClick = () => {
    setIsDiscriptionEditing(false);
    setOverviewSaved(true);
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleEvaluationTextSaveClick = () => {
    setIsEvaluationTextEditing(false);
    setOverviewSaved(true);
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleSaveOverview = () => {
    // Implement the logic to save the overview to the database
    console.log('Saving overview:', overviewText);
    // Add your database save logic here
    setOverviewSaved(true);

  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <Layout>
    <Box p={4} w='100%' >
        <Box w='100%' >
      <Heading mb={4}>
        Overview{' '}
        {!isOverviewEditing && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Overview"
            ml={2}
            onClick={handleOverviewEditClick}
          />
        )}
      </Heading>
      {isOverviewEditing ? (
        <Box>
          <ReactQuill
            theme="snow"
            value={overviewText}
            onChange={(value) => setOverviewText(value)}
            modules={modules}
            formats={formats}
          />
          <IconButton
            icon={<EditIcon />}
            aria-label="Save Overview"
            mt={2}
            onClick={handleOverviewSaveClick}
          />
        </Box>
      ) : (
        <Text dangerouslySetInnerHTML={{ __html: overviewText }} />
      )}
       </Box>
       <Box mt='20px'> 
       <Heading mb={4}>
        Description{' '}
        {!isDiscriptionEditing && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Overview"
            ml={2}
            onClick={handleDiscriptionEditClick}
          />
        )}
      </Heading>
      {isDiscriptionEditing ? (
        <Box w='100%' mt='30px'>
          <ReactQuill
            theme="snow"
            value={descriptionText}
            onChange={(value) => setDescriptionText(value)}
            modules={modules}
            formats={formats}
          />
          <IconButton
            icon={<EditIcon />}
            aria-label="Save Description"
            mt={2}
            onClick={handleDiscriptionSaveClick}
          />
        </Box>
      ) : (
        <Text dangerouslySetInnerHTML={{ __html: descriptionText }} />
      )}
      </Box>
     
      <Box  mt='20px'> 
       <Heading mb={4}>
        Evaluation{' '}
        {!isEvaluationTextEditing && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Evaluation"
            ml={2}
            onClick={handleEvaluationTextEditClick}
          />
        )}
      </Heading>
      {isEvaluationTextEditing ? (
        <Box w='100%' mt='30px'>
          <ReactQuill
            theme="snow"
            value={evaluationText}
            onChange={(value) => setEvaluationText(value)}
            modules={modules}
            formats={formats}
          />
          <IconButton
            icon={<EditIcon />}
            aria-label="Save Evaluation"
            mt={2}
            onClick={handleEvaluationTextSaveClick}
          />
        </Box>
      ) : (
        <Text dangerouslySetInnerHTML={{ __html: evaluationText }} />
      )}
      </Box>
      <Button onClick={handleSaveOverview} colorScheme="teal" mt={4}>
        Save Overview
      </Button>
    </Box>
    </Layout>
  );
};

export default OverviewSection;
