import { useQuery } from '@tanstack/react-query';
import { getListVaultByChainId } from 'src/services/api/liquidity';
import { FeeUtil } from 'tcv-platform-sdk';
import { useChainId } from 'wagmi';

const useListVaultByChainId = () => {
  const chainIdSelected = useChainId();
  const listVaultQuery = useQuery({
    queryKey: ['useListVaultByChainId', chainIdSelected],
    queryFn: async () => {
      const getFeeTier = new FeeUtil(chainIdSelected);
      const response = await getListVaultByChainId(chainIdSelected);
      const feeTierArr = await Promise.allSettled(
        response.map(async vault => {
          const resp = (await getFeeTier.getFeeTier(vault.addressVault)) as number;

          return { ...vault, ranges: resp };
        }),
      );

      const result = feeTierArr.filter(item => item.status === 'fulfilled').map(item => item.value);
      return result;
    },
    // enabled: !!chainIdSelected,
  });

  return { ...listVaultQuery };
};

export default useListVaultByChainId;
