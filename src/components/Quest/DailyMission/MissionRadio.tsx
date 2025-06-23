import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { imagePath } from 'src/constants/imagePath';
import { queryClient } from 'src/jotai/AppProvider';
import { useQuestFunction, useQuestState } from 'src/jotai/quest/quest';
import { handleSubmitQuest } from 'src/services/api/quest/quest';
import { TDailyTask } from 'src/views/Quest/type';

interface IProps {
  quest: TDailyTask;
  index: number;
}

const MissionRadio = (props: IProps) => {
  const { quest } = props;
  const { questDailyCompleted } = useQuestState();
  const { updateQuestCompleted } = useQuestFunction();

  const { mutateAsync: submitAnswer, isPending } = useMutation({
    mutationKey: ['MissionRadio', quest?._id],
    mutationFn: async () => {
      if (!quest?._id) return;

      await handleSubmitQuest(quest._id);
      await queryClient.invalidateQueries({ queryKey: ['userQuestInfo'] });
      await queryClient.invalidateQueries({ queryKey: ['listQuest'] });
    },
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [message, setMessage] = useState<string>();

  const correctOptions = quest.params.options.find(item => item.isCorrect);
  const isClaimed = quest?.claimed;
  const isCompleted = questDailyCompleted[quest?._id];

  const handleSelectAnswer = (value: string) => {
    setSelectedAnswer(value);
    setMessage(undefined);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === correctOptions?.value) {
      if (!isCompleted) {
        updateQuestCompleted({ [quest._id]: true });
        setMessage('Your answer is correct.');
        return;
      }

      try {
        await submitAnswer();
      } catch (error) {
        toast(error as string);
      }
    } else {
      setMessage('Your answer is not correct.');
    }
  };

  useEffect(() => {
    if (isCompleted && correctOptions) {
      setSelectedAnswer(correctOptions.value);
    }
  }, [correctOptions, isCompleted]);

  return (
    <Box
      sx={{
        border: '1px solid rgba(160, 211, 255, 1)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          borderRadius: '10px',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
        }}
      >
        <Box display="flex" gap={2} width="100%">
          <img src={imagePath.QuestDailyImg2} alt="star" style={{ width: '80px', objectFit: 'contain' }} />
          <Box width="100%">
            <Box display="flex" justifyContent="space-between" mb={1} gap={1} pr={{ xs: 0, md: 2 }} alignItems="center">
              <Typography variant="h5" mb={1}>
                {quest.params?.question}
              </Typography>
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gap={0.5}
                noWrap
                alignSelf="baseline"
                overflow="visible"
              >
                +{quest.point} TP <img height={16} width={16} alt="quest_coin" src={imagePath.QuestCoin} />
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color={selectedAnswer === correctOptions?.value ? 'rgba(21, 195, 129, 1)' : 'rgba(194, 37, 37, 1)'}
            >
              {message}
            </Typography>
            <Typography variant="body2" color="rgba(140, 140, 140, 1)">
              Choose the correct answer.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box ml={{ xs: 0, md: '76px' }} mt={2} display={isClaimed ? 'none' : 'block'}>
        <RadioGroup
          value={selectedAnswer}
          onChange={(_, value) => handleSelectAnswer(value)}
          name="radio-buttons-group"
        >
          {quest.params?.options?.map(answer => {
            return (
              <Box
                sx={{
                  bgcolor: 'rgba(239, 242, 248, 1)',
                  borderRadius: '10px',
                  mb: 1,
                  border: answer.value === selectedAnswer ? '2px solid rgba(160, 211, 255, 1)' : 'unset',
                  py: 1,
                  px: 3,
                }}
                key={answer.value}
              >
                <FormControlLabel
                  sx={{ width: '100%' }}
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(57, 184, 253, 1)',
                        '&.Mui-checked': {
                          color: 'rgba(57, 184, 253, 1)',
                        },
                      }}
                      value={answer.value}
                      checked={answer.value === selectedAnswer}
                      disabled={isClaimed || isCompleted}
                    />
                  }
                  label={answer.value}
                />
              </Box>
            );
          })}
        </RadioGroup>
      </Box>

      <Box alignSelf={'end'} mt={1}>
        <LoadingButton
          onClick={handleSubmit}
          props={{
            disabled: !selectedAnswer || isClaimed,
            variant: 'gradient',
            sx: { px: 4, borderRadius: '10px' },
          }}
          loading={isPending}
        >
          {isClaimed ? 'Claimed' : isCompleted ? 'Claim' : 'Submit'}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default MissionRadio;
