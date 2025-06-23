import { useState } from 'react';
import {
  Paper,
  TableHead,
  TableSortLabel,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';
import Help from '@mui/icons-material/Help';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { contractAddress, configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { abiIAllAction } from 'src/jotai/wallet/abi/IAllAction';
import { Err_NotConnectWallet } from 'src/constants';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import { toast } from 'react-toastify';
import { writeContract } from 'wagmi/actions';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { useChainId } from 'wagmi';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import useAccount from 'src/hooks/useAccount';

export default function ContentTable() {
  // state
  const [loading, setLoading] = useState<boolean>(false);

  // state jotai
  const { address } = useAccount();
  const chainIdSelected = useChainId();
  const { userPositions, listPendle, useUSD, DetailPendetail } = usePendleData();
  const { UpdateAllKeyPendle } = usePendleFunction();

  // table header
  const dataHeader = [
    {
      id: 1,
      title: 'Name',
    },
    {
      id: 2,
      title: 'APY',
    },
    {
      id: 3,
      title: 'Position Value',
    },
    {
      id: 4,
      title: 'Claimable Yield',
    },
  ];

  // token
  const poolName = DetailPendetail?.name as TAppDenom;
  const IconToken = mapTokenToIcon[poolName] ?? Help;
  const IconPoolToken =
    DetailPendetail && DetailPendetail.name
      ? marketTokensPendle[chainIdSelected][DetailPendetail?.name]?.icon
      : mapTokenToIcon.ETH;

  // Claim
  async function handleClaim() {
    setLoading(true);
    const idNotify = toast.loading('claim!');
    try {
      if (!address) throw Err_NotConnectWallet;
      const TCVMARKETROUTER = contractAddress[chainIdSelected].TCV_MARKET_ROUTER;

      // data
      const yts = listPendle.map(item => item.YT);

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
    <Box
      sx={{
        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
        borderRadius: '20px',
        padding: '28px',
        mt: '20px',
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption2" sx={{ fontSize: '18px', color: '#000', fontWeight: '600' }}>
          My positions
        </Typography>
        <Box sx={{ display: 'flex', fontSize: '12px', color: '#000', placeItems: 'center', gap: 0.5 }}>
          <ToggleButtonGroup
            color="primary"
            value={useUSD ? 'USD' : 'Underlying'}
            exclusive
            onChange={() => {}}
            aria-label="Platform"
            sx={{
              padding: '4px',
              height: 'auto',
              borderRadius: '24px',
              background: '#F1F1F1',
              '&.MuiTouchRipple-root': {
                display: 'none',
              },
              '&& .Mui-selected': {
                backgroundColor: '#fff!important',
                color: '#303030!important',
                borderRadius: '24px',
              },
              '&& .Mui-selected:hover': {
                backgroundColor: '#fff!important',
                color: '#303030!important',
                borderRadius: '24px',
              },
            }}
          >
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              onClick={() => {
                if (!useUSD) {
                  UpdateAllKeyPendle('useUSD', true);
                }
              }}
              value="USD"
            >
              USD
            </ToggleButton>
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff !important',
                  color: '#303030 !important',
                },
              }}
              onClick={() => {
                if (useUSD) {
                  UpdateAllKeyPendle('useUSD', false);
                }
              }}
              value="Underlying"
            >
              Underlying
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        <Table stickyHeader={true} aria-label="customized table" sx={{ mt: '36px' }}>
          <TableHead>
            <TableRow>
              {dataHeader.map(item => (
                <TableCell
                  key={item?.id}
                  sx={{
                    background: 'rgba(231, 235, 239, 0.50)',
                    textAlign: 'left',
                    color: '#828282',
                    fontSize: '14px',
                    borderBottom: 'none',
                    padding: '11px 18.5px',
                  }}
                >
                  <TableSortLabel
                  // active={orderBy === propertyName}
                  // direction={orderBy === propertyName ? sortDirection : "asc"}
                  // onClick={() => onSort(propertyName)}
                  // hideSortIcon={orderBy === propertyName}
                  // style={{ flexDirection: 'row-reverse' }}
                  >
                    {item?.title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                borderBottom: 'none',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(215, 241, 255, 0.50);',
                },
              }}
            >
              <TableCell sx={{ padding: '11px 18.5px', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconToken sx={{ width: '35px', height: '35px' }} />
                  <span style={{ marginLeft: '16px', fontWeight: '700' }}>LP</span>
                </div>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>Unknown</span>
                <br />
                <span style={{ color: '#8C8C8C' }}>Unknown</span>
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>
                  {useUSD ? (
                    <>
                      <TextSmallNumber
                        value={BN(userPositions?.lpPosition)
                          .multipliedBy(BN(DetailPendetail?.price || '1'))
                          .dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        contentBeforeValue="$"
                      />
                    </>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <div style={{ width: '50px', display: 'flex', justifyContent: 'flex-end' }}>
                        <TextSmallNumber
                          value={BN(userPositions?.lpPosition).dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        />
                      </div>

                      <div style={{ marginLeft: '12px', display: 'flex' }}>
                        {IconPoolToken ? <IconPoolToken fontSize="small" height="100%" /> : null}
                      </div>
                    </Box>
                  )}
                </span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>Unknown</span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: 'none',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(215, 241, 255, 0.50);',
                },
              }}
            >
              <TableCell sx={{ padding: '11px 18.5px', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconToken sx={{ width: '35px', height: '35px' }} />
                  <span style={{ marginLeft: '16px', fontWeight: '700' }}>PT</span>
                </div>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}></span>
                <br />
                <span style={{ color: '#8C8C8C' }}></span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>
                  {useUSD ? (
                    <>
                      <TextSmallNumber
                        value={BN(userPositions?.ptPosition)
                          .multipliedBy(BN(DetailPendetail?.price || '1'))
                          .dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        contentBeforeValue="$"
                      />
                    </>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <div style={{ width: '50px', display: 'flex', justifyContent: 'flex-end' }}>
                        <TextSmallNumber
                          value={BN(userPositions?.ptPosition).dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        />
                      </div>
                      <div style={{ marginLeft: '12px', display: 'flex' }}>
                        {IconPoolToken ? <IconPoolToken fontSize="small" height="100%" /> : null}
                      </div>
                    </Box>
                  )}
                </span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}></span>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: 'none',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(215, 241, 255, 0.50);',
                },
              }}
            >
              <TableCell sx={{ padding: '11px 18.5px', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconToken sx={{ width: '35px', height: '35px' }} />
                  <span style={{ marginLeft: '16px', fontWeight: '700' }}>YT</span>
                </div>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}></span>
                <br />
                <span style={{ color: '#8C8C8C' }}></span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>
                  {useUSD ? (
                    <>
                      <TextSmallNumber
                        value={BN(userPositions?.ytPosition)
                          .multipliedBy(BN(DetailPendetail?.price || '1'))
                          .dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        contentBeforeValue="$"
                      />
                    </>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <div style={{ width: '50px', display: 'flex', justifyContent: 'flex-end' }}>
                        <TextSmallNumber
                          value={BN(userPositions?.ytPosition).dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        />
                      </div>
                      <div style={{ marginLeft: '12px', display: 'flex' }}>
                        {IconPoolToken ? <IconPoolToken fontSize="small" height="100%" /> : null}
                      </div>
                    </Box>
                  )}
                </span>
              </TableCell>
              <TableCell sx={{ textAlign: 'left', padding: '11px 18.5px', border: 'none' }}>
                <span style={{ fontWeight: '700' }}>
                  {useUSD ? (
                    <>
                      <TextSmallNumber
                        value={BN(userPositions?.assetInterest)
                          .multipliedBy(BN(DetailPendetail?.price || '1'))
                          .dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        contentBeforeValue="$"
                      />
                    </>
                  ) : (
                    <>
                      <Box display="flex" alignItems="center">
                        <TextSmallNumber
                          value={BN(userPositions?.assetInterest).dividedBy(
                            `1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || 1}`,
                          )}
                        />
                        <div style={{ marginLeft: '12px', display: 'flex' }}>
                          {IconPoolToken ? <IconPoolToken fontSize="small" height="100%" /> : null}
                        </div>
                      </Box>
                    </>
                  )}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <LoadingButton
        props={{
          variant: 'gradient',
          fullWidth: true,
          sx: { marginTop: '36px' },
          // disabled: (!address || parseFloat(MintData?.netSyIn || '0') <= 0) ? true : false
        }}
        onClick={handleClaim}
        loading={loading}
      >
        Claim All
      </LoadingButton>
    </Box>
  );
}
