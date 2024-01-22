import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";

const ChatWindow = ({ friend, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userData, socket } = useContext(UserContext);

  useEffect(() => {
    // Fetch last 10 messages using HTTP
    const fetchLast10Messages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/messageroute/last10/${getRoomId(
            userData.userId,
            friend._id,
          )}`,
        );
        if (response.ok) {
          const messagesData = await response.json();
          setMessages(messagesData);
        }
      } catch (error) {
        console.error("Error fetching last 10 messages:", error);
      }
    };

    fetchLast10Messages();

    // Join the room when the component mounts
    socket.emit("create", getRoomId(userData.userId, friend._id));

    // Listen for new messages
    let i = 1;
    socket.on("newMessage", (messageData) => {
      const formattedMessage = `${messageData.sender}: ${messageData.text}`;
      setMessages((prevMessages) => {
        console.log(i);
        i++;
        console.log("Previous messages:", prevMessages); // Log the content of prevMessages
        return [...prevMessages, formattedMessage];
      });
    });

    return () => {
      // No need to disconnect the socket here, it will be managed in UserProvider
    };
  }, [friend, userData.userId, friend._id, socket]);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== "") {
      console.log("hey");
      socket.emit("sendMessage", {
        roomId: getRoomId(userData.userId, friend._id),
        sender: userData.userId,
        text: newMessage,
      });

      const formattedMessage = `${userData.username}: ${newMessage}`;
      setMessages((prevMessages) => {
        // console.log('Previous messages:', prevMessages); // Log the content of prevMessages
        return [...prevMessages, formattedMessage];
      });

      setNewMessage("");
    }
  };

  const getRoomId = (user1, user2) => {
    return [user1, user2].sort().join("_");
  };

  return (
    <div className="chat-window">
      <h3>Chat with {friend.username}</h3>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <span>
              {typeof message === "string"
                ? message
                : `${message.sender}: ${message.text}`}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ChatWindow;
