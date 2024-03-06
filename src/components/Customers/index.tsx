import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss'
import { useHeader } from '../../context/headerContext';
import { DataType, useFetchData } from '../../api/fetcher';
import { Button, Popconfirm, Table, TableProps, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Search from 'antd/es/input/Search';


export const Customers: React.FunctionComponent = () => {
  const {setBreadcrumb} = useHeader();  
  const {data, isLoadingData} = useFetchData();
  const [localData, setLocalData] = useState<DataType[]>([]);
  const [localFilteredData, setLocalFilteredData] = useState<DataType[]>([]);
  const [isLoadingLocalData, setIsLoadingLocalData] = useState(true);
  const [textSearching, setTextSearching] = useState('');
  const navigate = useNavigate();
  useDocumentTitle("Customers");

  useEffect(()=> {
    if(!isLoadingData) {
      setLocalData(data);
      setIsLoadingLocalData(false);
    }
  },[data, isLoadingData]);

  useEffect(()=> {
    setBreadcrumb([
      {
        text: 'Customers', 
        className:`${styles.breadcrumb}`,
      }
    ])
  },[setBreadcrumb]);

  const onClickEdit = useCallback((row: DataType)=> {
    navigate(`/dashboard/customers/${row?.id}/edit`, {state: {row}})
  },[navigate]);

  const onClickDelete = useCallback((row: DataType)=> {
    const index = localData.indexOf(row);
    if(index !== -1) {
      setIsLoadingLocalData(true);
      localData.splice(index, 1);
      setLocalData([...localData]);
      setIsLoadingLocalData(false);
    }
  },[localData]);

  const columns: TableProps<DataType>['columns'] = useMemo( ()=> [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Actions',
      render: (record) => (
        <div className={styles.actions}>
          <Tooltip title="Edit">
            <EditOutlined className={styles.icon} onClick={()=> {onClickEdit(record)}}/>
          </Tooltip>
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={()=>onClickDelete(record)}
            okText="Yes"
            cancelText="No"
            >
              <Tooltip title="Remove">
                <DeleteOutlined className={styles.icon} />
              </Tooltip>
          </Popconfirm>
        </div>
      )
    }

  ],[onClickDelete, onClickEdit]);

  const addNewCustomer = useCallback(()=> {
    navigate('/dashboard/customers/new');
  },[navigate]);

  const onSearch = useCallback((value: string)=> {
    setTextSearching(value);
    if(value ){
      const filtered = localData?.filter((o: any) => {
        return Object.keys(o).some((k: any) => {
          return String(o[k]).toLowerCase().includes(value?.toLocaleLowerCase());
        })
      })
      setLocalFilteredData(filtered);
    } else {
      setLocalData(localData);
    }
  },[localData]);

  return (
    <> 
      <div className={styles['header-wrapper']}>
        <Search placeholder="input search text"  className={styles.search}  onSearch={onSearch}/>
        <Button icon={<PlusOutlined />} onClick={addNewCustomer} type='primary' className={styles.btn}> 
          Customer
        </Button>
      </div>

      <Table 
        className={styles.table}
        columns={columns} 
        dataSource={textSearching ? localFilteredData : localData} 
        rowKey={(row)=> row?.id}
        key={'id'}
        pagination={{
          pageSize: 5,        
        }}
        loading={isLoadingLocalData}/>
      
      </>
  )
}