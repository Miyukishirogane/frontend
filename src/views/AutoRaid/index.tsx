import { Fade, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import AnnouncementAutoRaid from './announcement/AnnouncementAutoRaid';
import ExploreTCVSection from './components/ExploreTCVSection';
import SocialTaskSection from './components/SocialTaskSection';
import AutoRaidRankTable from 'src/components/Table/AutoRaid/AutoRaidRankTable';
import useAccount from 'src/hooks/useAccount';
import BlankPage from 'src/components/Quest/BlankPage/BlankPage';
import AutoRaidUserRank from 'src/components/Table/AutoRaid/AutoRaidUserRank';

const tabOptions: IToggleButton[] = [
  {
    label: 'Explore TCV',
    value: 'explore_tcv',
  },
  {
    label: 'Leaderboard',
    value: 'leaderboard',
  },
];

const AutoRaid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(searchParams.get('tab') || 'explore_tcv');
  const { address } = useAccount();

  const handleToggleChange = (value: string) => {
    if (!value) return;
    setTabValue(value);
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };

  return (
    <Stack gap={2} mb={3}>
      <AnnouncementAutoRaid />

      {!address ? (
        <BlankPage />
      ) : (
        <>
          <ToggleButtonGroupCustom
            value={tabValue}
            handleToggleChange={(_e, value) => handleToggleChange(value)}
            data={tabOptions}
            toggleBtnProps={{
              sx: {
                minWidth: '120px',
              },
            }}
            sx={{ width: 'fit-content' }}
          />

          <Fade in={tabValue === 'explore_tcv'} timeout={500}>
            <div
              style={{ display: tabValue !== 'explore_tcv' ? 'none' : 'flex', gap: '16px', flexDirection: 'column' }}
            >
              <ExploreTCVSection />
              <SocialTaskSection />
            </div>
          </Fade>

          <Fade in={tabValue === 'leaderboard'} hidden={tabValue !== 'leaderboard'} timeout={500}>
            <div>
              <Paper elevation={1} sx={{ pt: 2 }}>
                <AutoRaidRankTable />
              </Paper>
              <Paper elevation={1}>
                <AutoRaidUserRank />
              </Paper>
            </div>
          </Fade>
        </>
      )}
    </Stack>
  );
};

export default AutoRaid;
