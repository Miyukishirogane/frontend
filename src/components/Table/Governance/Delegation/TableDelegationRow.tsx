import { Button, Typography } from '@mui/material';
import ModalDelegate from 'src/components/Modals/ModelGovernance/ModalDelegation/ModelDelegate';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { BN } from 'src/utils';
import { compactNumber, formatAddress } from 'src/utils/format';
import useFunctionDelegation from 'src/views/Governance/components/Delegation/hooks/useFunctionDelegation';
import { useSetDelegateSelect } from 'src/views/Governance/components/Delegation/state/hook';
import { Address } from 'viem';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import { TDelegationData } from './type';
import { governanceTokenInfo } from 'src/views/Governance/const';

type TCustomColumn = TDelegationData;

type TProps = {
  listDelegations: TDelegationData[] | undefined;
  delegated: Address;
};

export default function TableDelegationRow(props: TProps) {
  const { listDelegations, delegated } = props;

  const { openModal } = useModalFunction();
  const setDelegateSelect = useSetDelegateSelect();
  const { undelegate } = useFunctionDelegation();
  const { decimal } = governanceTokenInfo['TCV'];
  const columns: IColumn<TCustomColumn>[] = [
    {
      id: 'address',
      renderItem: row => {
        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {formatAddress(row.address)}
          </Typography>
        );
      },
    },
    {
      id: 'voting_power',
      renderItem: row => {
        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {compactNumber(BN(row.voting_power).div(`1e${decimal}`).toString(), 2)}
          </Typography>
        );
      },
    },
    {
      id: 'num_delegator',
      renderItem: row => {
        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {row.num_delegator}
          </Typography>
        );
      },
    },
    {
      id: 'quorum',
      renderItem: row => {
        return (
          <Typography fontSize={'14px'} color="#828282" sx={{ mt: 1 }}>
            {row.quorum}%
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
        if (delegated?.toLocaleLowerCase() === row.address.toLocaleLowerCase()) {
          return (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                undelegate();
              }}
            >
              Undelegate
            </Button>
          );
        }

        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              openModal({
                title: 'Delegation',
                content: <ModalDelegate address={row.address} />,
                modalProps: {
                  maxWidth: 'xs',
                },
              });
            }}
          >
            Delegate
          </Button>
        );
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={listDelegations as unknown as TCustomColumn[]}
      onRowClick={row => {
        setDelegateSelect(row);
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
