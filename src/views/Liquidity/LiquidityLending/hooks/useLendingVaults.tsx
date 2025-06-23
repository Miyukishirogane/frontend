import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { Address } from 'viem';
import { positionContractAddress, vaultListInfo } from '../constants';
import { TAccordionVaultLendingState } from '../jotai/type';

const useLendingVaults = () => {
  const { chainIdSelected } = useSwitchToSelectedChain();

  const lendingVaultsQuery = useQuery<TAccordionVaultLendingState[]>({
    queryKey: ['useLendingVaults', chainIdSelected],
    queryFn: async () => {
      const listVaultAddress = [positionContractAddress] as Address[];
      const listVaultInfo: TAccordionVaultLendingState[] = [];

      listVaultAddress.forEach(vault => {
        if (vaultListInfo[vault]) {
          const vaultInfo = vaultListInfo[vault];

          listVaultInfo.push({
            tokenInfo: {
              address: vaultInfo.addressToken,
              decimal: vaultInfo.decimal,
              symbol: vaultInfo.token,
            },
            apy: 0,
            apr: '',
            avgApr: 0,
            tcvApr: 0,
            tvlPool: '',
            addressVault: vaultInfo.addressContract,
            isFetchingPoolData: false,
          });
        }
      });

      return listVaultInfo;
    },
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
  });

  return { lendingVaults: lendingVaultsQuery.data, ...lendingVaultsQuery };
};

export default useLendingVaults;
