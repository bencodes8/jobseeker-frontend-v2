'use client';
import * as React from 'react';
import axios from 'axios';
import { FRONTEND_URL } from '@/app/utils/constants';
import AuthContext from '../../context/authcontext';

const ConnectPage = () => {
    const { user } = React.useContext(AuthContext);
    
    return (
        <>
            <div>Connection Page</div>
            <div>
                { user ? user.username : 'Not authenticated' }
            </div>
        </>
    )
}

export default ConnectPage;


