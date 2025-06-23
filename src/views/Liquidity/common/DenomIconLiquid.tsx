import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { Box, SxProps, Typography } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { formatNumber } from 'src/utils/format';

export default function DenomIconLiquid({
  token1,
  token2,
  sxIcon,
  ranges,
}: {
  token1: string;
  token2: string;
  sxIcon?: SxProps;
  ranges: number;
}) {
  const Icon1 = mapTokenToIcon[token1 as TAppDenom] ?? HelpOutlineRounded;
  const Icon2 = mapTokenToIcon[token2 as TAppDenom] ?? HelpOutlineRounded;

  return (
    <Box sx={{ display: 'flex', alignItems: 'end', placeItems: 'center', columnGap: 0.6, pr: { xsm: '10px' } }}>
      <Icon1 sx={{ fontSize: '36px', ...sxIcon }} />
      <Icon2 sx={{ fontSize: '36px', transform: 'translateX(-22%)', ...sxIcon }} />
      <Box sx={{ maxWidth: { xs: '100%', xsm: '50%', md: '150px' }, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">{token1 === 'WETH' ? 'ETH' : token1}</Typography>
          <Typography variant="h6">/</Typography>
          <Typography variant="h6">{token2 === 'WETH' ? 'ETH' : token2}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              margin: '0px',
              lineHeight: '14.4px',
              fontSize: '0.8rem',
              color: '#2465DE',
              border: '1px solid #2465DE',
              borderRadius: '10px',
              padding: '1px 7px',
            }}
          >
            {`${formatNumber(ranges / 10000, { fractionDigits: 2 })}`}%
          </p>
        </Box>
      </Box>
    </Box>
  );
}
