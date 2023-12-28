import React, { useEffect, useState } from 'react';
import { Box, Card , Center, HStack , Text , Button } from '@chakra-ui/react';
import Layout from './DashBoard';
import { useOverview } from './OverviewContext';
import { EDIT_INVITE , DELETE_INVITE } from '../utils/endpoints';
import instance from '../utils/api';


const Notification = () => {

   
const {notifications } = useOverview()
 
const handleAcceptSubmt =async(inviteId)=>{
  try{
  const response = await instance.put(
    `${EDIT_INVITE}/${inviteId}`,
    
  );

  const { success, message, education } = response.data;
  if (success) {
    // Handle success
    
  
  } else {
    // Handle error
    console.error('Failed to update education entry on the backend');
  }
} catch (error) {
  console.error('Error occurred while updating education entry:', error);
}
}

const handleDeleteSubmt =async(inviteId)=>{
  try{
  const response = await instance.get(
    `${DELETE_INVITE}/${inviteId}`,
    
  );

  const { success, message, education } = response.data;
  if (success) {
    // Handle success
    
  
  } else {
    // Handle error
    console.error('Failed to update education entry on the backend');
  }
} catch (error) {
  console.error('Error occurred while updating education entry:', error);
}
}


  return (
    <Layout >
    <div>
      <h1>Notifications</h1>
      <Center>
      <Card w='50%'>
      {notifications.map(notification => (
    <Box key={notification._id} borderColor='black' borderWidth='1px'>
      {notification.notificationType === "TEAM_INVITE" && (
        <HStack>
          <Text>{notification.sourceUserName}</Text>
          <Button onClick={() => handleAcceptSubmt(notification.sourceId)} >accept</Button>
          <Button onClick={() => handleDeleteSubmt(notification.sourceId)}>reject</Button>
        </HStack>
      )}
    </Box>
  ))}
      </Card>
      </Center>
    </div>
    </Layout>
  );
};

export default Notification;
