import React from 'react';
import styles from './ProfileImage.module.css';

const ProfileImage = ({ src, alt }) => (
  <div className={styles.wrapper}>
    <img src={src} alt={alt} className={styles.avatar} />
  </div>
);

export default ProfileImage;
