import {Box} from 'degen';
import React, {ReactNode} from 'react';
import {PageContainer} from '..';

type PageContentProps = {
  children: ReactNode;
  background?: 'white' | 'backgroundTertiary';
};

const PageContent = (props: PageContentProps): JSX.Element => {
  const {children, background = 'white'} = props;
  return (
    <PageContainer>
      <Box backgroundColor={background} paddingX="32" paddingY="10">
        {children}
      </Box>
    </PageContainer>
  );
};

export default PageContent;
