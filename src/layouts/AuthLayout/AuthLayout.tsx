import React from 'react';
import { Logo } from '../../components/Logo/logo';
import { Login } from '../../components/Login/login';
import styles from './styles.module.scss';

export const AuthLayout: React.FunctionComponent = () => {
  return (
    <div className={styles.wrapper}>
      <Logo/>
      <Login/>
    </div>
  )
}