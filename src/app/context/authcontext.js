"use client";
import * as React from 'react';

const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [alert, setAlert] = React.useState({});
    const [error, setError] = React.useState({});

    const contextData = {
        user: user,
        setUser: setUser,
        alert: alert,
        setAlert: setAlert,
        error: error,
        setError: setError
    };

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    );
}