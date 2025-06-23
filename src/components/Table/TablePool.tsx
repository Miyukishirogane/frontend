import Help from '@mui/icons-material/Help';
import {
  Box,
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
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapTokenToIcon, marketTokensPendle, TAppDenom } from 'src/constants/mapTokenToIcon';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { TPendleState } from 'src/jotai/pendle/type';
import { BN } from 'src/utils';
import { formatDate, formatNumber } from 'src/utils/format';
import { useChainId } from 'wagmi';
import SkeletonTableBody from './TableLoading/SkeletonTableBody';
import { handleCalcPoolAPY } from 'src/views/Pool/utils/utils';
import TextSmallNumber from '../TextSmallNumber/TextSmallNumber';

interface IProps {
  showActivePendle: string;
}

// css scroll
const dataHeader = [
  {
    id: 1,
    title: 'Market',
  },
  {
    id: 2,
    title: 'Maturity',
  },
  {
    id: 3,
    title: 'TVL',
  },
  {
    id: 4,
    title: 'APY',
  },
];

export default function TablePool(props: IProps) {
  const { showActivePendle } = props;

  // navigation
  const navigate = useNavigate();

  // state
  const chainIdSelected = useChainId();
  const { listPendle: listAllPendle, error, loading } = usePendleData();
  const { AddDetailPendle } = usePendleFunction();

  const listPendle = useMemo(() => {
    if (showActivePendle !== 'active') {
      return listAllPendle.filter(item => Number(item.daysLeft) <= 0);
    }

    return listAllPendle.filter(item => Number(item.daysLeft) && Number(item.daysLeft) > 0);
  }, [listAllPendle, showActivePendle]);

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

  // handler route
  const HandlerRouter = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    marketAddr: string,
    item: TPendleState,
  ) => {
    e.preventDefault();
    AddDetailPendle({
      ...item,
    });
    navigate(`/pool/${marketAddr}`, {
      state: {
        chainId: chainIdSelected,
        item: item,
      },
    });
  };

  return (
    <>
      <>
        {error ? (
          <Box>
            <Typography>{error.message || 'Error!!'}</Typography>
          </Box>
        ) : (
          <>
            <Paper sx={{ mt: 2 }}>
              <TableContainer id="table-pool">
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
                          }}
                        >
                          <TableSortLabel
                            style={{ flexDirection: 'row-reverse' }}
                            IconComponent={() => <DropdownIndicator />}
                          >
                            {item?.title}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!loading ? (
                      listPendle?.map(item => {
                        const IconToken = mapTokenToIcon[item.name as TAppDenom] ?? Help;
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
                            onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
                              HandlerRouter(e, item.marketAddress, item)
                            }
                          >
                            <TableCell sx={{ borderBottom: '10px solid #fff', padding: '23px 18.5px' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconToken sx={{ width: '35px', height: '35px' }} />
                                <span style={{ marginLeft: '16px', fontWeight: '700' }}>{item?.name}</span>
                              </div>
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                            >
                              <span style={{ fontWeight: '700' }}>{formatDate(item?.expiry, 'dd/MM/yyyy')}</span>
                              <br />
                              <span style={{ color: '#8C8C8C' }}>
                                {Number(item?.daysLeft) > 0 ? `${item?.daysLeft} day` : 'Matured'}
                              </span>
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                            >
                              <span style={{ fontWeight: '700' }}>
                                $
                                {formatNumber(
                                  BN(item?.price)
                                    .multipliedBy(BN(item?.lpPosition))
                                    .dividedBy(
                                      BN(`1e${marketTokensPendle[chainIdSelected][item?.name]?.decimal || '1'}`),
                                    )
                                    .toString(),
                                  { fractionDigits: 0 },
                                )}
                              </span>
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: '10px solid #fff', textAlign: 'left', padding: '23px 18.5px' }}
                            >
                              <span style={{ fontWeight: '700' }}>
                                <TextSmallNumber value={handleCalcPoolAPY(item)} /> %
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <SkeletonTableBody rows={5} cols={4} />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}
      </>
    </>
  );
}
