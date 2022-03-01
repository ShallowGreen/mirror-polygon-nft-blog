import {Box} from 'degen';
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer = (props: PageContainerProps): React.ReactElement => {
  const {children} = props;
  return (
    <Box id="here" width="full" marginX="auto" paddingX={{xs: '0', xl: '32'}}>
      {children}
    </Box>
  );
};

export default PageContainer;
