import React, { useContext, useState, ReactNode } from "react";
import { BreadcrumbItemProps } from "antd";


export interface IBreadcrumb extends BreadcrumbItemProps {
  text: ReactNode;
  link?: string;
}


interface IHeaderContext {
  setBreadcrumb: (breadcrumbs: IBreadcrumb[]) => void;
  breadcrumb: IBreadcrumb[];
}

const HeaderContext = React.createContext<IHeaderContext>({} as IHeaderContext);
export const useHeader = () => useContext(HeaderContext);

export const HeaderProvider: React.FunctionComponent<{children: React.ReactElement}> = ({children}) => {
const [breadcrumb, setBreadcrumb] = useState<IBreadcrumb[]>([]);

return (
  <HeaderContext.Provider value={{setBreadcrumb, breadcrumb}}>
    {children}
  </HeaderContext.Provider>
);
};
  
