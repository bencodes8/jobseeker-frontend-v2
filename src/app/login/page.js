"use client";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Alert, 
    Box,
    Button,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { Form } from '../assets/styles/Form';
import { FormBox } from '../assets/styles/FormBox';
import { NextLink } from '../assets/styles/NextLink';
import AuthContext from '../context/authcontext';


export const Login = () => {
    const { user, loginUserAPI, alert } = React.useContext(AuthContext);
    const router = useRouter();

    // if (user) {
    //     router.push('/');
    // }

    const [input, setInput] = React.useState({
        username: '',
        password: ''
    });
    const { username, password } = input;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUserAPI(username, password)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={16}>
                <FormBox sx={{ width: {xs: '100%', sm: 500 }}} onSubmit={handleSubmit}>
                    <Typography variant="h4" sx={{ paddingBottom: 3 }}>Jobseeker</Typography>
                    { alert && alert.success || alert && alert.error ?
                        <Alert variant="outlined" severity={alert.success ? "success" : "error"} sx={{ marginTop: 2, marginBottom: 2}}>
                            {alert.success ? alert.success : alert.error}
                        </Alert> : null           
                    }
                    <Typography variant="subtitle1" sx={{ textAlign: 'left', paddingBottom: 1 }}>Login Form</Typography>
                    <Form>
                        <TextField
                            label="Username"
                            value={input.username}
                            onChange={(e) => setInput({...input, username: e.target.value})}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={input.password}
                            onChange={(e) => setInput({...input, password: e.target.value})}
                            fullWidth
                            required 
                        />
                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                            Do not have an account?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6 }}>
                            <NextLink href="/register">
                                <Typography variant="subtitle1" color="primary">Register Here</Typography>
                            </NextLink>
                            <Button variant="contained" type="submit">Login</Button>
                        </Box>
                    </Form>
                </FormBox>
            </Paper>
        </Box>
    );
}

export default Login;
