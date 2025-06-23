import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { imagePath } from 'src/constants/imagePath';
import useClaimTask from 'src/hooks/AutoRaid/useClaimTask';
import useUpdateAutoRaid from 'src/hooks/AutoRaid/useUpdateAutoRaid';
import { TAutoRaidTask } from '../types/task';

interface IProps {
  task: TAutoRaidTask;
}

const RaidTaskItem = (props: IProps) => {
  const { task } = props;

  const { mutateAsync } = useUpdateAutoRaid(task.id);

  const { mutateAsync: claim, isPending } = useClaimTask(task.id);

  const navigate = useNavigate();

  const handleDisplayBtnText = () => {
    if (task.claimed) return 'Claimed';
    if (task.done) return 'Claim';
    return 'Go';
  };

  const handleRedirect = () => {
    if (task.link) {
      if (task.link.includes('tcvault.xyz')) {
        const url = task.link.split('tcvault.xyz')[1];
        navigate(url, { replace: true });
      } else {
        window.open(task.link, '_blank');

        if (task.category === 'social') {
          setTimeout(async () => {
            await mutateAsync();
          }, 5000);
        }
      }
    }
  };

  const handleClickBtn = async () => {
    if (!task.done && !task.claimed) {
      handleRedirect();
    } else {
      await claim();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        justifyContent: { xs: 'flex-start', sm: 'space-between' },
        alignItems: { xs: 'left', sm: 'center' },
        borderRadius: '10px',
        flexDirection: { xs: 'column', sm: 'row' },
        border: '1px solid rgba(160, 211, 255, 1)',
      }}
    >
      <Box display="flex" gap={2} flex={1}>
        <img src={imagePath.QuestDailyImg} alt="star" style={{ width: '80px', objectFit: 'contain' }} />
        <Box>
          <Typography variant="h5" mb={1}>
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            color="rgba(140, 140, 140, 1)"
            component="p"
            dangerouslySetInnerHTML={{ __html: task.description }}
          ></Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignSelf={'end'} mt={1}>
        <Typography variant="body1" display="flex" alignItems="center" noWrap gap={0.5} alignSelf="flex-end">
          +{task.point} TP <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
        </Typography>
        <LoadingButton
          props={{
            variant: 'gradient',
            sx: { px: 4, borderRadius: '10px', mt: 1, minWidth: '110px' },
            disabled: task.claimed,
          }}
          onClick={handleClickBtn}
          loading={isPending}
        >
          {handleDisplayBtnText()}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default RaidTaskItem;
