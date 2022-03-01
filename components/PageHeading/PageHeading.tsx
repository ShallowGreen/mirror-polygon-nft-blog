import React from 'react';
import {Box, Button, Heading, IconChevronLeft} from 'degen';
import {useRouter} from 'next/router';

import {PageContainer} from '..';

type PageHeadingProps = {
  title: string;
};

const PageHeading = (props: PageHeadingProps): JSX.Element => {
  const {title} = props;
  const router = useRouter();

  return (
    <PageContainer>
      <Box
        position="relative"
        paddingLeft="4"
        paddingTop="20"
        paddingBottom="10"
      >
        <Box position="absolute" top="0">
          {router.pathname !== '/' && (
            <Button
              variant="transparent"
              size="small"
              onClick={() => router.back()}
            >
              <IconChevronLeft />
            </Button>
          )}
        </Box>
        <Heading level="1">{title}</Heading>
      </Box>
    </PageContainer>
  );
};

export default PageHeading;
