import React from 'react'
import {Link, navigate, useNavigate} from 'react-router-dom'
import './creat.css'

export default function Create_new() {

    const navigate=useNavigate();
    function onZapp()
    {
        navigate('../Pass_change');
    }
    return (
    <div className='bodi'>
        <h2>Create new password</h2>
        <h5>
            Create a unique new password different from previous one
        </h5>
        <form>
            <div>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='New Password'/> 
            </div>
            <div>
                <input type="password" className="form-control" id="exampleInputPass" placeholder='Confirm New Password'/>
            </div>
        </form>
        <button className='butto' type='button' onClick={onZapp}>Reset Password</button>
    </div>
    )
}
