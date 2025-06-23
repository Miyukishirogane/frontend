import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';
import BlankPage from 'src/components/Quest/BlankPage/BlankPage';
import { imagePath } from 'src/constants/imagePath';
import useQuestList from 'src/hooks/Quest/useQuestList';
import { useAuthState } from 'src/jotai/auth/auth';
import { copyTextToClipboard } from 'src/utils';
import Announcement from '../Announcement/Announcement';
import { referralCode } from '../constant';
import { toast } from 'react-toastify';
import useUserQuestInfo from 'src/hooks/Quest/useUserQuestInfo';
import { Helmet } from 'react-helmet';

const SpecialQuest = () => {
  const { isLogin } = useAuthState();
  const { questList } = useQuestList();
  const { userQuestInfo } = useUserQuestInfo();

  const specialQuestDetail = questList?.specialTasks?.[0];
  const description = specialQuestDetail?.description?.replaceAll('\n', '</br>');

  const handleCopyLink = () => {
    if (!questList) return;

    copyTextToClipboard(
      `${window.location.origin}/quest/daily_quest?${referralCode}=${questList.specialTasks[0].params.referralCode}`,
    );
    toast.success('Copy success');
  };

  if (!isLogin) {
    return (
      <>
        <Helmet>
          <title>TCV | Special Quest</title>
        </Helmet>
        <Announcement />
        <BlankPage />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TCV | Special Quest</title>
      </Helmet>
      <Announcement />

      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          gap: 3,
          p: 4,
          mt: 2,
          flexDirection: { xs: 'column', md: 'row' },
          color: 'text.secondary',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            border: '1px solid rgba(160, 211, 255, 1)',
            borderRadius: '10px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: '#3498db',
                  width: 40,
                  height: 40,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1B2E3D' }}>
                  {userQuestInfo?.numberInvites}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  User
                </Typography>
              </Box>
            </Box>

            <Divider variant="fullWidth" orientation="horizontal" flexItem sx={{ mx: 1 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={imagePath.QuestCoin} alt="star" style={{ width: '40px' }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1B2E3D' }}>
                  {userQuestInfo?.invitePoints}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Point earned
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 2.5,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            border: '1px solid rgba(160, 211, 255, 1)',
            borderRadius: '10px',
            flex: 1,
            gap: 3,
          }}
        >
          <img src={imagePath.QuestInviteIcon} alt="star" style={{ height: '80px', alignSelf: 'flex-start' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20, color: '#1B2E3D' }}>
              {specialQuestDetail?.name}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{ __html: description || '' }}
              lineHeight={1.8}
            ></Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', flexShrink: 0 }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: '16px',
                gap: 0.5,
              }}
              flexWrap="nowrap"
            >
              +{specialQuestDetail?.point} pt <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
              /User
            </Typography>
            <Button onClick={handleCopyLink} variant="gradient" sx={{ borderRadius: '12px' }}>
              Copy link
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default SpecialQuest;
