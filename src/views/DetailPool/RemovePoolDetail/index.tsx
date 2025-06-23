import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import ManualForm from './ManualForm';
import ZapOutForm from './ZapOutForm';

const btnGroupData: IToggleButton[] = [
  {
    value: 'zap-out',
    label: 'Zap out',
  },
  {
    value: 'manual',
    label: 'Manual',
  },
];

export default function RemovePoolDetail() {
  // router
  const navigate = useNavigate();
  const { chainIdSelected } = useSwitchToSelectedChain();
  const { clearAll } = usePendleFunction();
  const { DetailPendetail } = usePendleData();

  const [selectedTab, setSelectedTab] = useState('zap-out');

  const handleChange = (_: React.SyntheticEvent, tab: string | null) => {
    if (!tab) return;
    setSelectedTab(tab);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: 'end',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ToggleButtonGroupCustom
          value={selectedTab}
          handleToggleChange={handleChange}
          data={btnGroupData}
          sx={{
            '& button': {
              textTransform: 'none',
            },
          }}
        />

        <Button
          variant="outlined"
          sx={{
            padding: '9px 18px',
            height: 'auto',
            '&:MuiTouchRipple-root': {
              display: 'none',
            },
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            clearAll();
            navigate(`/market/${DetailPendetail?.marketAddress}`, {
              state: {
                chainId: chainIdSelected,
                item: DetailPendetail,
              },
            });
          }}
        >
          Go to Swap
        </Button>
      </Box>

      {selectedTab === 'zap-out' && <ZapOutForm />}
      {selectedTab === 'manual' && <ManualForm />}
    </>
  );
}
