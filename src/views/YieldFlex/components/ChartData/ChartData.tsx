import { Box } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useMemo } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import useProjeetChartData from 'src/hooks/Projeet/useProjeetChartData';
import { compactNumber, formatDate } from 'src/utils/format';
import { chartBaseOption } from 'src/views/DetailMarket/utils/constants';
import { usePairsAtomValue } from '../../state/hooks';

const ChartData = () => {
  const pair = usePairsAtomValue();
  const { chartData, isLoading } = useProjeetChartData('h1', pair);

  const dataChartVolume = useMemo(() => {
    if (chartData) {
      return chartData.map(item => ({ x: item.time * 1000, y: item.volume })).sort((a, b) => a.x - b.x);
    }
    return [];
  }, [chartData]);

  const dataChartClose = useMemo(() => {
    if (chartData) {
      return chartData.map(item => ({ x: item.time * 1000, y: item.close })).sort((a, b) => a.x - b.x);
    }
    return [];
  }, [chartData]);

  const threshold = useMemo(() => {
    if (dataChartClose.length > 0) {
      return dataChartClose[0].y;
    }
  }, [dataChartClose]);

  const highchartOptions: Highcharts.Options = useMemo(() => {
    return {
      ...(chartBaseOption as unknown as Highcharts.Options),
      chart: {
        type: '',
        height: 500,
      },
      series: [
        {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          type: 'area',
          color: '#15C381',
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#7DDBB7'],
              [1, '#FFFFFF00'],
            ],
          },
          negativeColor: '#C22525',
          negativeFillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
            stops: [
              [0, '#FFBABA'],
              [1, '#FFFFFF00'],
            ],
          },
          name: '',
          data: dataChartClose,
          threshold: threshold,
        },
        {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
            fillColor: '#DEDEDE',
          },
          type: 'area',
          name: '',
          data: dataChartVolume,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#DEDEDE'],
              [1, '#DEDEDE00'],
            ],
          },
          color: '#DEDEDE',
          lineColor: 'none',
          yAxis: 1,
        },
      ],
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 1,
        type: 'datetime',
        labels: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: function (this: any) {
            return formatDate(this.value, 'dd MMM HH:mm');
          },
          style: {
            whiteSpace: 'normal', // Enables text wrapping
          },
          useHTML: true,
        },
        zoomEnabled: true,
      },
      yAxis: [
        {
          labels: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: function (this: any) {
              const lastValue = dataChartClose[dataChartClose.length - 1].y;
              const tickInterval = this.axis.tickInterval / 2;
              const color = lastValue < (threshold || 0) ? '#C22525' : '#15C381';
              if (this.isFirst) return '';
              if (Math.abs(this.value - lastValue) < tickInterval)
                return `<p style="color: white; padding: 6px 8px; border-radius: 6px; background-color: ${color};">${compactNumber(
                  this.value,
                  3,
                )}</p>`;
              else return `<p style="padding: 6px 8px;">${compactNumber(this.value, 3)}</p>`;
            },
            useHTML: true,
            style: {
              color: '#8C8C8C',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
            },
            align: 'left',
            x: 10,
          },
          title: {
            text: '',
          },
          height: '60%',
          top: '0%',
          lineWidth: 1,
          resize: {
            enabled: true,
          },
          lineColor: '#8C8C8C',
          plotLines: [
            {
              color: '#8C8C8C',
              width: 2,
              value: threshold,
              dashStyle: 'Solid',
            },
          ],
          opposite: true,
        },
        {
          labels: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: function (this: any) {
              return `<p style="padding: 6px 8px;">${compactNumber(this.value)}</p>`;
            },
            useHTML: true,
            style: {
              color: '#8C8C8C',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
            },
            align: 'left',
            x: 10,
          },
          title: {
            text: '',
          },
          top: '60%',
          height: '40%',
          offset: 0,
          lineWidth: 1,
          showLastLabel: true,
          lineColor: '#8C8C8C',
          opposite: true,
        },
      ],
      tooltip: {
        useHTML: true,
        style: {
          fontFamily: 'Manrope, sans-serif',
          color: '#8C8C8C',
        },
        borderRadius: 8,
        shadow: {
          color: 'rgba(0, 0, 0, 0.25)',
          opacity: 4,
        },
      },
      legend: { enabled: false },
    };
  }, [dataChartClose, dataChartVolume, threshold, pair]);

  return (
    <>
      {!isLoading && highchartOptions ? (
        <HighchartsReact highcharts={HighStock} options={highchartOptions} />
      ) : (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      )}
    </>
  );
};

export default ChartData;
