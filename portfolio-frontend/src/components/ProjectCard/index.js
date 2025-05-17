import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, imageUrl, demoLink, repoLink }) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <img src={imageUrl} alt={title} className={styles.image} />
    </div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>

  </div>
);

export default ProjectCard;
