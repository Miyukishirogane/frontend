import { Box, Skeleton } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';

const RaidTaskSkeleton = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        flexDirection: 'row',
        border: '1px solid rgba(160, 211, 255, 1)',
      }}
    >
      <img src={imagePath.QuestDailyImg} alt="star" style={{ width: '80px', objectFit: 'contain' }} />
      <Box display="flex" sx={{ flex: 1 }} flexDirection="column">
        <Skeleton variant="text" sx={{ width: '50%' }} height={30} />
        <Skeleton variant="text" sx={{ width: '70%' }} height={25} />
      </Box>
    </Box>
  );
};

export default RaidTaskSkeleton;
