import ClearRounded from '@mui/icons-material/ClearRounded';
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  DialogContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Checkbox,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import BtnGroup from './ModalPortfolioEar/BtnGroup';
import ModalClaimContent from './ModalPortfolioEar/ModalClaimContent';
import {
  useModalPortfolioClaimAll,
  useModalPortfolioClaimAllFunction,
} from 'src/jotai/modals/ModalPortfolioClaimAll/ModalPortfolioClaimAll';
import IconDropdownIndicator from 'src/assets/IconDropdownIndicator';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { Err_NotConnectWallet } from 'src/constants';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { writeContract } from 'wagmi/actions';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { IDataCheckBoxItem } from 'src/views/Portfolio/type';
import { Address } from 'viem';

const dataHeader = [
  {
    id: 0,
    title: '',
  },
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

const ModalPortfolioClaimAll = () => {
  const { chainIdSelected } = useSwitchToSelectedChain();
  const { address } = useAccount();
  const { listPendlePortfolio: listPendle } = usePendleData();
  const { getMarketInfo } = usePendleFunction();
  const { closeModal } = useModalPortfolioClaimAllFunction();
  const modal = useModalPortfolioClaimAll();

  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<IDataCheckBoxItem[]>([]);

  //Cuz listPendle has both YT and addressMarket in 1 item
  const isCheckAll = selectedItems.length === listPendle.length * 2;

  const totalClaim = useMemo(() => {
    const listSelectedPendle = listPendle.filter(item => {
      return (
        selectedItems.findIndex(
          selectedItem => selectedItem.value === item.YT || selectedItem.value === item.marketAddress,
        ) >= 0
      );
    });

    return listSelectedPendle
      .map(item => {
        return BN(item?.assetInterest !== 'NaN' && item?.assetInterest ? item.assetInterest : '0')
          .multipliedBy(BN(item?.price))
          .dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`));
      })
      .reduce((sum, item) => sum.plus(item), BN(0));
  }, [chainIdSelected, listPendle, selectedItems]);

  const handleClaim = async () => {
    setLoading(true);
    const idNotify = toast.loading('claim!');
    if (!selectedItems.length) return;

    try {
      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;

      const yts = selectedItems.filter(item => item.type === 'YT').map(item => item.value as Address);
      //const poolAddress  = selectedItems.filter((item) => item.type === 'LP').map((item) => item.value as Address);

      const response = await writeContract(configEvmChain, {
        abi: abiIAllAction,
        address: TCVMARKETROUTER,
        functionName: 'redeemDueInterestAndRewards',
        args: [address, [], yts, []],
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
  };

  const handleSelectItem = (key: string, value: string) => {
    const isItemSelected = selectedItems.findIndex(item => item.value === value) >= 0;

    if (isItemSelected) {
      setSelectedItems(prev => prev.filter(item => item.value !== value));
    } else {
      setSelectedItems(prev => [...prev, { type: key, value: value }]);
    }
  };

  const handleSelectAll = () => {
    if (isCheckAll) {
      setSelectedItems([]);
    } else {
      const result = [] as IDataCheckBoxItem[];
      listPendle.forEach(item => {
        if (Number(item.ytPosition)) {
          result.push({
            type: 'YT',
            value: item.YT,
          });
        }

        if (Number(item.lpPosition)) {
          result.push({
            type: 'LP',
            value: item.marketAddress,
          });
        }
      });

      setSelectedItems(result);
    }
  };

  return (
    <Dialog
      fullWidth
      open={modal.open}
      maxWidth={modal.modalProps?.maxWidth || 'xsm'}
      TransitionProps={{
        onExited: () => {
          setSelectedItems([]);
        },
      }}
      {...modal.modalProps}
    >
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
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer
              id="scrollTable"
              sx={{
                '&&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&&::-webkit-scrollbar-track': {
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
                        {item.id === 0 ? (
                          <Checkbox checked={isCheckAll} onChange={handleSelectAll} />
                        ) : (
                          <TableSortLabel
                            style={{ flexDirection: 'row-reverse' }}
                            IconComponent={() => <IconDropdownIndicator />}
                          >
                            {item?.title}
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listPendle.map(item => {
                    return (
                      <ModalClaimContent
                        dataModalClaim={item}
                        key={item.name}
                        handleChangeCheckbox={handleSelectItem}
                        isUseCheckBox={true}
                        selectedItems={selectedItems}
                      />
                    );
                  })}
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
                <TextSmallNumber value={totalClaim} />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <LoadingButton
              props={{
                variant: 'gradient',
                fullWidth: true,
                disabled: !selectedItems.length,
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
      </DialogContent>
    </Dialog>
  );
};

export default ModalPortfolioClaimAll;
