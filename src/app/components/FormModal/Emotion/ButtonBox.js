import * as React from 'react';
import { Box } from '@mui/material';

export const ButtonBox = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', 
                   justifyContent: 'space-between', 
                   paddingTop: 4 
                }}
        >
            {children}
        </Box>
    );
}