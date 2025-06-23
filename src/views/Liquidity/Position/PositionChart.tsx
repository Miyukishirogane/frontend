import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { useMemo, useRef } from 'react';
import { chartBaseOption } from 'src/views/DetailMarket/utils/constants';
import useGetFutureChartData from '../LiquidityLending/hooks/useGetFutureChartData';
import { CircularProgress } from '@mui/material';

const PositionChart = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { data: klineData, isLoading } = useGetFutureChartData();

  const formatData = useMemo(() => {
    return klineData?.map(item => [
      item.timestamp * 1000,
      Number(item.open.toFixed(2)),
      Number(item.high.toFixed(2)),
      Number(item.low.toFixed(2)),
      Number(item.close.toFixed(2)),
    ]);
  }, [klineData]);

  const options = useMemo(
    () => ({
      ...chartBaseOption,
      chart: {},
      xAxis: {
        overscroll: 6000000,
        range: 90000000,
        gridLineWidth: 1,
      },
      series: [
        {
          type: 'candlestick',
          color: '#FF7F7F',
          upColor: '#90EE90',
          lastPrice: {
            enabled: true,
            label: {
              enabled: true,
              backgroundColor: '#FF7F7F',
            },
          },
          data: formatData,
        },
      ],
    }),
    [formatData],
  );

  if (isLoading) return <CircularProgress />;

  return (
    <div className="position-chart-box">
      <style>{`
        .position-chart-box .highcharts-navigator,
        .position-chart-box .highcharts-navigator-xaxis,
        .position-chart-box .highcharts-navigator-series {
          display: none !important;
        }
      `}</style>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default PositionChart;
