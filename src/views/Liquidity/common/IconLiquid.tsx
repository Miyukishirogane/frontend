import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { Box, SxProps, Typography } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';

export default function IconLiquid({ token, sxIcon }: { token: string; sxIcon?: SxProps }) {
  const Icon = mapTokenToIcon[token as TAppDenom] ?? HelpOutlineRounded;

  return (
    <Box
      sx={{ ...sxIcon, display: 'flex', alignItems: 'end', placeItems: 'center', columnGap: 0.6, pr: { xsm: '10px' } }}
    >
      <Icon sx={{ fontSize: '36px' }} />
      <Typography variant="h6">{token}</Typography>
    </Box>
  );
}
