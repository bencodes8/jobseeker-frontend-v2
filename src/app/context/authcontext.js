"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FRONTEND_URL } from '../utils/constants';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const { push } = useRouter();
    const [user, setUser] = React.useState(null);
    const [alert, setAlert] = React.useState({
        alert: '',
        severity: ''
    });
    const [error, setError] = React.useState({});

    const authenticateUser = async () => {
        try {
            const { data: userData } = await axios.get(`${FRONTEND_URL}/api/auth/user`)
            setUser(userData);
        } catch (err) {
            console.error(err);
        }
    }

    const loginUser = async (payload) => {
        const { data: loginResponse } = await axios.post(`${FRONTEND_URL}/api/auth/login`, payload)
        if (loginResponse && loginResponse.access) {
            authenticateUser();
            push('/');
        } else {
            setAlert({ alert: loginResponse.detail, severity: 'error' });
        }
    }

    const registerUser = async (payload) => {
        const { data: registrationResponse } = await axios.post(`${FRONTEND_URL}/api/auth/register`, payload)
        return registrationResponse;
    }

    const contextData = {
        user: user, setUser: setUser,
        alert: alert, setAlert: setAlert,
        error: error, setError: setError,
        authenticateUser, loginUser, registerUser
    };

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    );
}