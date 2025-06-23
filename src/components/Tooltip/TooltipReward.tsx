import { Tooltip } from '@mui/material';
import React from 'react';
import RedeemIcon from '@mui/icons-material/Redeem';

interface IProps {
  tooltipValue: string;
}

const TooltipReward = ({ tooltipValue }: IProps) => {
  return (
    <Tooltip title={tooltipValue} placement="bottom-start" arrow={false}>
      <RedeemIcon sx={{ color: 'dimgrey', fontSize: '1rem' }} />
    </Tooltip>
  );
};

export default TooltipReward;
