"use client";
import * as React from 'react';

const LoginFormContext = React.createContext();
export default LoginFormContext;

export const LoginFormProvider = ({ children }) => {
    const [loginForm, setLoginForm] = React.useState(true);

    return (
        <LoginFormContext.Provider value={{ loginForm, setLoginForm }}>
            {children}
        </LoginFormContext.Provider>
    );
}