import { Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import { TVotingHistoryData } from './type';
import { mapPresetProposalInfo } from 'src/views/Governance/components/Proposal/const';

type TCustomColumn = TVotingHistoryData;

type TProps = {
  votingHistory: TVotingHistoryData[] | undefined;
};

export default function TableVotingHistoryRow(props: TProps) {
  const { votingHistory } = props;

  const columns: IColumn<TCustomColumn>[] = [
    {
      id: 'proposalId',
      renderItem: row => {
        const title = mapPresetProposalInfo[row.index].shortDes;

        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {title}
          </Typography>
        );
      },
    },
    {
      id: 'vote',
      renderItem: row => {
        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {row.vote}
          </Typography>
        );
      },
    },
    {
      id: 'action',
      tableCellProps: {
        sx: {
          textAlign: 'center',
          verticalAlign: 'center',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderItem: row => {
        return <Link to={`/governance/${row.index}/${row.proposalId}`}>View Proposal</Link>;
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={votingHistory as unknown as TCustomColumn[]}
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
