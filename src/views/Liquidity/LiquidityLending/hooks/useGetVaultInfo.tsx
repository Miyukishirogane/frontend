import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { lendingPositionAbi } from 'src/jotai/wallet/abi/LendingPositionAbi';
import { configEvmChain } from 'src/jotai/wallet/config';
import { TLendingApyInfo } from 'src/services/api/liquidity';
import { BN } from 'src/utils';
import { Address } from 'viem';
import { readContracts } from 'wagmi/actions';
import { positionContractAddress, vaultListInfo } from '../constants';

interface IProps {
  vaultAddress: Address;
}

const useGetVaultInfo = ({ vaultAddress }: IProps) => {
  const { address } = useAccount();
  const vaultInfoQuery = useQuery({
    queryKey: ['useGetVaultInfo', vaultAddress, address],
    queryFn: async () => {
      let apy: TLendingApyInfo | undefined;
      if (address) {
        const [depositedResp] = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: lendingPositionAbi,
              address: positionContractAddress,
              functionName: 'getBalance',
              args: ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'],
            },
          ],
        });

        const deposited = depositedResp.result || 0;
        const depositorBalance = 0;
        const decimal = vaultListInfo[vaultAddress].decimal;

        return {
          deposited: BN(deposited).div(BN(10).pow(decimal)).toString(),
          depositorBalance: BN(depositorBalance).div(BN(10).pow(decimal)).toString(),
          apy: apy?.supplyAPY || 0,
        };
      }

      return {
        deposited: '0',
        depositorBalance: '0',
        apy: apy?.supplyAPY || 0,
      };
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 15 * 1000,
  });

  return vaultInfoQuery;
};

export default useGetVaultInfo;