import React, {ReactElement, useCallback, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

import {useWeb3} from '@/hooks/useWeb3';
import routes from '@/routes';
import {Button, Input, Stack, Textarea} from 'degen';

const createJsonMetaData = (data: any) => {
  return JSON.stringify(data);
};

export type CreateEntryFormValues = {
  title: string;
  body: string;
};

const CreateEntryForm = (): ReactElement => {
  const router = useRouter();
  const {mutate} = useSWRConfig();
  const {address, contract, provider} = useWeb3();
  const [values, setValues] = useState<CreateEntryFormValues>({
    title: '',
    body: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleTitleChange = (event) => {
    setValues((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      };
    });
  };

  const handleBodyChange = (event) => {
    setValues((prevState) => {
      return {
        ...prevState,
        body: event.target.value,
      };
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);

        if (!address) {
          throw new Error(
            'You need to be connected to MetaMask to create a post!',
          );
        }

        if (provider && contract) {
          const data = createJsonMetaData(values);
          const response = await axios.post(routes.api.arweave.post, {
            data,
            address,
          });
          const transactionId = response.data;
          console.log('transactionId: ', transactionId);
          // For Step 3: Create Post
          // Submit Arweave transaction
          // Use axios to post data and address to api/arweave/post endpoint.
          // This request should return transactionId

          // Stop here when you complete Step 3 ^^^^

          // For Step 6: Mint NFT
          // Get signer and connect it to smart contract
          // More information can be found here: https://docs.ethers.io/v5/getting-started/#getting-started--writing
          const signer = provider.getSigner();
          const contractWithSigner = contract.connect(signer);

          const resp = await contractWithSigner.createToken(transactionId);
          const rec = await resp.wait();
          if (rec) {
            mutate(routes.api.arweave.search());
            alert('Entry created successfully');
          }
        }

        router.push(routes.home);
      } catch (error) {
        console.log('Error: ', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong.';
        alert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
    [values],
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <Stack space="4">
          <Input
            label="Title"
            hideLabel={true}
            placeholder="Give it a title..."
            value={values.title}
            onChange={handleTitleChange}
            autoFocus
            required
          />

          <Textarea
            label="Body"
            hideLabel={true}
            placeholder="What's on your mind..."
            value={values.body}
            onChange={handleBodyChange}
            required
          />

          <Button
            variant="highlight"
            width={{xs: 'full', md: 'max'}}
            type="submit"
            data-testid="submit-btn"
            loading={submitting}
            disabled={submitting}
          >
            Publish
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreateEntryForm;
