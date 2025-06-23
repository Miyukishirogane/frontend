import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { queryClient } from 'src/jotai/AppProvider';
import { handleSubmitQuest } from 'src/services/api/quest/quest';
import { dailyRewardInfo } from 'src/views/Quest/constant';

interface IProps {
  isActive: boolean;
  isClaimed: boolean;
  index: number;
  continuousDays: number;
  questId: string;
}

const DailyLoginItem = (props: IProps) => {
  const { isActive, isClaimed, index, continuousDays, questId } = props;

  const bgColor = isActive ? 'rgba(208, 235, 255, 1)' : 'rgba(231, 244, 255, 1)';
  const isCheckToday = isActive && isClaimed;
  const isPast = index < continuousDays;

  const handleCheckLogin = async () => {
    await handleSubmitQuest(questId);
    queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });
    queryClient.invalidateQueries({ queryKey: ['listQuest'] });
    toast.success('Check-in Success');
  };

  return (
    <Button
      sx={{
        py: 2,
        px: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: 'auto',
        borderRadius: '10px',
        justifyContent: 'space-between',
        minWidth: '120px',
        bgcolor: bgColor,
        '&.Mui-disabled': {
          color: 'rgba(140, 140, 140, 1)',
          opacity: isClaimed ? 0.8 : 1,
        },
        '&:hover': {
          boxShadow: 'none',
        },
      }}
      variant="outlined"
      disabled={!isActive || isCheckToday}
      onClick={handleCheckLogin}
    >
      <Typography variant="body1">Day {index + 1}</Typography>

      {isCheckToday || isPast ? (
        <CheckCircleIcon sx={{ fontSize: '30px' }} color="success" />
      ) : (
        <img src={dailyRewardInfo[index].image} alt={dailyRewardInfo[index].reward} style={{ width: '60px' }} />
      )}

      <Typography variant="body1" color={isClaimed ? 'unset' : 'black'} fontWeight={700}>
        {dailyRewardInfo[index].reward}
      </Typography>
    </Button>
  );
};

export default DailyLoginItem;
