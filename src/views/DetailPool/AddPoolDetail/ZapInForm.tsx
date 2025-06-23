/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Box, Typography } from '@mui/material';
import { getAddr } from 'pendle-fork-sdk/src/addresses';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustom from 'src/components/InputCustom/InputCustom';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { Err_NotConnectWallet, listAddr, ZERO_ADDRESS } from 'src/constants';
import { tokenList } from 'src/constants/tokenMap';
import usePreviewZapInPool from 'src/hooks/PreviewPendle/usePreviewZapActionPool';
import useAccount from 'src/hooks/useAccount';
import { guessPtReceivedFromSy } from 'src/jotai/pendle/constant';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { abiIERC20 } from 'src/jotai/wallet/abi/IERC20';
import { configEvmChain } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { findKeyByAddress } from 'src/views/DetailMarket/utils';
import { useDebounce } from 'use-debounce';
import { Address } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { exactInputSingle } from '../utils';
import { formatNumber, toFixedLargeNumbers } from 'src/utils/format';

export default function ZapInForm() {
  const { address } = useAccount();
  const { DetailPendetail, balance, tokenSelect, MintData } = usePendleData();
  console.log('🚀 ~ ZapInForm ~ DetailPendetail:', DetailPendetail);
  const { getUserBalanceMarket, getNativeTokenBalanceSelect } = usePendleFunction();
  const { isPending, mutateAsync: previewZapIn, data: previewAmount } = usePreviewZapInPool();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();

  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [valueInput] = useDebounce(input, 500);

  // param name token
  const tokenName = tokenSelect ? findKeyByAddress(tokenSelect, chainIdSelected) : DetailPendetail?.name || 'aArbUSDC';
  const tokenIn = tokenList[chainIdSelected][tokenName]?.address;

  async function handleApprove() {
    if (!DetailPendetail) return;

    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');
    const { tokenMintSy, marketAddress, SY } = DetailPendetail;
    const { decimal: tokenDecimal } = tokenList[chainIdSelected][tokenName];

    try {
      if (!address) throw Err_NotConnectWallet;
      await switchToChainSelected();
      const amountMax1 = BN(balance[tokenIn]);
      const allowance1 = BN(input);
      const routerAddress = getAddr('ROUTER_ADDRESS', chainIdSelected) as Address;

      if (BN(amountMax1).isLessThan(allowance1)) {
        const approve = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: tokenIn,
          functionName: 'approve',
          args: [routerAddress, BigInt(allowance1.multipliedBy(`1e${tokenDecimal}`).toString())],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve });
        toast.update(idNotify, { render: `Approve success!` });
      }

      const swapType = tokenIn == tokenMintSy || tokenIn == SY ? 0 : 1;
      let extCalldata = '0x' as Address; // = 0 nếu input = sy/token mint sy, else = 1
      if (swapType !== 0) {
        extCalldata = exactInputSingle(marketAddress, tokenMintSy);
      }

      const response = await writeContract(configEvmChain, {
        abi: abiIAllAction,
        address: routerAddress,
        functionName: 'addLiquiditySingleToken',
        args: [
          address,
          marketAddress,
          BigInt(1),
          guessPtReceivedFromSy,
          {
            tokenIn: tokenIn,
            netTokenIn: BigInt(allowance1.multipliedBy(`1e${tokenDecimal}`).toString()),
            tokenMintSy: tokenMintSy,
            swapAggregator: listAddr[chainIdSelected].SWAP_AGGREGATOR_ADDRESS as Address,
            swapData: {
              swapType: swapType,
              extRouter: listAddr[chainIdSelected].UNISWAP_V3_ROUTER_ADDRESS as Address,
              extCalldata: extCalldata, // = '0x' nếu swapType = 0;
              needScale: false,
            },
          },
          {
            limitRouter: ZERO_ADDRESS,
            epsSkipMarket: BigInt(0),
            normalFills: [],
            flashFills: [],
            optData: ZERO_ADDRESS,
          },
        ],
      });

      if (tokenSelect) getNativeTokenBalanceSelect(tokenSelect);
      if (marketAddress) getUserBalanceMarket(marketAddress);
      setInput('0');
      toast.update(idNotify, {
        render: <RenderNofifySuccess hash={response} />,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
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

  const handleGetPreviewAmount = useCallback(async () => {
    if (DetailPendetail) {
      await previewZapIn({
        marketInfo: DetailPendetail,
        input,
        tokenName,
      });
    }
  }, [valueInput, tokenSelect, DetailPendetail]);

  useEffect(() => {
    handleGetPreviewAmount();
  }, [handleGetPreviewAmount]);

  useEffect(() => {
    getNativeTokenBalanceSelect(tokenIn);
  }, [address]);

  return (
    <>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '50px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Input
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
        value={previewAmount ? toFixedLargeNumbers(Number(previewAmount), 10) : '0'}
        onChange={() => {}}
        readonly={true}
        endElement={<IconAndName nameToken={`LP - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
        loading={isPending}
      />

      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '36px' }}>
        <Typography variant="caption2" sx={{ fontSize: '14px', color: 'rgba(140, 140, 140, 1)' }}>
          Pool Share
        </Typography>
        <Box sx={{ display: 'flex', fontSize: '12px', color: '#303030', placeItems: 'center', gap: 0.5 }}>
          <Typography variant="caption2" flexWrap={'wrap'} sx={{ fontSize: '20px', fontWeight: '600' }}>
            {`${formatNumber(
              BN(DetailPendetail?.lpBalance).dividedBy(BN(DetailPendetail?.totalLp)).multipliedBy('1e2'),
              { fractionDigits: 10 },
            )}`}
            %
          </Typography>
        </Box>
      </Box>

      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '50px' },
          disabled: !address,
        }}
        onClick={handleApprove}
        loading={loading}
      >
        Approve {DetailPendetail?.name || ''}
      </LoadingButton>
    </>
  );
}
