import Help from '@mui/icons-material/Help';
import { Box, SxProps, Typography } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';

export default function IconAndName({
  nameToken,
  sx,
  sxIcon,
  sxText,
}: {
  nameToken: string;
  sx?: SxProps;
  sxIcon?: SxProps;
  sxText?: SxProps;
}) {
  const IconToken = mapTokenToIcon[nameToken as TAppDenom] ?? Help;
  return (
    <Box sx={{ display: 'flex', placeItems: 'center', width: 'max-content', columnGap: 0.6, ...sx }}>
      <IconToken sx={{ fontSize: '24px', ...sxIcon }} />
      <Typography component={'div'} fontWeight={600} sx={sxText}>
        {nameToken}
      </Typography>
    </Box>
  );
}
