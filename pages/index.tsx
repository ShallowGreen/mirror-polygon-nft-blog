import React from 'react';
import Link from 'next/link';
import {Button, Field, IconPlusSmall, Stack} from 'degen';

import routes from '@/routes';
import {withPublicLayout} from '@/layouts';
import {PageContent, PageHeading, PostsList} from '@/components';

const Home = () => {
  return (
    <>
      <PageHeading title="Dashboard" />
      <PageContent background="backgroundTertiary">
        <Stack space="9">
          <Link href={routes.entries.create} passHref>
            <Button
              center
              variant="highlight"
              width="full"
              prefix={<IconPlusSmall />}
            >
              Create Entry
            </Button>
          </Link>
          <Field label="Recent posts">
            <PostsList />
          </Field>
        </Stack>
      </PageContent>
    </>
  );
};

export default withPublicLayout(Home);
