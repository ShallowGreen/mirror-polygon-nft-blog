import React, {ReactElement} from 'react';

import routes from '@/routes';
import {DataT} from '@/types';
import {Stack} from 'degen';
import PostListItem from '../PostListItem/PostListItem';
import {useGetTransactionIndex} from '@/hooks/useArweave';
import {parseErrors} from '@/utils/errors';
import {EmptyBlock, ErrorBlock, Loader} from '..';

const DisplayPosts = ({data}: {data: DataT[]}) => {
  return (
    <Stack>
      {data.map(({transactionId, buffer}) => {
        return (
          <PostListItem
            key={transactionId}
            href={routes.entries.view(transactionId)}
            title={buffer?.title}
          />
        );
      })}
    </Stack>
  );
};

type PostListProps = {
  address?: string;
};

const PostsList = (props: PostListProps): ReactElement => {
  const {address = ''} = props;

  const {data, loading, error, refetch} = useGetTransactionIndex(address);

  if (error) {
    return (
      <ErrorBlock
        title="Fetching failed"
        message={parseErrors(error)}
        retry={refetch}
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!data.length) {
    return (
      <EmptyBlock
        title="Nothing here"
        message="No entries found at the moment..."
      />
    );
  }

  return <DisplayPosts data={data} />;
};

export default PostsList;
