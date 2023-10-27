import React from 'react'
import {Link, navigate, useNavigate} from 'react-router-dom'
export default function Pass_change() {

    const navigate=useNavigate();
    function onZap()
    {
        navigate('../Login')
    }

    return (
    <div>
        <img src='./public/rcLn4qBAi.jpg' alt="Tick mark"/>
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
