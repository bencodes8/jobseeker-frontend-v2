"use client";
import * as React from 'react';
import { 
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton
} from '@mui/material';
import LoginFormContext from '@/app/context/loginFormContext';
import LoginDialogContent from './LoginDialogContent';
import RegisterDialogContent from './RegisterDialogContent';
import { ButtonBox } from './ButtonBox';
import CloseIcon from '@mui/icons-material/Close';

const FormModal = ({ btnName, icon }) => {
    const [open, setOpen] = React.useState(false);
    const { loginForm, setLoginForm } = React.useContext(LoginFormContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setLoginForm(true);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {icon}&nbsp;{btnName}
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <IconButton sx={{ position: 'absolute', right: 5, top: 3 }} onClick={handleClose}>
                    <CloseIcon />   
                </IconButton>
                <DialogTitle sx={{ letterSpacing: 1.5, textAlign: 'center', marginTop: 2 }}>Jobseeker</DialogTitle>
                <DialogContent sx={{ '> :not(:first-child)': { marginTop: 2 } }}>
                    { loginForm ? <LoginDialogContent /> : <RegisterDialogContent /> }
                </DialogContent>
            </Dialog>
        </>
    );
}

export default FormModal;