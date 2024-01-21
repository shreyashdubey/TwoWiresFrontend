import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import ChatWindow from "./ChatWindow"; // Import the ChatWindow component

const FriendsListModal = ({ onClose }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); // Track the selected friend
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // Fetch user's friends from the server
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/connectroute/friends/${userData.userId}`,
        );
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  // Open chat window for the selected friend
  const openChat = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="modal">
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id} onClick={() => openChat(friend)}>
            {friend.username}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
      {selectedFriend && (
        <ChatWindow
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  );
};

export default FriendsListModal;
