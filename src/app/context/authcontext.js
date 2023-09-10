"use client";
import * as React from 'react';
import { NextResponse } from 'next/server';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const FRONTEND = "http://localhost:3000";
    const INTERNAL_ERROR = "Unable to connect to server. Please try again later.";

    const [user, setUser] = React.useState(null);
    const [accessToken, setAccessToken] = React.useState(null);
    const [loginForm, setLoginForm] = React.useState(true);
    const [alert, setAlert] = React.useState({});
    const [error, setError] = React.useState({});

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
    };

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
        const { data: successMessage }  = await res.json();
        return successMessage;
    };

    const loginUserAPI = async (username, password) => {
        const res = await fetch(`${FRONTEND}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (res.ok) {
            const { data: accessResponse } = await res.json();
            console.log(accessResponse.username);
            console.log(accessResponse.access);
            setUser(accessResponse.username);
            setAccessToken(accessResponse.access);
        } else {
            const { data: credentialError } = await res.json();            
            setAlert({ error: credentialError.detail });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, 
                                       loginForm, setLoginForm,
                                       alert, setAlert,
                                       error, setError,
                                       usernameEmailValidationAPI, registerUserAPI, loginUserAPI
                                     }}
        >
            {children}
        </AuthContext.Provider>
    );
}