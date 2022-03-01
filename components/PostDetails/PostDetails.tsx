import React from 'react';

import {
  ErrorBlock,
  Loader,
  NFTDetails,
  PageContent,
  Timestamp,
} from '@/components';
import {useGetTransaction} from '@/hooks/useArweave';
import {parseErrors} from '@/utils/errors';
import {Box, Heading, Spinner, Stack, Tag, Text} from 'degen';
import Link from 'next/link';
import routes from '@/routes';
import {addEllipsis} from '@/utils/string';
import {TransactionStatusE} from '@/types';

type ViewPostProps = {
  transactionHash: string;
};

const PostDetails = (props: ViewPostProps): JSX.Element | null => {
  const {transactionHash} = props;

  const {transaction, loading, error, refetch} =
    useGetTransaction(transactionHash);

  console.log(transaction, 'transaction ----');

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

  if (transaction) {
    return (
      <PageContent>
        <Box marginBottom="8">
          <NFTDetails transaction={transaction} />
        </Box>
        <Stack>
          <Heading>{transaction.data.title}</Heading>
          <Stack direction="horizontal">
            {transaction.tags && (
              <Tag>
                <Link href={routes.profile(transaction.tags.Address)}>
                  {addEllipsis(transaction.tags.Address)}
                </Link>
              </Tag>
            )}
            {transaction.timestamp && (
              <Tag>
                <Timestamp timestamp={transaction.timestamp as number} />
              </Tag>
            )}
            {transaction.status === TransactionStatusE.NOT_CONFIRMED && (
              <Box
                padding="3"
                display="flex"
                alignItems="center"
                gap="2"
                backgroundColor="backgroundTertiary"
                borderRadius="extraLarge"
              >
                <Spinner /> Confirming...
              </Box>
            )}
          </Stack>
          <Box paddingY="12">
            <Text>{transaction.data.body}</Text>
          </Box>
          <a
            href={`${process.env.NEXT_PUBLIC_ARWEAVE_BLOCK_EXPLORER_URL}tx/${transaction.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {`Arweave tx id: ${transaction.id}`}
          </a>
        </Stack>
      </PageContent>
    );
  }

  return null;
};

export default PostDetails;
