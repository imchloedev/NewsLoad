/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import Navigator from './Navigator';
import {ActivityIndicator, LogBox, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme, variables} from '~/styles/theme';
import {useEffect, useState} from 'react';
LogBox.ignoreLogs(['Sending']);
import {subscribeAuth} from './apis/auth';

const queryClient = new QueryClient();

function App() {
  const scheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider
          theme={
            scheme === 'dark'
              ? {style: darkTheme, variables}
              : {style: lightTheme, variables}
          }>
          <Navigator />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
