// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Check if the user ID is stored in local storage and return it, otherwise, set it to null
    const storedUserId = localStorage.getItem("userId");
    return {
      userId: storedUserId,
      username: null,
    };
  });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a socket connection
    console.log("first");
    const newSocket = io.connect("http://localhost:3001", {
      forceNew: true,
    });
    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Update local storage when user data changes
  useEffect(() => {
    console.log("seco");
    localStorage.setItem("userId", userData.userId);
  }, [userData.userId]);

  return (
    <UserContext.Provider value={{ userData, setUserData, socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
