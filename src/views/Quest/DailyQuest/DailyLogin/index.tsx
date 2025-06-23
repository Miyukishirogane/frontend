import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import DailyLoginItem from 'src/components/Quest/DailyLoginItem/DailyLoginItem';
import DailyLoginItemLoading from 'src/components/Quest/DailyLoginItem/DailyLoginItemLoading';
import useQuestList from 'src/hooks/Quest/useQuestList';

const DailyLogin = () => {
  const data = Array(7).fill(null);
  const { questList, isLoading } = useQuestList();

  return (
    <Paper sx={{ py: 4, px: 5, mt: 4, my: 2 }} elevation={3}>
      <Typography my={1} variant="h3" fontWeight={700}>
        Daily Login
      </Typography>
      <Typography mb={3} variant="body1">
        Login daily to claim your reward
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="space-between" gap={1.5} overflow="auto">
          {data.map((_, index) => {
            return <DailyLoginItemLoading key={index} />;
          })}
        </Box>
      )}

      {!isLoading && (
        <Box display="flex" justifyContent="space-between" gap={1.5} overflow="auto">
          {data.map((_, index) => {
            const continuousDays = questList?.dailyConnect ? questList?.dailyConnect[0].params?.continuousDays - 1 : -1;
            const questId = questList?.dailyConnect ? questList?.dailyConnect[0]._id : '';

            return (
              <DailyLoginItem
                key={index}
                index={index}
                isActive={index == continuousDays}
                isClaimed={Boolean(questList?.dailyConnect?.[0].claimed)}
                continuousDays={continuousDays}
                questId={questId}
              />
            );
          })}
        </Box>
      )}
    </Paper>
  );
};

export default DailyLogin;
