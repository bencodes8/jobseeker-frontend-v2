import * as React from 'react';
import {
    Button,
    DialogContentText, 
    TextField,
    Typography
} from '@mui/material';
import LoginFormContext from '@/app/context/loginFormContext';
import { ButtonBox } from './ButtonBox';

const LoginDialogContent = () => {
    const { setLoginForm } = React.useContext(LoginFormContext);
    const [loginFields, setLoginFields] = React.useState({
        username: '',
        password: ''
    });

    return (
        <>
            <DialogContentText>Login Form</DialogContentText>
            <TextField
                label="Username"
                value={loginFields.username}
                onChange={(e) => setLoginFields({...loginFields, username: e.target.value})}
                fullWidth
                required
            />
            <TextField
                label="Password"
                type="password"
                value={loginFields.password}
                onChange={(e) => setLoginFields({...loginFields, password: e.target.value})}
                fullWidth
                required 
            />
            <Typography variant="body1">
                Do not have an account?
            </Typography>
            <ButtonBox>
                <Button onClick={() => setLoginForm(false)}>
                    Create an account
                </Button>
                <Button variant="contained">
                    Sign In
                </Button>
            </ButtonBox>
        </>
    );
}

export default LoginDialogContent;