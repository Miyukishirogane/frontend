import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import InputCustom from 'src/components/InputCustom/InputCustom';
import IconAndName from 'src/components/IconAndName/IconAndName';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useAccount from 'src/hooks/useAccount';
import { toast } from 'react-toastify';
import { Err_NotConnectWallet } from 'src/constants';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { formatNumber } from 'src/utils/format';
import { useDebounce } from 'use-debounce';
import { contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import { configEvmChain } from 'src/jotai/wallet/config';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { BN } from 'src/utils';
import { abiIERC20 } from 'src/jotai/wallet/abi/IERC20';
import { Address } from 'viem';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { tokenList } from 'src/constants/tokenMap';
import { usePendleFunction } from 'src/jotai/pendle/pendle';
import { usePendleData } from 'src/jotai/pendle/pendle';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';

export default function Mint() {
  // state jotai
  const { address } = useAccount();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { DetailPendetail, balance, MintData, loadPrivew, tokenSelect } = usePendleData();
  const {
    nativeToken,
    PreviewMarketDetailToken,
    getNativeTokenBalanceSelect,
    getUserBalanceMarket,
    ResetDetailPendle,
  } = usePendleFunction();

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [valueInput] = useDebounce(input, 500);

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
  const tokenIn = tokenSelect ? tokenSelect : tokenList[chainIdSelected][DetailPendetail?.name || 'aArbUSDC']?.address;

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
      'previewMintPyFromToken',
      DetailPendetail?.marketAddress,
      tokenIn,
      false,
      tokenName,
    );
  }, [valueInput, tokenSelect]);

  // use blance mount
  useEffect(() => {
    getNativeTokenBalanceSelect(tokenIn);
  }, [address, tokenIn]);

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
        toast.update(idNotify, { render: 'Approve more balance !' });
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

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'mintPyFromToken',
          args: [
            address,
            DetailPendetail?.YT,
            BigInt(BN(1).toFixed(0)),
            {
              tokenIn: tokenIn,
              netTokenIn: BigInt(
                allowance.multipliedBy(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`).toFixed(0),
              ),
              tokenMintSy: tokenIn,
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
            Your Balance: <TextSmallNumber value={BN(balance[tokenIn])} decimal={6} fallbackDisplay="0" />
          </Typography>
        </Box>
      </Box>
      <InputCustom
        value={input}
        onChange={e => {
          setInput(e);
        }}
        readonly={false}
        endElement={<IconAndName nameToken={tokenName || 'ETH'} sxIcon={{ fontSize: '20px' }} />}
        subValue={
          MintData?.MintPriceToken ? (
            <TextSmallNumber value={BN(input).multipliedBy(BN(MintData?.MintPriceToken))} />
          ) : undefined
        }
        onClickMax={() => {
          const max = formatNumber(balance[nativeToken], { fractionDigits: 6 })?.toString() || '0';
          setInput(max);
        }}
        selected={true}
        pendleName={DetailPendetail?.name}
        selectName={tokenName || 'ETH'}
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
        value={
          MintData.outPtMint ? formatNumber(BN(MintData.outPtMint), { fractionDigits: 6 })?.toString() || null : null
        }
        onChange={() => {}}
        readonly={true}
        endElement={<IconAndName nameToken={`PT - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
        subValue={MintData?.outMintPTUSDT ? MintData?.outMintPTUSDT : undefined}
        loading={loadPrivew}
      />
      <InputCustom
        value={
          MintData.outYtMint ? formatNumber(BN(MintData.outYtMint), { fractionDigits: 6 })?.toString() || null : null
        }
        onChange={() => {}}
        readonly={true}
        endElement={<IconAndName nameToken={`YT - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
        subValue={MintData?.outMintYTUSDT ? MintData?.outMintYTUSDT : undefined}
        loading={loadPrivew}
      />
      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '50px' },
          disabled: !address || parseFloat(MintData?.outPtMint || '0') <= 0 ? true : false,
        }}
        onClick={handleApprove}
        loading={loading}
      >
        Approve aUSD
      </LoadingButton>
    </>
  );
}
