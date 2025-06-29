import { contractAddress } from 'src/jotai/wallet/config';
import { Address } from 'viem';

export type TVaultListInfo = Record<
  Address,
  { token: string; decimal: number; addressContract: Address; addressToken: Address }
>;

export const vaultListInfo: TVaultListInfo = {
  '0xe7380f5CB4219c9465ABdC374Bd65dc991Eb3b0a': {
    token: 'USDT',
    decimal: 6,
    addressContract: contractAddress[42161].USDT_LENDING_VAULT,
    addressToken: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },
  '0x390f72dB15dd3F28b37E4f1B0556A61f8aa9B37F': {
    token: 'USDC',
    decimal: 6,
    addressContract: '0x390f72dB15dd3F28b37E4f1B0556A61f8aa9B37F',
    addressToken: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  '0xAb6dC637728f89C4b6949F3e68AB22A74dC0F9BE': {
    token: 'USDC',
    decimal: 6,
    addressContract: '0xAb6dC637728f89C4b6949F3e68AB22A74dC0F9BE',
    addressToken: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
} as const;

export const positionContractAddress = '0xAb6dC637728f89C4b6949F3e68AB22A74dC0F9BE';
