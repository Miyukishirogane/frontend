import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getTopUserByVotingPower } from 'src/services/api/governance';

export default function useGetDelegations() {
  const listDelegations = useQuery({
    queryKey: ['useGetDelegations'],
    queryFn: async () => await getTopUserByVotingPower(),
    throwOnError: err => {
      const errorMessage = err as unknown as { shortMessage: string };
      toast.error(errorMessage.shortMessage);
      return false;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { ...listDelegations, listDelegations: listDelegations.data };
}
