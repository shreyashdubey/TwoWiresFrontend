import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import home from './Home'

const Login = () => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data= await response.json();
     const { message } = data;
      if (response.ok) {
        alert(message);
        navigate("/home");
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during login. Please try again later.');
    }
  };
  if (user) {
    window.location.href = '/home';
  }
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <GoogleOAuthProvider clientId="632513094925-n7la27bd3ocj32qnue8v0asa954ds9t8.apps.googleusercontent.com">
            <div className="Appp">
                <GoogleLogin setUser={setUser}></GoogleLogin>
            </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;