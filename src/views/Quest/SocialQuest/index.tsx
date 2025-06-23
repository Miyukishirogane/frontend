import { Box } from '@mui/material';
import ClaimBonus from 'src/components/Quest/ClaimBonus/ClaimBonus';
import SocialMission from 'src/components/Quest/DailyMission/SocialMission';
import Announcement from '../Announcement/Announcement';
import BlankPage from 'src/components/Quest/BlankPage/BlankPage';
import { useAuthState } from 'src/jotai/auth/auth';
import { Helmet } from 'react-helmet';

const SocialQuest = () => {
  const { isLogin } = useAuthState();

  if (!isLogin) {
    return (
      <>
        <Helmet>
          <title>TCV | Social Quest</title>
        </Helmet>
        <Announcement />
        <BlankPage />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TCV | Social Quest</title>
      </Helmet>
      <Announcement />

      <Box display="flex" sx={{ gap: 2, my: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <ClaimBonus />

        <Box flex={7}>
          <SocialMission />
        </Box>
      </Box>
    </>
  );
};

export default SocialQuest;
