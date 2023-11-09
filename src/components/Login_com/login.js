import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, Text, Flex, Box } from '@chakra-ui/react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../GoogleLogin";
import { Button, ButtonGroup } from '@chakra-ui/react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [user, setUser] = useState();

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

            if (response.ok) {
                alert('Login successful');
                navigate('/home');
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
        <Flex
            direction="column"
            align="center"
            justify="center"
            height="100vh"
        >
            <Box
                width="180px"
                height="39px"
                left="59px"
                background="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="4"
            >
                <Text
                    as = 'b'
                    fontFamily="Urbanist"
                    fontSize="30px"
                    fontWeight="700"
                    lineHeight="39px"
                    letterSpacing="-0.01em"
                    textAlign="center"
                    color="black"
                >
                    Authorization
                </Text>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl w = '250px' mb = '3'>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        size = 'sm'
                        bg="#FDFDFD" 
                        borderRadius ='8px'
                        required
                    />
                </FormControl>
                <FormControl w = '250px' mb = '-1.5' >
                    <Input
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        size = 'sm'
                        bg="#FDFDFD" 
                        borderRadius ='8px'
                        required
                    />
                </FormControl>
                <Text
                    as = 'n'
                    fontSize="11px"
                    fontWeight="7"
                    lineHeight="39px"
                    ml = "170px"
                    letterSpacing="-0.01em"
                    color="black"
                >
                    <Link to='../Forge'>Forgot Password?</Link>
                </Text>
                <Button bg='black' color='white' type="submit" w='250px' mt='2'>Login</Button>
            </form>
            <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                <GoogleLogin setUser={setUser}></GoogleLogin>
            </GoogleOAuthProvider>
            <Text>
                Don't have an account now <Link to='../Signup'>Register now</Link>
            </Text>
        </Flex>
    );
};

export default Login;
