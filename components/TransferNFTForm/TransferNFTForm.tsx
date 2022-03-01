import React, {ChangeEvent, useCallback, useState} from 'react';

import {useWeb3} from '@/hooks/useWeb3';
import {Button, Input, Stack} from 'degen';

type TransferNFTFormProps = {
  tokenId: number;
  onSubmitted?: () => void;
};

const TransferNFTForm = (props: TransferNFTFormProps): JSX.Element | null => {
  const {tokenId, onSubmitted} = props;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const {contract, provider, address} = useWeb3();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);

        if (address && provider && contract) {
          setSubmitting(true);

          // Connect smart contract to signer
          const signer = provider.getSigner();
          const contractSigner = contract.connect(signer);

          // Call `transferFrom` method of smart contract
          const resp = await contractSigner.transferFrom(
            address,
            recipient,
            tokenId,
          );

          // Wait for confirmation
          const rec = await resp.wait();

          if (rec) {
            if (onSubmitted) {
              onSubmitted();
            }

            alert('NFT transferred successfully');
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [address, recipient],
  );

  const handleRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.currentTarget.value);
  };

  if (!address) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack space="4">
        <Input
          label="Recipient Address"
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="Recipient Address..."
          required
          hideLabel
        />
        <Button
          type="submit"
          variant="highlight"
          width={{xs: 'full', md: 'max'}}
          disabled={submitting}
          loading={submitting}
        >
          Transfer NFT
        </Button>
      </Stack>
    </form>
  );
};

export default TransferNFTForm;
