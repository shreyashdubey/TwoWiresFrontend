import React, { useEffect, useState } from 'react';
import { Box, Card , Center } from '@chakra-ui/react';
import Layout from './DashBoard';
import { useOverview } from './OverviewContext';


const Notification = () => {

   
const {notifications } = useOverview()
 

  return (
    <Layout >
    <div>
      <h1>Notifications</h1>
      <Center>
      <Card w='50%'>
        {notifications.map(notification => (
              <Box borderColor='black' borderWidth='1px'>
          <li key={notification._id}>
          
            <p>Type: {notification.notificationType}</p>
            <p>Source ID: {notification.sourceId}</p>
            <p>Is Read: {notification.isRead ? 'Yes' : 'No'}</p>
            <p>Created At: {notification.createdAt}</p>
           
          </li>
          </Box>
        ))}
      </Card>
      </Center>
    </div>
    </Layout>
  );
};

export default Notification;
