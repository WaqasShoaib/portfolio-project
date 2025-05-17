import React, { useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import ContactForm from '../../components/ContactForm';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle('Contact | MyPortfolio');
  }, [setTitle]);

  return (
    <section className={styles.contact}>
      <h1 className={styles.heading}>Contact Me</h1>

      <div className={styles.icons}>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub className={styles.icon} />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className={styles.icon} />
        </a>
        <a href="mailto:youremail@example.com">
          <FaEnvelope className={styles.icon} />
        </a>
      </div>

      <ContactForm />
    </section>
  );
};

export default Contact;
