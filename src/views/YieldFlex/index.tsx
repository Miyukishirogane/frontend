import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import ActionSection from './components/ActionSection/ActionSection';
import AnnouncementProjeet from './components/Announcement/AnnouncementProjeet';
import AutoDCA from './components/AutoDCA/AutoDCA';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

const btnGroupData: IToggleButton[] = [
  {
    value: 'liquidity',
    label: 'Auto Limit Order',
  },
  {
    value: 'auto_dca',
    label: 'Auto DCA',
  },
];

const ProjeetTrade = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleValue, setToggleValue] = useState(searchParams.get('tab') || 'liquidity');

  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== toggleValue && newAlignment) {
      setToggleValue(newAlignment);
      searchParams.set('tab', newAlignment);
      setSearchParams(searchParams);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <Helmet>
        <title>TCV | YieldFlex</title>
      </Helmet>

      <AnnouncementProjeet />

      <Box>
        <ToggleButtonGroupCustom
          value={toggleValue}
          handleToggleChange={handleToggleChange}
          data={btnGroupData}
          toggleBtnProps={{
            sx: {
              minWidth: '120px',
            },
          }}
        />
      </Box>

      {toggleValue === 'liquidity' && <ActionSection />}

      {toggleValue === 'auto_dca' && <AutoDCA />}
    </Box>
  );
};

export default ProjeetTrade;
