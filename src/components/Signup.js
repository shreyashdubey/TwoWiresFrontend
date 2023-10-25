import React, { useState } from 'react';
import Modal from 'react-modal';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import home from './Home'

Modal.setAppElement('#root'); // Set the root element as the modal's parent

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profession: '',
    expertise: '',
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
      // Your form submission logic here
      
      if (currentStep === 2) {
        // If it's the final step, submit the form
        const response = await fetch('http://localhost:3001/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include' ,
        });
        // You should see the 'token' cookie in the 'cookies' string
        // You can parse it to extract the token value if needed
        const data= await response.json();
       const { message } = data;
        if (response.ok) {
          alert(message);
          navigate("/home");
      }  else {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1); // Reset the step when the modal is closed
  };

  if (user) {
    console.log(user)
    window.location.href = '/home';
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={openModal}>Create an Account</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Signup Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '400px',
            height: 'auto',
            margin: 'auto',
          },
        }}
      >
        {currentStep === 1 && (
          <div>
            <h3>Step 1: Email and Password</h3>
            <form onSubmit={handleSubmit}>
              {/* Email and password fields */}
                 <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
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
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
              {/* ... */}
              <button type="button" onClick={handleNextStep}>Next</button>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3>Step 2: Other Information</h3>
            <form onSubmit={handleSubmit}>
              {/* Other information fields */}
                <div>
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expertise">Expertise:</label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            required
          />
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
        </div>
              {/* ... */}
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
      <GoogleOAuthProvider clientId="632513094925-n7la27bd3ocj32qnue8v0asa954ds9t8.apps.googleusercontent.com">
        <div className="Appp">
          <GoogleLogin setUser={setUser}></GoogleLogin>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};


export default Signup;
