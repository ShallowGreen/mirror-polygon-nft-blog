import {Box, Text} from 'degen';
import React, {ReactElement} from 'react';

const Footer = (): ReactElement => {
  return (
    <Box textAlign="center" paddingTop="5" paddingBottom="9">
      <Text>Copyright © 2021 Figment Inc. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
