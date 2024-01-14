import React, { useState , useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Heading, IconButton, Text , Button , Input, Center ,  Tag,TagLabel, } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useOverview } from './OverviewContext';
import Layout from './DashBoard.js';
import instance from '../utils/api.js';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN } from '../utils/siteConstants.js';

const OverviewSection = ({published , submitted}) => {
  const [isOverviewEditing, setIsOverviewEditing] = useState(false);
  const [isDiscriptionEditing, setIsDiscriptionEditing] = useState(false);
  const [isEvaluationTextEditing, setIsEvaluationTextEditing] = useState(false);
  const [isEditing , setIsEditing] = useState(false)
  const [contestDescription, setContestDescription] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  const [publish, setPublish] = useState(false);
  const {contestId ,ok} = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [review , setReview] = useState()
  const [submitButton , setSubmitButton] = useState(false)
  const [overviewText, setOverviewText] = useState(
    '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>'
  ); // Provide initial HTML content
  const { setOverviewSaved } = useOverview();
  const {isContestDetail } = useOverview();
  const {setSubmitted} = useOverview();
  

  const [descriptionText, setDescriptionText] = useState(
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'
  );

  const [evaluationText, setEvaluationText] = useState(
    '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>'
  );
  let check = parseInt(ok, 10)
  const [store , setStore] = useState(check)
  console.log('ini',initialFetch)
  useEffect(() => {
    const fetchContestDescription = async () => {
      try {
        // Make the API request to fetch contest description
        const response = await instance.get(`/api/contest-description/get-contest-description/${contestId}`);

        // Check if the API request was successful
        if (response.success) {
         setOverviewText(response.contestDescription.overview)
         setDescriptionText(response.contestDescription.description)
         setEvaluationText(response.contestDescription.evaluation)
         const save = response.contestDescription.createdAt;
         const update = response.contestDescription.updatedAt;
        // setPublish(response.isPublish)
        if(save === update) {
          setIsSaved(true)
        }
        else{
          setIsUpdated(true)
        }
         
        } else {
          console.error('Failed to fetch contest description:', response.message);
        }
      } catch (error) {
        console.error('API Request Error:', error);
      }
    };
    if (!store) {
      // Fetch education entries only when initialFetch is false
      try {
        // Make the API request to fetch contest description
        instance.get(`/api/contest/get-contest-by-id?contestId=${contestId}`)
          .then((response) => {
            // Check if the API request was successful
            console.log(response)
             setSubmitButton(response.contest.isSubmitted)
            if (response.contest.contestDescription) {
              setStore(1)
              console.log('check2', store);
            }
            else{
              console.log('check3' , store)
            }
          })
          .catch((error) => {
            console.error('API Request Error:', error);
          });
      } catch (error) {
        console.error('Try-catch block error:', error);
      }
      
       // Set initialFetch to true after the initial fetch
    }
    console.log('initialFetch' , initialFetch)
    if (!initialFetch  && store) {
      // Fetch education entries only when initialFetch is false
      fetchContestDescription();
      setInitialFetch(true);
       // Set initialFetch to true after the initial fetch
    }
    //657bcae7d369104622d9bac2
  }, [initialFetch , store]);

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
    setIsEditing(true)
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleDiscriptionSaveClick = () => {
    setIsDiscriptionEditing(false);
    setOverviewSaved(true);
    setIsEditing(true)
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleEvaluationTextSaveClick = () => {
    setIsEvaluationTextEditing(false);
    setOverviewSaved(true);
    setIsEditing(true)
    // Implement logic to save the overviewText to the backend or any storage mechanism
  };

  const handleSaveOverview = async () => {
    // Prepare data for the API request
    const subtitle = 'Example Contest' 
    const evaluation = evaluationText
    const timeline = ['4/10' , '4/15']  
    const overview = overviewText 
    const description = descriptionText 
    const tags = ['tag1' , 'tag2'] 
  
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const decodedToken = jwtDecode(accessToken);
    const admin = decodedToken.user._id;

    try {
      // Make the API request to save contest description
      const response = await instance.post('/api/contest-description/create-contest-description',{admin , contestId , subtitle , evaluation , timeline , overview , description , tags}, {
        'Content-Type': 'application/json' ,
      });


      // Check if the API request was successful
      if (response.success ) {
        console.log('Contest description saved successfully:');
        setOverviewSaved(true);
        setInitialFetch(false)
        setStore(1)
        setIsEditing(false)
      } else {
        console.error('Failed to save contest description:');
      }
    } catch (error) {
      console.error('API Request Error:', error);
    }

    // Reset the editing state
    setIsOverviewEditing(false);
    setIsDiscriptionEditing(false);
    setIsEvaluationTextEditing(false);
  };

  const handleUpdate = async () => {
    // Prepare data for the API request
    const subtitle = 'Example Contest' 
    const evaluation = evaluationText
    const timeline = ['4/10' , '4/15']  
    const overview = overviewText 
    const description = descriptionText 
    const tags = ['tag1' , 'tag2'] 

    try {
      // Make the API request to save contest description
      const response = await instance.put(`/api/contest-description/edit-contest-description/${contestId}`,{subtitle , evaluation , timeline , overview , description , tags}, {
        'Content-Type': 'application/json' ,
      });
      // Check if the API request was successful
      if (response.success ) {
        console.log('Contest description saved successfully:', response.contestDescription);
        setOverviewSaved(true);
        setInitialFetch(false)
        setIsEditing(false)
      } else {
        console.error('Failed to save contest description:', response.message);
      }
    } catch (error) {
      console.error('API Request Error:', error);
    }

    setIsOverviewEditing(false);
    setIsDiscriptionEditing(false);
    setIsEvaluationTextEditing(false);
  };

  const handleContestUpdate = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the API request
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user._id



      // Make the API request
       const response = await instance.put(`/api/contest/edit-contest/${contestId}`,{contestOrganizer:userId , isSubmitted:true}, {'Content-Type': 'application/json'})

      // Handle the response from the API
        console.log('API Response:', response);

      // Assuming the API response is successful, you can redirect to the overview page
      if (response) {
        setSubmitted(true)
        setInitialFetch(false)
        setStore(0)
        // Optionally, you can set isOverviewSaved in the context or component state
        // to update the Save button logic if needed
        //navigate('/overview');
      } else {
        // Handle error cases if needed
      }
    } catch (error) {
      console.error('API Request Error:', error);
      // Handle error cases if needed
    }
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
    <>
    <Box p={4} w='100%'   mb='100px' >
    {(isSaved || store ) && !submitButton && !published && !submitted && (
          <Button type="submit" colorScheme="teal" size="lg" onClick={handleContestUpdate}>
             Submit Contest for review
          </Button>
    )}
    <Box w='75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']}  >
      <Heading mt='50px' >
        Overview{' '}
        {!isOverviewEditing && !submitButton && !submitted && !published && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Overview"
            ml={2}
            onClick={handleOverviewEditClick}
          />
        )}
      </Heading>
      {isOverviewEditing && !submitButton && !submitted  && !published ? (
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
       <Box mt='20px'   w='75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']} > 
       <Heading mb={4}>
        Description{' '}
        {!isDiscriptionEditing && !submitButton && !submitted && !published && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Overview"
            ml={2}
            onClick={handleDiscriptionEditClick}
          />
        )}
      </Heading>
      {isDiscriptionEditing && !submitButton && !submitted  && !published ? (
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
     
      <Box  mt='20px'   w='75%'  ml={['95px' , '90px' , '100px','110px','130px','190px']} > 
       <Heading mb={4}>
        Evaluation{' '}
        {!isEvaluationTextEditing && !submitButton && !submitted &&  !published && (
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Evaluation"
            ml={2}
            onClick={handleEvaluationTextEditClick}
          />
        )}
      </Heading>
      {isEvaluationTextEditing && !submitButton && !submitted  && !published? (
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
      {isSaved  && isEditing && (
          <Button type="submit" colorScheme="teal" size="lg" onClick={handleUpdate}>
            Update
          </Button>
        )}
        {!isSaved && isEditing &&   (
          <Button onClick={handleSaveOverview} colorScheme="teal" mt={4}>
            Save Overview
          </Button>
        )}
       
    </Box>
    </>
  );
};

export default OverviewSection;
