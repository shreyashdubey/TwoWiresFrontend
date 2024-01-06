import React from 'react';
import OneSignal from 'react-onesignal';

function RequestSender() {
  const sendRequest = () => {
    // Get recipient's OneSignal player ID (you need to store this information)
    const recipientPlayerId = "288cdfad-234c-b2ff-6246-a16e531c8375"; // Replace with the actual player ID

    // Define the notification content
    OneSignal.postNotification({
        contents: { en: "You have a new friend request!" },
        include_player_ids: [recipientPlayerId],
        data: {
          requestType: 'friendRequest',
          senderName: 'John Doe', // Include any other custom data you want
        },
      });
    }

  return (
    <button onClick={sendRequest}>Send Request</button>
  );
}

export default RequestSender;
