import React from 'react';

import { AuthProvider } from '@descope/react-sdk';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { Dashboard } from './layouts/DashboardLayout/dashboard';
import { Home } from './components/Home';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { UserProvider } from './context/userContext';
import { HeaderProvider } from './context/headerContext';
import { Customer } from './components/Customers/New';
import { Invoices } from './components/Invoices';
import { Customers } from './components/Customers';

export const AppRoutes: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
    <AuthProvider projectId="P2d6X8VQzLaaziTXkcFw2YxBkzI2">
      <Routes>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path='/login' element={<AuthLayout/>}/>
        <Route path='*' element={(
          <UserProvider>
            <HeaderProvider>
              <Dashboard>
                <Routes >
                  <Route element={<Home/>} path='/dashboard'/>
                  <Route element={<Customers/>} path='/dashboard/customers' />
                  <Route element={<Customer createMode={true}/> } path='/dashboard/customers/new' />
                  <Route element={<Customer createMode={false}/>} path='/dashboard/customers/:id/edit' />
                  <Route element={<Invoices/>} path='/dashboard/invoices'/>
                  <Route path="*" element={<Navigate to="/dashboard" replace={true} />}/>
                </Routes>
              </Dashboard>
            </HeaderProvider>
          </UserProvider>

        )}/>    
      </Routes>

    </AuthProvider>
    </BrowserRouter>
  );
};