'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import AuthContext from '@/app/context/authcontext';

const Navbar = () => {
    const PAGES = [
        {title: 'Home', icon: <HomeIcon />, href: "/"},
        {title: 'Seek Jobs', icon: <WorkIcon />, href: "/jobs" },
        {title: 'Connect', icon: <GroupsIcon />, href: "/connect" }
    ];

    const { user, logoutUser } = React.useContext(AuthContext);

    return (
        <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ letterSpacing: 1.5 }}>
                Jobseeker
                </Typography>
                <Box sx={{ flexGrow: 1, 
                        display: {xs: 'none', md: 'flex' }, 
                        justifyContent: 'flex-end', 
                        marginRight: 2.5 
                        }}
                >
                    {PAGES.map((page) => (
                        <Link key={page.title} href={page.href}>
                            <Button sx={{ letterSpacing: 1.5, marginRight: 1, color: 'white' }}>{page.icon}&nbsp;{page.title}</Button>
                        </Link>
                    ))}
                </Box>
                { !user ? 
                    <Link href="/login">
                        <Button variant="outlined">
                            <LoginIcon />&nbsp;Login
                        </Button>
                    </Link>  
                    :
                    <Button variant="outlined" onClick={logoutUser}>
                        <LogoutIcon />&nbsp;Logout
                    </Button> 
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;