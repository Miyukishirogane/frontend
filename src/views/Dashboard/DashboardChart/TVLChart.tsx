import { getHours } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useMemo } from 'react';
import { compactNumber, formatDate } from 'src/utils/format';
import { TypeDashboardData } from 'src/views/Dashboard/type';
import { defaultChartOptions } from '../constant';

interface IProps {
  data?: TypeDashboardData;
}

const TVLChart = (props: IProps) => {
  const { data } = props;

  const chartData = useMemo(() => {
    if (!data) return [];

    return Object.keys(data).map(key => ({ x: Number(key) * 1000, y: data[key] }));
  }, [data]);

  const minDataValue = useMemo(() => {
    if (!data) return 0;

    const result = Number(
      Object.keys(data)
        .reduce((minValue, key) => {
          if (data[key] < minValue) {
            return data[key];
          }

          return minValue;
        }, 1000000)
        .toFixed(),
    );

    return result;
  }, [data]);

  const chartOptions = {
    ...defaultChartOptions,
    yAxis: {
      min: minDataValue - 5,
      opposite: false,
      labels: {
        style: {
          color: '#8C8C8C',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '14px',
        },
        align: 'right',
        formatter: function (this: { isFirst: boolean; value: string }) {
          const displayValue = Number(this.value) > 0 ? compactNumber(this.value, 3) : 0;
          return `<div>
                    $${displayValue} 
                  </div>`;
        },
      },
    },
    xAxis: {
      gridLineWidth: 0,
      lineWidth: 1,
      type: 'datetime',
      labels: {
        formatter: function () {
          const point = this as unknown as { value: string; isLast: boolean };

          if (getHours(Number(point.value)) === 7) {
            return formatDate(Number(point.value), 'MMM dd, H:mm');
          }

          return formatDate(Number(point.value), 'H:mm');
        },
      },
    },
    tooltip: {
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return `
                  <div>
                    ${formatDate(Number(this.x), 'dd MMM yyyy, H:mm')}<br/>  
                    <b>$ ${Number(this.y).toFixed(4)}</b><br/>
                  </div > 
                `;
      },
      style: {
        fontFamily: 'Manrope, sans-serif',
      },
      borderRadius: 8,
      shadow: {
        color: 'rgba(0, 0, 0, 0.25)',
        opacity: 4,
      },
    },
    series: [
      {
        type: 'area',
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(182, 204, 244, 1)'],
            [1, 'rgba(182, 204, 244, 0)'],
          ],
        },
        fillOpacity: 0.1,
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={HighStock} constructorType={'stockChart'} options={chartOptions} />;
};

export default TVLChart;
