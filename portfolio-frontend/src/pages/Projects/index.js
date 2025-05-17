import React, { useEffect, useState } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import axios from '../../api/axiosInstance';
import styles from './Projects.module.css';

const Projects = () => {
  const { setTitle } = usePageTitle();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', githubLink: '', liveDemoLink: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTitle('Projects | MyPortfolio');
  }, [setTitle]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch {
      alert('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('/api/projects', form);
      }
      setForm({ title: '', description: '', githubLink: '', liveDemoLink: '' });
      fetchProjects();
    } catch {
      alert('Error submitting project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch {
      alert('Failed to delete');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink || '',
    });
  };

  return (
    <section className={styles.projects}>
      <h1 className={styles.heading}>Projects</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="githubLink" placeholder="GitHub Link" value={form.githubLink} onChange={handleChange} required />
        <input name="liveDemoLink" placeholder="Live Demo Link" value={form.liveDemoLink} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Project</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project._id} className={styles.card}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
              <br />
              {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>}
              <div className={styles.buttons}>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
