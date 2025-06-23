import { Box } from '@mui/material';
import { compareAsc, getHours } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useCallback, useEffect, useState } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { getListMarketPriceInfoChainId } from 'src/services/api/pendle/getPrice';
import { BN } from 'src/utils';
import { compactNumber, formatDate } from 'src/utils/format';
import { useChainId } from 'wagmi';
import { getStartOfDay, getStartOfWeek, groupDataChart, handleConvertDataByDate } from '../../utils';
import { chartBaseOption } from '../../utils/constants';
import { ChartItem } from '../../utils/type';
import { TTradingVolume } from 'src/jotai/pendle/type';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';

interface TProps {
  time: string;
}

// time, giá trị đưong ,2,3,4, giá trị cột
export default function AreaChartDataPrice({ data }: { data: TProps }) {
  // state jotai
  const { DetailPendetail, tokenToggle } = usePendleData();
  const chainId = useChainId();

  // state
  const [chartData, setChartData] = useState<number[][]>([]);
  const [chartDataByHour, setChartDataByHour] = useState<ChartItem[]>([]);

  const calcTradingVolume = useCallback((tradingVolume: number, ptToAsset: string, price: number) => {
    return BN(tradingVolume).multipliedBy(BN(ptToAsset).dividedBy(1e18)).multipliedBy(price).toNumber();
  }, []);

  const handleConvertChartData = (value: number) => {
    const chartSeriesData = [];

    for (let i = 0; i < chartData.length; i++) {
      chartSeriesData.push({
        x: chartData[i][0], // the date,
        y: chartData[i][value],
        price: chartData[i][1],
        tradingVolume: chartData[i][2],
      });
    }

    return chartSeriesData;
  };

  const handleCalcChartDataByHour = useCallback(async () => {
    if (!chainId || !DetailPendetail?.tokenMintSy) return;

    const listPriceByTime = await getListMarketPriceInfoChainId(chainId, DetailPendetail?.tokenMintSy);
    const { tradingVolume, expiry, timestamp: timeStampArr, name, ptToAsset, ytToAsset } = DetailPendetail;
    const assetItems = (tokenToggle === 'YT' ? ytToAsset : ptToAsset) || [];
    const poolDecimal = `1e${marketTokensPendle[chainId][name || '1']?.decimal || 1}`;

    const priceByTimeFormatted = handleConvertDataByDate(listPriceByTime, 'MMM dd, HH');
    const volumeByTimeFormatted = handleConvertDataByDate<TTradingVolume>(tradingVolume, 'MMM dd, HH');

    const dataChart: ChartItem[] = assetItems
      //filter item before expiry time
      .filter((_item, index) => {
        return compareAsc(expiry, new Date(parseFloat(timeStampArr[index]) * 1000)) > 0;
      })
      .map((item, index) => {
        const timeStamp = Number(timeStampArr[index]) * 1000;
        const objKey = formatDate(timeStamp, 'MMM dd, HH');
        const priceVolume = priceByTimeFormatted[objKey] ? priceByTimeFormatted[objKey] : priceByTimeFormatted[Object.keys(priceByTimeFormatted)[0]];
        const volume = BN(volumeByTimeFormatted?.[objKey]?.longYield || 0)
          .dividedBy(poolDecimal)
          .toNumber();

        return [
          parseFloat(timeStampArr[index] || '0') * 1000, //time stamp
          parseFloat(BN(item).dividedBy(BN(1e18)).toFixed(4)), //price
          calcTradingVolume(volume, ptToAsset[index], priceVolume) || 0, //trading volume
          parseFloat(item), //asset
        ];
      });

    setChartDataByHour(dataChart);
  }, [DetailPendetail, calcTradingVolume, chainId, tokenToggle]);

  const handleCalcChartData = useCallback(async () => {
    if (!chartDataByHour.length) return;

    if (data.time !== '1H') {
      const fnFormatByDate = data.time === '1D' ? getStartOfDay : getStartOfWeek;
      const formattedData = groupDataChart(chartDataByHour, fnFormatByDate);
      const dataTime: number[][][] = [];
      const dataShow = [];

      Object.entries(formattedData).forEach(([key, items]) => {
        const updatedItems = items.map(item => [parseFloat(key), ...item.slice(1)]);
        dataTime.push([...updatedItems]);
      });

      for (let i = 0; i < dataTime.length; i++) {
        const total = dataTime[i].reduce((sum: number, item: number[]) => sum + item[1], 0);
        const totalTradingVolumeD = dataTime[i].reduce((sum: number, item: number[]) => sum + item[2], 0);

        dataShow.push([dataTime[i][0][0], total, totalTradingVolumeD, dataTime[i][0][3]]);
      }

      setChartData(dataShow);
    } else {
      setChartData(chartDataByHour);
    }
  }, [chartDataByHour, data.time]);

  const mockOptions = {
    ...chartBaseOption,
    yAxis: [
      {
        labels: {
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
        plotLines: [
          {
            value: '120',
            color: '#fff',
            border: '0px dashed',
            width: 0,
            zIndex: 0,
            dashStyle: 'dash',
          },
        ],
        height: '60%',
        top: '0%',
        lineWidth: 1,
        resize: {
          enabled: true,
        },
        lineColor: '#8C8C8C',
      },
      {
        labels: {
          style: {
            color: '#8C8C8C',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '14px',
            x: 100,
          },
          align: 'bottom',
          // useHTML: true,
          x: 10,
          formatter: function (this: { isLast: boolean; value: string }) {
            if (this.isLast) {
              return ``;
            } else {
              return `<div>
                            ${compactNumber(this.value)} 
                            </div>`;
            }
          },
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
      },
    ],
    tooltip: {
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const chartItem = this.point.options as { [key: string]: number };

        return `
                    <div>
                   ${formatDate(Number(this.x), 'MMM dd, h:mm a')} <br/>          
                    Price: <b>${chartItem.price.toFixed(4) || 0}</b> <br/>
                    Volume: <b>${chartItem.tradingVolume || 0}</b> <br/>
                    </div > 
                `;
      },
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
    series: [
      {
        type: 'line',
        name: '',
        data: handleConvertChartData(1),
      },
      {
        type: 'column',
        name: '',
        colorByPoint: true,
        formatter: function (this: { isFirst: boolean; value: string }) {
          if (this.isFirst) {
            return '';
          } else {
            return `<div>
                        ${this.value} 
                        </div > `;
          }
        },
        data: handleConvertChartData(2),
        colors: (function () {
          const columnData = [];
          for (let i = 0; i < chartData.length; i++) {
            columnData.push(i % 2 === 0 ? '#15B097' : '#E4626F');
          }
          return columnData;
        })(),
        yAxis: 1,
      },
    ],
    xAxis: {
      gridLineWidth: 0,
      lineWidth: 0,
      type: 'datetime',
      labels: {
        formatter: function () {
          const point = this as unknown as { value: string };

          if (getHours(Number(point.value)) === 7) {
            return formatDate(Number(point.value), 'dd/MM H:mm');
          }

          return formatDate(Number(point.value), 'dd/MM');
        },
      },
    },
    chart: {
      type: '',
      height: 350,
      events: {
        load: (param: { target: { xAxis: { setExtremes: (arg0: number, arg1: number) => void }[] } }) => {
          if (chartData && data.time == '1H') {
            const lastItem = chartData[chartData.length - 1][0];
            const startItem = chartData[chartData.length - 90][0];
            param.target.xAxis[0].setExtremes(startItem, lastItem);
          }
        },
      },
      spacingBottom: 10,
    },
  };

  // useEffect
  useEffect(() => {
    handleCalcChartData();
  }, [handleCalcChartData]);

  useEffect(() => {
    handleCalcChartDataByHour();
  }, [handleCalcChartDataByHour]);

  return (
    <>
      {chartData.length > 0 ? (
        <HighchartsReact highcharts={HighStock} constructorType={'stockChart'} options={mockOptions} />
      ) : (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      )}
    </>
  );
}
