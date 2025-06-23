import Help from '@mui/icons-material/Help';
import { SxProps } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';

export default function TokenUnknow({ nameToken, sx }: { nameToken: string; sx?: SxProps }) {
  const IconToken = mapTokenToIcon[nameToken as TAppDenom] ?? Help;

  return <IconToken sx={sx} />;
}
