import { Box } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import LiquidityLendingPortfolio from '../Liquidity/LiquidityLending/Components/Portfolio';
import ProjeetPortfolio from '../YieldFlexDashboard/components/Portfolio/ProjeetPortfolio';
import DashboardAnnouncement from './Announcement';
import GeneralDashBoard from './GeneralDashBoard';
import { Helmet } from 'react-helmet';

const btnGroupData: IToggleButton[] = [
  {
    value: 'dashboard',
    label: 'Dashboard',
  },
  {
    value: 'yieldFlex',
    label: 'YieldFlex Position',
  },
  {
    value: 'lending',
    label: 'Lending Position',
  },
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleValue, setToggleValue] = useState(searchParams.get('tab') || 'dashboard');

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (!newAlignment) return;
    setToggleValue(newAlignment);
    searchParams.set('tab', newAlignment);
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Helmet>
        <title>TCV | Dashboard</title>
      </Helmet>
      <DashboardAnnouncement />

      <ToggleButtonGroupCustom
        sx={{ my: 2 }}
        data={btnGroupData}
        value={toggleValue}
        handleToggleChange={handleToggleChange}
      />

      {toggleValue === 'dashboard' && <GeneralDashBoard />}
      {toggleValue === 'lending' && <LiquidityLendingPortfolio />}
      {toggleValue === 'yieldFlex' && <ProjeetPortfolio />}
    </Box>
  );
};

export default Dashboard;
