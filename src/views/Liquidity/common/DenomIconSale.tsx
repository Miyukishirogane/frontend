import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { Box, SxProps, Typography } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';

export default function DenomIconSale({
  token1,
  token2,
  sxIcon,
  sxText,
}: {
  token1: string;
  token2?: string;
  sxIcon?: SxProps;
  sxText?: SxProps;
}) {
  const Icon1 = mapTokenToIcon[token1 as TAppDenom] ?? HelpOutlineRounded;
  const Icon2 = mapTokenToIcon[token2 as TAppDenom] ?? HelpOutlineRounded;

  return (
    <Box sx={{ display: 'flex', alignItems: 'end', placeItems: 'center', columnGap: 0.6, pr: { xsm: '10px' } }}>
      <Icon1 sx={{ fontSize: '40px', ...sxIcon }} />
      <Box sx={{ maxWidth: { xs: '100%', xsm: '50%', md: '150px' }, flexDirection: 'column', ml: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ ...sxText }}>
            {token1}
          </Typography>
        </Box>
        {token2 ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon2 sx={{ fontSize: '16px', transform: 'translateX(-22%)', ...sxIcon }} />
            <Typography sx={{ fontSize: '16px', color: '#8C8C8C' }}>{token2}</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
