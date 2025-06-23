import InfoIcon from '@mui/icons-material/Info';
import { Box, IconButton, Stack, SxProps, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';
import SliderProcess from 'src/components/SliderCustom/SliderProcess';
import { formatNumber } from 'src/utils/format';

type TProps = {
  sx?: SxProps;
  quorum: string | React.ReactNode;
  forVotes: number;
  againstVotes: number;
  sumVotes: number;
};
export default function GovernanceStats(props: TProps) {
  const { sx, againstVotes, forVotes, quorum, sumVotes } = props;

  const forVotesPercent = useMemo(() => {
    if (sumVotes === 0) return '0.00';
    else return formatNumber((forVotes / sumVotes) * 100, { fractionDigits: 2 });
  }, [forVotes, sumVotes]);

  const againstVotesPercent = useMemo(() => {
    if (sumVotes === 0) return '0.00';
    else return formatNumber((againstVotes / sumVotes) * 100, { fractionDigits: 2 });
  }, [againstVotes, sumVotes]);

  const minSupport = useMemo(() => {
    if (sumVotes === 0) return 0;
    else return Number(formatNumber((forVotes / sumVotes) * 100, { fractionDigits: 2 }));
  }, [forVotes, sumVotes]);

  const quorumPercent = Number(formatNumber(Number(quorum) * 100, { fractionDigits: 2 }));

  return (
    <Stack gap="12px" sx={{ padding: '12px 16px', backgroundColor: '#FFFFFF', borderRadius: '16px', ...sx }}>
      <Box>
        <Box display="flex" alignItems="center" justifyContent={'space-between'}>
          <Typography fontWeight={500} fontSize={'12px'}>
            Quorum
          </Typography>
          <Box display="flex" alignItems="center" gap="4px">
            <Typography fontWeight={500} fontSize={'12px'} sx={{ color: '#303030' }}>
              {quorumPercent}%
            </Typography>
            <Typography fontWeight={500} fontSize={'12px'} sx={{ color: '#8C8C8C' }}>
              of 30%
            </Typography>
            <Tooltip
              title={
                <Typography sx={{ fontSize: '12px' }}>
                  The minimum share of For votes required to reach quorum is 30% for this proposal.
                </Typography>
              }
            >
              <IconButton sx={{ padding: 0 }}>
                <InfoIcon sx={{ color: '#8C8C8C', fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <SliderProcess value={quorumPercent} min={0} max={100} marks={[{ value: 40 }]} processColor="#2A7AE6" />
      </Box>

      <Box>
        <Box display="flex" alignItems="center" justifyContent={'space-between'}>
          <Typography fontWeight={500} fontSize={'12px'}>
            Min support
          </Typography>
          <Box display="flex" alignItems="center" gap="4px">
            <Typography fontWeight={500} fontSize={'12px'} sx={{ color: '#303030' }}>
              {minSupport}%
            </Typography>
            <Typography fontWeight={500} fontSize={'12px'} sx={{ color: '#8C8C8C' }}>
              of 51%
            </Typography>
            <Tooltip
              title={
                <Typography sx={{ fontSize: '12px' }}>
                  The minimum support required to pass this proposal is 51%.
                </Typography>
              }
            >
              <IconButton sx={{ padding: 0 }}>
                <InfoIcon sx={{ color: '#8C8C8C', fontSize: '14px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <SliderProcess
          value={minSupport}
          min={0}
          max={100}
          marks={[{ value: 51 }]}
          processColor="#16A34A"
          colorRail="#e45959"
          slotProps={{
            root: {
              style: {
                border: 'none',
                overflow: 'hidden',
              },
            },
            mark: {
              style: {
                backgroundColor: '#ffffff',
                height: '12px',
                width: '3px',
              },
            },
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="4px">
          <Typography fontWeight={700} fontSize={'12px'} color="success.main">
            For
          </Typography>
          <Typography fontWeight={500} fontSize={'12px'} color="#303030">
            {forVotesPercent}%
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="4px">
          <Typography fontWeight={500} fontSize={'12px'} color="#303030">
            {againstVotesPercent}%
          </Typography>
          <Typography fontWeight={700} fontSize={'12px'} color="error.main">
            Against
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
