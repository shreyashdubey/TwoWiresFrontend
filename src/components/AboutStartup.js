import React , {useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Heading, SimpleGrid, Card, Box, Badge, Text, Image, VStack, HStack, Spacer ,useColorModeValue ,  useBreakpointValue, Center, Flex, Grid , Button , useMediaQuery ,Hide , } from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'
import contest2  from './images/contest2.jpeg'
import Layout from './DashBoard.js';
import { useRef , useEffect } from 'react';
import {useScroll , useTransform , motion , useInView , useAnimation , useMotionValue} from "framer-motion" 
import ParticleBg from './particle.js';
import StartFieldBg from './StartFeild.js';
import Key from './KeyBoard.js';


const textVariants = {
  hidden: { opacity: 0, y: -20 },
 // visible: { opacity: 1, y: 100},
  visible: (i) => {
     // const delay = 1 + i * 0.5;
     const delay = 0
      return {
        opacity: 1, 
        transition: {
          delay,
          type: "spring",
          duration: 4.5,
          bounce: .5,
        },
      };
    },
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
   // const delay = 1 + i * 0.5;
     const delay = 0
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const AboutStartup = () => {

 const ref = useRef(null)
 const isInView = useInView(ref , {once:true})
 const mainControl = useAnimation()
 const x = useMotionValue(0)
 const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
 const [isabove425px] =useMediaQuery("(min-width: 426px)");
 const [isabove1600px] =useMediaQuery("(min-width: 1600px)");;
 console.log(isabove425px)
 useEffect(()=>{
  console.log(isInView)
  if(isInView){
   
     mainControl.start("visible")
  }
 } ,[isInView])

 const [selectedComponent, setSelectedComponent] = useState(null);
 const [selectedComponentException, setSelectedComponentException] = useState(false);

 const handleComponentClick = (componentId) => {
 setSelectedComponent(componentId);
};
const handleComponentClickException = (componentId) => {
 setSelectedComponentException(true);
};

  return (
        <StartFieldBg>




    <Box minHeight='100vh' bgColor={'blackAlpha.900'}  w='full'>
      <Center >
       <Text  as='I' fontSize={['4xl' , '5xl' , '5xl' , '7xl', '8xl' , '9xl']}  fontWeight='medium'  h='30%' textShadow='4px 4px #1D4044'  >Sourced Startup</Text>
        {/* Sourced Startup Text */}
        </Center>
        <VStack  ml= {['400px' , '20px' , '30px' , '-40px', '30px' , '220px' , '500px']}  mr= {['400px' , '0px' , '0px' , '0px', '0px' , '150px']}>
         <Box ref={ref}>
        <motion.div
           variants = {{
            hidden : {opacity : 0 , y : 75} ,
            visible : {opacity : 1 , y : 0} ,
           }}
           initial="hidden"
           whileInView="visible"
           transition = {{duration:.5 , delay : .25}}
         
        >
          
       {isabove425px ?(
              <HStack  height={['400px' , '700px' , '250px' , '150px', '200px' , '100px']} mt='100px' ml= {['100px' , '100px' , '100px' , '100px', '100px' , '100px' , "0px"]} spacing={['200px' , '200px' , '20px' , '200px', '200px' , '200px' , "250px"]}  as='I'  >
              <Heading>Vision</Heading>
              <Text  w='55%'>At SourcedStartup, our vision is rooted in alleviating the common challenges encountered by entrepreneurs throughout the startup journey. We aim to streamline the startup-building process by addressing key pain points and providing comprehensive solutions.</Text>
          </HStack>
       ):(
          <VStack  mt='50px' w='100%' justifyContent='center' alignContent='center' >
            <Heading fontSize='3xl'>Vision</Heading>
              <Text  w='55%'>At SourcedStartup, our vision is rooted in alleviating the common challenges encountered by entrepreneurs throughout the startup journey. We aim to streamline the startup-building process by addressing key pain points and providing comprehensive solutions.</Text>
          </VStack>
       )}
      {isabove425px ?(
               <HStack  height={['400px' , '300px' , '400px' , '200px', '200px' , '100px']}  mt= {['400px' , '300px' , '200px' , '30px', '30px' , '30px']}ml= {['100px' , '100px' , '100px' , '100px', '100px' , '100px' , "0px"]} spacing={['200px' , '200px' , '20px' , '95px', '95px' , '95px',"130px"]}  as='I'  >
               <Heading  > Key Services</Heading>
               <Text   w='55%'>Empower your startup journey with SourcedStartup's innovative solutions, offering co-founder matchmaking for like-minded entrepreneurs and contest-based compatibility testing to ensure your team's success from the early stages of your venture</Text>
           </HStack>
       ):(
          <VStack mt='50px'>
            <Center flexDir={'column'}>
          <Heading fontSize='3xl'  > Key Services</Heading>
          <Text   mt='5px'  w='55%'>Empower your startup journey with SourcedStartup's innovative solutions, offering co-founder matchmaking for like-minded entrepreneurs and contest-based compatibility testing to ensure your team's success from the early stages of your venture</Text>
          </Center>
          </VStack>
       )}
        {isabove425px ?(
                <HStack   height={['800px' , '800px' , '800px' , '1000px', '800px' ,'600px']}  mt= {['400px' , '300px' , '200px' , '100px', '100px' , '30px']} ml= {['100px' , '100px' , '100px' , '100px', '100px' , '100px' , "0px"]}  spacing={['200px' , '200px' , '20px' , '80px', '30px' , '10px' , "44px"]} as='I' >
                <Heading mb='350px'>Future Goal</Heading>
                <VStack spacing='30px'  mb='100px' ml='30px' w='70%' as='I' >
                <Text w='75%' mr='60px'>We are developing an advanced Judge AI that will evaluate proposed solutions from co-founders. This AI will provide objective ratings and create a systematic flow to transform these solutions into actionable plans for building successful startups.</Text>
                <Text w='75%' mr='60px'>Our platform will introduce a Viability Testing Engine, allowing users to simulate and assess the feasibility of their startup solutions. This tool will provide invaluable insights, enabling entrepreneurs to refine their strategies and make informed decisions.</Text>
                <Text w='75%' mr='60px' >SourcedStartup envisions fostering an open-source community where individuals can contribute to the step-by-step solutions required for startup development. Collaboration will be key, as community members join forces to build a supportive ecosystem for aspiring entrepreneurs.</Text>
                <Text w='75%' mr='60px'>To enhance the learning experience, our platform will feature a dynamic feed with posts from fellow creators. Stay updated on industry trends, gain insights from experienced entrepreneurs, and showcase your progress to build a following. This content and community platform will serve as a hub for knowledge exchange and networking within the startup community.</Text>
                </VStack>
            </HStack>
       ):(
          <VStack  mt='50px' mb='50px' justifyContent='center' alignContent='center' flexDir={'column'}>
          <Heading fontSize='3xl' >Future Goal</Heading>
          <Text w='75%' >We are developing an advanced Judge AI that will evaluate proposed solutions from co-founders. This AI will provide objective ratings and create a systematic flow to transform these solutions into actionable plans for building successful startups.</Text>
                <Text w='75%' >Our platform will introduce a Viability Testing Engine, allowing users to simulate and assess the feasibility of their startup solutions. This tool will provide invaluable insights, enabling entrepreneurs to refine their strategies and make informed decisions.</Text>
                <Text w='75%'  >SourcedStartup envisions fostering an open-source community where individuals can contribute to the step-by-step solutions required for startup development. Collaboration will be key, as community members join forces to build a supportive ecosystem for aspiring entrepreneurs.</Text>
                <Text w='75%' >To enhance the learning experience, our platform will feature a dynamic feed with posts from fellow creators. Stay updated on industry trends, gain insights from experienced entrepreneurs, and showcase your progress to build a following. This content and community platform will serve as a hub for knowledge exchange and networking within the startup community.</Text>
          </VStack>
       )}
        
      
       
        <Center  ml={['865px' , '0px' , '0px' , '80px', '70px' ,'60px', "-150px"]}>
        <Text   mb='100px' >At SourcedStartup, we are committed to empowering entrepreneurs with innovative solutions and a supportive community, paving the way for successful and sustainable startups. Join us on this exciting journey of collaboration, learning, and growth.</Text>
        </Center>
        </motion.div>
        </Box>
       
        </VStack>
        
      
       {/* <Container py={12}>
        <VStack spacing={8}>
          <Heading textAlign="center">Our Key Services</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
            <Box>
              <Heading fontSize="xl" mb={4}>
                Co-Founder Matchmaking
              </Heading>
              <Text>
                Problem: Entrepreneurs often face difficulties finding suitable co-founders who align with their vision and complement their skill sets.
              </Text>
            </Box>
            <Box>
              
            </Box>
          </Grid>
        </VStack>
      </Container>
      <Container py={12}>
        <VStack spacing={8}>
          <Heading textAlign="center">Future Vision</Heading>
        
        </VStack>
      </Container>
      <Container py={12}>
        <VStack spacing={8}>
          <Heading textAlign="center">Testimonials</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
            <Box>
              <Text>"SourcedStartup changed the way I approached building my startup. The co-founder matchmaking was a game-changer."</Text>
            </Box>
    
            <Box>
            </Box>
          </Grid>
        </VStack>
      </Container>
    
      <Container py={12}>
        <VStack spacing={4}>
          <Heading textAlign="center">Join Us on This Exciting Journey!</Heading>
          <Text textAlign="center">Ready to transform your startup journey? Join SourcedStartup today!</Text>
          <Button colorScheme="teal" size="lg">
            Sign Up Now
          </Button>
        </VStack>
      </Container>  */}
   
   <Hide below='720px'>
   <motion.svg
        width="100%"
        height="100%"
        viewBox="-1000 0 3000 1500"
        initial="hidden"
        animate="visible"
        >
     <motion.circle
        cx="150"
        cy="150"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={1}
        onClick={() => handleComponentClick(1)}
      />    
       <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={1} y = '160'   x = '-150' >
           Enter The Game
        </motion.text>

      {/* <motion.circle
        cx="150"
        cy="150"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={1}
        onClick={() => handleComponentClick(1)}
      /> */}

      {selectedComponent >0  && (
          <>
            <motion.line
              x1="230"
              y1="150"
              x2="360"
              y2="220"
              stroke="#00cc88"
              variants={draw}
              custom={2}
            />
            <motion.circle
              cx="420"
              cy="220"
              r="80"
              stroke="#ff0055"
              variants={draw}
              custom={3}
              onClick={() => handleComponentClick(2)}
            />
             <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={3} y='130' x = '300'>
               Create Your Player
             </motion.text>
          </>
)}

     {selectedComponent >1 &&(
      <>
       <motion.line
        x1="360" 
        y1="275"
        x2="230"
        y2="345"
        stroke="#00cc88"
        variants={draw}
        custom={3}
      />
       <motion.circle
        cx="180"
        cy="400"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={4}
        onClick={() => handleComponentClick(3)}

      />
       <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={5} y='450' x = '400'>
            Start the Game
        </motion.text>
      </>
     )}

     {selectedComponent >2 && (
              <>
                 <motion.line
                  x1="250" 
                  y1="440"
                  x2="800"
                  y2="550"
                  stroke="#00cc88"
                  variants={draw}
                  custom={4}
                />
                <motion.circle
                  cx="850"
                  cy="618"
                  r="80"
                  stroke="#ff0055"
                  variants={draw}
                  custom={5}
                  onClick={() => handleComponentClick(4)}

                />
              <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={6} y='500' x = '780'>
                Choose
              </motion.text>

              </>

     )}
     {selectedComponent >3  &&(
      <>
         <motion.line
        x1="815" 
        y1="695"
        x2="690"
        y2="770"
        stroke="#00cc88"
        variants={draw}
        custom={5}
      />
      <motion.circle
        cx="650"
        cy="845"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={6}
        onClick={() => handleComponentClick(5)}

      />
      <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={8} y='740' x = '520'>
            Create a Contest
        </motion.text>
      </>
     )}

      {selectedComponent > 3 &&(
        <>
            <motion.line
        x1="875" 
        y1="698"
        x2="1020"
        y2="790"
        stroke="#00cc88"
        variants={draw}
        custom={5}
      />
      <motion.circle
        cx="1050"
        cy="845"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={6}
        onClick={() => handleComponentClickException(9 )}

      />
      <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={8} y='740' x = '950'>
            Give a Contest
      </motion.text>
        </>
      )}
      { selectedComponent >4 && (
        <>
           <motion.line
        x1="600" 
        y1="910"
        x2="470"
        y2="990"
        stroke="#00cc88"
        variants={draw}
        custom={6}
      />
      <motion.circle
        cx="450"
        cy="1070"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={7}
        onClick={() => handleComponentClick(6)}

      />
       <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={12} y='950' x = '250'>
            Create Description
        </motion.text>
        </>
      )}

      {selectedComponent >5 &&  (
            <>
                 <motion.line
                  x1="450" 
                  y1="1155"
                  x2="600"
                  y2="1250"
                  stroke="#00cc88"
                  variants={draw}
                  custom={7}
                />
                <motion.circle
                  cx="640"
                  cy="1330"
                  r="80"
                  stroke="#ff0055"
                  variants={draw}
                  custom={8}
                  onClick={() => handleComponentClick(8)}

      />
        <motion.text fontSize="25"   stroke="#00cc88" variants={textVariants} custom={14} y='1250' x = '310'>
           Wait for Review
        </motion.text>
            </>
      )}
       {selectedComponentException  &&(
             <>
                      <motion.line
        x1="1025" 
        y1="920"
        x2="895"
        y2="990"
        stroke="#00cc88"
        variants={draw}
        custom={8}
      />
       <motion.circle
        cx="905"
        cy="1070"
        r="80"
        stroke="#ff0055"
        variants={draw}
        custom={9}
        onClick={() => handleComponentClick(9)}

      />
             </>
       )}



      {/* <motion.line
        x1="220"
        y1="170"
        x2="360"
        y2="30"
        stroke="#00cc88"
        variants={draw}
        custom={2.5}
      /> */}
      {/* <motion.rect
        width="140"
        height="140"
        x="410"
        y="30"
        rx="20"
        stroke="#0099ff"
        variants={draw}
        custom={3}
      />
      <motion.circle
        cx="100"
        cy="300"
        r="80"
        stroke="#0099ff"
        variants={draw}
        custom={2}
      />
      <motion.line
        x1="220"
        y1="230"
        x2="360"
        y2="370"
        stroke="#ff0055"
        custom={3}
        variants={draw}
      />
      <motion.line
        x1="220"
        y1="370"
        x2="360"
        y2="230"
        stroke="#ff0055"
        custom={3.5}
        variants={draw}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="230"
        rx="20"
        stroke="#00cc88"
        custom={4}
        variants={draw}
      />
      <motion.circle
        cx="100"
        cy="500"
        r="80"
        stroke="#00cc88"
        variants={draw}
        custom={3}
      />
      <motion.line
        x1="220"
        y1="430"
        x2="360"
        y2="570"
        stroke="#0099ff"
        variants={draw}
        custom={4}
      />
      <motion.line
        x1="220"
        y1="570"
        x2="360"
        y2="430"
        stroke="#0099ff"
        variants={draw}
        custom={4.5}
      />
      <motion.rect
        width="140"
        height="140"
        x="410"
        y="430"
        rx="20"
        stroke="#ff0055"
        variants={draw}
        custom={5}
      /> */}
    </motion.svg>
    <Key/>
    </Hide>
      </Box>



      </StartFieldBg>

  ); 
};
export default AboutStartup;