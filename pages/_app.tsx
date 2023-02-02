import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import PlayerLayout from '../components/playerLayout';
import 'reset-css';
import { store } from '../lib/store';
import theme from '../theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
