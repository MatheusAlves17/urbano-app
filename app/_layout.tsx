/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Urbanist_100Thin,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

import { theme } from '@/global/theme';
import Toast, { ErrorToast } from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import AuthProvider from '@/hooks/useAuth';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { handleError } from '@/utils/handleError';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import useUpdate from '@/hooks/useUpdate';

import { Slot, SplashScreen } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/hooks/useCart';

export { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const toastConfig = {
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={2} />,
};

setDefaultOptions({ locale: ptBR });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 20000,
      onError: handleError,
      retry: false,
      initialDataUpdatedAt: 0,
    },
  },
});

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isLoading = useUpdate();
  const [fontsLoaded] = useFonts({
    Urbanist_100Thin,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  const isAppReady = !isLoading && fontsLoaded;

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider isAppReady={isAppReady}>
            <CartProvider>
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <StatusBar
                    animated
                    translucent
                    backgroundColor={theme.colors.background}
                  />
                  <Slot />
                  <Toast config={toastConfig} />
                </SafeAreaView>
              </SafeAreaProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
