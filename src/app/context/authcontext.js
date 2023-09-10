"use client";
import * as React from 'react';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [alert, setAlert] = React.useState({});
    const [error, setError] = React.useState({});

    return (
        <AuthContext.Provider value={{ alert, setAlert,
                                       error, setError
                                     }}
        >
            {children}
        </AuthContext.Provider>
    );
}