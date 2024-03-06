import React, { useEffect } from 'react';
import { useHeader } from '../../context/headerContext';
import styles from './styles.module.scss';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Invoices: React.FunctionComponent = ()=> {
  const {setBreadcrumb} = useHeader();
  useDocumentTitle("Invoices");


  useEffect(()=> {
    setBreadcrumb([
      {
        text: 'Invoices', 
        className:`${styles.breadcrumb}`,
      }
    ])
  },[setBreadcrumb]);
  return (
    <div style={{color: 'black'}}> INVOICES
    </div>
  )
}