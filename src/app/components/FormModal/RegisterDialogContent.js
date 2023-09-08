import * as React from 'react';
import {
    Box,
    Button,
    DialogContentText,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Step,
    Stepper,
    StepLabel, 
    TextField,
    Typography
} from '@mui/material';
import AuthContext from '@/app/context/authcontext';
import { ButtonBox } from './Emotion/ButtonBox';
import { Form } from './Emotion/Form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterDialogContent = () => {
    const { setLoginForm,
            error,
            setError, 
            usernameEmailValidationAPI, 
            registerUserAPI
        } = React.useContext(AuthContext);

    const steps = ['Name and Position', 'Account Information'];
    const [step, setStep] = React.useState(0);

    const [registerFields, setRegisterFields] = React.useState({
        firstName: '',
        lastName: '',
        group: '',
        username: '',
        email: '',
        password: '',
        confirm: ''
    });

    const handleSelect = (e) => {
        setRegisterFields({...registerFields, group: e.target.value});
    }

    const handleNext = async () => {
        const { firstName, lastName, group } = registerFields;

        if (!firstName) {
            return setError({firstNameField: 'Please fill out this field.'});
        } 

        if (!lastName) {
            return setError({lastNameField: 'Please fill out this field.'});
        }

        if (!group) {
            return setError({groupField: 'Please select a group.'});
        }

        setError({});
        setStep(step + 1);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirm, firstName, lastName, group } = registerFields;

        // validate if username and email are available
        const valid = await usernameEmailValidationAPI(username, email);

        if (valid) {
            if (password !== confirm) {
                const pwdMatchErr = "Passwords do not match.";

                return setError({
                    passwordField: pwdMatchErr,
                    confirmField: pwdMatchErr
                });
            }

            // register new user
            registerUserAPI(username, email, password, firstName, lastName, group);
        }
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
                            label="First Name"
                            value={registerFields.firstName}
                            onChange={(e) => setRegisterFields({...registerFields, firstName: e.target.value})}
                            error={error.firstNameField ? true : false}
                            helperText={error.firstNameField}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Last Name"
                            value={registerFields.lastName}
                            onChange={(e) => setRegisterFields({...registerFields, lastName: e.target.value})}
                            error={error.lastNameField ? true : false}
                            helperText={error.lastNameField}
                            fullWidth
                            required 
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Group</InputLabel>
                            <Select
                                value={registerFields.group}
                                label="Group"
                                onChange={handleSelect}
                                error={error.groupField ? true : false}
                            >
                                <MenuItem value={'Seeker'}>Seeker</MenuItem>
                                <MenuItem value={'Employer'}>Employer</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body1">Already have an account?</Typography>
                    </>
                ) : (
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
                            error={error.passwordField ? true : false}
                            helperText={error.passwordField}
                            fullWidth
                            required 
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={registerFields.confirm}
                            onChange={(e) => setRegisterFields({...registerFields, confirm: e.target.value})}
                            error={error.confirmField ? true : false}
                            helperText={error.confirmField}
                            fullWidth
                            required 
                        />
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