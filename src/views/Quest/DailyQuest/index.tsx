import React from 'react';

import DailyLogin from './DailyLogin';
import { Box } from '@mui/material';
import ClaimBonus from 'src/components/Quest/ClaimBonus/ClaimBonus';
import Announcement from '../Announcement/Announcement';
import DailyMission from 'src/components/Quest/DailyMission/DailyMission';
import { useAuthState } from 'src/jotai/auth/auth';
import BlankPage from 'src/components/Quest/BlankPage/BlankPage';
import { Helmet } from 'react-helmet';

const DailyQuest = () => {
  const { isLogin } = useAuthState();

  if (!isLogin) {
    return (
      <>
        <Helmet>
          <title>TCV | Daily Quest</title>
        </Helmet>
        <Announcement />
        <BlankPage />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TCV | Daily Quest</title>
      </Helmet>

      <Announcement />

      <DailyLogin />

      <Box display="flex" sx={{ gap: 2, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ClaimBonus />

        <Box flex={7}>
          <DailyMission />
        </Box>
      </Box>
    </>
  );
};

export default DailyQuest;
