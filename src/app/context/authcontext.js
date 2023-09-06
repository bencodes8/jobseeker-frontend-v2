"use client";
import * as React from 'react';
import { NextResponse } from 'next/server';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const BACKEND = "http://127.0.0.1:8000";
    const FRONTEND = "http://localhost:3000";
    const [loginForm, setLoginForm] = React.useState(true);
    const [error, setError] = React.useState({});

    const usernameEmailValidationAPI = async (username, email) => {
        const res = await fetch(`${FRONTEND}/api/register?username=${username}&email=${email}`)
        const { data } = await res.json();
        const { username_valid, email_valid } = data;

        if (!username_valid) {
            setError({usernameField: 'This username already exists.'});
        }

        if (!email_valid) {
            setError({emailField: 'This email already exists.'});
        }

        if (!username_valid || !email_valid) {
            return false;
        }

        return true;
    }

    return (
        <AuthContext.Provider value={{ BACKEND, 
                                       loginForm, 
                                       setLoginForm,
                                       error,
                                       setError, 
                                       usernameEmailValidationAPI }}>
            {children}
        </AuthContext.Provider>
    );
}