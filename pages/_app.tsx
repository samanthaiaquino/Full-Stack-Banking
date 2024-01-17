import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { Button, ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../hooks/useAuth';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      retry: 1,
    },
  },
});

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const { authorized } = useAuth();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // eslint-disable-next-line no-console
      onError={(...err) => console.log('Boundary Error ====>', ...err)}
    >
      <Head>
        <title>Finance App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ConfigProvider theme={{ token: { colorPrimary: '#8833FF' } }}>
        <NextNProgress color="#8833FF" height={3} />
        <QueryClientProvider client={queryClient}>
          {authorized && <Component {...pageProps} />}
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
