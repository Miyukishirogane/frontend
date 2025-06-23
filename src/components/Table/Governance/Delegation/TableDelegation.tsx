import { Box, Button } from '@mui/material';
import ModalManageDelegate from 'src/components/Modals/ModelGovernance/ModalDelegation/ModelManageDelegation';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import InputSearch from 'src/views/YieldFlexDashboard/components/Portfolio/InputSearch';
import TableCustom from '../../TableCustom/TableCustom';
import TableDelegationRow from './TableDelegationRow';
import { listTitleHeader } from './const';
import useGetDelegations from './hooks/useGetDelegations';
import useGetDelegated from 'src/views/Governance/components/Delegation/hooks/useGetDelegated';
import { Address } from 'viem';

const TableDelegation = () => {
  const { openModal } = useModalFunction();
  const { listDelegations, isFetching } = useGetDelegations();
  const { delegated, isFetching: isFetchingDelegated } = useGetDelegated();

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
        <InputSearch />
        <Button
          variant="gradient"
          onClick={() => {
            openModal({
              title: 'Manage voting delegation',
              content: <ModalManageDelegate />,
              modalProps: {
                maxWidth: 'xs',
              },
            });
          }}
        >
          Manage Voting Delegation
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
        isLoading={isFetching || isFetchingDelegated}
        elevation={0}
        listTitleHeader={listTitleHeader}
        tableName="history_dialog_projeet"
      >
        <TableDelegationRow listDelegations={listDelegations} delegated={delegated as Address} />
      </TableCustom>
    </>
  );
};

export default TableDelegation;
