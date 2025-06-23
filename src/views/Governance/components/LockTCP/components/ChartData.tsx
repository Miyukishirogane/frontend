import { Box } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useMemo } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import { chartBaseOption } from 'src/views/DetailMarket/utils/constants';

const dataChart = [
  [Date.UTC(2024, 8, 23), 0.9],
  [Date.UTC(2024, 8, 30), 0.9],
  [Date.UTC(2024, 9, 7), 0.7],
  [Date.UTC(2024, 9, 14), 0.5],
  [Date.UTC(2024, 9, 21), 0.3],
  [Date.UTC(2024, 9, 28), 0.2],
  [Date.UTC(2024, 10, 4), 0.1],
];

export default function ChartData() {
  const highchartsOptions: Highcharts.Options = useMemo(() => {
    return {
      ...(chartBaseOption as unknown as Highcharts.Options),
      chart: {
        type: 'area',
        height: 300,
        backgroundColor: 'transparent',
      },
      title: { text: '' },
      series: [
        {
          name: 'Voting power',
          type: 'area',
          color: '#2465DE',
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#2465DE66'],
              [1, '#2465DE00'],
            ],
          },
          marker: { enabled: false },
          data: dataChart,
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: { format: '{value:%d %b}' },
        tickInterval: 7 * 24 * 3600 * 1000,
      },
      yAxis: {
        gridLineWidth: 0,
        title: { text: '' },
        labels: { format: '{value}' },
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
      },
      tooltip: {
        shared: true,
        pointFormat: '<b>{point.y}</b>',
      },
    };
  }, []);

  return (
    <>
      {highchartsOptions ? (
        <HighchartsReact highcharts={HighStock} options={highchartsOptions} />
      ) : (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      )}
    </>
  );
}
