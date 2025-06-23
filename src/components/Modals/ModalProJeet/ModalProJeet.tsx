import { Box, Button, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import InputCustom from 'src/components/InputCustom/InputCustom';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import useGetTokenBalance from 'src/hooks/Liquidlity/useGetTokenBalance';
import useQueryPrice from 'src/hooks/Liquidlity/useQueryPrice';
import useGetUserPortfolioBalance from 'src/hooks/Projeet/useGetUserPortfolioBalance';
import useAccount from 'src/hooks/useAccount';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import IconLiquid from 'src/views/Liquidity/common/IconLiquid';
import useSupplyPortfolio from 'src/views/YieldFlexDashboard/state/hooks/useSupplyPortfolio';
import useWithdrawPortfolio from 'src/views/YieldFlexDashboard/state/hooks/useWithdrawPortfolio';
import { projeetTradeTokens } from 'src/views/YieldFlex/mapNameToken';
import { zeroAddress } from 'viem';
import { useChainId } from 'wagmi';

type TItem = {
  title: string;
  value: string | number | ReactNode;
};

type TStateModal = 'deposit' | 'withdraw';

type TDataModal = Record<
  TStateModal,
  {
    title: string;
    listItems: TItem[];
    handleClickMax: () => void;
  }
>;

interface IProps {
  type: TStateModal;
  tokenName: TAppDenom;
  isHideTab?: boolean;
}

export default function ModalProJeet({ type, tokenName, isHideTab = false }: IProps) {
  const chainId = useChainId();
  const { address } = useAccount();
  const { closeModal } = useModalFunction();
  const [stateModal, setStateModal] = useState<TStateModal>(type);
  const [amount, setAmount] = useState<string>('');
  const { mutateAsync: handleDeposit, isPending: isPendingDeposit } = useSupplyPortfolio({ tokenName: tokenName });
  const { mutateAsync: handleWithdraw, isPending: isPendingWithdraw } = useWithdrawPortfolio({ tokenName: tokenName });
  const { userBalances } = useGetUserPortfolioBalance();
  const tokenInfo = projeetTradeTokens[chainId][tokenName] || projeetTradeTokens[42161]['ETH'];
  const { data: price, isLoading: isLoadingGetPrice } = useQueryPrice({
    chainId: chainId,
    address: tokenName === 'ETH' ? zeroAddress : tokenInfo.address,
  });

  const { tokenBalance } = useGetTokenBalance({
    addressToken: tokenInfo.address,
    decimal: tokenInfo.decimal,
    isNative: tokenName == 'ETH',
  });

  const currTokenBalanceInfo = useMemo(() => {
    return userBalances?.find(item => item.token === tokenName);
  }, [tokenName, userBalances]);

  const dataModal: TDataModal = useMemo(() => {
    return {
      deposit: {
        title: 'Deposit',
        handleClickMax: () => {
          setAmount(tokenBalance || '0');
        },
        listItems: [
          {
            title: 'Your Deposited Amount',
            value: formatNumber(BN(currTokenBalanceInfo?.balance), { fractionDigits: 6 }),
          },
          {
            title: 'Your Balance',
            value: formatNumber(BN(tokenBalance), { fractionDigits: 6 }),
          },
        ],
      },
      withdraw: {
        title: 'Withdraw',
        handleClickMax: () => {
          setAmount(currTokenBalanceInfo?.balanceFree.toString() || '0');
        },
        listItems: [
          {
            title: 'Available Balance',
            value: formatNumber(BN(currTokenBalanceInfo?.balanceFree), { fractionDigits: 6 }),
          },
        ],
      },
    };
  }, [currTokenBalanceInfo?.balance, currTokenBalanceInfo?.balanceFree, tokenBalance]);

  const handleTransaction = async () => {
    if (type === 'deposit') {
      await handleDeposit({
        amount: amount,
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      await handleWithdraw({
        amount: amount,
        onSuccess: () => {
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    setAmount('');
  }, [stateModal]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {(isPendingDeposit || isPendingWithdraw) && (
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
      {!isHideTab && (
        <Tabs value={stateModal} onChange={(_e, value) => setStateModal(value)} sx={{ width: '100%' }}>
          <Tab label="Deposit" value="deposit" sx={{ flexGrow: 1, fontSize: '18px' }} />
          <Tab label="Withdraw" value="withdraw" sx={{ flexGrow: 1, fontSize: '18px' }} />
        </Tabs>
      )}
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
            {stateModal === 'deposit'
              ? 'Fill your deposit amount below to see how to earn interest and grow your assets with us.'
              : 'Please enter the amount you would like to withdraw. The maximum amount you can withdraw is shown below'}
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
                  {item.value + ' ' + tokenName}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <InputCustom
          value={amount}
          onChange={val => setAmount(val)}
          endElement={<IconLiquid token={tokenName} />}
          subValue={
            isLoadingGetPrice ? (
              <Skeleton sx={{ width: '50px' }} />
            ) : (
              '$' + formatNumber(BN(price).times(amount), { fractionDigits: 6 })
            )
          }
          onClickMax={dataModal[stateModal].handleClickMax}
        />
      </Box>

      <Button variant="gradient" fullWidth disabled={!address} onClick={() => handleTransaction()}>
        {dataModal[stateModal].title}
      </Button>
    </Box>
  );
}
