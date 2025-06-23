import { ChangeEvent } from 'react';
import ButtonPercent from 'src/components/Buttons/ButtonPercent/ButtonPercent';
import { Box, TextField, Typography } from '@mui/material';
import { BN } from 'src/utils';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { formatNumber } from 'src/utils/format';

const Slippage = ({ index, vault }: { index: number; vault: TAccordionVaultState }) => {
  const { addLiquidity, token1Info, token2Info, isCanUseETH } = vault;
  const { changeAddLpStateByIndex, nativeToken } = useLiquidityFunction();
  const isZapIn = addLiquidity.isZapIn;

  const handleSlippageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    changeAddLpStateByIndex(index, { slippage: newValue });
  };
  const handleSlippageButtonChange = (value: string) => {
    changeAddLpStateByIndex(index, { slippage: value });
  };

  if (isZapIn) {
    const optionSlippage = [
      { value: BN(0.25), text: '0.25%' },
      { value: BN(0.5), text: '0.5%' },
      { value: BN(1), text: '1.0%' },
      { value: BN(2.5), text: '2.5%' },
    ];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, placeItems: 'center', mb: 3 }}>
        <Typography variant="body2" color={'text.secondary'}>
          Slippage
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 'auto', justifyContent: 'end' }}>
          {optionSlippage.map((option, index) => {
            return (
              <ButtonPercent
                key={index + option.text}
                selected={BN(addLiquidity.slippage).isEqualTo(option.value)}
                onClick={() => handleSlippageButtonChange(option.value.toString())}
                buttonContent={option.text}
              ></ButtonPercent>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
      <Box display={'flex'} sx={{ flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" sx={{ marginRight: '5px', color: '#828282' }}>
          Slippage:
        </Typography>

        <Box display={'flex'}>
          <Typography variant="h6" sx={{ marginRight: '5px' }}>
            1
          </Typography>
          <Typography color={'text.secondary'} sx={{ marginRight: '5px' }}>
            {addLiquidity.isUseETH && isCanUseETH == 'token1' ? nativeToken : token1Info?.symbol}
          </Typography>
          <Typography sx={{ marginRight: '5px' }}>-</Typography>
          <Typography variant="h6" sx={{ marginRight: '5px' }}>
            {formatNumber(token1Info.rate, { fractionDigits: 2 })}
          </Typography>
          <Typography color={'text.secondary'} sx={{ marginRight: '5px' }}>
            {addLiquidity.isUseETH && isCanUseETH == 'token2' ? nativeToken : token2Info?.symbol}
          </Typography>
        </Box>
      </Box>
      <Box
        color={'text.secondary'}
        sx={{
          fontWeight: '400',
          fontSize: '14px',
          display: 'flex',
          placeItems: 'center',
          justifyContent: { xs: 'flex-end', md: 'inherit' },
        }}
      >
        <TextField
          variant="outlined"
          type="number"
          value={vault.addLiquidity.slippage}
          onChange={handleSlippageInputChange}
          InputProps={{ endAdornment: '%' }}
          sx={{
            '& .MuiInputBase-root.MuiOutlinedInput-root': {
              background: '#eff2f8 !important',
              fontSize: '18px',
              fontWeight: '400',
              textAlign: 'end',
              color: 'black !important',
              borderRadius: '16px !important',
              pr: '20px',
            },

            '& fieldset': { border: 'none !important' },
            '& input': { padding: '16px 25px!important', fontSize: '20px', fontWeight: 700 },
            width: '130px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Slippage;
