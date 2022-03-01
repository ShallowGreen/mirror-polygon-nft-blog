import useSWR from 'swr';
import {AxiosError} from 'axios';
import {PublicConfiguration} from 'swr/dist/types';

import routes from '@/routes';
import {basicFetcher} from '@/fetchers';
import {GetTransactionRespT} from '@/types';

const defaultSwrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
} as PublicConfiguration;

export const useGetTransactionIndex = (
  address = '',
  swrOptions = defaultSwrOptions,
): {
  data: any | undefined;
  loading: boolean;
  error: AxiosError | undefined;
  refetch: () => void;
} => {
  const {data, error, mutate, isValidating} = useSWR<any, AxiosError>(
    routes.api.arweave.search(address),
    basicFetcher,
    swrOptions,
  );

  return {
    data,
    loading: (!error && !data) || isValidating,
    error: error,
    refetch: mutate,
  };
};

export const useGetTransaction = (
  transactionHash: string,
  swrOptions = defaultSwrOptions,
): {
  transaction: GetTransactionRespT | undefined;
  loading: boolean;
  error: AxiosError | undefined;
  refetch: () => void;
} => {
  const {data, error, mutate, isValidating} = useSWR<
    GetTransactionRespT,
    AxiosError
  >(routes.api.arweave.get(transactionHash), basicFetcher, swrOptions);

  return {
    transaction: data,
    loading: (!error && !data) || isValidating,
    error: error,
    refetch: mutate,
  };
};
