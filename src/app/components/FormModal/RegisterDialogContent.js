import * as React from 'react';
import {
    Box,
    Button,
    DialogContentText,
    Step,
    Stepper,
    StepLabel, 
    TextField,
    Typography
} from '@mui/material';
import LoginFormContext from '@/app/context/loginFormContext';
import { ButtonBox } from './ButtonBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterDialogContent = () => {
    const { setLoginForm } = React.useContext(LoginFormContext);
    const steps = ['Account Information', 'Name and Position'];
    const [step, setStep] = React.useState(0);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <DialogContentText>Register Form</DialogContentText>
            <TextField
                label="Username"
                fullWidth
            />
            <TextField
                label="E-mail Address"
                type="email"
                fullWidth 
            />
            <TextField
                label="Password"
                type="password"
                fullWidth 
            />
            <TextField
                label="Confirm Password"
                type="password"
                fullWidth 
            />
            <Typography variant="body1">Already have an account?</Typography>
            <ButtonBox>
                <Button onClick={() => setLoginForm(true)}>
                    <ArrowBackIcon />&nbsp;Back
                </Button>
                <Button variant="contained">
                    Register
                </Button>
            </ButtonBox>
        </>
    );
}

export default RegisterDialogContent;