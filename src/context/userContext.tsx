import React, { useContext, useEffect, useState } from 'react';

import { useUser, useSession } from '@descope/react-sdk';
import { useNavigate } from 'react-router-dom';

interface IUserContext {
  user: any;
}
const UserContext = React.createContext<IUserContext>({} as IUserContext);
export const useAuth = () => useContext(UserContext);

export const UserProvider: React.FunctionComponent<{children: React.ReactElement}> =  ({children} )=> {
  const {user, isUserLoading} = useUser();
  const{ isSessionLoading, isAuthenticated } = useSession()
  const navigate = useNavigate();

  useEffect(()=> {
    if(!isAuthenticated && !isSessionLoading) {
      navigate("/login");
    }
  },[isSessionLoading, isUserLoading, navigate, isAuthenticated]);

  return (
    <UserContext.Provider value={{ user: user? user : null }}>
       {children}
    </UserContext.Provider>
  )
  
}