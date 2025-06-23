import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type TFuturesChartData = {
  baseVolume: number;
  close: number;
  high: number;
  low: number;
  open: number;
  quoteVolume: number;
  timestamp: number;
};

const useGetFutureChartData = () => {
  const query = useQuery({
    queryKey: ['useGetFutureChartData'],
    queryFn: async () => {
      try {
        const endTime = new Date().getTime() / 1000;
        const startTime = endTime - 3600 * 24 * 4;
        const result = await axios.get(
          `https://api.synfutures.com/v3/public/perp/market/kline?chainId=8453&endTs=${endTime}&expiry=4294967295&instrument=0x04d72fb4803b4e02f14971e5bd092375eb330749&interval=1h&startTs=${startTime}`,
        );
        return result.data.data as TFuturesChartData[];
      } catch (error) {
        console.error('Error fetching future chart data:', error);
        return [];
      }
    },
    refetchInterval: 1000 * 5,
  });

  return query;
};

export default useGetFutureChartData;
