import { Box, Drawer, IconButton, Typography, Divider, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FunctionsIcon from '@mui/icons-material/Functions';
import CalculateIcon from '@mui/icons-material/Calculate';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from 'react-router';
import Lang from './Lang';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '300px',
                    background: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Box className="h-full bg-fixed">
                <Box className="h-full backdrop-blur-md bg-white flex flex-col">
                    {/* Header with close button */}
                    <Box 
                        sx={{ 
                            bgcolor: 'rgba(244, 107, 107, 0.3)',
                        }}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            px: 3,
                            py: 2
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#f46b6b',
                                    fontSize: '1.5rem',
                                    fontWeight: 600
                                }}
                            >
                                <Lang>Menyu</Lang>
                            </Typography>
                            <IconButton 
                                onClick={onClose}
                                sx={{ 
                                    color: '#f46b6b',
                                    '&:hover': {
                                        bgcolor: 'rgba(244, 107, 107, 0.2)'
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Navigation Links */}
                    <Box className="h-full bg-main-pattern bg-cover bg-center bg-no-repeat bg-fixed">
                        <Link
                            to="/formules"
                            onClick={onClose}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <MenuItem sx={{
                                py: 1.5,
                                px: 3,
                                color: '#f46b6b',
                                gap: 2,
                                '&:hover': {
                                    bgcolor: 'rgba(244, 107, 107, 0.1)'
                                }
                            }}>
                                <FunctionsIcon />
                                <Typography variant="body1">
                                    <Lang>Formullar</Lang>
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link
                            to="/actions"
                            onClick={onClose}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <MenuItem sx={{
                                py: 1.5,
                                px: 3,
                                color: '#f46b6b',
                                gap: 2,
                                '&:hover': {
                                    bgcolor: 'rgba(244, 107, 107, 0.1)'
                                }
                            }}>
                                <CalculateIcon />
                                <Typography variant="body1">
                                    <Lang>Əməllar</Lang>
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link
                            to="/tests"
                            onClick={onClose}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <MenuItem sx={{
                                py: 1.5,
                                px: 3,
                                color: '#f46b6b',
                                gap: 2,
                                '&:hover': {
                                    bgcolor: 'rgba(244, 107, 107, 0.1)'
                                }
                            }}>
                                <QuizIcon />
                                <Typography variant="body1">
                                    <Lang>Testlər</Lang>
                                </Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
