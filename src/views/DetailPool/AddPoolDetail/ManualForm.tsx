/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustom from 'src/components/InputCustom/InputCustom';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { Err_NotConnectWallet, ZERO_ADDRESS } from 'src/constants';
import { tokenList } from 'src/constants/tokenMap';
import useAccount from 'src/hooks/useAccount';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { abiIERC20 } from 'src/jotai/wallet/abi/IERC20';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { useDebounce } from 'use-debounce';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import PoolStepper from './PoolStepper';
import { findKeyByAddress } from 'src/views/DetailMarket/utils';

export default function ManualForm() {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [activeStep, setActiveStep] = useState(-1);
  const [valueInput] = useDebounce(input, 500);

  // state jotai
  const { address } = useAccount();
  const { addPoolData, DetailPendetail, loadPrivew, balance, tokenSelect, MintData } = usePendleData();
  const { getUserBalanceMarket, PreviewMarketDetailToken, ResetDetailPendle, getNativeTokenBalanceSelect } =
    usePendleFunction();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();

  // param name token
  const tokenName = tokenSelect ? findKeyByAddress(tokenSelect, chainIdSelected) : DetailPendetail?.name || 'aArbUSDC';
  const tokenIn = tokenSelect ? tokenSelect : tokenList[chainIdSelected][DetailPendetail?.name || 'aArbUSDC']?.address;

  // handleApprove
  async function handleApprove() {
    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');
    try {
      const amountMax2 = BN(DetailPendetail?.ptBalance);
      const amountMax1 = BN(balance[tokenIn]);
      const allowance1 = BN(input);
      const allowance2 = BN(addPoolData?.lpToReserve);

      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;
      await switchToChainSelected();

      // check netTokenIn < balance aArb (ausdc) (or aweth)
      if (BN(allowance2).isLessThan(amountMax2) && BN(allowance1).isLessThan(amountMax1)) {
        setActiveStep(0);

        const approve = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: tokenIn,
          functionName: 'approve',
          args: [TCVMARKETROUTER, BigInt(allowance1.multipliedBy('1e6').toFixed(0))],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve });
        setActiveStep(1);

        const approve2 = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: DetailPendetail?.PT,
          functionName: 'approve',
          args: [TCVMARKETROUTER, BigInt(BN(allowance2).multipliedBy('1e6').toFixed(0))],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve2 });
        setActiveStep(2);

        toast.update(idNotify, { render: `Approve success!` });

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'addLiquidityDualTokenAndPt',
          args: [
            address,
            DetailPendetail?.marketAddress,
            {
              tokenIn: tokenIn,
              netTokenIn: BigInt(BN(allowance1).multipliedBy('1e6').toFixed(0)),
              tokenMintSy: tokenIn,
              swapAggregator: ZERO_ADDRESS,
              swapData: {
                swapType: 0,
                extRouter: ZERO_ADDRESS,
                extCalldata: '0x',
                needScale: false,
              },
            },
            BigInt(allowance2.multipliedBy('1e6').toFixed(0)),
            BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
          ],
          chainId: chainIdSelected,
        });

        // call balance
        if (tokenSelect) getNativeTokenBalanceSelect(tokenSelect);
        if (DetailPendetail?.marketAddress) getUserBalanceMarket(DetailPendetail.marketAddress);
        setActiveStep(3);
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
      setActiveStep(-1);
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

  // previewSwapTokenToYt
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
      'previewAddLiquidityDualTokenPt',
      DetailPendetail?.marketAddress,
      tokenIn,
      true,
      tokenName,
    );
  }, [valueInput, tokenSelect]);

  // use blance mount
  useEffect(() => {
    getNativeTokenBalanceSelect(tokenIn);
  }, [address]);

  return (
    <>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '50px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Underlying Input
        </Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px' }}>
            Balance: {BN(balance[tokenIn]).toString() === 'NaN' ? 0 : BN(balance[tokenIn]).toString()}
          </Typography>
        </Box>
      </Box>
      <Box>
        <InputCustom
          value={input}
          onChange={e => {
            setInput(e);
          }}
          readonly={false}
          endElement={<IconAndName nameToken={tokenName || 'ETH'} sxIcon={{ fontSize: '20px' }} />}
          subValue={<TextSmallNumber value={BN(input || '0').multipliedBy(BN(MintData.MintPriceToken))} />}
          onClickMax={() => {
            const max = balance[tokenIn]?.toString();
            setInput(max);
          }}
          selected={true}
          selectName={tokenName}
          pendleName={DetailPendetail?.name}
        />
      </Box>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}></Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px' }}>
            Balance: {formatNumber(BN(DetailPendetail?.ptBalance).dividedBy('1e6'), { fractionDigits: 12 })}
          </Typography>
        </Box>
      </Box>
      <Box>
        <InputCustom
          value={addPoolData?.ptUsed ? addPoolData.ptUsed : null}
          onChange={() => {}}
          readonly={false}
          endElement={<IconAndName nameToken={`PT - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
          subValue={addPoolData?.outPtUSDT ? addPoolData.outPtUSDT : undefined}
          loading={loadPrivew}
        />
      </Box>
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
      <InputCustom
        value={addPoolData?.lpToAccount ? addPoolData.lpToAccount : null}
        onChange={() => {}}
        readonly={true}
        endElement={<IconAndName nameToken={`LP - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
        subValue={addPoolData?.outLpUSDT ? addPoolData.outLpUSDT : undefined}
        loading={loadPrivew}
      />
      <Box sx={{ mt: '36px' }}>
        <PoolStepper
          steps={[tokenName, `PT - ${DetailPendetail?.name}`, `LP - ${DetailPendetail?.name}`]}
          activeSteps={activeStep}
        />
      </Box>
      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '50px' },
          disabled: !address || parseFloat(addPoolData.lpToAccount || '0') <= 0 ? true : false,
        }}
        onClick={handleApprove}
        loading={loading}
      >
        Approve
      </LoadingButton>
    </>
  );
}
