import React from 'react';

import {ReactNodeNoStrings} from 'degen/dist/types/types';
import {Stack} from 'degen';

import Header from './Header';
import Footer from './Footer';

type PublicLayoutProps = {
  children: ReactNodeNoStrings;
};

const PublicLayout = (props: PublicLayoutProps): JSX.Element => {
  const {children} = props;

  return (
    <Stack>
      <Header />
      <Stack>{children}</Stack>
      <Footer />
    </Stack>
  );
};

export default PublicLayout;
