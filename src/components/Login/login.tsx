import React from 'react';

import { useNavigate } from 'react-router-dom';
import {  Descope } from '@descope/react-sdk';




export const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  
  return (
    <Descope
      flowId="sign-up-or-in"
      theme="light"
      onSuccess={(e) => {
        navigate('/dashboard');
        console.log(e.detail.user.name)
        console.log(e.detail.user.email)
      }}
      onError={(err) => {
        console.log("Error!", err)
      }}
    />
  )
}