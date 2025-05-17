import React from 'react';
import styles from './CustomTable.module.css';

const CustomTable = ({ columns, data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className={idx % 2 === 0 ? styles.striped : ''}>
          {columns.map((col) => (
            <td key={col}>{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default CustomTable;
