import React, { useCallback } from 'react';

import { CopyOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink as Link, useNavigate} from 'react-router-dom';

import styles from './styles.module.scss';

// Map of links to show in the side navigation
const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: <HomeOutlined />
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: <UserOutlined />
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: <CopyOutlined />
  },
]
export const NavLink: React.FunctionComponent = ()=> {
  const navigate = useNavigate();
  const onLinkClick = useCallback((href: string)=> {
    console.log('navigating', href );
    navigate(href);

  },[navigate]);
  return (
    <>
      {
        links.map( link => {
          return (
            <Link
              key={link.name}
              to={link.href}
              onClick={()=> onLinkClick(link.href)}
              // className={isActive => `${styles.link}` + (isActive ? ` ${styles.active}` : ``) }   
              className={styles.link}
            >
              {link.icon}
              <p className={styles.name}>{link.name}</p>
            </Link>
          )
        })
      }
    </>
  )
}