import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import ChartData from './ChartData';
import useGetVotingPower from '../hooks/useGetVotingPower';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import { compactNumber } from 'src/utils/format';

const btnGroupData: IToggleButton[] = [
  {
    value: '1w',
    label: '1W',
  },
  {
    value: '1m',
    label: '1M',
  },
  {
    value: '1y',
    label: '1Y',
  },
  {
    value: 'all',
    label: 'ALL',
  },
];

export default function ChartVotingPower() {
  const [toggleValue, setToggleValue] = useState<string>('all');
  const { votingPower, status } = useGetVotingPower();

  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== toggleValue && newAlignment) {
      setToggleValue(newAlignment);
    }
  };

  return (
    <Stack
      sx={{
        padding: '20px',
        borderRadius: '16px',
        backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #EDF6FF)',
        height: '100%',
      }}
      justifyContent={'space-between'}
      gap="20px"
    >
      <Box display="flex" justifyContent="space-between">
        <Stack>
          <Typography fontSize={'20px'} fontWeight={600}>
            Your Voting Power
          </Typography>
          <Box display="flex" gap="4px">
            <Typography fontSize={'14px'} fontWeight={400} color="#8C8C8C">
              Current Voting Power:
            </Typography>
            <TypographyByStatus status={status} fontSize={'14px'} fontWeight={400} color="#2465DE">
              {compactNumber(votingPower || '', 2)}
            </TypographyByStatus>
          </Box>
        </Stack>
        <ToggleButtonGroupCustom
          value={toggleValue}
          handleToggleChange={handleToggleChange}
          data={btnGroupData}
          sx={{
            width: 'fit-content',
            border: '1px solid #D9D9D9',
            bgcolor: 'transparent',
          }}
          toggleBtnProps={{}}
        />
      </Box>
      <ChartData />
    </Stack>
  );
}
