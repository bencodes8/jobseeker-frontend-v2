"use client";
import * as React from 'react';
import axios from 'axios';
import AuthContext from '../../context/authcontext';
import useRefreshToken from '@/app/hooks/useRefreshToken';

const ConnectPage = () => {
    const { user } = React.useContext(AuthContext);
    const refresh = useRefreshToken();
    
    return (
        <>
        <div>Connection Page</div>
        </>
    )
}

export default ConnectPage;


