"use client";
import * as React from 'react';
import AuthContext from '../context/authcontext';

const useAuth = () => {
    const { user } = React.useContext(AuthContext);
    React.useDebugValue(user, user?.username ? "Logged In" : "Logged Out")
    return React.useContext(AuthContext);
}

export default useAuth;