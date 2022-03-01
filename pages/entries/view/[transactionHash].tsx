import React from 'react';
import {useRouter} from 'next/router';

import {withPublicLayout} from '@/layouts';
import {PageContainer, PostDetails} from '@/components';

const ShowEntry = (): JSX.Element | null => {
  const router = useRouter();
  const {transactionHash} = router.query;

  if (transactionHash) {
    return (
      <PageContainer>
        <PostDetails transactionHash={transactionHash as string} />
      </PageContainer>
    );
  }

  return null;
};

export default withPublicLayout(ShowEntry);
