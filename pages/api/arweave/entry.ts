import type {NextApiRequest, NextApiResponse} from 'next';

import {initialize} from 'lib/arweave';

const arweave = initialize();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
): Promise<any> {
  try {
    const {data, address} = req.body;

    // Initialize wallet using ARWEAVE_WALLET environmental variable (Tip: Use JSON.parse)
    const wallet = JSON.parse(process.env.ARWEAVE_WALLET as string);

    // Create Arweave transaction passing in data. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js

    const transaction = await arweave.createTransaction({data: data}, wallet);
    // Add tags:
    // - App-Name - APP_NAME environmental variable
    // - Content-Type - Should be application/json
    // - Address - Address of a user
    // Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
    transaction.addTag('App-Name', process.env.APP_NAME as string);
    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('Address', address);

    // Sign Arweave transaction with your wallet. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
    await arweave.transactions.sign(transaction, wallet);

    // Post Arweave transaction. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
    await arweave.transactions.post(transaction);

    // Return transaction id
    res.status(200).json(transaction.id);
  } catch (error) {
    console.log('ERROR', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
