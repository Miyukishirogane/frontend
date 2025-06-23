import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { Err_NotConnectWallet, ZERO_ADDRESS } from 'src/constants';
import { abiVaultStaking } from 'src/jotai/wallet/abi/VaultStaking';
import { configEvmChain } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import useAccount from 'src/hooks/useAccount';
import { readContracts, writeContract } from 'wagmi/actions';
import BigNumber from 'bignumber.js';
import { Box, Skeleton } from '@mui/material';
import { formatNumber } from 'src/utils/format';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';

export default function ButtonClaimReward({
  vault,
  dataLoading,
}: {
  vault: TAccordionVaultState;
  dataLoading: boolean;
}) {
  const { addressVault, vaultStaking } = vault;
  const { getUserDepositReward } = useLiquidityFunction();
  const { address } = useAccount();
  const { switchToChainSelected } = useSwitchToSelectedChain();

  const [rewardValue, setRewardValue] = useState<BigNumber>(BN(0));
  const [loading, setLoading] = useState<boolean>(false);

  const IconToken = mapTokenToIcon['TCP' as TAppDenom];

  const handleGetReward = useCallback(async () => {
    if (!address) throw Err_NotConnectWallet;

    const reward = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abiVaultStaking,
          address: vaultStaking,
          functionName: 'getTotalVaultRewards',
          args: [address],
        },
      ],
    });
    if (reward[0]) {
      setRewardValue(BN(reward[0].result).dividedBy(1e18));
      return;
    }

    setRewardValue(BN(0));
  }, [address, vaultStaking]);

  async function claim() {
    setLoading(true);
    const idNotify = toast.loading('Execute Claim Reward...');
    try {
      if (!address) throw Err_NotConnectWallet;
      if (vaultStaking == ZERO_ADDRESS) throw 'No staking vault address!';
      await switchToChainSelected();
      const response = await writeContract(configEvmChain, {
        abi: abiVaultStaking,
        address: vaultStaking,
        functionName: 'claim_rewards',
        args: [address],
      });
      // const isSuccess = await waitForTransactionReceipt(configEvmChain, { hash: response });

      getUserDepositReward([{ stakerAddress: address, tcvVault: addressVault, vaultStaking: vaultStaking }]);
      toast.update(idNotify, {
        render: <RenderNofifySuccess hash={response} />,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.update(idNotify, {
        render: <ErrorExeTransaction error={err} />,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!address) return;

    handleGetReward();
    const interval = setInterval(() => {
      handleGetReward();
    }, 60000);

    return () => clearInterval(interval);
  }, [handleGetReward, address]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '24px', width: '100%', alignItems: 'center' }}>
        <IconToken sx={{ fontSize: '24px' }} />

        {dataLoading ? (
          <Skeleton variant="rounded" width={'60px'} sx={{ ml: 1 }} />
        ) : (
          <span style={{ marginLeft: '16px', fontWeight: '700' }}>
            {formatNumber(rewardValue, { fractionDigits: 6 })}
          </span>
        )}

        <LoadingButton
          props={{
            variant: 'outlined',
            size: 'small',
            disabled: dataLoading || BN(rewardValue).isLessThanOrEqualTo(0.00001),
            sx: { minWidth: '160px', ml: 'auto' },
          }}
          loading={loading}
          onClick={claim}
        >
          {/* <Box sx={{ background: 'linear-gradient(90deg, #2465DE 0%, #39BAFD 100%)', backgroundClip: 'text', color: 'transparent', fontSize: '16px', fontWeight: 500 }}>Claim</Box> */}
          Claim
        </LoadingButton>
      </Box>
    </>
  );
}
