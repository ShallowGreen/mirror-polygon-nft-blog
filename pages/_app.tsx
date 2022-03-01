import '../styles/globals.css';

import React from 'react';
import {Web3Provider} from '@/context/web3Context';
import {ThemeProvider} from 'degen';

import 'degen/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({Component, pageProps, err}) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Web3Provider>
      <ThemeProvider defaultMode="light">
        {getLayout(<Component {...pageProps} err={err} />)}
      </ThemeProvider>
    </Web3Provider>
  );
};

export default MyApp;
