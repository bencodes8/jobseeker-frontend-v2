import { Box, LinearProgress } from "@mui/material";

export const Loading = () => {
    return (
        <Box sx={{ position: 'absolute', left: 0, width:'100%' }}>
            <LinearProgress />
        </Box>
    );    
}

export default Loading;