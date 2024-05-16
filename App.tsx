/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import React from 'react';

import {AxiosProvider} from './src/context/Axios';
import RootNavigator from './src/navigation/RootNavigator';
import {theme} from './src/utils/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </AxiosProvider>
    </NativeBaseProvider>
  );
}

export default App;
