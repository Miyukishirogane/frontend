import { Box, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { TDcaHistory } from 'src/services/api/yieldFlex/dcaHistory';
import { formatDuration } from 'src/utils/format';
import { TTokenProjeetInfo } from 'src/views/YieldFlex/type';

type TItem = {
  title: string;
  value: ReactNode;
};

interface IProps {
  dcaId: string;
  dataDca: TDcaHistory;
  tokenInInfo: TTokenProjeetInfo;
  tokenOutInfo: TTokenProjeetInfo;
}

//This component unused because we change from modal to collapsible but we still keep this in case we need it
export default function ModalProJeetTrade(props: IProps) {
  const { dataDca, tokenInInfo, tokenOutInfo } = props;
  const listItems: TItem[] = useMemo(() => {
    if (dataDca && tokenInInfo && tokenOutInfo) {
      const IconTokenIn = tokenInInfo.icon;
      const IconTokenOut = tokenOutInfo.icon;
      const { currentRound, roundAmount, recurringCycle, totalRound, tokenInAmountInit, tokenOutAmount } = dataDca;
      return [
        {
          title: 'Token In',
          value: (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Typography>{tokenInInfo.tokenName}</Typography>
              <IconTokenIn />
            </Box>
          ),
        },
        {
          title: 'Amount in Round',
          value: (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Typography fontWeight={600}>{roundAmount}</Typography>
              <Typography>{tokenInInfo.tokenName}</Typography>
              <IconTokenIn />
            </Box>
          ),
        },
        {
          title: 'Recurring Cycle',
          value: <Typography>{formatDuration(recurringCycle)}</Typography>,
        },
        {
          title: 'Remain Round',
          value: <Typography fontWeight={600}>{currentRound}</Typography>,
        },
        {
          title: 'Total Round',
          value: <Typography fontWeight={600}>{totalRound}</Typography>,
        },
        {
          title: 'Total Amount',
          value: (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Typography fontWeight={600}>{tokenInAmountInit}</Typography>
              <Typography>{tokenInInfo.tokenName}</Typography>
              <IconTokenIn />
            </Box>
          ),
        },
        {
          title: 'Total Token Out',
          value: (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Typography fontWeight={600}>{tokenOutAmount}</Typography>
              <Typography>{tokenOutInfo.tokenName}</Typography>
              <IconTokenOut />
            </Box>
          ),
        },
      ];
    }
    return [];
  }, [dataDca, tokenInInfo, tokenOutInfo]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        {listItems.map(item => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={item.title}>
              <Typography sx={{ fontSize: '14px' }}>{item.title}</Typography>
              {item.value}
            </Box>
          );
        })}
      </Box>
      {/* <TableHistoryInModal dcaId={props.dcaId} tokenInInfo={tokenInInfo} tokenOutInfo={tokenOutInfo} /> */}
    </Box>
  );
}
