import { Button, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { imagePath } from 'src/constants/imagePath';
import useUserQuestInfo from 'src/hooks/Quest/useUserQuestInfo';
import useAccount from 'src/hooks/useAccount';
import { useAuthFunction, useAuthState } from 'src/jotai/auth/auth';
import { handleClearStore } from 'src/jotai/quest/quest';
import { prevAddress } from 'src/views/Quest/constant';
import useUserRaidRank from 'src/hooks/AutoRaid/useUserRaidRank';

const ButtonQuestPoint = () => {
  const { isLogin } = useAuthState();
  const { address } = useAccount();
  const { handleLogout } = useAuthFunction();
  const { userQuestInfo, isLoading } = useUserQuestInfo();
  const { data: userRaidRank, isLoading: isLoadingRaidRank } = useUserRaidRank();

  const localAddress = localStorage.getItem(prevAddress);
  const totalPoint = (userQuestInfo?.totalPoint || 0) + (userRaidRank?.totalPoint || 0);

  useEffect(() => {
    if (address != localAddress) {
      handleClearStore();
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!address && !isLogin) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: '#2465DE',
        color: 'white',
        height: { xs: '36px', xsm: '44px' },
        display: isLogin ? 'flex' : 'none',
        width: 'max-content',
        gap: 0.5,
        mr: 1,
      }}
    >
      {isLoading || isLoadingRaidRank ? (
        <>
          <CircularProgress size="20px" sx={{ mr: 4 }} />
          <img src={imagePath.QuestCoin} alt="quest_coin" style={{ height: '18px' }} />
        </>
      ) : (
        <>
          {totalPoint} TP
          <img src={imagePath.QuestCoin} alt="quest_coin" style={{ height: '18px' }} />
        </>
      )}
    </Button>
  );
};

export default ButtonQuestPoint;
