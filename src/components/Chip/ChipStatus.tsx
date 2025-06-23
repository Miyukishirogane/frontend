import { Chip, ChipProps } from '@mui/material';

export type TStatusInChip = 'Active' | 'Cancelled' | 'Completed';
type TProps = ChipProps & { status?: TStatusInChip };

export default function ChipStatus(props: TProps) {
  const { status } = props;

  switch (status) {
    case 'Active':
      return <Chip label="Active" size="small" sx={{ backgroundColor: '#E0F0FF', color: '#00527C' }} {...props} />;
    case 'Cancelled':
      return <Chip label="Cancelled" sx={{ backgroundColor: '#FEDAD9', color: '#DC2626' }} size="small" {...props} />;
    case 'Completed':
      return <Chip label="Completed" sx={{ backgroundColor: '#CDFEE1', color: '#136F45' }} size="small" {...props} />;
    default:
      return <Chip {...props} />;
  }
}
