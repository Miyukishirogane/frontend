import { useQuery } from '@tanstack/react-query';
import { configEvmChain } from 'src/jotai/wallet/config';
import { Address } from 'viem';
import { getBalance } from 'wagmi/actions';
import useAccount from '../useAccount';
import { BN } from 'src/utils';

interface IProps {
  addressToken: Address;
  decimal: number;
  isNative?: boolean;
  otherKey?: string[];
  customAddress?: Address;
}

const useGetTokenBalance = ({ addressToken, decimal, isNative = false, otherKey = [], customAddress }: IProps) => {
  const { address } = useAccount();

  const vaultInfoQuery = useQuery({
    queryKey: ['useGetBalance', addressToken, address, customAddress, ...otherKey],
    queryFn: async () => {
      if (address) {
        try {
          const balanceUser = await getBalance(configEvmChain, {
            address: customAddress || address,
            token: isNative ? undefined : addressToken,
          });

          return BN(balanceUser.value).div(BN(10).pow(decimal)).toString();
        } catch (error) {
          console.log('error', error);
          return '0';
        }
      }
      return '0';
    },
    staleTime: 5 * 60 * 1000,
  });

  return { ...vaultInfoQuery, tokenBalance: vaultInfoQuery.data };
};

export default useGetTokenBalance;
