import { Box, Button, Skeleton, Typography } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import QuestBannerIcon from './QuestBannerIcon/QuestBannerIcon';
import useUserQuestInfo from 'src/hooks/Quest/useUserQuestInfo';

export default function Announcement() {
  const { userQuestInfo, isLoading } = useUserQuestInfo();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        backgroundImage: `url(${imagePath.QuestBannerImg})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '20px',
        mt: { md: 5, xs: 3 },
        height: { xs: 'auto', md: '350px' },
        textAlign: 'start',
        p: 4,
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '80%', md: '600px' },
          mt: { xs: 0, md: 4 },
          textAlign: 'justify',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '20px', sm: '28px', md: '32px' },
            fontWeight: 700,
            color: '#fff',
          }}
        >
          QUEST TO EARN PROGRAM
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '10px', sm: '12px', md: '16px' },
            marginTop: '8px',
            color: 'rgba(160, 198, 255, 1)',
          }}
        >
          Your rewards are calculated based on the TP - the official point of TCV Quest to Earn program. Let’s complete
          our all of the tasks to earn the most TP!
        </Typography>

        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '24px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(168, 202, 246, 1)',
            fontSize: { xs: '8px', md: '16px' },
            gap: 1,
          }}
          variant="gradient"
        >
          <Typography fontWeight={700}>My Total Points:</Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 700,
            }}
          >
            {isLoading ? (
              <Skeleton variant="text" height={20} width={50} />
            ) : (
              <>
                {userQuestInfo?.totalPoint} TP
                <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
              </>
            )}
          </Typography>
        </Button>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          component="img"
          src={imagePath.QuestBannerTreasure}
          sx={{ height: '470px', width: '500px', rotate: '5deg', mr: '-80px' }}
          alt="tcv_quest_banner"
        />

        <QuestBannerIcon src={imagePath.QuestBannerCoin1} sx={{ left: '55%', bottom: '13%', width: '120px' }} />
        <QuestBannerIcon
          src={imagePath.QuestBannerCoin1}
          sx={{ right: '25%', top: '13%', opacity: 0.6, rotate: '260deg', width: '100px' }}
        />
        <QuestBannerIcon src={imagePath.QuestBannerCoin2} sx={{ right: '0%', top: '13%', width: '100px' }} />
      </Box>
    </Box>
  );
}
