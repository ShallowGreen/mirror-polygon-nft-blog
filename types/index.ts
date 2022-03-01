export type PostT = {
  title: string;
  body: string;
};

export type DataT = {
  transactionId: string;
  buffer: PostT;
};

export type GetTransactionRespT = {
  id: string;
  data: PostT;
  status: TransactionStatusE;
  timestamp?: number;
  tags?: PostTagsT;
};

export enum TransactionStatusE {
  NOT_CONFIRMED,
  CONFIRMED,
}

export type PostTagsT = {
  'App-Name': string;
  'Content-Type': string;
  Address: string;
};
