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
  Grid
} from '@mui/material';
import styles from './Experience.module.css';

const Experience = () => {
  const { setTitle } = usePageTitle();
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTitle('Experience | MyPortfolio');
  }, [setTitle]);

  const fetchExperience = async () => {
    try {
      const res = await axios.get('/api/experience');
      setExperienceList(res.data);
    } catch {
      alert('Failed to fetch experience');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`/api/experience/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post('/api/experience', payload);
      }

      setForm({ role: '', company: '', startDate: '', endDate: '', description: '', technologies: '' });
      fetchExperience();
    } catch {
      alert('Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setForm({
      role: exp.role,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      technologies: exp.technologies.join(', '),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await axios.delete(`/api/experience/${id}`);
      fetchExperience();
    } catch {
      alert('Failed to delete experience');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f0f2f5, #ffffff)',
        minHeight: '100vh',
        py: 4,
        pb: 10,
      }}
    >
      <Container maxWidth="lg" className={styles.fadeIn}>
        <Typography variant="h4" align="center" gutterBottom>
          Professional Experience
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="role" label="Role / Position" value={form.role} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="company" label="Company" value={form.company} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="startDate" label="Start Date" value={form.startDate} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="endDate" label="End Date" value={form.endDate} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="technologies" label="Technologies (comma-separated)" value={form.technologies} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Responsibilities" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                {editingId ? 'Update Experience' : 'Add Experience'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Table */}
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{ color: '#fff' }}>Company</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Position</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Duration</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Technologies</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Responsibilities</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {experienceList.map((exp) => (
                  <TableRow key={exp._id}>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell className={styles.roleHighlight}>{exp.role}</TableCell>
                    <TableCell>{`${exp.startDate} - ${exp.endDate}`}</TableCell>
                    <TableCell>{exp.technologies?.join(', ')}</TableCell>
                    <TableCell>{exp.description}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleEdit(exp)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(exp._id)}>Delete</Button>
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

export default Experience;
