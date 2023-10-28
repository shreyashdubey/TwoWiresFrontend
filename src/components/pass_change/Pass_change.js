import React from 'react'
import {Link, navigate, useNavigate} from 'react-router-dom'
import myimg from './tick_mark.png'
import './passch.css'
export default function Pass_change() {

    const navigate=useNavigate();
    function onZap()
    {
        navigate('../Login')
    }

    return (
    <div className='mybod'>
        <img src={myimg} alt="Tick mark" className='imag'/>
        <h2>
            Password Changed
        </h2>
        <h5>
            Your password has changed successfully 
        </h5>
        <button type='button' className='zeplin' onClick={onZap}>Back to login</button>
    </div>
    )
}
