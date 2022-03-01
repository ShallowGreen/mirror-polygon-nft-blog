import Link from 'next/link';
import React, {ReactElement} from 'react';
import {Box, Button, IconUserSolid, Stack} from 'degen';

import {useWeb3} from '@/hooks/useWeb3';
import {Logo} from '@/components';

const Header = (): ReactElement => {
  const {address, connect, disconnect} = useWeb3();

  const connectToggle = async () => {
    try {
      if (address) {
        disconnect();
        alert(
          'To fully disconnect, click "Connected" on MetaMask and disconnect your account.',
        );
      } else {
        await connect();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      alert(`Connection attempt failed: ${errorMessage}`);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection="row"
      borderBottomWidth="0.375"
      padding="4"
    >
      <Logo />
      <Stack direction="horizontal">
        {address && (
          <Link href={`/profile/${address}`} passHref>
            <Button shape="circle" variant="secondary">
              <IconUserSolid />
            </Button>
          </Link>
        )}
        <Button
          variant="highlight"
          width={{xs: 'full', md: 'max'}}
          onClick={connectToggle}
        >
          {address ? 'Disconnect' : 'Connect Wallet'}
        </Button>
      </Stack>
    </Box>
  );
};

export default Header;
