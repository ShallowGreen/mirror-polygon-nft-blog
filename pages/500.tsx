import React, {ReactElement} from 'react';
import {useRouter} from 'next/router';
import {Box, Button, Heading, IconExclamation} from 'degen';

const ServerError = (): ReactElement => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      gap="9"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="viewHeight"
    >
      <IconExclamation size="32" color="red" />
      <Heading>500</Heading>
      <Button onClick={() => router.push('/')}>Back Home</Button>
    </Box>
  );
};

export default ServerError;
