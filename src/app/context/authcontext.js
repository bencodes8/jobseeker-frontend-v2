'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FRONTEND_URL, BACKEND_URL } from '../utils/constants';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const { push } = useRouter();
    const [user, setUser] = React.useState(null);
    const [access, setAccess] = React.useState(null);
    const [alert, setAlert] = React.useState({
        alert: '',
        severity: ''
    });
    const [error, setError] = React.useState({});

    const loginUser = async (payload) => {
        const res = await fetch(`${FRONTEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const loginResponse = await res.json();

        if (loginResponse.access) {
            setAccess(loginResponse.access);

            const res = await fetch(`${BACKEND_URL}/api/auth/user`, {
                headers: {
                    Authorization: `Bearer ${loginResponse.access}`
                }
            })

            const authorizationResponse = await res.json()

            if (authorizationResponse && authorizationResponse.username) {
                setUser(authorizationResponse);
                push('/');
            }
        }
    }

    const registerUser = async (payload) => {
        const res = await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const registrationResponse = await res.json();
        return registrationResponse;
    }

    const logoutUser = async () => {
        const res = await fetch(`${FRONTEND_URL}/api/auth/logout`)
        const logoutResponse = await res.json();
        if (logoutResponse.success) {
            setUser(null);
            setAccess(null);
        }
    }

    const contextData = {
        user: user, setUser: setUser,
        access: access, setAccess: setAccess,
        alert: alert, setAlert: setAlert,
        error: error, setError: setError,
        loginUser, registerUser, logoutUser
    };

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    );
}