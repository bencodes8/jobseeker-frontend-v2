import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import { LoginFormProvider } from './context/loginFormContext';
import FormModal from '@/app/components/FormModal/FormModal';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';


const pages = [
  {title: 'Home', icon: <HomeIcon />, href: "/"},
  {title: 'Seek Jobs', icon: <WorkIcon />, href: "/jobs" },
  {title: 'Connect', icon: <GroupsIcon />, href: "/connect" }
];

export const metadata = {
  title: 'Jobseeker',
  description: 'Next.js + Django app to connect and find a job.',
};

const RootLayout = ({ children }) => {
  return (
      <html lang="en">
        <body>
          <ThemeRegistry>
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
                  {pages.map((page) => (
                    <Link key={page.title} href={page.href}>
                      <Button sx={{ letterSpacing: 1.5, marginRight: 1, color: 'white' }}>{page.icon}&nbsp;{page.title}</Button>
                    </Link>
                  ))}
                </Box>
                <LoginFormProvider>
                  <FormModal btnName="login" icon={<LoginIcon />} />
                </LoginFormProvider>
              </Toolbar>
            </AppBar>
            <Container sx={{ height: {xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 4rem)'}, 
                             marginTop: {xs: '56px', sm: '4rem'}, 
                          }}
            >
              {children}
            </Container>
          </ThemeRegistry>
        </body>
      </html>
  );
}

export default RootLayout;
