import {useContext} from 'react';
import {Web3Context, Web3ContextT} from '@/context/web3Context';

export const useWeb3 = (): Web3ContextT => useContext(Web3Context);
