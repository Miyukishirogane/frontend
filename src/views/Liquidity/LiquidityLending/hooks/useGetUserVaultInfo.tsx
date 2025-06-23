import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { abiVaultLending } from 'src/jotai/wallet/abi/VaultLending';
import { configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { readContracts } from 'wagmi/actions';
import { positionContractAddress, vaultListInfo } from '../constants';
import { lendingPositionAbi } from 'src/jotai/wallet/abi/LendingPositionAbi';

interface IProps {
  vaultAddress: Address;
}

const useGetUserVaultInfo = ({ vaultAddress }: IProps) => {
  const { address } = useAccount();

  const vaultInfoQuery = useQuery({
    queryKey: ['useGetUserVaultInfo', vaultAddress, address],
    queryFn: async () => {
      if (address) {
        const [userDepositedBalance] = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: lendingPositionAbi,
              address: positionContractAddress,
              functionName: 'balanceTokenOf',
              args: [address, '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'],
            },
          ],
        });
        const decimal = vaultListInfo[vaultAddress].decimal;

        return {
          userDepositedBalance: BN(userDepositedBalance.result || 0)
            .div(BN(10).pow(decimal))
            .toString(),
        };
      }

      return {
        userDepositedBalance: 0,
      };
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return vaultInfoQuery;
};

export default useGetUserVaultInfo;