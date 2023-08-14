import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'


const colors = {
  brand: {
    900: '#393646',
    800: '#4F4557',
    700: '#6D5D6E',
    600: '#F4EEE0'
  },
}

export const theme = extendTheme({ colors })



const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;