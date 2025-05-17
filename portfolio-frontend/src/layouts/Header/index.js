import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import profileImage from '../../Assets/profile.jfif'; // Update this with your actual file name

// Import MUI components
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationLinks = [
    { title: 'Home', path: '/' },
    { title: 'Education', path: '/education' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' }
  ];

  const profileMenuItems = [
    { title: 'Profile', action: () => console.log('Profile clicked') },
    { title: 'Settings', action: () => console.log('Settings clicked') },
    { title: 'Logout', action: () => console.log('Logout clicked') }
  ];

  // Mobile drawer content
  const drawer = (
    <Box className={styles.drawerContainer}>
      <List>
        {navigationLinks.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.title}
            onClick={handleDrawerToggle}
            className={styles.drawerItem}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>MyPortfolio</Link>
        </Box>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <Box className={styles.desktopNav}>
            {navigationLinks.map((item) => (
              <Link 
                key={item.title} 
                to={item.path} 
                className={styles.navLink}
              >
                {item.title}
              </Link>
            ))}
          </Box>
        )}
        
        {/* Profile Avatar and Menu */}
        <Box className={styles.profileSection}>
          <IconButton
            onClick={handleProfileClick}
            size="small"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar 
              className={styles.avatar}
              src={profileImage} 
              alt="Profile Picture"
            >
              U
            </Avatar>
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {profileMenuItems.map((item, index) => (
              <MenuItem 
                key={item.title} 
                onClick={() => {
                  item.action();
                  handleClose();
                }}
                className={styles.menuItem}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        classes={{
          paper: styles.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;