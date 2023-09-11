"use client";
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
    Alert, 
    Box,
    Button,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { Form } from '../../assets/styles/Form';
import { FormBox } from '../../assets/styles/FormBox';
import { NextLink } from '../../assets/styles/NextLink';

const Login = () => {
    const { push } = useRouter();
    const [input, setInput] = React.useState({
        username: '',
        password: ''
    });
    const [alert, setAlert] = React.useState({
        alert: '',
        severity: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: input.username,
            password: input.password
        }

        const { data: accessResponse } = await axios.post('http://localhost:3000/api/auth/login', payload)
        if (accessResponse && accessResponse.username) {
            push('/connect');
        } else {
            setAlert({ alert: accessResponse.detail, severity: 'error' });
        }
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={16}>
                <FormBox sx={{ width: {xs: '100%', sm: 500 }}} onSubmit={handleSubmit}>
                    <Typography variant="h4" sx={{ paddingBottom: 3 }}>Jobseeker</Typography>
                    <Alert variant="outlined" severity="error" sx={{ marginBottom: 2, display: alert.alert ? 'in-line' : 'none' }}>
                        {alert.alert}
                    </Alert>
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
