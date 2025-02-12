import { ReactNode, useState } from 'react';
import { Box, styled } from '@mui/material';
import backgroundImage from '../../assets/images/background.png';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const MainContent = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}));

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MainContent>
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <Box component="main" className="min-h-[calc(100vh-64px)] p-6">
        <Box className="h-full">
          {children}
        </Box>
      </Box>
      <Sidebar 
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </MainContent>
  );
};

export default Layout;


