import React, { useState } from 'react';
import Modal from 'react-modal';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { useNavigate } from "react-router-dom";
import './CSS_Files/signup.css';

Modal.setAppElement('#root'); // Set the root element as the modal's parent

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    experiences: '',
    confirmPassword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for the modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentStep === 2) {
        // If it's the final step, submit the form
        const response = await fetch('http://localhost:3001/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        const data = await response.json();
        const { message } = data;
        console.log(data)
        if (response.ok) {
          alert(message);
          navigate("/home");
        } else {
          // Signup failed
          alert(data.message || 'Signup failed. Please try again.');
        }
      } else {
        // If it's not the final step, proceed to the next step
        handleNextStep();
      }
    } catch (error) {
      alert('An error occurred during signup. Please try again later.');
    }
  };

  if (user) {
    navigate("/home");
  }

  return (
    <div className='bodys'>
      <h2>Registration Form</h2>
      <h5>Fill this form to create an account</h5>
          <div className='alinger'>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className='Na'
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className='Na'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className='Na'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  className='Na'
                  placeholder='Profession'
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="experiences"
                  name="experiences"
                  className='Na spacer'
                  placeholder='Experiences'
                  value={formData.experiences}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className='burn'>Sign Up</button>
            </form>
          </div>
    </div>
  );
};

export default Signup;
