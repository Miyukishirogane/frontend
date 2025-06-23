/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import ManualForm from './ManualForm';
import ZapInForm from './ZapInForm';

const btnGroupData: IToggleButton[] = [
  {
    value: 'zap-in',
    label: 'Zap in',
  },
  {
    value: 'manual',
    label: 'Manual',
  },
];

export default function AddPoolDetail() {
  const navigate = useNavigate();

  // state jotai
  const { DetailPendetail } = usePendleData();
  const { clearAll } = usePendleFunction();
  const { chainIdSelected } = useSwitchToSelectedChain();

  const [selectedTab, setSelectedTab] = useState('zap-in');

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

      {selectedTab === 'zap-in' && <ZapInForm />}
      {selectedTab === 'manual' && <ManualForm />}
    </>
  );
}
