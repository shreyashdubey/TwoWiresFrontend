import React from 'react'
import {Link, navigate, useNavigate} from 'react-router-dom'
import './otp.css'

export default function Verify() {
    
    const navigate=useNavigate();
    function onCli()
    {
        navigate("../Create_new")
    }


    return (
    <div className='entire'>
        <h2>OTP Verification</h2>
        <h5>Enter the 4 digit code sent on your email address</h5>
        <div>
            <table>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>4</td>
                    <td>5</td>
                </tr>
            </table>
        </div>
        <button type='button' className='buton' onClick={onCli}> Verify </button>
    </div>
    )
}
