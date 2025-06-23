import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { SvgIconProps } from '@mui/material';

type TProps = {
  status: string;
} & SvgIconProps;
export default function Arrow(props: TProps) {
  const { status } = props;
  if (status === 'up') return <ArrowUpwardRoundedIcon color="success" {...props} />;
  if (status === 'down') return <ArrowDownwardRoundedIcon color="error" {...props} />;
  return null;
}
