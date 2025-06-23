import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Step,
} from '@mui/material';
import InputCustom from 'src/components/InputCustom/InputCustom';
import IconAndName from 'src/components/IconAndName/IconAndName';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { useDebounce } from 'use-debounce';
import { useAccount } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { toast } from 'react-toastify';
import { Err_NotConnectWallet } from 'src/constants';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { contractAddress } from 'src/jotai/wallet/config';
import { configEvmChain } from 'src/jotai/wallet/config';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import { BN } from 'src/utils';
import { Address } from 'viem';
import { abiIYieldToken } from 'src/jotai/wallet/abi/IYieldToken';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { tokenList } from 'src/constants/tokenMap';
import { formatNumber } from 'src/utils/format';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { usePendleFunction } from 'src/jotai/pendle/pendle';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';

export default function Redeem() {
  // data
  const steps = ['PT - aUSDC', 'YT - USSDT', 'USDT'];

  // css step
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        // borderColor: '#15B097',
        border: '1px ridge #15B097',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#fff',
        border: '1px ridge #15B097',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#787E7E',
      borderTopWidth: 1,
      border: '1px dashed #787E7E',
    },
  }));

  // state jotai
  const { address } = useAccount();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { DetailPendetail, tokenSelect, loadPrivew, MintData } = usePendleData();
  const { PreviewMarketDetailToken, getNativeTokenBalanceSelect, ResetDetailPendle, getUserBalanceMarket } =
    usePendleFunction();

  // select key
  const findKeyByAddress = (address: Address) => {
    for (const key in tokenList[chainIdSelected]) {
      if (tokenList[chainIdSelected][key]?.address === address) {
        return key;
      }
    }
    return Object.keys(tokenList[chainIdSelected])[0];
  };

  // param name token
  const tokenName = tokenSelect ? findKeyByAddress(tokenSelect) : Object.keys(tokenList[chainIdSelected])[0];
  const tokenIn = tokenSelect
    ? tokenSelect
    : tokenList[chainIdSelected][Object.keys(tokenList[chainIdSelected])[0]].address;
  const currPoolToken = DetailPendetail?.name
    ? marketTokensPendle[chainIdSelected][DetailPendetail.name]
    : marketTokensPendle[chainIdSelected]['eEth'];

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [valueInput] = useDebounce(input, 500);

  useEffect(() => {
    PreviewMarketDetailToken(
      {
        name: DetailPendetail?.name || '',
        SY: DetailPendetail?.SY,
        PT: DetailPendetail?.PT,
        YT: DetailPendetail?.YT,
        tokenMintSy: DetailPendetail?.tokenMintSy,
        tokens: DetailPendetail?.tokens || [],
        totalPt: DetailPendetail?.totalPt,
        totalSy: DetailPendetail?.totalSy,
        totalLp: DetailPendetail?.totalLp,
        expiry: DetailPendetail?.expiry || new Date(),
        daysLeft: DetailPendetail?.daysLeft,
        ptFixedYield: DetailPendetail?.ptFixedYield,
        protocol: DetailPendetail?.protocol || '',
      },
      input,
      'previewRedeemPyToToken',
      DetailPendetail?.marketAddress,
      tokenIn,
      false,
      tokenName,
    );
  }, [valueInput, tokenSelect]);

  // use blance mount
  useEffect(() => {
    getNativeTokenBalanceSelect(tokenIn);
  }, [address]);

  // hanlde
  async function handleApprove() {
    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');
    try {
      const amountMax = BN(DetailPendetail?.ptBalance);
      const allowance = BN(input);
      const amountMax2 = BN(DetailPendetail?.ytBalance);

      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;
      await switchToChainSelected();

      if (
        BN(allowance.multipliedBy('1e6').toFixed(0)).isLessThan(amountMax) &&
        BN(allowance.multipliedBy('1e6').toFixed(0)).isLessThan(amountMax2)
      ) {
        const approve = await writeContract(configEvmChain, {
          abi: abiIYieldToken,
          address: DetailPendetail?.YT,
          functionName: 'approve',
          args: [TCVMARKETROUTER, BigInt(allowance.multipliedBy('1e6').toFixed(0))],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve });
        const approve2 = await writeContract(configEvmChain, {
          abi: abiIYieldToken,
          address: DetailPendetail?.PT,
          functionName: 'approve',
          args: [TCVMARKETROUTER, BigInt(allowance.multipliedBy('1e6').toFixed(0))],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve2 });

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'redeemPyToToken',
          args: [
            address,
            DetailPendetail?.YT,
            BigInt(allowance.multipliedBy('1e6').toFixed(0)),
            {
              tokenOut: tokenIn,
              minTokenOut: BigInt(BN(1).toFixed(0)),
              tokenRedeemSy: tokenIn,
              swapAggregator: '0x0000000000000000000000000000000000000000',
              swapData: {
                swapType: 0,
                extRouter: '0x0000000000000000000000000000000000000000',
                extCalldata: '0x',
                needScale: false,
              },
            },
          ],
          chainId: chainIdSelected,
        });

        // call balance
        if (tokenSelect) getNativeTokenBalanceSelect(tokenSelect);
        if (DetailPendetail?.marketAddress) getUserBalanceMarket(DetailPendetail.marketAddress);
        ResetDetailPendle();
        setInput('0');
        toast.update(idNotify, {
          render: <RenderNofifySuccess hash={response} />,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(idNotify, {
          render: 'Input token balance less than allowance',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
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

  return (
    <>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '50px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Underlying Input
        </Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px', '& .small_number': { display: 'inline' } }}>
            PT - {DetailPendetail?.name || 'aUSDC'} Balance:
            <TextSmallNumber
              value={BN(DetailPendetail?.ptBalance).dividedBy(BN('10').pow(currPoolToken?.decimal))}
              decimal={6}
            />
          </Typography>
        </Box>
      </Box>
      <InputCustom
        value={input}
        onChange={e => {
          setInput(e);
        }}
        readonly={false}
        endElement={<IconAndName nameToken={`PT - ${DetailPendetail?.name}` || ''} sxIcon={{ fontSize: '20px' }} />}
        subValue={MintData?.outRedeemPTUSDT ? MintData?.outRedeemPTUSDT : undefined}
        onClickMax={() => {
          const max =
            formatNumber(BN(DetailPendetail?.ptBalance).dividedBy('1e6').toFixed(6), {
              fractionDigits: 6,
            })?.toString() || '0';
          setInput(max);
        }}
      />
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}></Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px', '& .small_number': { display: 'inline' } }}>
            YT - {DetailPendetail?.name} Balance:{' '}
            <TextSmallNumber
              value={BN(DetailPendetail?.ytBalance).dividedBy(BN('10').pow(currPoolToken?.decimal))}
              decimal={6}
            />
          </Typography>
        </Box>
      </Box>
      <InputCustom
        value={input}
        onChange={e => {
          setInput(e);
        }}
        readonly={false}
        endElement={<IconAndName nameToken={`YT - ${DetailPendetail?.name}` || ''} sxIcon={{ fontSize: '20px' }} />}
        subValue={MintData?.outRedeemYTUSDT ? MintData?.outRedeemYTUSDT : undefined}
        onClickMax={() => {
          const max =
            formatNumber(BN(DetailPendetail?.ytBalance).dividedBy('1e6').toFixed(6), {
              fractionDigits: 6,
            })?.toString() || '0';
          setInput(max);
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginY: '20px',
        }}
      >
        <ArrowDownward
          sx={{
            background: 'rgba(36, 101, 222, 1)',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '500px',
          }}
        />
      </Box>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Output
        </Typography>
      </Box>
      <InputCustom
        value={MintData.outTokenRedeem ? MintData.outTokenRedeem : null}
        onChange={() => {}}
        readonly={true}
        selected={true}
        pendleName={DetailPendetail?.name}
        selectName={tokenName || 'ETH'}
        endElement={<IconAndName nameToken={'ETH'} sxIcon={{ fontSize: '20px' }} />}
        subValue={
          MintData?.RedeemToken
            ? BN(MintData?.outTokenRedeem || '0')
                .dividedBy(BN(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`))
                .multipliedBy(BN(MintData?.RedeemToken))
                .toFixed(2)
            : undefined
        }
        loading={loadPrivew}
      />
      <Box sx={{ mt: '36px', display: 'none' }}>
        <Box sx={{ width: '130%', marginLeft: '-14%' }}>
          <Stepper sx={{ color: '#15B097' }} activeStep={1} alternativeLabel connector={<QontoConnector />}>
            {steps.map(label => (
              <Step
                key={label}
                sx={{
                  backgournd: '#15B097',
                  '.css-fv8sjk-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
                    color: '#15B097',
                  },
                  '.css-z7uhs0-MuiStepConnector-line': {
                    borderColor: '#15B097',
                  },
                  '.css-1577hm2-MuiStepConnector-root .MuiStepConnector-line': {
                    border: 'dashed',
                  },
                }}
              >
                <StepLabel
                  sx={{
                    '.css-ev7nsx-MuiStepLabel-label.Mui-completed': {
                      color: '#B5B8B8',
                    },
                    '.css-ev7nsx-MuiStepLabel-label.Mui-active': {
                      color: '#B5B8B8',
                    },
                  }}
                  StepIconComponent={QontoStepIcon}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '50px' },
          disabled: !address || parseFloat(MintData.outTokenRedeem || '0') <= 0 ? true : false,
        }}
        loading={loading}
        onClick={handleApprove}
      >
        Approve aUSD
      </LoadingButton>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QontoStepIcon(props: any) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : active ? (
        <CircularProgress sx={{ width: '20px !important', height: '20px !important', color: '#5CEAB7' }} />
      ) : (
        <div className="QontoStepIcon-circle">
          <div className="checkTime" />
        </div>
      )}
    </QontoStepIconRoot>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QontoStepIconRoot = styled('div')(({ theme, ownerState }: { theme?: any; ownerState: any }) => ({
  color: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#fff',
    zIndex: 1,
    fontSize: 14,
    background: '#15B097',
    borderRadius: '300px',
    width: 20,
    height: 20,
  },
  '& .QontoStepIcon-circle': {
    width: 20,
    height: 20,
    border: '2px solid #787E7E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
  },
  '& .checkTime': {
    width: 5,
    height: 5,
    background: '#787E7E',
    borderRadius: '300px',
  },
}));
