import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { TDcaHistory } from 'src/services/api/yieldFlex/dcaHistory';
import { formatNumber } from 'src/utils/format';
import useCancelAutoDca from 'src/views/YieldFlex/hooks/useCancelAutoDca';
import { Address } from 'viem';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import TableHistoryInModal from '../TableHistoryInModal/TableHistoryInModal';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { BN } from 'src/utils';
import { useState } from 'react';
import { findProjeetTokenByAddress } from 'src/views/YieldFlex/utils';
import { useChainId } from 'wagmi';

type TCustomColumn = TDcaHistory;
interface IProps {
  data: TDcaHistory[];
  // headerLength: number;
}

const TableRowBody = (props: IProps) => {
  const { data } = props;
  const { mutateAsync, isPending } = useCancelAutoDca();
  const chainId = useChainId();

  const [loadingIndex, setLoadingIndex] = useState(0);

  const handleCancel = async (data: TDcaHistory, index: number) => {
    setLoadingIndex(index);
    await mutateAsync({ data });
  };

  const columns: IColumn<TCustomColumn>[] = [
    {
      id: 'tokenInAmountInit',
      tableCellProps: {
        sx: {
          textAlign: 'right',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        const tokenInInfo = findProjeetTokenByAddress(row.tokenInAddress as Address, chainId);
        const TokenInIcon = tokenInInfo?.icon || mapTokenToIcon.ETH;

        return (
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'right' }}>
            <Typography fontWeight={700}>{row.tokenInAmountInit}</Typography>
            <TokenInIcon />
            <Typography sx={{ fontWeight: '700' }}>{tokenInInfo?.tokenName}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'tokenOutAmount',
      tableCellProps: {
        sx: {
          textAlign: 'right',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        const tokenOutInfo = findProjeetTokenByAddress(row.tokenOutAddress as Address, chainId);
        const TokenOutIcon = tokenOutInfo?.icon || mapTokenToIcon.ETH;

        return (
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'right' }}>
            <Typography sx={{ fontWeight: '700', alignItems: 'center', display: 'flex', gap: 0.5 }}>
              <TextSmallNumber value={BN(row.tokenOutAmount)} decimal={6} fallbackDisplay="0" />
              <TokenOutIcon />
            </Typography>

            <Typography sx={{ fontWeight: '700' }}>{tokenOutInfo?.tokenName}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'averagePrice',
      tableCellProps: {
        sx: {
          textAlign: 'center',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        return <Typography>{formatNumber(row.averagePrice, { fractionDigits: 2, fallback: 0 })}</Typography>;
      },
    },
    {
      id: 'pnl',
      tableCellProps: {
        sx: {
          textAlign: 'center',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        const { pnl, pnlPercent } = row;

        return (
          <Typography color={pnl >= 0 ? '#136F45' : '#DC2626'} textAlign={'center'}>
            {pnl > 0 && '+'}
            {pnl < 0 && '-'}
            {'$' + formatNumber(Math.abs(pnl), { fractionDigits: 4, fallback: 0 })} [{' '}
            {formatNumber(pnlPercent, { fractionDigits: 4, fallback: 0 })}% ]
          </Typography>
        );
      },
    },
    {
      id: 'nextRoundAt',
      tableCellProps: {
        sx: {
          textAlign: 'center',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        const nextRound = row.status === 0 ? new Date(row.nextRoundAt * 1000) : null;

        return (
          <Typography>
            {nextRound ? formatDistanceToNow(nextRound, { addSuffix: true, locale: enUS }) : '- -'}
          </Typography>
        );
      },
    },
    {
      id: 'currentRound',
      tableCellProps: {
        sx: {
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        return (
          <Typography fontWeight={700}>
            {row.currentRound}/{row.totalRound}
          </Typography>
        );
      },
    },
    {
      id: 'action',
      renderItem: (row, index, _isItemSelected, isCollapse) => {
        return (
          <Stack direction={'row'} gap={1} alignItems={'center'} justifyContent={'flex-end'}>
            {row.status === 0 && (
              <LoadingButton
                props={{
                  variant: 'outlined',
                  sx: { height: '36px' },
                }}
                loading={isPending && loadingIndex === index}
                onClick={() => handleCancel(row, index)}
              >
                Cancel
              </LoadingButton>
            )}

            <ExpandMoreIcon sx={{ rotate: isCollapse ? '180deg' : '0deg' }} />
          </Stack>
        );
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={data as TCustomColumn[]}
      tableRowProps={{
        sx: {
          borderBottom: 'none',
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(215, 241, 255, 0.50);',
          },
        },
      }}
      collapseContent={row => {
        const tokenInInfo = findProjeetTokenByAddress(row.tokenInAddress as Address, chainId);
        const tokenOutInfo = findProjeetTokenByAddress(row.tokenOutAddress as Address, chainId);

        return (
          <>
            <Divider />
            <TableHistoryInModal
              data={row}
              dcaId={row.id.toString()}
              tokenInInfo={tokenInInfo}
              tokenOutInfo={tokenOutInfo}
              currentPrice={row.currentPrice}
            />
          </>
        );
      }}
    />
  );
};

export default TableRowBody;
