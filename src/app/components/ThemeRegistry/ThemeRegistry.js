"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

const ThemeRegistry = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default ThemeRegistry;