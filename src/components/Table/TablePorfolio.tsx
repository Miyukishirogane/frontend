import Help from '@mui/icons-material/Help';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { mapTokenToIcon, marketTokensPendle, TAppDenom } from 'src/constants/mapTokenToIcon';
import { useModalPortfolioEarFunction } from 'src/jotai/modals/ModalPortfolioEar/ModalPortfolioEar';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { TPendleState } from 'src/jotai/pendle/type';
import { BN } from 'src/utils';
import { formatDate } from 'src/utils/format';
import { useChainId } from 'wagmi';
import TextSmallNumber from '../TextSmallNumber/TextSmallNumber';
import TooltipReward from '../Tooltip/TooltipReward';
import SkeletonTableBody from './TableLoading/SkeletonTableBody';
import { handleCalcPoolAPY } from 'src/views/Pool/utils/utils';

export default function TablePorfolio() {
  // state
  const chainIdSelected = useChainId();

  // modal
  const { openModal } = useModalPortfolioEarFunction();

  // state jotai
  const { listPendlePortfolio: listPendle, loading, error, useUSD } = usePendleData();
  const { addDataModalClaim, UpdateAllKeyPendle } = usePendleFunction();

  // state
  const [tabsHeader, setTabsHeader] = useState<string>('0');
  const [dataRender, setDataRender] = useState<TPendleState[]>([]);

  // table header
  const dataHeader = [
    {
      id: 0,
      title: 'Assets',
    },
    {
      id: 1,
      title: 'Active Positions',
    },
    {
      id: 2,
      title: 'Total Position Value',
    },
    {
      id: 3,
      title: 'LP APY',
    },
    {
      id: 4,
      title: 'Claimable Yield',
    },
  ];

  const handleHideRow = (item: TPendleState) => {
    return (
      BN(item.lpPosition).isLessThanOrEqualTo(BN('0')) &&
      BN(item.ytPosition).isLessThanOrEqualTo(BN('0')) &&
      BN(item.ptPosition).isLessThanOrEqualTo(BN('0'))
    );
  };

  // useEffect
  useEffect(() => {
    if (tabsHeader === '2') {
      setDataRender(listPendle.filter(item => !BN(item?.ytPosition).isLessThanOrEqualTo(BN('0'))));
    } else if (tabsHeader === '1') {
      setDataRender(listPendle.filter(item => !BN(item?.ptPosition).isLessThanOrEqualTo(BN('0'))));
    } else if (tabsHeader === '3') {
      setDataRender(listPendle.filter(item => !BN(item?.lpPosition).isLessThanOrEqualTo(BN('0'))));
    } else {
      setDataRender(listPendle);
    }
  }, [tabsHeader]);

  // set dataRender
  useEffect(() => {
    setDataRender(listPendle);
  }, [loading]);

  // icon sort dropdown
  const DropdownIndicator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
      <path
        onClick={() => console.log('1')}
        d="M14.7873 6.86904L12.2461 4.32779L10.6944 2.7682C10.0373 2.11112 8.96856 2.11112 8.31148 2.7682L4.21064 6.86904C3.67231 7.40737 4.06023 8.3257 4.81231 8.3257H9.25356H14.1856C14.9456 8.3257 15.3256 7.40737 14.7873 6.86904Z"
        fill="#828282"
      />
      <path
        onClick={() => console.log('2')}
        d="M14.1854 11.7754H9.25329H4.81204C4.05204 11.7754 3.67204 12.6937 4.21037 13.2321L8.3112 17.3329C8.96829 17.99 10.037 17.99 10.6941 17.3329L12.2537 15.7733L14.795 13.2321C15.3254 12.6937 14.9454 11.7754 14.1854 11.7754Z"
        fill="#828282"
      />
    </svg>
  );

  return (
    <>
      {error ? (
        <Box>
          <Typography>{error.message || 'Error!!'}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
            borderRadius: '20px',

            mt: '20px',
            backgroundColor: '#fff',
          }}
        >
          <Typography
            variant="caption2"
            sx={{ padding: '28px 28px 16px 28px', fontSize: '18px', color: '#000', fontWeight: '600' }}
          >
            My positions
          </Typography>
          <Box
            sx={{
              padding: '0 28px 28px 28px',
              marginBottom: '8px',
              display: {
                xs: 'block',
                xsm: 'flex',
              },
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                fontSize: '12px',
                color: '#000',
                placeItems: 'center',
                gap: 0.5,
                marginBottom: {
                  xs: '16px',
                  xsm: '0px',
                },
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={tabsHeader}
                exclusive
                onChange={() => {}}
                aria-label="Platform"
                sx={{
                  height: 'auto',
                  borderRadius: '24px',
                  background: '#fff',
                  '&.MuiTouchRipple-root': {
                    display: 'none',
                  },
                  '&& .Mui-selected': {
                    backgroundColor: 'rgba(36, 101, 222, 1)',
                    color: 'white',
                    borderRadius: '24px',
                  },
                  '&& .Mui-selected:hover': {
                    backgroundColor: 'rgba(36, 101, 222, 1)',
                    color: 'white',
                    borderRadius: '24px',
                  },
                }}
              >
                <ToggleButton
                  sx={{
                    padding: '9px 16px',
                    borderRadius: '24px',
                    border: 'none',
                    height: 'auto',
                    '&.MuiTouchRipple-root': {
                      display: 'none',
                    },
                    fontSize: '14px',
                  }}
                  onClick={() => setTabsHeader('0')}
                  value="0"
                >
                  All Assets
                </ToggleButton>
                <ToggleButton
                  sx={{
                    padding: '9px 16px',
                    borderRadius: '24px',
                    border: 'none',
                    height: 'auto',
                    '&.MuiTouchRipple-root': {
                      display: 'none',
                    },
                    fontSize: '14px',
                  }}
                  onClick={() => setTabsHeader('1')}
                  value="1"
                >
                  PT
                </ToggleButton>
                <ToggleButton
                  sx={{
                    padding: '9px 16px',
                    borderRadius: '24px',
                    border: 'none',
                    height: 'auto',
                    '&.MuiTouchRipple-root': {
                      display: 'none',
                    },
                    fontSize: '14px',
                  }}
                  onClick={() => setTabsHeader('2')}
                  value="2"
                >
                  YT
                </ToggleButton>
                <ToggleButton
                  sx={{
                    padding: '9px 16px',
                    borderRadius: '24px',
                    border: 'none',
                    height: 'auto',
                    '&.MuiTouchRipple-root': {
                      display: 'none',
                    },
                    fontSize: '14px',
                  }}
                  onClick={() => setTabsHeader('3')}
                  value="3"
                >
                  LP
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
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
                    padding: '9px 16px',
                    borderRadius: '24px',
                    border: 'none',
                    height: 'auto',
                    '&.MuiTouchRipple-root': {
                      display: 'none',
                    },
                    fontSize: '14px',
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
                    padding: '9px 16px',
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
                    fontSize: '14px',
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
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer id="table-portfolio">
              <Table stickyHeader={true} aria-label="customized table">
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
                          padding: '23px 18.5px',
                          width: 'max-content',
                        }}
                      >
                        <TableSortLabel
                          style={{ flexDirection: 'row-reverse', width: 'max-content' }}
                          IconComponent={() => <DropdownIndicator />}
                        >
                          {item?.title}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataRender ? (
                    dataRender.map(item => {
                      const IconToken = mapTokenToIcon[item?.name as TAppDenom] ?? Help;
                      if (handleHideRow(item)) {
                        return null;
                      }

                      return (
                        <TableRow
                          key={item?.marketAddress}
                          sx={{
                            borderBottom: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                              background: 'rgba(215, 241, 255, 0.50);',
                            },
                          }}
                          onClick={() => {
                            addDataModalClaim(item);
                            openModal({
                              title: 'Claim Earnings',
                              content: '',
                              modalProps: { maxWidth: 'md' },
                            });
                          }}
                        >
                          <TableCell sx={{ borderBottom: '10px solid #fff', padding: '23px 18.5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <IconToken sx={{ width: '35px', height: '35px' }} />
                              <span style={{ marginLeft: '16px', fontWeight: '700', width: 'max-content' }}>
                                {item?.name}
                                <br />
                                {Number(item.daysLeft) > 0 ? (
                                  <span style={{ color: '#828282', fontSize: '14px' }}>
                                    {formatDate(item?.expiry, 'dd MMM yyyy')}
                                  </span>
                                ) : (
                                  <span style={{ color: '#828282', fontSize: '14px' }}>Matured</span>
                                )}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  width: '40px',
                                  height: '30px',
                                  color: `${BN(item.ytPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'}`,
                                  borderColor: `${
                                    BN(item.ytPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'
                                  }`,
                                }}
                              >
                                YT
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  width: '40px',
                                  height: '30px',
                                  margin: '0 7px',
                                  color: `${BN(item.ptPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'}`,
                                  borderColor: `${
                                    BN(item.ptPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'
                                  }`,
                                }}
                              >
                                PT
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  width: '40px',
                                  height: '30px',
                                  color: `${BN(item.lpPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'}`,
                                  borderColor: `${
                                    BN(item.lpPosition).isLessThanOrEqualTo(BN('0')) ? '#828282' : '#2465DE'
                                  }`,
                                }}
                              >
                                LP
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                          >
                            <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {useUSD ? (
                                <>
                                  <TextSmallNumber
                                    value={BN(item?.lpPosition)
                                      .plus(BN(item?.ptPosition))
                                      .plus(BN(item?.ytPosition))
                                      .dividedBy(
                                        BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`),
                                      )
                                      .multipliedBy(BN(item?.price))}
                                    contentBeforeValue="$"
                                  />
                                  {/* <IconToken sx={{ width: '15px', height: '15px' }} /> */}
                                </>
                              ) : (
                                <>
                                  <TextSmallNumber
                                    value={BN(
                                      BN(item?.lpPosition).plus(BN(item?.ptPosition)).plus(BN(item?.ytPosition)),
                                    ).dividedBy(
                                      BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`),
                                    )}
                                  />
                                  <IconToken sx={{ width: '15px', height: '15px' }} />
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                          >
                            <span style={{ fontWeight: '700' }}>
                              <TextSmallNumber value={handleCalcPoolAPY(item)} /> %
                            </span>
                            {/* <br />
                            <span style={{ color: '#828282', fontSize: '14px' }}>Unknown</span> */}
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                          >
                            <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {useUSD ? (
                                <>
                                  <TextSmallNumber
                                    value={BN(
                                      item?.assetInterest !== 'NaN' && item?.assetInterest ? item.assetInterest : '0',
                                    )
                                      .multipliedBy(BN(item?.price))
                                      .dividedBy(
                                        BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`),
                                      )}
                                  />
                                  <TooltipReward tooltipValue="Claim YT rewards" />
                                </>
                              ) : (
                                <>
                                  <TextSmallNumber
                                    value={BN(
                                      item?.assetInterest !== 'NaN' && item?.assetInterest ? item.assetInterest : '0',
                                    ).dividedBy(
                                      BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`),
                                    )}
                                  />
                                  <TooltipReward tooltipValue="Claim YT rewards" />
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <SkeletonTableBody rows={5} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </>
  );
}
