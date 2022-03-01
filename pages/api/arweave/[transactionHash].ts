import type {NextApiRequest, NextApiResponse} from 'next';

import {GetTransactionRespT, PostTagsT, TransactionStatusE} from '@/types';
import {MIN_NUMBER_OF_CONFIRMATIONS} from '@/constants';

import {initialize} from 'lib/arweave';

const arweave = initialize();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<GetTransactionRespT | string>,
): Promise<any> {
  try {
    const {transactionHash} = req.query;
    console.log(transactionHash, 'transactionHash');
    
    // Get Arweave transaction data. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
    const txDataResp = (await arweave.transactions.getData(
      transactionHash as string,
      {
        decode: true,
        string: true,
      },
    )) as string;
    console.log(txDataResp, 'txDataResp');
    // const testGet = await arweave.transactions.get(transactionHash as string);
    // console.log(testGet, 'testGet');

    const txData = JSON.parse(txDataResp);
    // Get Arweave transaction status. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
    const txStatusResp = await arweave.transactions.getStatus(
      transactionHash as string,
    );
    console.log(txStatusResp, 'txStatusResp');
    const txStatus =
      txStatusResp.status === 200 &&
      txStatusResp.confirmed &&
      txStatusResp.confirmed.number_of_confirmations >=
        MIN_NUMBER_OF_CONFIRMATIONS
        ? TransactionStatusE.CONFIRMED
        : TransactionStatusE.NOT_CONFIRMED;
    console.log(txStatus, 'txStatus');
    if (txStatus === TransactionStatusE.CONFIRMED) {
      // Get Arweave transaction. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
      const tx = await arweave.transactions.get(transactionHash as string);
      // Get Arweave transaction tags. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
      const tags = {} as PostTagsT;
      (tx.get('tags') as any).forEach((tag) => {
        const key = tag.get('name', {decode: true, string: true});
        tags[key] = tag.get('value', {decode: true, string: true});
      });
      // Get Arweave transaction block in order to retrieve timestamp. Documentation can be found here: https://github.com/ArweaveTeam/arweave-js
      const block = txStatusResp.confirmed
        ? await arweave.blocks.get(txStatusResp.confirmed.block_indep_hash)
        : null;
      // Return JSON response in form:
      res.status(200).json({
        id: transactionHash as string,
        data: txData,
        status: txStatus,
        timestamp: block?.timestamp,
        tags,
      });
    } else {
      res.status(200).json({
        id: transactionHash as string,
        data: txData,
        status: txStatus,
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
