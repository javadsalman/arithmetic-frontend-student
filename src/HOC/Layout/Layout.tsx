import { ReactNode, useState } from 'react';
import { Alert, Box, Snackbar, styled } from '@mui/material';
import backgroundImage from '../../assets/images/background.png';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNotificationStore } from '../../stores/notificationStore';
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
  const { notification, type, variant, position, open: notificationOpen, setOpen: setNotificationOpen } = useNotificationStore();


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
      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={position}
      >
        <Alert
          onClose={() => setNotificationOpen(false)}
          severity={type}
          variant={variant}
          sx={{ width: '100%' }}
        >
          {notification}
        </Alert>
      </Snackbar>
    </MainContent>
  );
};

export default Layout;


