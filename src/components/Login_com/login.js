import React, { useState, useContext } from 'react';
import { Link,navigate,useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../GoogleLogin";
import home from '../Home'
import './login.css';

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
            });
            const data= await response.json();
            const { message } = data;
            if (response.ok) {
            alert('login successfully');
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
    <div className='forall'>
        <div className='log'>
            <h2 className='h2sty'>Authorization</h2>
            <form onSubmit={handleSubmit}>
                <div className='mib'>
                <label htmlFor="email" className='labelss' id='remov'>Enter your Email</label>
                <input
                placeholder='Enter your email'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className='formm'
                id='stret'
                />
            </div>
        <div className='mib'>
            <label htmlFor="password" className='labelss' id='reo'>Enter your password</label>
            <input
                placeholder='Enter your password'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className='formm'
                id='str'
            />
        </div>
        <div className='achor'>
                <Link to='../Forge' className='under'>Forgot Password</Link>
            </div>
            <button type="submit" className='bun'>Login</button>
        </form>
        <div className='google'>
            <GoogleOAuthProvider clientId="632513094925-n7la27bd3ocj32qnue8v0asa954ds9t8.apps.googleusercontent.com">
                <div className="Appp">
                    <GoogleLogin setUser={setUser}></GoogleLogin>
                </div>
            </GoogleOAuthProvider>
            <h3 className='stylefo'>Don't have an account now</h3>
            <Link to='../Signup' className='und'>Register now</Link>
        </div>
        </div>
    </div>
    );
};
export default Login;