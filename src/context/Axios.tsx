import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import React, {Context, createContext, useState} from 'react';
import Config from 'react-native-config';

interface ContextProps {
  api: AxiosInstance;
  apiKey: string;
  setAPIKey: (token: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const AxiosContext: Context<ContextProps> = createContext(
  {} as ContextProps,
);

export const AxiosProvider = ({children}: ProviderProps) => {
  const [apiKey, setAPIKey] = useState('');
  const {ACCESS_TOKEN, API_URL} = Config;
  console.log({ACCESS_TOKEN});
  const api = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      console.log(error?.request?.status, error);
      return Promise.reject(error);
    },
  );

  return (
    <AxiosContext.Provider value={{api, apiKey, setAPIKey}}>
      {children}
    </AxiosContext.Provider>
  );
};
