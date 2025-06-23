import { Checkbox, FormControlLabel, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useGetTradePosition from 'src/hooks/Projeet/useGetTradePosition';
import { queryClient } from 'src/jotai/AppProvider';
import useRemovePosition from 'src/views/YieldFlex/hooks/useRemovePosition';
import { usePairsAtomValue } from 'src/views/YieldFlex/state/hooks';
import TableCustom, { TTableHeaderCustom } from '../../TableCustom/TableCustom';
import TableRowBody from './TableRowBody';

const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: '',
    isCheckbox: true,
    sx: {
      width: '30px',
    },
  },
  {
    title: 'Price Range',
  },
  {
    title: 'Liquidity',
    sx: { textAlign: 'center', minWidth: '170px' },
  },
  {
    title: 'Stop loss',
  },
  {
    title: 'Reward',
    sx: { textAlign: 'center', minWidth: '170px' },
  },
  {
    title: 'Total',
    sx: { textAlign: 'center', minWidth: '170px' },
  },
  {
    title: 'Expired',
  },
  {
    title: '',
    sx: { maxWidth: '170px' },
  },
];

const TableHistoryPosition = () => {
  const pair = usePairsAtomValue();
  const [filter, setFilter] = useState('');
  const [checkBoxList, setCheckBoxList] = useState<number[]>([]);

  const { mutateAsync: removeLiquidity, isPending: removeLoading } = useRemovePosition();
  const { tradePositions, isLoading, refetch } = useGetTradePosition(filter);

  const isSelected = useMemo(() => {
    return checkBoxList.some(item => item);
  }, [checkBoxList]);

  const handleCheckBoxHeader = (value: boolean) => {
    setCheckBoxList(value ? tradePositions?.map(item => item.tokenId) || [] : []);
  };

  const handleCheckBoxRow = (tokenId: number) => {
    if (checkBoxList.indexOf(tokenId) !== -1) {
      setCheckBoxList(checkBoxList.filter(item => item !== tokenId));
    } else {
      setCheckBoxList(prev => [...prev, tokenId]);
    }
  };

  const handleChangeCheckBox = (checked: boolean) => {
    setFilter(checked ? pair : '');
  };

  const handleRemoveAll = async () => {
    if (!tradePositions) return;
    await removeLiquidity({
      tokenIds: checkBoxList,
      onSuccess: async () => {
        setCheckBoxList([]);
        await refetch();
        await queryClient.invalidateQueries({
          predicate: query => query.queryKey.includes('useGetBalance'),
        });
      },
    });
  };

  useEffect(() => {
    setCheckBoxList([]);
  }, [tradePositions]);

  useEffect(() => {
    if (pair !== filter && filter !== '') {
      setFilter('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair]);

  return (
    <Paper elevation={1} sx={{ mb: 8 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={'8px'}
        sx={{ p: '28px 28px 16px 28px' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="caption2"
          sx={{
            fontSize: '18px',
            color: '#000',
            fontWeight: '600',
            alignSelf: { xs: 'flex-start', sm: 'center' },
          }}
        >
          Current Positions
        </Typography>

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={filter !== ''}
                onChange={(_e, checked) => {
                  handleChangeCheckBox(checked);
                }}
              />
            }
            label={<Typography variant="body2">Hide other pairs</Typography>}
          />
          <LoadingButton
            props={{ variant: 'outlined', sx: { mx: 2, height: '36px' }, disabled: !isSelected }}
            loading={removeLoading}
            onClick={handleRemoveAll}
          >
            Withdraw ({checkBoxList?.length})
          </LoadingButton>
        </Stack>
      </Stack>

      <TableCustom
        isCheckAll={checkBoxList.length > 0 && checkBoxList.length === tradePositions?.length}
        onClickCheckboxHeader={handleCheckBoxHeader}
        isLoading={isLoading}
        listTitleHeader={listTitleHeader}
        tableName="history_dialog_projeet"
      >
        <TableRowBody
          handleRemoveSuccess={tokenId => {
            refetch();
            setCheckBoxList(checkBoxList.filter(item => item !== tokenId));
          }}
          handleCheckBoxRow={handleCheckBoxRow}
          data={tradePositions || []}
          checkBoxList={checkBoxList}
        />
      </TableCustom>
    </Paper>
  );
};

export default TableHistoryPosition;
