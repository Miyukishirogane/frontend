import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { queryClient } from 'src/jotai/AppProvider';
import { useAuthFunction } from 'src/jotai/auth/auth';
import { handleLogin } from 'src/services/api/quest/login';
import { handleAddInvitePoint } from 'src/services/api/quest/quest';
import { referralCode } from 'src/views/Quest/constant';
import { Address } from 'viem';

const useLoginQuest = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get(referralCode);
  const { handleSetToken, closeAuthModal } = useAuthFunction();

  const handleInvitePoint = useCallback(async () => {
    if (!refCode) return;

    try {
      const resp = await handleAddInvitePoint(refCode);
      console.log('🚀 ~ handleInvitePoint ~ resp:', resp);
    } catch (error) {
      const err = error as unknown as { message: string };
      toast.error(err.message);
    }
  }, [refCode]);

  const mutation = useMutation({
    mutationFn: async (address?: Address) => {
      if (!address) return;

      const token = await handleLogin(address);

      if (token) {
        handleInvitePoint();
        handleSetToken(token, address);
        closeAuthModal();

        queryClient.invalidateQueries({ queryKey: ['listQuest'] });
      }
    },
  });

  return mutation;
};

export default useLoginQuest;
