import React from 'react';
import useQueryPrice from 'src/hooks/Liquidlity/useQueryPrice';
import { TTokenInfo } from 'src/constants/tokenType';
import { useChainId } from 'wagmi';
import { Box, Typography } from '@mui/material';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import { BN } from 'src/utils';

interface IProps {
  tokenInfo?: TTokenInfo;
  balance: string | number;
  balanceInUsd?: string | number;
  isShowToken?: boolean;
}

const TableCellTokenWithPrice = (props: IProps) => {
  const { tokenInfo, balance, balanceInUsd, isShowToken } = props;

  const chainId = useChainId();
  const { data: price, status } = useQueryPrice({
    chainId: chainId,
    address: tokenInfo?.address as `0x${string}`,
  });

  const balanceInUsdCalc = balanceInUsd ? BN(balanceInUsd) : BN(balance).multipliedBy(price || 0);
  const IconToken = tokenInfo?.icon;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px' }}>
      <Typography sx={{ fontWeight: '700' }}>
        <TextSmallNumber value={BN(balance)} decimal={6} />
        {isShowToken && IconToken && <IconToken />}
      </Typography>
      <TypographyByStatus status={status} sx={{ fontSize: '14px', color: '#8C8C8C' }}>
        <TextSmallNumber value={balanceInUsdCalc} contentBeforeValue="$" decimal={6} />
      </TypographyByStatus>
    </Box>
  );
};

export default TableCellTokenWithPrice;
