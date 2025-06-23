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
import { findKeyByAddress } from 'src/views/DetailMarket/utils';
import { useDebounce } from 'use-debounce';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

export default function ZapOutForm() {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('0');
  const [valueInput] = useDebounce(input, 500);

  // state jotai
  const { address } = useAccount();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const { getUserBalanceMarket, PreviewMarketDetailToken, ResetDetailPendle } = usePendleFunction();
  const { removePoolData, DetailPendetail, loadPrivew, tokenSelect, MintData } = usePendleData();

  // param name token
  const tokenName = tokenSelect
    ? findKeyByAddress(tokenSelect, chainIdSelected)
    : Object.keys(tokenList[chainIdSelected])[0];
  const tokenIn = tokenSelect
    ? tokenSelect
    : tokenList[chainIdSelected][Object.keys(tokenList[chainIdSelected])[0]].address;

  // handleApprove
  async function handleApprove() {
    setLoading(true);
    const idNotify = toast.loading('Check token allowance!');
    try {
      const amountMax = BN(DetailPendetail?.lpBalance);
      const allowance = BN(input);

      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;
      await switchToChainSelected();

      if (BN(allowance).isLessThan(amountMax)) {
        const approve = await writeContract(configEvmChain, {
          abi: abiIERC20,
          address: DetailPendetail?.marketAddress,
          functionName: 'approve',
          args: [TCVMARKETROUTER, BigInt(BN(allowance).multipliedBy('1e18').toFixed(0))],
          chainId: chainIdSelected,
        });
        await waitForTransactionReceipt(configEvmChain, { hash: approve });

        toast.update(idNotify, { render: `Approve success!` });

        const response = await writeContract(configEvmChain, {
          abi: abiIAllAction,
          address: TCVMARKETROUTER,
          functionName: 'removeLiquidityDualTokenAndPt',
          args: [
            address,
            DetailPendetail?.marketAddress,
            BigInt(BN(allowance).multipliedBy('1e18').toFixed(0)),
            {
              tokenOut: '0x460b97BD498E1157530AEb3086301d5225b91216',
              minTokenOut: BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
              tokenRedeemSy: '0x460b97BD498E1157530AEb3086301d5225b91216',
              swapAggregator: ZERO_ADDRESS,
              swapData: {
                swapType: 0,
                extRouter: ZERO_ADDRESS,
                extCalldata: '0x',
                needScale: false,
              },
            },
            BigInt(BN(0).multipliedBy('1e6').toFixed(0)),
          ],
          chainId: chainIdSelected,
        });

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

  // previewRemoveLiquidityDualTokenPt
  useEffect(() => {
    if (DetailPendetail) {
      PreviewMarketDetailToken(
        { ...DetailPendetail },
        input,
        'previewRemoveLiquidityDualTokenPt',
        DetailPendetail?.marketAddress,
        tokenIn,
        false,
        tokenName,
      );
    }
  }, [valueInput, tokenSelect]);

  return (
    <>
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '50px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}></Typography>
        <Box
          sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}
        >
          <Typography variant="caption2" sx={{ fontSize: '12px' }}>
            Balance:{' '}
            {formatNumber(BN(DetailPendetail?.lpBalance).dividedBy('1e18').toFixed(18), { fractionDigits: 18 })}
          </Typography>
        </Box>
      </Box>
      <InputCustom
        value={input}
        onChange={e => {
          setInput(e);
        }}
        readonly={false}
        endElement={<IconAndName nameToken={`LP - ${DetailPendetail?.name}`} sxIcon={{ fontSize: '20px' }} />}
        subValue={removePoolData?.outLPUSDT ? removePoolData.outLPUSDT : undefined}
        onClickMax={() => {
          const max = BN(DetailPendetail?.lpBalance).dividedBy('1e18').toFixed(18);
          setInput(max);
        }}
        selected={false}
        selectName={'LP - aUSDC'}
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
      <InputCustom
        value={removePoolData.tokenToAccount ? removePoolData.tokenToAccount : null}
        onChange={() => {}}
        readonly={true}
        endElement={<IconAndName nameToken={tokenName || 'ETH'} sxIcon={{ fontSize: '20px' }} />}
        subValue={
          <TextSmallNumber
            value={BN(removePoolData.tokenToAccount || '0')
              .dividedBy(BN(`1e${tokenList[chainIdSelected][tokenName]?.decimal || '1'}`))
              .multipliedBy(BN(MintData.MintPriceToken))}
          />
        }
        onClickMax={() => {}}
        selected={true}
        selectName={tokenName}
        pendleName={DetailPendetail?.name}
        loading={loadPrivew}
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
          sx: { marginTop: '20px' },
          disabled: !address || parseFloat(input || '0') <= 0 ? true : false,
        }}
        onClick={handleApprove}
        loading={loading}
      >
        Approve
      </LoadingButton>
    </>
  );
}
