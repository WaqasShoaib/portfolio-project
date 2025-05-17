import React, { useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import ProjectCard from '../../components/ProjectCard';
import styles from './Projects.module.css';

import chessImg from '../../Assets/chess.jfif';
import bookImg from '../../Assets/book.jfif';
import portImg from '../../Assets/shooter.jfif';
import weatherImg from '../../Assets/clinic.jfif';

const projects = [
  {
    title: 'Space Shooter Game',
    description: 'A 2D Space shooter game built in Unity',
    imageUrl: portImg,
    repoLink: '#',
  },
  {
    title: 'Clinic App',
    description: 'A online appointment Booking App',
    imageUrl: weatherImg,
    repoLink: '#',
  },
  {
    title: 'Book Store',
    description: 'A book store app to manage and display books.',
    imageUrl: bookImg,
    repoLink: '#',
  },
  {
    title: 'Chess Game',
    description: 'Classic Chess game built using C++.',
    imageUrl: chessImg,
    repoLink: '#',
  },
];

const Projects = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Projects | MyPortfolio');
  }, [setTitle]);

  return (
    <section className={styles.projects}>
      <h1 className={styles.heading}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
