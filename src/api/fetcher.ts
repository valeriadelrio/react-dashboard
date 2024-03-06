import axios from "axios";


import { useEffect, useState } from "react";

export interface DataType {
  email: string;
  id: number;
  name: number;
  username: string;
  website: string[];
  phone: string;
  company: {};
  address: {}
}

export const useFetchData = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setData(result.data);
      setIsLoadingData(false);
    })();
  }, []);

  return {
    data,
    isLoadingData
  };
};