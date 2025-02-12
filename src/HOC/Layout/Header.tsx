import logoImage from "../../assets/images/logo.png"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { Box, Typography, Menu, MenuItem, AppBar, Container, Toolbar, Divider, Tooltip, IconButton } from "@mui/material"
import graduatedSvg from "../../assets/svg/graduated.svg"
import { LanguageCode, useLanguageStore } from "../../stores/languageStore"
import Lang from './Lang';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const langOpen = Boolean(langAnchorEl)
    const navigate = useNavigate()
    const { language, languages, setLanguage } = useLanguageStore()

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLangClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setLangAnchorEl(event.currentTarget)
    }

    const handleLangClose = () => {
        setLangAnchorEl(null)
    }

    const handleLangChange = (langCode: LanguageCode) => {
        setLanguage(langCode)
        handleLangClose()
    }

    const handleProfileClick = () => {
        setAnchorEl(null)
        navigate('/profile')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: 'transparent'}}>
            <Container maxWidth={false}>
                <Toolbar 
                    disableGutters 
                    sx={{ 
                        height: { xs: 56, md: 64 }, 
                        px: { xs: 1, sm: 2, md: 3, lg: 4 },
                        position: 'relative'
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ flexShrink: 0 }}>
                        <Link to="/">
                            <Box
                                component="img"
                                src={logoImage}
                                alt="Tiamo Kids"
                                sx={{ 
                                    height: { xs: 36, sm: 40, md: 48 },
                                    width: 'auto' 
                                }}
                            />
                        </Link>
                    </Box>

                    {/* Navigation Links - Hidden on mobile */}
                    <Box 
                        component="nav" 
                        sx={{ 
                            display: { xs: 'none', lg: 'flex' },
                            gap: { lg: 6, xl: 12 },
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <Link
                            to="/formules"
                            className="text-red-500 transition-all duration-200 ease-in-out hover:text-red-700 px-3 py-2 text-xl font-medium"
                        >
                            <Lang>Formullar</Lang>
                        </Link>
                        <Link
                            to="/actions"
                            className="text-red-500 transition-all duration-200 ease-in-out hover:text-red-700 px-3 py-2 text-xl font-medium"
                        >
                            <Lang>Əməllar</Lang>
                        </Link>
                        <Link
                            to="/tests"
                            className="text-red-500 transition-all duration-200 ease-in-out hover:text-red-700 px-3 py-2 text-xl font-medium"
                        >
                            <Lang>Testlər</Lang>
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: { xs: 1, sm: 2 } }}>
                        {/* Language Selector */}
                        <Box>
                            <Tooltip title="Change language">
                                <Box
                                    onClick={handleLangClick}
                                    sx={{
                                        cursor: 'pointer',
                                        width: { xs: 32, sm: 36, md: 40 },
                                        height: { xs: 32, sm: 36, md: 40 },
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={languages.find(lang => lang.code === language)?.icon}
                                        alt={language}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Box>
                            </Tooltip>
                            <Menu
                                anchorEl={langAnchorEl}
                                open={langOpen}
                                onClose={handleLangClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        overflow: 'visible',
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            left: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            >
                                {languages.map((lang) => (
                                    <MenuItem
                                        key={lang.code}
                                        onClick={() => handleLangChange(lang.code)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            py: 1,
                                            px: 2,
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={lang.icon}
                                            alt={lang.code}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Typography variant="body2">
                                            {lang.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* User Info */}
                        <Box 
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                bgcolor: { xs: 'transparent', sm: '#E3F2FD' },
                                borderRadius: '24px',
                                py: { xs: 0.5, sm: 0.75, md: 1 },
                                px: { xs: 0, sm: 1.75, md: 2 },
                                gap: { xs: 1, sm: 1.5 }
                            }}
                            onClick={handleClick}
                            aria-controls={open ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Box sx={{ 
                                display: { xs: 'none', sm: 'flex' }, 
                                flexDirection: 'column' 
                            }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        color: 'black',
                                        fontSize: { sm: '0.8rem', md: '0.875rem' },
                                        fontWeight: 500,
                                        lineHeight: 1.2
                                    }}
                                >
                                    <Lang>Əli Resulzadə</Lang>
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: { sm: '0.7rem', md: '0.75rem' },
                                        lineHeight: 1.2
                                    }}
                                >
                                    X <Lang>sinif şagirdi</Lang>
                                </Typography>
                            </Box>
                            <Box 
                                component="img"
                                src={graduatedSvg}
                                sx={{ 
                                    width: { xs: 45, sm: 36, md: 40 },
                                    height: { xs: 45, sm: 36, md: 40 }
                                }}
                            />
                        </Box>

                        {/* Mobile Menu Button */}
                        <IconButton
                            onClick={onOpenSidebar}
                            sx={{ 
                                display: { xs: 'flex', lg: 'none' },
                                color: '#f46b6b',
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '2rem' }
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Dropdown Menu */}
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                width: { xs: 180, sm: 200, md: 220 },
                                '& .MuiList-root': {
                                    py: 1
                                }
                            }
                        }}
                        disableAutoFocusItem
                    >
                        {/* User Info Box - Visible only on xs screens */}
                        <Box
                            sx={{
                                display: { xs: 'flex', sm: 'none' },
                                flexDirection: 'column',
                                p: 2,
                                bgcolor: 'grey.50',
                                borderBottom: '1px solid',
                                borderColor: 'grey.200'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'text.primary',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    mb: 0.5
                                }}
                            >
                                <Lang>Əli Resulzadə</Lang>
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem'
                                }}
                            >
                                X <Lang>sinif şagirdi</Lang>
                            </Typography>
                        </Box>
                        <MenuItem 
                            sx={{ 
                                py: 1.5,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                            onClick={handleProfileClick}
                        >
                            <Lang>Profil</Lang>
                        </MenuItem>
                        <MenuItem 
                            onClick={handleClose}
                            sx={{ 
                                py: 1.5,
                                px: 2.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <Lang>Nəticələr</Lang>
                        </MenuItem>
                        <Divider sx={{ my: 1 }} />
                        <MenuItem 
                            onClick={handleClose}
                            sx={{ 
                                py: 1.5,
                                px: 2.5,
                                color: 'error.main',
                                '&:hover': {
                                    backgroundColor: 'error.lighter',
                                    color: 'error.dark'
                                }
                            }}
                        >
                            <Lang>Çıxış</Lang>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;