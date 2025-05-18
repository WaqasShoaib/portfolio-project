import React, { useEffect, useState } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Container,
  Stack
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import styles from './Home.module.css';
import { Link as RouterLink } from 'react-router-dom';
import axios from '../../api/axiosInstance';

const Home = () => {
  const { setTitle } = usePageTitle();
  const [coreSkills, setCoreSkills] = useState([]);
  const [exploringSkills, setExploringSkills] = useState([]);

  useEffect(() => {
    setTitle('Home | Professional Portfolio');
    fetchSkills();
  }, [setTitle]);

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      const core = res.data.filter((s) => s.type === 'core');
      const exploring = res.data.filter((s) => s.type === 'exploring');
      setCoreSkills(core);
      setExploringSkills(exploring);
    } catch (error) {
      console.error('Failed to load skills', error);
    }
  };

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
                  {coreSkills.map((skill) => (
                    <Chip key={skill._id} label={skill.name} className={styles.techChip} />
                  ))}
                </div>
              </Paper>
            </div>

            <div style={{ width: '49%' }}>
              <Paper elevation={1} className={styles.skillCard}>
                <Typography variant="subtitle1" className={styles.cardTitle}>
                  Currently Exploring
                </Typography>
                <div className={styles.chipContainer}>
                  {exploringSkills.map((skill) => (
                    <Chip key={skill._id} label={skill.name} className={styles.techChip} />
                  ))}
                </div>
              </Paper>
            </div>
          </div>
        </Box>

        {/* Manage Skills Section */}
        <Box sx={{ mt: 6, textAlign: 'center', mb: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ManageAccountsIcon />}
              component={RouterLink}
              to="/skills"
            >
              Manage Skills
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AddCircleOutlineIcon />}
              component={RouterLink}
              to="/skills"
            >
              Add Skill
            </Button>
          </Stack>
        </Box>
      </div>
    </Container>
  );
};

export default Home;