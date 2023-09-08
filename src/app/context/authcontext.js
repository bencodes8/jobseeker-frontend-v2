"use client";
import * as React from 'react';
import { NextResponse } from 'next/server';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const BACKEND = "http://127.0.0.1:8000";
    const FRONTEND = "http://localhost:3000";
    const INTERNAL_ERROR = "Unable to connect to server. Please try again later.";

    const [loginForm, setLoginForm] = React.useState(true);
    const [alert, setAlert] = React.useState('hello');
    const [error, setError] = React.useState({});
    const [success, setSuccess] = React.useState('');

    const usernameEmailValidationAPI = async (username, email) => {
        try {
            const res = await fetch(`${FRONTEND}/api/register?username=${username}&email=${email}`)

            const data = await res.json();
            const { username_valid, email_valid } = data;
    
            if (!username_valid) {
                return setError({usernameField: 'This username already exists.'});
            }
    
            if (!email_valid) {
                return setError({emailField: 'This email already exists.'});
            }
    
            if (!username_valid || !email_valid) {
                return false;
            }
            
            // passes all validation checks, return true
            return true;

        } catch (err) {
            return setError({
                usernameField: INTERNAL_ERROR,
                emailField: INTERNAL_ERROR,
                passwordField: INTERNAL_ERROR,
                confirmField: INTERNAL_ERROR
            });
        }
    }

    const registerUserAPI = async (username, email, password, firstName, lastName, group) => {      
        const res = await fetch(`${FRONTEND}/api/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: username, 
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                group: group
            })
        })
        const data = await res.json();
        const { message: successMessage } = data;
        setSuccess(successMessage);
        return successMessage;
    }

    return (
        <AuthContext.Provider value={{ BACKEND, 
                                       loginForm, 
                                       setLoginForm,
                                       alert,
                                       setAlert,
                                       error,
                                       setError,
                                       success,
                                       setSuccess, 
                                       usernameEmailValidationAPI,
                                       registerUserAPI,
                                     }}
        >
            {children}
        </AuthContext.Provider>
    );
}