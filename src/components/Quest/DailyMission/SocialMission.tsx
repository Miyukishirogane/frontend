import { Box, Paper, Typography } from '@mui/material';
import useQuestList from 'src/hooks/Quest/useQuestList';
import MissionItem from './MissionItem';
import MissionLoading from './MissionLoading';

const loadingArr = Array(3).fill(null);

const SocialMission = () => {
  const { questList, isLoading } = useQuestList();
  const totalPoint = questList?.socialTasks?.reduce((result, item) => (result += item.point), 0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        height: '100%',
      }}
    >
      <Box display="flex" gap={1} mb={2}>
        <Typography variant="body1" fontWeight={700}>
          Social Mission
        </Typography>
        <Typography variant="body1" color="rgba(36, 101, 222, 1)" fontWeight={600}>
          (<strong>+{totalPoint || 0}</strong> Point)
        </Typography>
      </Box>

      {isLoading ? (
        <Box display="flex" flexDirection="column" gap={1}>
          {loadingArr.map((_, index) => (
            <MissionLoading key={index} />
          ))}
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          {questList?.socialTasks?.map((quest, index) => {
            return <MissionItem index={index} key={quest._id} quest={quest} />;
          })}
        </Box>
      )}
    </Paper>
  );
};

export default SocialMission;
