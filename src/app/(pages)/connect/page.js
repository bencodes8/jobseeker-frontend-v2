"use client";
import * as React from 'react';
import axios from 'axios';
import AuthContext from '../../context/authcontext';
import useRefreshToken from '@/app/hooks/useRefreshToken';

const ConnectPage = () => {
    const { user } = React.useContext(AuthContext);
    const refresh = useRefreshToken();

    React.useEffect(() => {
        const getTokens = async () => {
            const { data } = await axios.get('http://localhost:3000/api/auth/user')
            console.log(data);
        }

        getTokens();    
    }, []);
    return (
        <>
        <div>Connection Page</div>
        <button onClick={() => refresh()}>REFRESH TEST</button>
        </>
    )
}

export default ConnectPage;


