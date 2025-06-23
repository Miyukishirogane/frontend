import { Chip, ChipProps } from '@mui/material';

type TProps = ChipProps;

export default function ProposalChip(props: TProps) {
  return (
    <Chip
      sx={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EDF6FF 100%)',
        border: '1px solid #D9F1FD',
        fontSize: '14px',
        fontWeight: 600,
        '& .MuiSvgIcon-root': {
          backgroundColor: '#000000',
          borderRadius: '1000px',
          color: 'white',
          fontSize: '24px',
          p: '4px',
        },
      }}
      {...props}
    />
  );
}
