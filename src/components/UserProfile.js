import React, { useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext

const UserProfile = () => {
  const { userId } = useParams();
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState(null);

  // Fetch the user's profile based on the userId from the URL parameter
  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        alert('Error fetching user profile:', error);
      });
  }, [userId]);

  const handleSendRequest = async () => {
    try {
      const response = await axios.post('/api/friend/send', {
        senderId: userData.userId, // Use the logged-in user's ID
        receiverId: userId,
      });
      console.log(response.data.message); // Log success message
      // Navigate back to the home page
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Profession: {user.profession}</p>
      <p>Expertise: {user.expertise}</p>
      <button onClick={handleSendRequest}>Send Friend Request</button>
    </div>
  );
};

export default UserProfile;