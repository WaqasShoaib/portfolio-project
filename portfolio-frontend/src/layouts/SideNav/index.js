import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideNav.module.css';
import profilePic from '../../Assets/profile.jfif';

// MUI imports
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Avatar
} from '@mui/material';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Removed StarIcon import to fix the warning

const SideNav = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  // Handle resize events
  useEffect(() => {
    setIsExpanded(!isMobile && open);
  }, [isMobile, open]);

  const handleDrawerToggle = () => {
    setIsExpanded(!isExpanded);
    if (isMobile) {
      onClose();
    }
  };

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon color="inherit" />, path: '/' },
    { text: 'Education', icon: <SchoolIcon color="inherit" />, path: '/education' },
    { text: 'Projects', icon: <WorkIcon color="inherit" />, path: '/projects' },
    { text: 'Contact', icon: <EmailIcon color="inherit" />, path: '/contact' }
  ];

  const drawerContent = (
    <>
      <Box className={styles.drawerHeader}>
        {isExpanded ? (
          <IconButton 
            onClick={handleDrawerToggle}
            className={styles.collapseButton}
            size="small"
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        ) : (
          <IconButton 
            onClick={handleDrawerToggle}
            className={styles.expandButton}
            size="small"
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      
      <Box className={`${styles.profile} ${!isExpanded && styles.profileCollapsed}`}>
        <div className={styles.avatarContainer}>
          <Avatar 
            src={profilePic} 
            alt="Profile"
            className={styles.avatar}
            sx={{
              width: isExpanded ? 100 : 40,
              height: isExpanded ? 100 : 40,
              transition: theme.transitions.create(['width', 'height'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          />
        </div>
        {isExpanded && (
          <Box className={styles.profileInfo}>
            <Typography variant="h6" className={styles.profileName}>
              Your Name
            </Typography>
            <Typography variant="body2" className={styles.profileTitle}>
              Web Developer
            </Typography>
          </Box>
        )}
      </Box>
      
      <Divider className={styles.divider} />
      
      <List className={styles.navList}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
              sx={{
                justifyContent: isExpanded ? 'initial' : 'center',
                px: isExpanded ? 3 : 2.5,
              }}
            >
              <Tooltip title={isExpanded ? "" : item.text} placement="right" arrow>
                <ListItemIcon 
                  className={styles.navIcon}
                  sx={{
                    minWidth: 0,
                    mr: isExpanded ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              {isExpanded && (
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ noWrap: true }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={onClose}
        className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : styles.drawerClose}`}
        classes={{
          paper: `${styles.drawerPaper} ${isExpanded ? styles.drawerOpen : styles.drawerClose}`,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideNav;