import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import InputCustom from 'src/components/InputCustom/InputCustom';
import IconAndName from 'src/components/IconAndName/IconAndName';
import { formatNumber } from 'src/utils/format';
import useAccount from 'src/hooks/useAccount';
import { toast } from 'react-toastify';
import { Err_NotConnectWallet } from 'src/constants';
import SwapVerticalCircle from '@mui/icons-material/SwapVerticalCircle';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { useDebounce } from 'use-debounce';
import { contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import { abiIERC20 } from 'src/jotai/wallet/abi/IERC20';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { tokenList } from 'src/constants/tokenMap';
import { Address } from 'viem';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';

export default function SwapYT() {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [checkReverse, setCheckReverse] = useState<boolean>(false);
  const [valueInput] = useDebounce(input, 500);

  // state jotaixl
  const { address } = useAccount();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { tokenToggle, SwapData, DetailPendetail, loadPrivew, balance, tokenSelect, MintData } = usePendleData();
  const {
    nativeToken,
    getUserBalanceMarket,
    PreviewMarketDetailToken,
    ResetDetailPendle,
    getNativeTokenBalanceSelect,
  } = usePendleFunction();

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
  const tokenName = tokenSelect ? findKeyByAddress(tokenSelect) : DetailPendetail?.name || 'aArbUSDC';
  const tokenIn = tokenList[chainIdSelected][DetailPendetail?.name || 'aArbUSDC']?.address;
  const tokenSelectedDecimal = tokenList[chainIdSelected][DetailPendetail?.name || 'aArbUSDC']?.decimal;

  // handle Approve Reverse
  async function handleApproveReverse() {
    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');

    try {
      const amountMax = balance[nativeToken];
      const allowance = BN(input);

      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;
      await switchToChainSelected();

      // check netTokenIn < balance aArb (ausdc) (or aweth)
      if (BN(allowance).isLessThan(amountMax)) {
        toast.update(idNotify, { render: 'Approve more balance!' });
        const approve = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: DetailPendetail?.YT,
          functionName: 'approve',
          args: [
            TCVMARKETROUTER,
            BigInt(
              allowance
                .multipliedBy(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`)
                .toFixed(0),
            ),
          ],
          chainId: chainIdSelected,
        });
        await waitForTransactionReceipt(configEvmChain, { hash: approve });

        toast.update(idNotify, { render: `Approve success!` });

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'swapExactYtForToken',
          args: [
            address,
            DetailPendetail?.marketAddress,
            BigInt(
              allowance
                .multipliedBy(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`)
                .toFixed(0),
            ),
            // BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
            {
              tokenOut: tokenIn,
              minTokenOut: BigInt(BN(1).toFixed(0)),
              tokenRedeemSy: DetailPendetail?.tokenMintSy,
              swapAggregator: '0x0000000000000000000000000000000000000000',
              swapData: {
                swapType: 0,
                extRouter: '0x0000000000000000000000000000000000000000',
                extCalldata: '0x',
                needScale: false,
              },
            },
            {
              limitRouter: '0x0000000000000000000000000000000000000000',
              epsSkipMarket: BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
              normalFills: [],
              flashFills: [],
              optData: '0x0000000000000000000000000000000000000000',
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

  // handle Approve AUSD
  async function handleApprove() {
    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');

    try {
      const amountMax = balance[nativeToken];
      const allowance = BN(input);

      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;
      await switchToChainSelected();

      // check netTokenIn < balance aArb (ausdc) (or aweth)
      if (BN(allowance).isLessThan(amountMax)) {
        toast.update(idNotify, { render: 'Approve more balance!' });
        const approve = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: tokenIn,
          functionName: 'approve',
          args: [
            TCVMARKETROUTER,
            BigInt(allowance.multipliedBy(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`).toFixed(0)),
          ],
          chainId: chainIdSelected,
        });
        await waitForTransactionReceipt(configEvmChain, { hash: approve });

        toast.update(idNotify, { render: `Approve success!` });

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'swapExactTokenForYt',
          args: [
            address,
            DetailPendetail?.marketAddress,
            BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
            {
              guessMin: BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
              guessMax: BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935'),
              guessOffchain: BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
              maxIteration: BigInt(BN('256').toFixed(0)),
              eps: BigInt(BN('1').multipliedBy('1e14').toFixed(0)),
            },
            {
              tokenIn: tokenIn,
              netTokenIn: BigInt(
                allowance.multipliedBy(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`).toFixed(0),
              ),
              tokenMintSy: DetailPendetail?.tokenMintSy,
              swapAggregator: '0x0000000000000000000000000000000000000000',
              swapData: {
                swapType: 0,
                extRouter: '0x0000000000000000000000000000000000000000',
                extCalldata: '0x',
                needScale: false,
              },
            },
            {
              limitRouter: '0x0000000000000000000000000000000000000000',
              epsSkipMarket: BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
              normalFills: [],
              flashFills: [],
              optData: '0x0000000000000000000000000000000000000000',
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

  // check token
  useEffect(() => {
    if (tokenToggle === 'YT') {
      setCheckReverse(false);
      setInput('0');
    }
  }, [tokenToggle]);

  // previewSwapTokenToYt
  useEffect(() => {
    if (Number(valueInput) === 0) return;

    if (checkReverse) {
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
        'previewSwapYtToToken',
        DetailPendetail?.marketAddress,
        tokenIn,
        false,
        tokenName,
      );
    } else {
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
        'previewSwapTokenToYt',
        DetailPendetail?.marketAddress,
        tokenIn,
        false,
        tokenName,
      );
    }
  }, [valueInput, tokenSelect]);

  // use blance mount
  useEffect(() => {
    getNativeTokenBalanceSelect(tokenIn);
  }, [address, tokenIn]);

  return (
    <>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Input
        </Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px', '& .small_number': { display: 'inline' } }}>
            Balance:{' '}
            {!checkReverse ? (
              <TextSmallNumber value={BN(balance[tokenIn])} decimal={6} />
            ) : (
              <TextSmallNumber
                value={BN(DetailPendetail?.ytBalance).dividedBy(
                  `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`,
                )}
                decimal={6}
              />
            )}
          </Typography>
        </Box>
      </Box>
      {/* ngược lại */}
      <Box
        sx={{
          display: checkReverse ? 'block' : 'none',
        }}
      >
        <InputCustom
          value={input}
          onChange={e => {
            setInput(e);
          }}
          readonly={false}
          endElement={<IconAndName nameToken={`YT - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
          subValue={SwapData?.outYTUSDT ? SwapData?.outYTUSDT : undefined}
          onClickMax={() => {
            const max =
              formatNumber(
                BN(DetailPendetail?.ytBalance)
                  .dividedBy(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`)
                  .toFixed(6),
                { fractionDigits: 6 },
              )?.toString() || '0';
            setInput(max);
          }}
        />
      </Box>
      {/* thuận */}
      <Box
        sx={{
          display: !checkReverse ? 'block' : 'none',
        }}
      >
        <InputCustom
          value={input}
          onChange={e => {
            setInput(e);
          }}
          readonly={false}
          endElement={<IconAndName nameToken={tokenName || 'ETH'} sxIcon={{ fontSize: '20px' }} />}
          onClickMax={() => {
            const max = formatNumber(balance[nativeToken], { fractionDigits: 6 })?.toString() || '0';
            setInput(max);
          }}
          selected={true}
          selectName={tokenName || 'ETH'}
          pendleName={DetailPendetail?.name}
          subValue={<TextSmallNumber value={BN(input || '0').multipliedBy(BN(MintData.MintPriceToken))} />}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginY: '20px',
        }}
      >
        <SwapVerticalCircle
          onClick={() => {
            ResetDetailPendle();
            setInput('0');
            setCheckReverse(!checkReverse);
          }}
          sx={{
            cursor: 'pointer',
            color: 'rgba(36, 101, 222, 1)',
            width: '32px',
            height: '32px',
          }}
        />
      </Box>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Output
        </Typography>
      </Box>
      {/* thuận */}
      <Box
        sx={{
          display: !checkReverse ? 'block' : 'none',
        }}
      >
        <InputCustom
          value={SwapData.outYTDes ? BN(SwapData.outYTDes).dividedBy(`1e${tokenSelectedDecimal}`).toString() : null}
          onChange={() => {}}
          readonly={true}
          endElement={<IconAndName nameToken={`YT - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
          subValue={
            SwapData?.outYTUSDT ? (
              <TextSmallNumber value={BN(SwapData?.outYTUSDT).dividedBy(`1e${tokenSelectedDecimal}`)} />
            ) : undefined
          }
          loading={loadPrivew}
        />
      </Box>
      {/* ngược lại */}
      <Box
        sx={{
          display: checkReverse ? 'block' : 'none',
        }}
      >
        <InputCustom
          value={SwapData.outTokenYT ? SwapData.outTokenYT : null}
          onChange={() => {}}
          readonly={true}
          endElement={<IconAndName nameToken={tokenName || 'ETH'} sxIcon={{ fontSize: '20px' }} />}
          subValue={
            SwapData?.YTpriceToken
              ? BN(SwapData?.outTokenYT || '0')
                  .dividedBy(BN(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`))
                  .multipliedBy(BN(SwapData?.YTpriceToken))
                  .toFixed(2)
              : undefined
          }
          selected={true}
          pendleName={DetailPendetail?.name}
          selectName={tokenName || 'ETH'}
          loading={loadPrivew}
        />
      </Box>
      <Box
        sx={{
          display: !checkReverse ? 'block' : 'none',
        }}
      >
        <LoadingButton
          props={{
            variant: 'gradient',
            fullWidth: true,
            sx: { marginTop: '50px' },
            disabled: !address || parseFloat(SwapData?.outYTDes || '0') <= 0 ? true : false,
          }}
          onClick={handleApprove}
        >
          Approve YT-{DetailPendetail?.name}
        </LoadingButton>
      </Box>
      <Box
        sx={{
          display: checkReverse ? 'block' : 'none',
        }}
      >
        <LoadingButton
          props={{
            variant: 'gradient',
            fullWidth: true,
            sx: { marginTop: '50px' },
            disabled: !address || parseFloat(SwapData?.outTokenYT || '0') <= 0 ? true : false,
          }}
          onClick={handleApproveReverse}
          loading={loading}
        >
          Approve {DetailPendetail?.name}
        </LoadingButton>
      </Box>
    </>
  );
}
