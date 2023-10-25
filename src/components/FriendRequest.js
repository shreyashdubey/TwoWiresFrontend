import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext'; // Import the UserContext

const FriendRequest = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Assuming userData.userId holds the user's ID after authentication
      fetchPendingRequests();
  }, []);
  const fetchPendingRequests = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/connectroute/pending-requests', {
          },
            {withCredentials : true}
         );
      alert(response.data)    
      setPendingRequests(response.data);
    } catch (error) {
      alert('Error fetching pending requests:', error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      // Make a POST request to update the friend request status
      const response = await axios.post('http://localhost:3001/api/connectroute/respond', {
        requestId: requestId,
        response: 'accepted',
      });
  
      alert(response.data.message); // Log success message
  
      // After successfully accepting the request, you can remove the request from the list
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      alert('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // Make a POST request to update the request status to "rejected" in the backend
      const response = await axios.post('/api/connectroute/respond', {
        requestId: requestId,
        response: 'rejected',
      });
  
      // Check if the request was successfully rejected
      if (response.status === 200) {
        // Remove the rejected request from the friendRequests list
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        alert(response.data.message); // Log success message
      }
    } catch (error) {
      alert('Error rejecting friend request:', error);
    }
  };
  
  

  // Handle accept and reject logic here

  return (
    <div>
      <h2>Pending Friend Requests</h2>
      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request._id}>
              {request.sender.username} sent you a friend request.
              <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
              <button onClick={() => handleRejectRequest(request._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequest;