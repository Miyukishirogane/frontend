import { Box, Button, Typography } from '@mui/material';
import ModalDelegate from 'src/components/Modals/ModelGovernance/ModalDelegation/ModelDelegate';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { useDelegateSelectValue } from 'src/views/Governance/components/Delegation/state/hook';
import TableCustom from '../../TableCustom/TableCustom';
import { listTitleHeader } from './const';
import TableVotingHistoryRow from './TableVotingHistoryRow';
import { TVotingHistoryData } from './type';

export type TProps = {
  votingHistory: TVotingHistoryData[] | undefined;
  isLoading: boolean;
};
const TableVotingHistory = (props: TProps) => {
  const { openModal } = useModalFunction();
  const delegateSelect = useDelegateSelectValue();
  const { votingHistory, isLoading } = props;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '10px',
          justifyContent: { sm: 'space-between', xs: 'left' },
          alignItems: { sm: 'center', xs: 'flex-start' },
          padding: '20px',
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Voting History</Typography>
        <Button
          variant="gradient"
          onClick={() => {
            openModal({
              title: 'Delegation',
              content: <ModalDelegate address={delegateSelect.address} />,
              modalProps: {
                maxWidth: 'xs',
              },
            });
          }}
        >
          Delegate Voting Power
        </Button>
      </Box>
      <TableCustom
        sxHeaderRow={{
          '& th:first-of-type': { borderTopLeftRadius: '1000px', borderBottomLeftRadius: '1000px' },
          '& th:last-of-type': {
            borderTopRightRadius: '1000px',
            borderBottomRightRadius: '1000px',
          },
        }}
        sx={{
          px: '20px',
        }}
        isLoading={isLoading}
        elevation={0}
        listTitleHeader={listTitleHeader}
        tableName="history_dialog_projeet"
      >
        <TableVotingHistoryRow votingHistory={votingHistory} />
      </TableCustom>
    </>
  );
};

export default TableVotingHistory;
