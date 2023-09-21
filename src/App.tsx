/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import Navigator from './Navigator';
import {LogBox, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme, variables} from '~/styles/theme';
import {useEffect, useState} from 'react';
LogBox.ignoreLogs(['Sending']);
import {subscribeAuth} from './apis/auth';
import CriticalErrorBoundary from '@components/errorBoundaries/CriticalErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
    },
  },
});

function App() {
  const scheme = useColorScheme();
  const [_, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const handleUser = subscribeAuth(user => {
      if (!user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return handleUser;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider
          theme={
            scheme === 'dark'
              ? {style: darkTheme, variables}
              : {style: lightTheme, variables}
          }>
          <CriticalErrorBoundary>
            <Navigator />
          </CriticalErrorBoundary>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
