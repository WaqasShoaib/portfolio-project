import React, { useEffect, useState } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import axios from '../../api/axiosInstance';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

const Skills = () => {
  const { setTitle } = usePageTitle();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'core' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTitle('Skills | Manage My Skills');
    fetchSkills();
  }, [setTitle]);

  const fetchSkills = async () => {
    try {
      const res = await axios.get('/api/skills');
      setSkills(res.data);
    } catch (err) {
      alert('Failed to load skills');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/skills/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('/api/skills', form);
      }
      setForm({ name: '', type: 'core' });
      fetchSkills();
    } catch {
      alert('Error saving skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setForm({ name: skill.name, type: skill.type });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await axios.delete(`/api/skills/${id}`);
      fetchSkills();
    } catch {
      alert('Failed to delete skill');
    }
  };

  return (
    <Container sx={{ py: 5, minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Manage Skills
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Skill Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="core">Core</MenuItem>
              <MenuItem value="exploring">Exploring</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" fullWidth>
              {editingId ? 'Update Skill' : 'Add Skill'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Skills Table */}
      <Paper>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Skill</TableCell>
              <TableCell sx={{ color: '#fff' }}>Type</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill._id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.type}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(skill)} size="small">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(skill._id)} size="small" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Skills;
