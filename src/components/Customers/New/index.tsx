import React, { useCallback, useEffect } from 'react';
import { useHeader } from '../../../context/headerContext';
import styles from './styles.module.scss';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Space, notification } from 'antd';

interface CustomerTypeProps {
  createMode?: boolean,
}
export const Customer: React.FunctionComponent<CustomerTypeProps> = ({createMode = false})=> {
  const {setBreadcrumb} = useHeader();
  useDocumentTitle("Customer");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(()=> {
    setBreadcrumb([
      {
        text: 'Customers', 
        className:`${styles.breadcrumb}`,
        link: '/dashboard/customers'
      },
      {
        text: createMode ? 'New' : `${state?.row?.name}`, 
        className:`${styles.breadcrumb}`,
      }
    ])
  },[setBreadcrumb, createMode, state?.row?.name]);

  const onCancel = useCallback(()=> {
    navigate('/dashboard/customers')
  },[navigate]);

  const onFinish = useCallback(()=> {
    console.log('on finish', form.getFieldsValue(true));
  },[form]);

  const onFinishFailed = useCallback(()=> {
    console.log('on finish failed',  form.getFieldsValue(true));
    notification?.error( {
      message: 'Something went wrong!',
      description: 'Try again later.'
    })
  },[form]);

  return (
    <Form form={form} className={styles.form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={state?.row}
      >
        <div className={styles.wrapper}>
          <Row>
            <Col className={styles.col}>
              <Form.Item  
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input  value={state?.row?.name}/>
              </Form.Item >
            </Col>
            <Col className={styles.col}>
              <Form.Item 
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input value={state?.row?.username}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className={styles.col}>
              <Form.Item 
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type='email' value={state?.row?.email}/>
              </Form.Item>
            </Col>
            <Col className={styles.col}>
              <Form.Item 
                label="Website"
                name="website"
                rules={[{ required: true, message: 'Please input your website!' }]}>
                <Input type='url' defaultValue={state?.row?.website}/>
              </Form.Item>
            </Col>
          </Row>

        </div>
        <Form.Item className={styles['btn-actions']}>
          <Space>
            <Button htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
      </Form.Item>
    </Form>
  )
}