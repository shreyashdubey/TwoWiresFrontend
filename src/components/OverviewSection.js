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
    '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>'
  ); // Provide initial HTML content
  const { setOverviewSaved } = useOverview();

  const [descriptionText, setDescriptionText] = useState(
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'
  );

  const [evaluationText, setEvaluationText] = useState(
    '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>'
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
      <Heading mt='50px' >
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
