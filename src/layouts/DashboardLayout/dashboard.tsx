import React, { useCallback } from 'react';

import { LoginOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Logo as LogoComponent } from '../../components/Logo/logo';
import { NavLink } from '../../components/NavLinks/navlink';
import styles from "./styles.module.scss";
import { useHeader } from '../../context/headerContext';

const { Sider, Content } = Layout;

export const Dashboard: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const {breadcrumb} = useHeader();


  const logout = useCallback(()=> {
    navigate('/login');
  },[navigate]);

  return (
    <Layout className={styles.layout}>
      <Sider width='20%' className={styles.sider}>
        <div>
          <LogoComponent/>
          <NavLink/>
        </div>
        <div className={styles['log-out']} onClick={logout}>
          <LoginOutlined alt='log out' className={styles.icon} /> Log Out 
        </div>
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Breadcrumb className={styles["dashboard-layout-breadcrumb"]}>
            {breadcrumb.map(({ text, link, onClick, ...breadcrumbProps }, index) => (
              <Breadcrumb.Item key={`breadcrum-item-${index}`} className={link && `${styles.link}` } onClick={link ? () => navigate(link) : onClick} {...breadcrumbProps}>
                {text}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}