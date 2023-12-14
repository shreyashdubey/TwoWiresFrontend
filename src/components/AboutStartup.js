// ActiveCompetitions.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Container, Heading, SimpleGrid, Card, Box, Badge, Text, Image, VStack, HStack, Spacer ,useColorModeValue ,  useBreakpointValue, Center, Flex, Grid , Button , useMediaQuery} from '@chakra-ui/react';
import contest1 from './images/contest1.jpeg'
import contest2  from './images/contest2.jpeg'
import Layout from './DashBoard.js';
import { useRef , useEffect } from 'react';
import {useScroll , useTransform , motion , useInView , useAnimation , useMotionValue} from "framer-motion"
import ParticleBg from './particle.js';

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
  
  return (
       <ParticleBg>
    <Box minHeight='100vh' bgColor={'blackAlpha.900'}  w='full'>
      <Center>
       <Text  as='I' fontSize={['4xl' , '5xl' , '5xl' , '7xl', '8xl' , '9xl']}  fontWeight='medium'  h='30%' textShadow='4px 4px #1D4044'  >Sourced Startup</Text>
        {/* Sourced Startup Text */}
        </Center>
        <VStack  ml= {['400px' , '20px' , '30px' , '-40px', '30px' , '150px' , '500px']}  mr= {['400px' , '0px' , '0px' , '0px', '30px' , '150px']}>
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
              <HStack  height={['400px' , '700px' , '250px' , '150px', '200px' , '100px']} mt='100px' ml='100px' spacing={['200px' , '200px' , '20px' , '200px', '200px' , '200px' , "250px"]}  as='I'  >
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
               <HStack  height={['400px' , '300px' , '400px' , '200px', '200px' , '100px']}  mt= {['400px' , '300px' , '200px' , '30px', '30px' , '30px']} ml='100px' spacing={['200px' , '200px' , '20px' , '95px', '95px' , '95px',"150px"]}  as='I'  >
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
                <HStack   height={['800px' , '800px' , '800px' , '1000px', '800px' ,'600px']}  mt= {['400px' , '300px' , '200px' , '100px', '100px' , '30px']} ml='100px'  spacing={['200px' , '200px' , '20px' , '80px', '30px' , '10px' , "0px"]} as='I' >
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
        
      

       
        <Center  ml={['865px' , '0px' , '0px' , '80px', '70px' ,'60px']}>
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
      </Box>

      </ParticleBg>
   
  ); 
};



export default AboutStartup;
