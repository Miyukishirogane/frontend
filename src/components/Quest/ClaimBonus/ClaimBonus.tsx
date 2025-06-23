import { Box, Button, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imagePath } from 'src/constants/imagePath';
import useQuestList from 'src/hooks/Quest/useQuestList';
import { useQuestFunction, useQuestState } from 'src/jotai/quest/quest';
import { handleGetBonus } from 'src/services/api/quest/quest';
import { findQuestByType } from 'src/views/Quest/utils';

const ClaimBonus = () => {
  const { questList } = useQuestList();
  const { pathname } = useLocation();
  const { isClaimedDailyBonus, isClaimedSocialBonus } = useQuestState();
  const { updateStatusBonus } = useQuestFunction();

  const isSocial = pathname.includes('social');
  const bonusDetail = findQuestByType(isSocial, questList?.bonusReward);
  const isClaimed = bonusDetail?.claimed;
  const bonusCompeted = Boolean(isClaimed) || (isSocial ? isClaimedSocialBonus : isClaimedDailyBonus);
  const quests = isSocial ? questList?.socialTasks : questList?.dailyTasks;
  const questLength = quests?.length || 3;

  const questCompletedCount = useMemo(() => {
    const claimedCount =
      quests?.reduce((result, item) => {
        if (item.claimed) {
          return (result += 1);
        }

        return result;
      }, 0) || 0;

    return claimedCount;
  }, [quests]);

  const handleClaimBonus = async () => {
    if (!questList) return;
    const category = findQuestByType(isSocial, questList.bonusReward)?.type.replace(' Bonus', '');

    try {
      await handleGetBonus(category || '');

      updateStatusBonus(true, isSocial);
      toast.success('Claim bonus success');
    } catch (error) {
      console.log('🚀 ~ handleClaimBonus ~ error:', error);
      const err = error as unknown as { message: string };
      toast.error(err.message as string);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        flex: 2,
        maxHeight: '655px', //Min height quests list
      }}
    >
      <Typography variant="body1" fontWeight={600} textAlign="center">
        Complete {questLength} tasks to receive bonus reward
      </Typography>

      <Box
        sx={{
          backgroundImage: `url(${imagePath.QuestBonusImg})`,
          width: 150,
          height: 200,
          display: 'flex',
          m: 'auto',
          p: 2,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h4" color="#fff" component="span" m="auto">
          {bonusCompeted ? `${questLength}/${questLength}` : `${questCompletedCount}/${questLength}`}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <Box textAlign="center" justifyContent="center" alignItems="center" display="flex" gap={1}>
          <Typography variant="h5" fontWeight={400}>
            Bonus:{' '}
          </Typography>
          <Typography variant="h5" color={'rgba(36, 101, 222, 1)'} fontWeight={700}>
            +{bonusDetail?.point} TP
          </Typography>
          <img src={imagePath.QuestCoin} height={16} width={16} alt="quest_coin" />
        </Box>

        <Button
          disabled={questCompletedCount < (questLength || 3) || !!bonusCompeted}
          onClick={handleClaimBonus}
          fullWidth
          sx={{ alignSelf: 'center' }}
          variant="gradient"
        >
          {bonusCompeted ? 'Claimed' : 'Claim'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ClaimBonus;
