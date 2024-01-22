// Example LoginPage.js
import React from "react";

const LoginPage = ({ onBack }) => {
  return (
    <div>
      <h2>Login Page</h2>
      {/* Add your login form here */}
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default LoginPage;
