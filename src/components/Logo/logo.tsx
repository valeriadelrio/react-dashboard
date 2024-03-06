
import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

export const Logo: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.logo} onClick={()=> navigate('/dashboard')}>
      <GlobalOutlined className={styles.icon}/>
      <p className={styles.name}>Dashboard</p>
    </div>
  );
}
