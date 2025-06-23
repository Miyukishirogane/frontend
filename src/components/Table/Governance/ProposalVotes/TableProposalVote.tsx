import TableCustom from '../../TableCustom/TableCustom';
import { listTitleHeader } from './const';
import TableProposalVoteRow from './TableProposalVoteRow';
import { TVoteData } from './type';

type TProps = {
  votesData: TVoteData[] | undefined;
  isLoading: boolean;
  sumVotes: number;
};
const TableProposalVote = (props: TProps) => {
  const { votesData, isLoading, sumVotes } = props;

  return (
    <TableCustom
      sxHeaderRow={{
        '& th:first-of-type': { borderTopLeftRadius: '1000px', borderBottomLeftRadius: '1000px' },
        '& th:last-of-type': {
          borderTopRightRadius: '1000px',
          borderBottomRightRadius: '1000px',
        },
      }}
      isLoading={isLoading}
      elevation={0}
      listTitleHeader={listTitleHeader}
      tableName="history_dialog_projeet"
    >
      <TableProposalVoteRow votesData={votesData || []} sumVotes={sumVotes} />
    </TableCustom>
  );
};

export default TableProposalVote;
