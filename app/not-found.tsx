import '../styles/variable.css';
import '../styles/reset.css';
import '../styles/global.css';
import React from 'react'
import styles from "./styles.module.scss";
import { Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <p>OOPS!</p>
      <span>404 - PAGE NOT FOUND</span>
      <Button variant="contained" href="/" LinkComponent={Link}>Go To Home</Button>
    </div>
  )
}
