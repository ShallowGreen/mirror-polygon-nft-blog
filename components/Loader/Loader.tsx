import React from 'react';
import {Box, Spinner} from 'degen';

const Loader = (): JSX.Element => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="full"
      minHeight="32"
    >
      <Spinner />
    </Box>
  );
};

export default Loader;
