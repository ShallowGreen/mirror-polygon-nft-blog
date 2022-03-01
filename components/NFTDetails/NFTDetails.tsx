import React, {useEffect, useMemo, useState} from 'react';

import {GetTransactionRespT, TransactionStatusE} from '@/types';
import {useWeb3} from '@/hooks/useWeb3';
import TransferNFTForm from '@/components/TransferNFTForm/TransferNFTForm';
import {Box, Card, Field, Heading, IconNFT, Text} from 'degen';
import {ErrorBlock, Loader} from '..';

type NFTDetailsProps = {
  transaction: GetTransactionRespT;
};

const NFTDetails = (props: NFTDetailsProps): JSX.Element | null => {
  const {transaction} = props;
  const {contract, address} = useWeb3();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<number>();
  const [nftOwner, setNftOwner] = useState<string | null>(null);

  const getInitialData = async () => {
    try {
      if (contract) {
        setError(null);
        setLoading(true);

        const tokenId = await contract.tokenURIToTokenId(transaction.id);
        const owner = await contract.ownerOf(tokenId);

        setTokenId(tokenId.toNumber());
        setNftOwner(owner);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const isOwner = useMemo(() => address === nftOwner, [address, nftOwner]);

  if (error) {
    return <ErrorBlock title="Fetching failed" message={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (transaction.status === TransactionStatusE.CONFIRMED) {
    return (
      <>
        {tokenId ? (
          <Card>
            <Box paddingTop="4" paddingX="4">
              <Field label={<IconNFT />}>
                <Box padding="4">
                  <Text>Token Id: {tokenId}</Text>
                  <Text>Owner: {nftOwner}</Text>
                  {isOwner && (
                    <Box
                      marginTop="5"
                      padding="5"
                      backgroundColor="backgroundTertiary"
                      borderRadius="extraLarge"
                    >
                      <Field label="Transfer NFT">
                        <TransferNFTForm
                          tokenId={tokenId}
                          onSubmitted={getInitialData}
                        />
                      </Field>
                    </Box>
                  )}
                </Box>
              </Field>
            </Box>
          </Card>
        ) : (
          <ErrorBlock
            icon={<IconNFT color="red" />}
            title="Not found"
            message="Token hasn't been minted yet"
          />
        )}
      </>
    );
  }

  return null;
};

export default NFTDetails;
