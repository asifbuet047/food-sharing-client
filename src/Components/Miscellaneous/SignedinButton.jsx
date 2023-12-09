import React, { useContext } from 'react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'
import { PiSignInFill, PiSignOutFill } from 'react-icons/pi'
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { Navigate, useNavigate } from 'react-router-dom';


function SignedinButton() {
    const { userLoading, user, signOutUser } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser();
    }

    const handleSignIn = () => {
        navigate('/signin');
    }

    return (
        <div className='overflow-hidden'>
            {
                userLoading ?
    
                
                    <Dropdown label='Join Us' placement='bottom'>
                        <Dropdown.Item icon={PiSignInFill} onClick={() => { handleSignIn() }}> Sign In</Dropdown.Item>
                    </Dropdown> :
                    <Dropdown label={user.displayName ? user.displayName : user.email}>
                        <Dropdown.Divider />
                        <Dropdown.Item icon={PiSignOutFill} onClick={() => { handleSignOut() }}><span className='font-bold'>Sign Out</span></Dropdown.Item>
                    </Dropdown>
            }
        </div>
    )
}

export default SignedinButton