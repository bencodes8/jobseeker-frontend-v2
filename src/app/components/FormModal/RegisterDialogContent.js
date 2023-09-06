import * as React from 'react';
import {
    Box,
    Button,
    DialogContentText,
    IconButton,
    Step,
    Stepper,
    StepLabel, 
    TextField,
    Typography
} from '@mui/material';
import AuthContext from '@/app/context/authcontext';
import { ButtonBox } from './Emotion/ButtonBox';
import { GroupIcon } from './Emotion/GroupIcon';
import { Form } from './Emotion/Form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

const RegisterDialogContent = () => {
    const { setLoginForm, 
            usernameEmailValidationAPI, 
            error,
            setError 
        } = React.useContext(AuthContext);

    const steps = ['Account Information', 'Name and Position'];
    const [step, setStep] = React.useState(0);

    const [registerFields, setRegisterFields] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
        firstName: '',
        lastName: '',
        group: ''
    });

    const handleNext = async () => {
        // const isFormValid = document.querySelector('form').checkValidity();
        // if (!isFormValid) {
        //     return setError('Please fill all fields.');
        // }
        const valid = await usernameEmailValidationAPI(registerFields.username, registerFields.email);
        console.log(valid);
        // if (valid) {
        //     setStep(step + 1);
        // }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
            <Form onSubmit={handleSubmit}>
                { step === 0 ? (
                    <>
                        <TextField
                            label="Username"
                            value={registerFields.username}
                            onChange={(e) => setRegisterFields({...registerFields, username: e.target.value})}
                            error={error.usernameField ? true : false}
                            helperText={error.usernameField}
                            fullWidth
                            required
                        />
                        <TextField
                            label="E-mail Address"
                            type="email"
                            value={registerFields.email}
                            onChange={(e) => setRegisterFields({...registerFields, email: e.target.value})}
                            error={error.emailField ? true : false}
                            helperText={error.emailField}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={registerFields.password}
                            onChange={(e) => setRegisterFields({...registerFields, password: e.target.value})}
                            fullWidth
                            required 
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={registerFields.confirm}
                            onChange={(e) => setRegisterFields({...registerFields, confirm: e.target.value})}
                            fullWidth
                            required 
                        />
                        <Typography variant="body1">Already have an account?</Typography>
                    </>
                ) : (
                    <>
                        <TextField
                            label="First Name"
                            value={registerFields.firstName}
                            onChange={(e) => setRegisterFields({...registerFields, firstName: e.target.value})}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Last Name"
                            value={registerFields.lastName}
                            onChange={(e) => setRegisterFields({...registerFields, lastName: e.target.value})}
                            fullWidth
                            required 
                        />
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>Please select either a 'seeker' or an 'employer'</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <GroupIcon>
                                <IconButton color={registerFields.group === 'seeker' ? 'primary': 'inherit'} 
                                            onClick={() => setRegisterFields({...registerFields, group: 'seeker'})}
                                >
                                    <PersonIcon />
                                </IconButton>
                                Seeker
                            </GroupIcon>
                            <GroupIcon>
                                <IconButton color={registerFields.group === 'employer' ? 'primary': 'inherit'} 
                                            onClick={() => setRegisterFields({...registerFields, group: 'employer'})}
                                >
                                    <PersonIcon />
                                </IconButton>
                                Employer
                            </GroupIcon>
                        </Box>
                    </>
                  )
                }
                <ButtonBox>
                    <Button onClick={() => {
                        if (step === 0) {
                            setLoginForm(true);
                            setError({});
                        } else {
                            setStep(step - 1);
                        }
                      }}
                    >
                        <ArrowBackIcon />&nbsp;Back
                    </Button>
                    {step === 0 && 
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    }
                    { step === 1 &&
                        <Button variant="contained" type="submit">
                            Register
                        </Button>
                    }
                </ButtonBox>
            </Form>
        </>
    );
}

export default RegisterDialogContent;