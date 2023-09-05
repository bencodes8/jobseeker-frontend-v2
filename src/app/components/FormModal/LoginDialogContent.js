import * as React from 'react';
import {
    Button,
    DialogContentText, 
    TextField,
    Typography
} from '@mui/material';
import LoginFormContext from '@/app/context/loginFormContext';
import { ButtonBox } from './ButtonBox';
import { Form } from './Form';

const LoginDialogContent = () => {
    const { setLoginForm } = React.useContext(LoginFormContext);
    const [loginFields, setLoginFields] = React.useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <DialogContentText>Login Form</DialogContentText>
            <Form onSubmit={handleSubmit}>
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
                    <Button variant="contained" type="submit">
                        Sign In
                    </Button>
                </ButtonBox>
            </Form>
        </>
    );
}

export default LoginDialogContent;