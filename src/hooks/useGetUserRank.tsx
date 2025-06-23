import { Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { getCurrUserLiquidityRank, getCurrUserTravaRank } from 'src/services/api/leaderboard';
import { formatRankText } from 'src/utils/format';
import { LeaderboardTableType } from 'src/views/LeaderBoard/type';

const useGetUserRank = () => {
  const { address } = useAccount();

  const { data: userData, isLoading: loading } = useQuery<LeaderboardTableType>({
    queryKey: ['userRank', address],
    queryFn: async () => {
      if (!address) return {} as LeaderboardTableType;

      const travaRank = await getCurrUserTravaRank(address);
      const liquidityRank = await getCurrUserLiquidityRank(address);
      // const liquidityRank = await getCurrUserLiquidityRank(address);

      let result: LeaderboardTableType = { ...travaRank[address] };

      if (liquidityRank.rankLiquidityPosition) {
        result = { ...result, ...liquidityRank };
      }

      return result;
    },
    enabled: !!address,
  });

  const displayUserRank = () => {
    if (loading) {
      return <Skeleton variant="rounded" width={'50%'} height={'30px'} />;
    }

    if (userData && (userData.id || userData._id)) {
      const userRank = userData.rankReputationTrava || userData.rankLiquidityPosition || userData.rankDEXTokenHolding || 0;

      return (
        <>
          <Typography color={'#ffffff'}>
            {`You are ranked ${formatRankText(userRank)} in the leader board. `}
            <Typography component={'a'} href="/leader_board" color={'#ffffff'} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Check it now !
            </Typography>
          </Typography>
        </>
      );
    }

    return null;
  };

  return {
    loading,
    userData,
    displayUserRank,
  };
};

export default useGetUserRank;
