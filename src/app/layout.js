import * as React from 'react';
import { Suspense } from 'react';
import Loading from './loading';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/material';
import { AuthProvider } from './context/authcontext';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'Jobseeker',
  description: 'Next.js + Django app to connect and find a job.',
};

const RootLayout = ({ children }) => {
  return (
      <html lang="en">
        <body>
          <AuthProvider>
            <ThemeRegistry>
              <Suspense fallback={<Loading />}>
                <Navbar />
                <Container sx={{ height: {xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 4rem)'}, 
                                marginTop: {xs: '56px', sm: '4rem'}, 
                              }}
                >
                  {children}
                </Container>
              </Suspense>
            </ThemeRegistry>
          </AuthProvider>
        </body>
      </html>
  );
}

export default RootLayout;
