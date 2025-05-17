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
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import styles from './Education.module.css';

const Education = () => {
  const { setTitle } = usePageTitle();
  const [educationList, setEducationList] = useState([]);
  const [form, setForm] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    grade: '',
    achievements: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle('Education | MyPortfolio');
  }, [setTitle]);

  const fetchEducation = async () => {
    try {
      const res = await axios.get('/api/education');
      setEducationList(res.data);
    } catch {
      alert('Failed to load education data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        achievements: form.achievements.split(',').map(a => a.trim()),
      };

      if (editingId) {
        await axios.put(`/api/education/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('/api/education', payload);
      }

      setForm({ degree: '', institution: '', startYear: '', endYear: '', grade: '', achievements: '' });
      fetchEducation();
    } catch {
      alert('Failed to submit education record');
    }
  };

  const handleEdit = (edu) => {
    setEditingId(edu._id);
    setForm({
      degree: edu.degree,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear,
      grade: edu.grade,
      achievements: (edu.achievements || []).join(', '),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await axios.delete(`/api/education/${id}`);
      fetchEducation();
    } catch {
      alert('Failed to delete education record');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f0f2f5, #ffffff)',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg" className={styles.fadeIn}>
        <Typography variant="h4" align="center" gutterBottom>
          My Education
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Degree" name="degree" value={form.degree} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Institution" name="institution" value={form.institution} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField label="Start Year" name="startYear" value={form.startYear} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <TextField label="End Year" name="endYear" value={form.endYear} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <TextField label="Grade" name="grade" value={form.grade} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <TextField
                label="Achievements (comma separated)"
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editingId ? 'Update' : 'Add'} Education
              </Button>
            </Grid>
          </Grid>
        </Box>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{ color: '#fff' }}>Degree</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Institution</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Year</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Grade</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Achievements</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {educationList.map((edu) => (
                  <TableRow key={edu._id}>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>{edu.startYear} - {edu.endYear || 'Present'}</TableCell>
                    <TableCell>{edu.grade}</TableCell>
                    <TableCell>{(edu.achievements || []).join(', ')}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(edu)} size="small">Edit</Button>
                      <Button onClick={() => handleDelete(edu._id)} size="small" color="error">Delete</Button>
                    </TableCell>
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
