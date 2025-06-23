import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import BoxLoading from 'src/components/BoxLoading/BoxLoading';
import InputCustom from 'src/components/InputCustom/InputCustom';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useQueryPrice from 'src/hooks/Liquidlity/useQueryPrice';
import useAccount from 'src/hooks/useAccount';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import useGetMaxBorrow from 'src/views/Liquidity/LiquidityLending/hooks/useGetMaxBorrow';
import useGetUserVaultInfo from 'src/views/Liquidity/LiquidityLending/hooks/useGetUserVaultInfo';
import useLiquidityLendingFunction, { useLiquidityLendingData } from 'src/views/Liquidity/LiquidityLending/jotai/state';
import { TAccordionVaultLendingState } from 'src/views/Liquidity/LiquidityLending/jotai/type';
import IconLiquid from 'src/views/Liquidity/common/IconLiquid';
import { useChainId } from 'wagmi';

type TItem = {
  title: string;
  value: string | number | ReactNode;
};

type TStateModal = 'supply' | 'withdraw' | 'borrow';

type TDataModal = Record<
  TStateModal,
  {
    title: string;
    listItems: TItem[];
  }
>;

export default function ModalLiquidityLending({
  vault,
  loading,
  type,
}: {
  vault: TAccordionVaultLendingState;
  loading: boolean;
  type: TStateModal;
}) {
  const chainId = useChainId();
  const { address } = useAccount();
  const { withdraw, deposit, borrow } = useLiquidityLendingFunction();
  const { tokenBalance } = useGetTokenBalance({
    addressToken: vault.tokenInfo.address,
    decimal: vault.tokenInfo.decimal,
  });
  const { closeModal } = useModalFunction();
  const { isTransacting } = useLiquidityLendingData();
  const { data: userVaultInfo } = useGetUserVaultInfo({ vaultAddress: vault.addressVault });
  const { data: price, isLoading: loadingGetPrice } = useQueryPrice({
    chainId: chainId,
    address: vault.tokenInfo.address,
  });
  const [stateModal, setStateModal] = useState<TStateModal>(type);
  const [amount, setAmount] = useState<string>('');
  const { symbol, decimal } = vault.tokenInfo;
  const { data: maxBorrow } = useGetMaxBorrow(decimal);

  const dataModal: TDataModal = useMemo(() => {
    return {
      supply: {
        title: 'Supply',
        listItems: [
          {
            title: 'Your Deposited Amount',
            value: formatNumber(userVaultInfo?.userDepositedBalance, { fractionDigits: 6 }),
          },
          {
            title: 'Your Balance',
            value: formatNumber(tokenBalance, { fractionDigits: 6 }),
          },
        ],
      },
      withdraw: {
        title: 'Withdraw',
        listItems: [
          {
            title: 'Balance in Vault',
            value: formatNumber(userVaultInfo?.userDepositedBalance, { fractionDigits: 6 }),
          },
        ],
      },
      borrow: {
        title: 'Borrow',
        listItems: [
          {
            title: 'Max Borrow',
            value: formatNumber(maxBorrow || 0, { fractionDigits: 6 }),
          },
        ],
      },
    };
  }, [tokenBalance, userVaultInfo?.userDepositedBalance, maxBorrow]);

  useEffect(() => {
    setAmount('');
  }, [stateModal]);

  const handleTransaction = async () => {
    try {
      if (stateModal === 'supply') {
        await deposit(vault.addressVault, vault.tokenInfo.address, decimal, amount);
      }
      if (stateModal === 'withdraw') {
        await withdraw(vault.addressVault, decimal, amount);
      }
      if (stateModal === 'borrow') {
        await borrow(vault.addressVault, vault.tokenInfo.address, decimal, amount);
      }
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {isTransacting && (
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            placeItems: 'center',
            backdropFilter: 'blur(3px)',
            background: '#03a9f40a',
          }}
        >
          <IconSpinLoading sx={{ fontSize: '110px' }} />
        </Box>
      )}
      <Tabs value={stateModal} onChange={(_e, value) => setStateModal(value)} sx={{ width: '100%' }}>
        <Tab label="Supply" value="supply" sx={{ flexGrow: 1, fontSize: '18px' }} />
        <Tab label="Withdraw" value="withdraw" sx={{ flexGrow: 1, fontSize: '18px' }} />
        <Tab label="Borrow" value="borrow" sx={{ flexGrow: 1, fontSize: '18px' }} />
      </Tabs>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          gap: '28px',
          minHeight: '280px',
          flex: 1,
        }}
      >
        <Box
          sx={{
            padding: '16px',
            backgroundColor: '#EFF2F8',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
            {stateModal === 'supply'
              ? 'Fill your deposit amount below to see how to earn interest and grow your assets with us.'
              : stateModal === 'withdraw'
              ? 'Please enter the amount you would like to withdraw. The maximum amount you can withdraw is shown below'
              : 'Please enter the amount you would like to borrow. The maximum amount you can borrow is shown below'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
          {dataModal[stateModal]?.listItems.map(item => {
            return (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={item.title}>
                <Typography sx={{ fontSize: '14px' }}>{item.title}</Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '700',
                  }}
                >
                  {item.value + ' ' + symbol}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <BoxLoading loading={loading} sx={{ '& .MuiBox-root': { margin: '0px' } }}>
          <InputCustom
            value={amount}
            onChange={val => setAmount(val)}
            endElement={<IconLiquid token={symbol} />}
            subValue={'$' + formatNumber(BN(price).times(amount))}
            loading={loadingGetPrice}
            onClickMax={() => {
              if (stateModal === 'supply') {
                setAmount(tokenBalance as string);
              }
              if (stateModal === 'withdraw') {
                setAmount(userVaultInfo?.userDepositedBalance as string);
              }
              if (stateModal === 'borrow') {
                setAmount(maxBorrow as string);
              }
            }}
          />
        </BoxLoading>
      </Box>

      <Button variant="gradient" fullWidth disabled={!address} onClick={() => handleTransaction()}>
        {dataModal[stateModal].title}
      </Button>
    </Box>
  );
}
