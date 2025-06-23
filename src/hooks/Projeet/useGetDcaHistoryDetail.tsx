import { useQuery } from '@tanstack/react-query';
import { getDcaHistoryDetail } from 'src/services/api/yieldFlex/dcaHistoryDetail';
import { useChainId } from 'wagmi';
interface IProps {
  id: string;
}

const useGetDcaHistoryDetail = (props: IProps) => {
  const { id } = props;
  const chainId = useChainId();

  const query = useQuery({
    queryKey: ['useGetDcaHistoryDetail', id, chainId],
    queryFn: async () => {
      const resp = await getDcaHistoryDetail(id);

      return resp;
    },
  });

  return { ...query, historyDetails: query.data };
};

export default useGetDcaHistoryDetail;
