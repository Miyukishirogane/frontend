import { Address } from 'viem';
import { configEvmChain } from './config';

declare module 'wagmi' {
  interface Register {
    config: typeof configEvmChain;
  }
}

export type TAppChainId = (typeof configEvmChain)['chains'][number]['id'];

export type TContractAddress = {
  TCV_FACTORY: Address;
  TCV_ROUTER: Address;
  FAUCET_ADDRESS: Address;
  TCV_MARKET_ROUTER: Address;
  TCV_PRIVATE_SALE: Address;
  TCV_EARLY_SEED_SPECIAL_USER: Address;
  TCV_EARLY_SEED_TRAVA_USERS: Address;
  TCV_AIRDROP: Address;
  CONVERT_TCP_ADDRESS: Address;
  TCP_ADDRESS: Address;
  TCV_ADDRESS: Address;
  TOD_VAULT_ADDRESS: Address;
  TOD_CONVERSION_CONTRACT: Address;
  USDT_LENDING_VAULT: Address;
  USDC_LENDING_VAULT: Address;
  TCV_FACTORY_LENDING: Address;
  TCV_GOVERNANCE: Address;
  VOTING_ESCROW: Address;
  TIME_LOCK: Address;
  STRATEGY: Address;
  GOVERNOR: Address;
  MOCK_GOVERNED: Address;
};

export type TLoginSale = {
  password: string;
  url: string;
};
