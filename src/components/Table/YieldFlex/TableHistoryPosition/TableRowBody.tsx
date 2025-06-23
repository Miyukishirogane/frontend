import { Box, Checkbox, Typography } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { TTradingPosition } from 'src/services/api/yieldFlex/tradePosition';
import { BN } from 'src/utils';
import { formatDate, formatNumber } from 'src/utils/format';
import useClaimPosition from 'src/views/YieldFlex/hooks/useClaimPosition';
import useRemovePosition from 'src/views/YieldFlex/hooks/useRemovePosition';
import TableBodyCustom from '../../TableCustom/TableBodyCustom';
import { IColumn } from '../../TableCustom/type';
import { useRef } from 'react';

type TCustomColumn = TTradingPosition & { totalValue: boolean };

type TProps = {
  data: TTradingPosition[];
  handleRemoveSuccess: (index: number) => void;
  handleCheckBoxRow: (index: number) => void;
  checkBoxList: (number | string)[];
};

const TableRowBody = (props: TProps) => {
  const { data, handleRemoveSuccess, handleCheckBoxRow, checkBoxList } = props;
  const { mutateAsync: removeLiquidity, isPending: removeLoading } = useRemovePosition();
  const { mutateAsync: claimLiquidity, isPending: claimLoading } = useClaimPosition();

  const loadingTokenId = useRef<number>();

  const handleRemove = async (tokenId: number) => {
    loadingTokenId.current = tokenId;
    await removeLiquidity({
      tokenIds: [tokenId],
      onSuccess: () => {
        handleRemoveSuccess(tokenId);
      },
    });
  };

  const handleClaim = async (tokenId: number) => {
    loadingTokenId.current = tokenId;
    await claimLiquidity({
      tokenId: tokenId,
      onSuccess: () => {
        handleRemoveSuccess(tokenId);
      },
    });
  };

  const handleDisplayBtn = (tokenId: number, status: string) => {
    if (status === 'PENDING') {
      return (
        <LoadingButton
          props={{
            variant: 'outlined',
            sx: { width: '120px', height: '36px' },
          }}
          loading={loadingTokenId.current === tokenId && removeLoading}
          onClick={() => handleRemove(tokenId)}
        >
          Withdraw
        </LoadingButton>
      );
    }

    if (status === 'CLAIM') {
      return (
        <LoadingButton
          props={{
            variant: 'gradient',
            sx: { width: '120px', height: '36px' },
          }}
          loading={loadingTokenId.current === tokenId && claimLoading}
          onClick={() => handleClaim(tokenId)}
        >
          Claim
        </LoadingButton>
      );
    }

    return <></>;
  };

  const columns: IColumn<TCustomColumn>[] = [
    {
      id: 'checkbox',
      renderItem: (row, index, isItemSelected) => {
        return <Checkbox checked={isItemSelected} value={isItemSelected} />;
      },
    },
    {
      id: 'priceRange',
      renderItem: row => {
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography>Min</Typography>
              <Typography fontWeight={700}>{row.priceRange.minPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', pt: '8px' }}>
              <Typography>Max</Typography>
              <Typography fontWeight={700}>{row.priceRange.maxPrice.toFixed(2)}</Typography>
            </Box>
          </>
        );
      },
    },
    {
      id: 'position',
      tableCellProps: {
        sx: {
          textAlign: 'left',
          verticalAlign: 'center',
          fontWeight: '700',
        },
      },
      renderItem: row => {
        const Icon1 = mapTokenToIcon[row.pool.token0 as keyof typeof mapTokenToIcon] || mapTokenToIcon['ETH'];
        const Icon2 = mapTokenToIcon[row.pool.token1 as keyof typeof mapTokenToIcon] || mapTokenToIcon['USDC'];

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700}>
                <TextSmallNumber value={BN(row.position.amount0)} decimal={4} />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon1 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token0}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700}>
                <TextSmallNumber value={BN(row.position.amount1)} decimal={4} />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon2 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token1}</Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      id: 'stopLoss',
      tableCellProps: {
        sx: {
          textAlign: 'center',
          verticalAlign: 'center',
        },
      },
      renderItem: row => {
        return <Typography sx={{ fontWeight: '700' }}>{formatNumber(row.stopLoss, { fractionDigits: 4 })}</Typography>;
      },
    },
    {
      id: 'reward',
      tableCellProps: {
        sx: {
          textAlign: 'left',
          verticalAlign: 'center',
          fontWeight: '700',
          minWidth: '180px',
        },
      },
      renderItem: row => {
        const Icon1 = mapTokenToIcon[row.pool.token0 as keyof typeof mapTokenToIcon] || mapTokenToIcon['ETH'];
        const Icon2 = mapTokenToIcon[row.pool.token1 as keyof typeof mapTokenToIcon] || mapTokenToIcon['USDC'];

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700} alignItems={'center'} alignContent={'center'}>
                <TextSmallNumber value={BN(row.reward.amount0)} decimal={4} />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon1 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token0}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700}>
                <TextSmallNumber value={BN(row.reward.amount1)} decimal={4} />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon2 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token1}</Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      id: 'totalValue', //total
      tableCellProps: {
        sx: {
          textAlign: 'left',
          verticalAlign: 'center',
          fontWeight: '700',
          minWidth: '180px',
        },
      },
      renderItem: row => {
        const { position, reward } = row;
        const totalValue0 = BN(position.amount0).plus(reward.amount0);
        const totalValue1 = BN(position.amount1).plus(reward.amount1);
        const Icon1 = mapTokenToIcon[row.pool.token0 as keyof typeof mapTokenToIcon] || mapTokenToIcon['ETH'];
        const Icon2 = mapTokenToIcon[row.pool.token1 as keyof typeof mapTokenToIcon] || mapTokenToIcon['USDC'];

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700} alignItems={'center'}>
                <TextSmallNumber value={totalValue0} decimal={4} />
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon1 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token0}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '8px', justifyContent: 'flex-end' }}>
              <Typography fontWeight={700} alignItems={'center'}>
                <TextSmallNumber value={totalValue1} decimal={4} />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon2 />
                <Typography sx={{ fontWeight: '700' }}>{row.pool.token1}</Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      id: 'endtime',
      renderItem: row => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography>{formatDate(row.endtime * 1000, 'HH:mm')}</Typography>
            <Typography>{formatDate(row.endtime * 1000, 'dd/MM/yyyy')}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'action',
      renderItem: row => {
        return handleDisplayBtn(row.tokenId, row.status);
      },
    },
  ];

  return (
    <TableBodyCustom
      columns={columns}
      rows={data as TCustomColumn[]}
      idSelectKey="tokenId"
      selectedIds={checkBoxList}
      onRowClick={row => {
        handleCheckBoxRow(row.tokenId);
      }}
    />
  );
};

export default TableRowBody;
