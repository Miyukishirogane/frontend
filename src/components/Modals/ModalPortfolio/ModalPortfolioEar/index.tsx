import ClearRounded from '@mui/icons-material/ClearRounded';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IconSpinLoading } from 'src/assets/icon';
import { Err_NotConnectWallet } from 'src/constants';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import useAccount from 'src/hooks/useAccount';
import {
  useModalPortfolioEar,
  useModalPortfolioEarFunction,
} from 'src/jotai/modals/ModalPortfolioEar/ModalPortfolioEar';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { writeContract } from 'wagmi/actions';
import ErrorExeTransaction from '../../../ErrorExeTransaction/ErrorExeTransaction';
import LoadingButton from '../../../LoadingButton/LoadingButton';
import RenderNofifySuccess from '../../../RenderNofifySuccess/RenderNofifySuccess';
import TextSmallNumber from '../../../TextSmallNumber/TextSmallNumber';
import BtnGroup from './BtnGroup';
import ModalClaimContent from './ModalClaimContent';
import IconDropdownIndicator from 'src/assets/IconDropdownIndicator';

export default function ModalPortfolioEar() {
  // table header
  const dataHeader = [
    {
      id: 1,
      title: 'Position',
    },
    {
      id: 2,
      title: 'Token',
    },
    {
      id: 3,
      title: 'Claimable',
    },
    {
      id: 4,
      title: 'Amount',
    },
  ];

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const { chainIdSelected } = useSwitchToSelectedChain();
  const { dataModalClaim, loadingModal } = usePendleData();
  const modal = useModalPortfolioEar();
  const { closeModal } = useModalPortfolioEarFunction();
  const { getMarketInfo } = usePendleFunction();

  // Claim
  async function handleClaim() {
    setLoading(true);
    const idNotify = toast.loading('claim!');
    try {
      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;

      // data
      // const sys = listPendle.map(item => item.SY)
      // const yts = listPendle.map((item) => item.YT);
      const yts = dataModalClaim?.YT;
      // const marketadd = listPendle.map(item => item.marketAddress)

      const response = await writeContract(configEvmChain, {
        abi: abiIAllAction,
        address: TCVMARKETROUTER,
        functionName: 'redeemDueInterestAndRewards',
        args: [address, [], [yts], []],
        chainId: chainIdSelected,
      });
      toast.update(idNotify, {
        render: <RenderNofifySuccess hash={response} />,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      () => {
        getMarketInfo();
        closeModal();
      };
    } catch (err) {
      toast.update(idNotify, {
        render: <ErrorExeTransaction error={err} />,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
    }
    setLoading(false);
  }

  return (
    <Dialog fullWidth open={modal.open} maxWidth={modal.modalProps?.maxWidth || 'xsm'} {...modal.modalProps}>
      <DialogTitle sx={{ backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', color: '#303030', mb: '12px' }}>
          {typeof modal.title == 'string' ? <Typography variant="h5">{modal.title}</Typography> : modal.title}
          <ClearRounded
            sx={{ ml: 'auto', cursor: 'pointer', fontSize: '20px', color: '#2465DE' }}
            onClick={() => {
              closeModal();
            }}
          />
        </Box>
        <BtnGroup />
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'white' }}>
        {loadingModal ? (
          <Box>
            <IconSpinLoading sx={{ fontSize: '100px' }} />
          </Box>
        ) : (
          <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer
                id="scrollTable"
                sx={{
                  '&&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&&::-webkit-scrollbar-track': {
                    // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  },
                  '&&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    outline: '1px solid slategrey',
                  },
                  position: 'inherit',
                  overflowX: 'scroll',
                }}
              >
                <Table stickyHeader={true} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {dataHeader.map(item => (
                        <TableCell
                          key={item?.id}
                          sx={{
                            background: '#fff',
                            textAlign: 'left',
                            color: '#828282',
                            fontSize: '14px',
                            padding: '22px 18.5px',
                            borderBottom: '1px solid #D6D6D6',
                          }}
                        >
                          <TableSortLabel
                            // active={orderBy === propertyName}
                            // direction={orderBy === propertyName ? sortDirection : "asc"}
                            // onClick={() => onSort(propertyName)}
                            // hideSortIcon={orderBy === propertyName}
                            style={{ flexDirection: 'row-reverse' }}
                            IconComponent={() => <IconDropdownIndicator />}
                          >
                            {item?.title}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ModalClaimContent dataModalClaim={dataModalClaim} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Box sx={{ marginTop: '36px', marginBottom: '36px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption2" sx={{ fontSize: '14px', color: '#828282' }}>
                Total Claiming
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  fontSize: '12px',
                  color: 'rgba(140, 140, 140, 1)',
                  placeItems: 'center',
                  gap: 0.5,
                }}
              >
                <Typography variant="caption2" sx={{ fontSize: '20px', color: '#303030', fontWeight: '600' }}>
                  <TextSmallNumber
                    value={BN(dataModalClaim?.assetInterest || '0')
                      .dividedBy(
                        BN(`1e${marketTokensPendle[chainIdSelected][dataModalClaim?.name || 'eEth']?.decimal || 1}`),
                      )
                      .multipliedBy(BN(dataModalClaim?.price || '1'))}
                  />
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <LoadingButton
                props={{
                  variant: 'gradient',
                  fullWidth: true,
                }}
                onClick={handleClaim}
                loading={loading}
              >
                Claim
              </LoadingButton>
              <LoadingButton
                props={{
                  variant: 'outlined',
                  fullWidth: true,
                }}
                onClick={closeModal}
              >
                Cancel
              </LoadingButton>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
