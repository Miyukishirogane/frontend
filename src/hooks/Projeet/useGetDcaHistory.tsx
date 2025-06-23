import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { getDcaHistory } from 'src/services/api/yieldFlex/dcaHistory';
import useAccount from '../useAccount';
import { useChainId } from 'wagmi';

interface IProps {
  page: number;
  itemPerPage: number;
  status: string;
}

const useGetDcaHistory = (props: IProps) => {
  const { page, itemPerPage, status } = props;
  const { address } = useAccount();
  const totalPage = useRef<number>(1);
  const chainId = useChainId();
  // const [totalPage, setTotalPage] = useState<number>(1);

  const query = useQuery({
    queryKey: ['useGetDcaHistory', address, status, page, itemPerPage, chainId],
    queryFn: async () => {
      if (!address) return;
      const resp = await getDcaHistory(address, status, page, itemPerPage);

      if (resp.totalPage) {
        totalPage.current = resp.totalPage;
      }

      return { data: resp.data, totalPage: resp.totalPage };
    },
    refetchInterval: 1000 * 10,
  });

  return { ...query, dcaHistory: query.data?.data, totalPage: totalPage.current };
};

export default useGetDcaHistory;
