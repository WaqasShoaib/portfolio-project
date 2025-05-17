import React, { useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import styles from './Education.module.css'; // fadeIn animation

const educationData = [
  {
    Degree: 'Bachelor of Science in Computer Science',
    Institution: 'Information Technology University',
    Year: '2023 - 2027',
    Grade: '3.5/4.0',
    Achievements: "Dean's List, Best Final Year Project",
  },
  {
    Degree: 'Intermediate in Science',
    Institution: 'DPS & College Sahiwal',
    Year: '2021 - 2023',
    Grade: 'A+',
    Achievements: 'Top Scorer in Biology',
  },
  {
    Degree: 'Matriculation',
    Institution: 'The Educators School',
    Year: '2019 - 2021',
    Grade: 'A+',
    Achievements: 'Best Student Award',
  },
];

const highlights = [
  {
    title: 'Courses',
    icon: '📘',
    content: 'Advanced Algorithms, Artificial Intelligence, Web Development, COAL',
  },
  {
    title: 'Certifications',
    icon: '📜',
    content: 'AWS Certified, Google Data Analytics, React Specialist',
  },
  {
    title: 'Skills',
    icon: '💻',
    content: 'JavaScript, Python, React, Node.js, MySQL',
  },
];

const Education = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Education | MyPortfolio');
  }, [setTitle]);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f0f2f5, #ffffff)',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg" className={styles.fadeIn}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          My Education
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          A journey of learning and growth
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 6 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Degree</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Institution</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Year</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Grade</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Achievements</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                    '&:hover': { backgroundColor: '#e3f2fd' },
                  }}
                >
                  <TableCell>{row.Degree}</TableCell>
                  <TableCell>{row.Institution}</TableCell>
                  <TableCell>{row.Year}</TableCell>
                  <TableCell>{row.Grade}</TableCell>
                  <TableCell>{row.Achievements}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </Container>
    </Box>
  );
};

export default Education;
