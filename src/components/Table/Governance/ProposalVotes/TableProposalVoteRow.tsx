import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { BN } from 'src/utils';
import { compactNumber, formatAddress, formatDate, formatNumber } from 'src/utils/format';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import { TVoteData } from './type';
import getChainDetail from 'src/utils/chain';

type TCustomColumn = TVoteData;

type TProps = {
  votesData: TVoteData[];
  sumVotes: number;
};

export default function TableProposalVoteRow(props: TProps) {
  const { votesData, sumVotes } = props;
  const { blockExplorers } = getChainDetail();
  const url = blockExplorers?.default.url || 'https://arbiscan.io';

  const Icon = mapTokenToIcon['TCV'];

  const columns: IColumn<TCustomColumn>[] = [
    {
      id: 'voter',
      renderItem: row => {
        return (
          <Box display="flex" gap={2} alignItems={'center'}>
            <Icon sx={{ fontSize: '40px' }} />
            <Box>
              <Typography fontWeight={600} fontSize={'16px'}>
                {formatAddress(row.voter)}
              </Typography>
              <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
                {formatAddress(row.voter)}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      id: 'choice',
      renderItem: row => {
        if (row.choice === 'for') {
          return (
            <Box display="flex" gap={1} alignItems={'center'}>
              <CheckCircleRoundedIcon
                sx={{
                  color: '#136F45',
                  fontSize: '24px',
                }}
              />
              <Typography>For</Typography>
            </Box>
          );
        }
        return (
          <Box display="flex" gap={1} alignItems={'center'}>
            <CancelRoundedIcon
              sx={{
                color: '#DC2626',
                fontSize: '24px',
              }}
            />
            <Typography>Against</Typography>
          </Box>
        );
      },
    },
    {
      id: 'date',
      renderItem: row => {
        return (
          <>
            <Typography fontWeight={600} fontSize={'16px'}>
              {formatDistanceToNow(new Date(row.date), { addSuffix: true, locale: enUS })}
            </Typography>
            <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
              {formatDate(new Date(row.date), 'MMM d, yyyy')}
            </Typography>
          </>
        );
      },
    },
    {
      id: 'votingPower',
      renderItem: row => {
        return (
          <>
            <Typography fontWeight={600} fontSize={'16px'}>
              {compactNumber(row.votingPower, 2)} ARB
            </Typography>
            <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
              {formatNumber(BN(row.votingPower).div(BN(sumVotes)).times(100), { fractionDigits: 2 })}%
            </Typography>
          </>
        );
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={votesData as unknown as TCustomColumn[]}
      onRowClick={row => {
        window.open(`${url}/address/${row.voter}`, '_blank');
      }}
      tableRowProps={{
        sx: {
          borderBottom: 'none',
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(215, 241, 255, 0.50);',
          },
        },
      }}
    />
  );
}
