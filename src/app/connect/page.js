"use client";
import * as React from 'react';
import AuthContext from '../context/authcontext';

export const ConnectPage = () => {
    const { user, accessToken } = React.useContext(AuthContext);

    if (user) {
        return <div>connection page</div>
    }

    return <div>loading...{`accessToken: ${accessToken}`}</div>
}

export default ConnectPage;


