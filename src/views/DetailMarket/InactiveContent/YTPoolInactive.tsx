import { Box, Typography } from '@mui/material';
import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustom from 'src/components/InputCustom/InputCustom';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { tokenList } from 'src/constants/tokenMap';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { findKeyByAddress } from '../utils';
import { useState } from 'react';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useAccount from 'src/hooks/useAccount';

const YTPoolInactive = () => {
  const { balance, tokenSelect, MintData, SwapData } = usePendleData();
  const { nativeToken } = usePendleFunction();
  const { chainIdSelected } = useSwitchToSelectedChain();
  const { address } = useAccount();

  const [input, setInput] = useState('0');

  const tokenName = tokenSelect ? findKeyByAddress(tokenSelect, chainIdSelected) : Object.keys(tokenList[chainIdSelected])[0];

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '20px'
      }}
    >
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
        <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
          Input
        </Typography>
        <Box sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}>
          <Typography variant="caption2" sx={{ fontSize: '12px' }}>
            Balance: <>{formatNumber(balance[nativeToken], { fractionDigits: 6 })}</>
          </Typography>
        </Box>
      </Box>

      <InputCustom
        value={input}
        onChange={(e) => {
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
        subValue={<TextSmallNumber value={BN(input || '0').multipliedBy(BN(MintData.MintPriceToken))} />}
      />

      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '50px' },
          disabled: !address || parseFloat(SwapData?.outTokenYT || '0') <= 0 ? true : false,
        }}
        onClick={() => {}}
      >
        Approve YT - wstETH
      </LoadingButton>
    </div>
  );
};

export default YTPoolInactive;
