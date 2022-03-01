import Arweave from 'arweave';

export const initialize = (): Arweave => {
  return Arweave.init({
    host: process.env.ARWEAVE_HOST || 'localhost',
    port: !process.env.ARWEAVE_PORT
      ? 1984
      : parseInt(process.env.ARWEAVE_PORT, 10),
    protocol: process.env.ARWEAVE_PROTOCOL || 'http',
  });
};
