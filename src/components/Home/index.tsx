import React, { useEffect, useMemo, useState } from 'react';
import { useHeader } from '../../context/headerContext';

import styles from './styles.module.scss';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Card, Col, Row } from 'antd';
import { CopyOutlined, CreditCardOutlined, TeamOutlined } from '@ant-design/icons';
import { BarChart } from '../BarChart';
import { Data } from '../../api/utils';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

export const Home: React.FunctionComponent = ()=> {
  const {setBreadcrumb} = useHeader();
  useDocumentTitle("Dashboard");
  Chart.register(CategoryScale);

  useEffect(()=> {
    setBreadcrumb([
      {
        text: 'Dashboard', 
        className:`${styles.breadcrumb}`,
      }
    ])
  },[setBreadcrumb]);

  const  chartData = useMemo(()=> {
    return {
      labels: ['2016', '2017', '2018', '2019', '2020'],
          datasets: [
              {
                label: 'Total Invoices',
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                  '#fdfd96',
                  '#84b6f4',
                  '#77dd77',
                  '#00c6ab',
                  '#9e6788'
                ],
                borderWidth: 2,
              }
          ]
    }
  },[]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title={<><CreditCardOutlined /> Collected</>}>
              $2310
            </Card>
          </Col>
          <Col span={8}>
            <Card title={<><CopyOutlined /> Total Invoices</>}>
              80
            </Card>
          </Col>
          <Col span={8}>
            <Card title={<><TeamOutlined /> Total Customers</>}>
              10
            </Card>
          </Col>
        </Row>
      </div>
      <>

      <BarChart chartData={chartData}></BarChart>
      </>
    </div>
  )
}