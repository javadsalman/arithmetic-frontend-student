import React from 'react';
import { Box, styled } from '@mui/material';
import backgroundImage from '../../assets/images/background.png';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const MainContent = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <MainContent>
      <Header />
      <Box component="main" className="min-h-[calc(100vh-64px)] p-6">
        <Box className="h-full">
          {children}
        </Box>
      </Box>
    </MainContent>
  );
};

export default Layout;


