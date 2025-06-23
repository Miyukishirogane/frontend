import { Paper, Box, Typography } from '@mui/material';
import React from 'react';
import RaidTaskItem from './RaidTaskItem';
import useGetUserTask from 'src/hooks/AutoRaid/useGetUserTask';
import RaidTaskSkeleton from './RaidTaskSkeleton';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';

const SocialTaskSection = () => {
  const { socialCategory, status } = useGetUserTask();

  const totalTaskCompleted = socialCategory?.filter(item => item.done).length || 0;
  const totalPoint = socialCategory?.reduce((acc, item) => acc + item.point, 0) || 0;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        height: '100%',
      }}
    >
      <Box display="flex" mb={2} justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            Social Task
          </Typography>
          <TypographyByStatus status={status} variant="body1" color="rgba(36, 101, 222, 1)" fontWeight={600}>
            (<strong>+{totalPoint}</strong> Point)
          </TypographyByStatus>
        </Box>

        <TypographyByStatus status={status} variant="body1" fontWeight={600}>
          {totalTaskCompleted}/{socialCategory?.length}
        </TypographyByStatus>
      </Box>

      <Box display="flex" flexDirection="column" gap={1}>
        {status === 'pending' ? (
          <RaidTaskSkeleton />
        ) : (
          socialCategory?.map(task => <RaidTaskItem key={task.id} task={task} />)
        )}
      </Box>
    </Paper>
  );
};

export default SocialTaskSection;
