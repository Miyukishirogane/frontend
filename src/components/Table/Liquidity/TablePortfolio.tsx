import Help from '@mui/icons-material/Help';
import { Box, Button, Grid, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import ModalLiquidityLending from 'src/components/Modals/ModalLiquidity/ModalLiquidityLending';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';
import useQueryPrice from 'src/hooks/Liquidlity/useQueryPrice';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { TAppChainId } from 'src/jotai/wallet/type';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import useGetUserVaultInfo from 'src/views/Liquidity/LiquidityLending/hooks/useGetUserVaultInfo';
import useGetVaultInfo from 'src/views/Liquidity/LiquidityLending/hooks/useGetVaultInfo';
import { TAccordionVaultLendingState } from 'src/views/Liquidity/LiquidityLending/jotai/type';
import { useChainId } from 'wagmi';
import TableCustom, { TTableHeaderCustom } from '../TableCustom/TableCustom';

const listTitleHeader: TTableHeaderCustom[] = [
  {
    title: 'Assets',
  },
  {
    title: 'APY',
  },
  {
    title: 'Balance',
  },
  {
    title: '',
  },
];

export default function TablePortfolio({
  listVault,
  isLoading,
}: {
  listVault: TAccordionVaultLendingState[];
  isLoading: boolean;
}) {
  const chainId = useChainId();

  return (
    <TableCustom listTitleHeader={listTitleHeader} tableName="lending_portfolio" isLoading={isLoading}>
      {listVault.map((vault, index) => {
        return <TableRowBody vault={vault} chainId={chainId} index={index} key={'portfolio' + vault.addressVault} />;
      })}
    </TableCustom>
  );
}

function TableRowBody({ vault, chainId }: { vault: TAccordionVaultLendingState; chainId: TAppChainId; index: number }) {
  const { openModal } = useModalFunction();
  const { data: vaultInfo, isLoading: loadingVaultInfor } = useGetVaultInfo({ vaultAddress: vault.addressVault });
  const { data: price, isLoading: loadingGetPrice } = useQueryPrice({
    chainId: chainId,
    address: vault.tokenInfo.address,
  });
  const { data } = useGetUserVaultInfo({ vaultAddress: vault.addressVault });
  const symbol = vault.tokenInfo?.symbol;
  const Icon = mapTokenToIcon[symbol as TAppDenom] ?? Help;

  return (
    <TableRow
      sx={{
        borderBottom: 'none',
        cursor: 'pointer',
        '&:hover': {
          background: 'rgba(215, 241, 255, 0.50);',
        },
      }}
    >
      <TableCell
        sx={{
          borderBottom: '10px solid #fff',
          textAlign: 'left',
          verticalAlign: 'top',
          padding: '23px 18.5px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', ml: 2 }}>
          <Icon />
          <Typography sx={{ fontWeight: '700' }}>{symbol}</Typography>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          borderBottom: '10px solid #fff',
          textAlign: 'left',
          verticalAlign: 'top',
          padding: '23px 18.5px',
          fontWeight: '700',
        }}
      >
        {formatNumber(BN(vaultInfo?.apy).times(100), { fractionDigits: 2 })}%
      </TableCell>
      <TableCell
        sx={{
          borderBottom: '10px solid #fff',
          textAlign: 'left',
          verticalAlign: 'top',
          padding: '23px 18.5px',
        }}
      >
        {loadingGetPrice && loadingVaultInfor ? (
          <Skeleton variant="rounded" width={'80px'} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px' }}>
            <Typography sx={{ fontWeight: '700' }}>
              {formatNumber(data?.userDepositedBalance, { fractionDigits: 6 })}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#8C8C8C' }}>
              $ {formatNumber(BN(price).times(BN(data?.userDepositedBalance)), { fractionDigits: 6 })}
            </Typography>
          </Box>
        )}
      </TableCell>
      <TableCell
        sx={{
          borderBottom: '10px solid #fff',
          textAlign: 'left',
          verticalAlign: 'top',
          padding: '23px 18.5px',
          minWidth: '300px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} alignItems={'center'}>
            <Button
              variant="gradient"
              sx={{ width: '120px', height: '36px' }}
              onClick={() => {
                openModal({
                  title: 'Lending',
                  content: <ModalLiquidityLending type="supply" loading={false} vault={vault} />,
                  modalProps: {
                    maxWidth: 'xs',
                    sx: {
                      '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' },
                    },
                  },
                });
              }}
            >
              Supply
            </Button>
          </Grid>
          <Grid item xs={6} alignItems={'center'}>
            <Button
              variant="outlined"
              sx={{ width: '120px', height: '36px' }}
              onClick={() => {
                openModal({
                  title: 'Lending',
                  content: <ModalLiquidityLending type="withdraw" loading={false} vault={vault} />,
                  modalProps: {
                    maxWidth: 'xs',
                    sx: {
                      '&& .MuiDialogTitle-root': { backgroundColor: 'white', paddingBottom: '0px' },
                    },
                  },
                });
              }}
            >
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
