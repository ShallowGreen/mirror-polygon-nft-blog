import React from 'react';
import {useRouter} from 'next/router';
import {Field} from 'degen';

import {withPublicLayout} from '@/layouts';
import {PageContent, PageHeading, PostsList} from '@/components';
import {addEllipsis} from '@/utils/string';

const Profile = (): JSX.Element | null => {
  const router = useRouter();
  const {address} = router.query;

  if (!address) {
    return null;
  }

  return (
    <>
      <PageHeading title={`Profile of ${addEllipsis(address as string)}`} />
      <PageContent background="backgroundTertiary">
        <Field label="User's entries:">
          <PostsList address={address as string} />
        </Field>
      </PageContent>
    </>
  );
};

export default withPublicLayout(Profile);
