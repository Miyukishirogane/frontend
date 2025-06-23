import { getHours } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useMemo } from 'react';
import { formatDate, toFixedLargeNumbers } from 'src/utils/format';
import { TypeDashboardData } from 'src/views/Dashboard/type';
import { defaultChartOptions } from '../constant';
interface IProps {
  data?: TypeDashboardData;
}

const PNLChart = (props: IProps) => {
  const { data } = props;

  const chartData = useMemo(() => {
    if (!data) return [];

    return Object.keys(data).map(key => ({
      x: Number(key) * 1000,
      y: Number(toFixedLargeNumbers(data[key])),
      color: data[key] < 0 ? '#E4626F' : '#15B097',
    }));
  }, [data]);

  const chartOptions = {
    ...defaultChartOptions,
    chart: {
      type: 'column',
      height: 400,
      events: {
        load: (param: { target: { xAxis: { setExtremes: (arg0: number, arg1: number) => void }[] } }) => {
          const lastItem = chartData[chartData.length - 1]?.x;
          const startItem = chartData[chartData.length - 50]?.x;
          param.target.xAxis[0].setExtremes(startItem, lastItem);
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
                  <b>$ ${this.y}</b><br/>
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
    plotOptions: {
      column: {
        dataGrouping: {
          enabled: false,
        },
      },
    },
    yAxis: {
      opposite: false,
      labels: {
        style: {
          color: '#8C8C8C',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '14px',
        },
        align: 'right',
        formatter: function (this: { isFirst: boolean; value: number }) {
          const displayValue = this.value;
          return `<div>
                    $${displayValue} 
                </div>`;
        },
      },
    },
    series: [
      {
        type: 'column',
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={HighStock} constructorType={'stockChart'} options={chartOptions} />;
};

export default PNLChart;
