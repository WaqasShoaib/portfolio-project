import React, { useEffect, useState } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import axios from '../../api/axiosInstance';
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
  Box
} from '@mui/material';
import styles from './Education.module.css';

const Education = () => {
  const { setTitle } = usePageTitle();
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle('Education | MyPortfolio');
  }, [setTitle]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get('/api/education');
        const formatted = res.data.map(item => ({
          Degree: item.degree,
          Institution: item.institution,
          Year: `${item.startYear} - ${item.endYear || 'Present'}`,
          Grade: item.grade,
          Achievements: item.achievements?.join(', ') || '—',
        }));
        setEducationData(formatted);
        setLoading(false);
      } catch (err) {
        setError('Failed to load education data.');
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

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

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : error ? (
          <Typography align="center" color="error">{error}</Typography>
        ) : (
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
        )}
      </Container>
    </Box>
  );
};

export default Education;
