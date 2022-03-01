const routes = {
  home: '/',
  entries: {
    create: '/entries/create',
    view: (transactionHash: string): string => `/entries/view/${transactionHash}`,
  },
  profile: (address: string): string => `/profile/${address}`,
  api: {
    arweave: {
      post: '/api/arweave/entry',
      get: (transactionHash: string): string => `/api/arweave/${transactionHash}`,
      search: (address = ''): string => `/api/arweave/search/${address}`,
    },
  },
};

export default routes;
