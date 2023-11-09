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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profession: '',
    experiences: '',
    confirmPassword: '',
  });

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
        // If it's the final step, submit the form
        console.log("Just for a check");
        const response = await fetch('http://localhost:3001/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        const { message } = data;
        console.log(data);
        if (response.ok) {
          alert(message);
          navigate("/home");
        } else {
          // Signup failed
          alert(data.message || 'Signup failed. Please try again.');
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
      <div>
        <div className='register'>
        <h2>Registration</h2>
        <h5>Fill this form to create an account</h5>
        </div>
            
              <form onSubmit={handleSubmit}>
                <div className='form'>
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
                        className='Na'
                        placeholder='Experiences'
                        value={formData.experiences}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className='Na'
                        placeholder='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        requried 
                      />
                    </div>
                </div> 
                <div className="signup-terms">
                    <h5>By signing up you agree to our <a href="/terms" className="link">Terms and Conditions</a> and <a href="/privacy" className="link">Privacy Policy</a></h5>
                </div>  
                <div className='button'>
                  <button type="submit" className='burn'> Sign up</button>
                </div>
              </form>
      </div>        
    </div>
  );
};

export default Signup;