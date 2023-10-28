import React from 'react'
import {Link, navigate, useNavigate} from 'react-router-dom'
import './Fore.css'

function Forge() {

    const navigate = useNavigate();
        function handleCli()
        {
            navigate("../Verify")
        }

    return (
        <div className='bodi'>
            <h2>Reset your Password</h2>
            <h5>Please enter your email linked with your account</h5>
            <form>
                <label htmlFor='email' className='lab'>Enter your email:</label>
                <input type="email" id="email" name="email" required  className='Nay' placeholder='Email'/>
            </form>
            <button type='button' className='buun' onClick={handleCli}>Send OTP</button>
        </div>
    )
}

export default Forge
