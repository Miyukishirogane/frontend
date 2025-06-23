import { Box, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { imagePath } from 'src/constants/imagePath';
import { queryClient } from 'src/jotai/AppProvider';
import { useQuestFunction, useQuestState } from 'src/jotai/quest/quest';
import { handleSubmitQuest } from 'src/services/api/quest/quest';
import { sleep } from 'src/utils';
import { socialQuestList } from 'src/views/Quest/constant';
import { TDailyTask, TSocialTask } from 'src/views/Quest/type';

interface IProps {
  quest: TSocialTask | TDailyTask;
  index: number;
}

const MissionItem = (props: IProps) => {
  const { quest } = props;
  const { updateQuestCompleted } = useQuestFunction();
  const { questDailyCompleted, questSocialCompleted } = useQuestState();
  const { pathname } = useLocation();

  const { mutateAsync: submit, isPending } = useMutation({
    mutationKey: ['MissionItem', quest?._id],
    mutationFn: async () => {
      if (!quest?._id) return;

      await handleSubmitQuest(quest._id);
      await queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });
      await queryClient.invalidateQueries({ queryKey: ['listQuest'] });
    },
  });

  const isSocial = pathname.includes('social');
  const competedQuest = isSocial ? questSocialCompleted : questDailyCompleted;
  const description = quest?.description ? quest?.description.replaceAll('\n', '</br>') : quest?.description;
  const isClaimed = quest?.claimed;
  const isCompleted = competedQuest[quest._id];

  const questImgSrc = useMemo(() => {
    const index = socialQuestList.findIndex(item => {
      return quest.name.includes(item.keyword);
    });

    return index !== -1 ? socialQuestList[index].image : imagePath.QuestDailyImg;
  }, [quest.name]);

  const handleClickBtn = async () => {
    if (isCompleted) {
      await submit();
      return;
    }

    window.open(quest.params.url);
    await sleep(300);
    updateQuestCompleted({ [quest._id]: true }, isSocial);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        flexDirection: { xs: 'column', md: 'row' },
        border: '1px solid rgba(160, 211, 255, 1)',
      }}
    >
      <Box display="flex" gap={2}>
        <img src={questImgSrc} alt="star" style={{ width: '80px', objectFit: 'contain' }} />
        <Box>
          <Typography variant="h5" mb={1}>
            {quest.name}
          </Typography>
          <Typography
            variant="body2"
            color="rgba(140, 140, 140, 1)"
            component="p"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignSelf={'end'} mt={1}>
        <Typography variant="body1" display="flex" alignItems="center" noWrap gap={0.5} alignSelf="flex-end">
          +{quest.point} TP <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
        </Typography>
        <LoadingButton
          props={{
            disabled: isClaimed,
            variant: 'gradient',
            sx: { px: 4, borderRadius: '10px', mt: 1, minWidth: '110px' },
          }}
          onClick={handleClickBtn}
          loading={isPending}
        >
          {isClaimed ? 'Claimed' : isCompleted ? 'Claim' : 'Go'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default MissionItem;
