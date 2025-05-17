import React, { useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import { Box, Typography, Button, Chip, Paper, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './Home.module.css';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle('Home | Professional Portfolio');
  }, [setTitle]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.content}>
        <Box className={styles.headline}>
          <Typography variant="overline" className={styles.greeting}>
            Welcome to my portfolio
          </Typography>
          <Typography variant="h3" className={styles.title}>
            Hello, I'm <span className={styles.name}>Waqas Shoaib</span>
          </Typography>
          <Typography variant="h5" className={styles.subtitle}>
            Full Stack Developer & Computer Science Graduate
          </Typography>
          
          <Typography variant="body1" className={styles.intro}>
            Passionate about building elegant, user-centric applications with modern technologies.
            I specialize in creating responsive web applications with a focus on performance and accessibility.
          </Typography>

          <div className={styles.buttonGroup}>
          <Button 
  variant="contained" 
  color="primary" 
  className={styles.ctaButton}
  endIcon={<ArrowForwardIcon />}
  component={RouterLink}
  to="/projects"
>
  View My Work
</Button>
          </div>
        </Box>
        
        <Box className={styles.techSection}>
          <Typography variant="h6" className={styles.sectionTitle}>
            My Technology Stack
          </Typography>
          
          <div className={styles.skillsRow}>
            <div style={{ width: '49%' }}>
              <Paper elevation={1} className={styles.skillCard}>
                <Typography variant="subtitle1" className={styles.cardTitle}>
                  Core Technologies
                </Typography>
                <div className={styles.chipContainer}>
                  <Chip label="React" className={styles.techChip} />
                  <Chip label="Node.js" className={styles.techChip} />
                  <Chip label="MongoDB" className={styles.techChip} />
                  <Chip label="Express" className={styles.techChip} />
                  <Chip label="JavaScript" className={styles.techChip} />
                  <Chip label="HTML/CSS" className={styles.techChip} />
                </div>
              </Paper>
            </div>
            
            <div style={{ width: '49%' }}>
              <Paper elevation={1} className={styles.skillCard}>
                <Typography variant="subtitle1" className={styles.cardTitle}>
                  Currently Exploring
                </Typography>
                <div className={styles.chipContainer}>
                  <Chip label="AWS" className={styles.techChip} />
                  <Chip label="TypeScript" className={styles.techChip} />
                  <Chip label="Docker" className={styles.techChip} />
                  <Chip label="GraphQL" className={styles.techChip} />
                  <Chip label="Machine Learning" className={styles.techChip} />
                </div>
              </Paper>
            </div>
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default Home;