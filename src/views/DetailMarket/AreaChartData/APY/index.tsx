import { Box } from '@mui/material';
import { closestIndexTo, compareAsc, getHours } from 'date-fns';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconSpinLoading } from 'src/assets/icon';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { BN } from 'src/utils';
import { compactNumber, formatDate } from 'src/utils/format';
import { useChainId } from 'wagmi';
import {
  calcUnderlyingInterestApy,
  calcUnderlyingRewardApr,
  getPriceAndExchangeRate,
  getStartOfDay,
  getStartOfWeek,
  groupDataChart,
  handleRespSyInfo,
} from '../../utils';
import { chartBaseOption } from '../../utils/constants';
import { ChartItem } from '../../utils/type';

interface TProps {
  time: string;
}

export default function AreaChartDataAPY({ data }: { data: TProps }) {
  // state jotai
  const chainIdSelected = useChainId();
  const { DetailPendetail, tokenToggle, showUnder } = usePendleData();

  // state
  const [chartData, setChartData] = useState<number[][]>([]);
  const [chartDataByHour, setChartDataByHour] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConvertChartData = useCallback(
    (value: number) => {
      const chartSeriesData = [];
      for (let i = 0; i < chartData.length; i++) {
        chartSeriesData.push({
          x: chartData[i][0], // the date,
          y: chartData[i][value],
          impliedApy: chartData[i][1],
          underlyingApy: chartData[i][2],
          fixedYield: chartData[i][3],
          tradingVolume: chartData[i][4],
        });
      }

      return chartSeriesData;
    },
    [chartData],
  );

  const handleCalcChartDataByHour = useCallback(async () => {
    if (!DetailPendetail) return;
    setLoading(true);

    const syInfo = await handleRespSyInfo(chainIdSelected, DetailPendetail);
    const { rewardPrice, syPrice } = await getPriceAndExchangeRate(chainIdSelected, DetailPendetail);
    const { tradingVolume, expiry, impliedAPY, timestamp, name } = DetailPendetail;
    const poolDecimal = `1e${marketTokensPendle[chainIdSelected][name]?.decimal || 1}`;

    const syTimestamp = syInfo.map(item => item.timestamp);
    const volumeKey = Object.keys(tradingVolume || {}).map(item => Number(item));

    const result: ChartItem[] =
      impliedAPY
        //filter item before expiry time
        .filter((_item, index) => {
          return compareAsc(expiry, new Date(parseFloat(timestamp[index]) * 1000)) > 0;
        })
        .map((item, index) => {
          const syIndex = closestIndexTo(parseFloat(timestamp[index]) * 1000, syTimestamp);
          const volumeIndex = closestIndexTo(parseFloat(timestamp[index]), volumeKey) || 0;

          let underlyingApy = 0;
          if (syIndex && syIndex > 0) {
            const underlyingInterestApy = calcUnderlyingInterestApy(syInfo, syIndex).toNumber();
            const underlyingRewardApr = calcUnderlyingRewardApr(syInfo, rewardPrice, syPrice, syIndex).toNumber();
            underlyingApy = (underlyingRewardApr + underlyingInterestApy) * 100;
          }

          const volumeItem = tradingVolume?.[volumeKey[volumeIndex]];
          const volume = volumeItem
            ? BN(volumeItem.longYield + volumeItem.shortYield)
                .dividedBy(poolDecimal)
                .toNumber()
            : 0;

          return [
            parseFloat(timestamp[index]) * 1000, //Timestamp
            parseFloat(BN(item).dividedBy(BN(poolDecimal)).toFixed(5)), //Implied APY
            underlyingApy ? underlyingApy : 0, //underlyingApy
            parseFloat(BN(item).dividedBy(BN(1e16)).toFixed()), //Fixed Yield
            volume, //volume
          ];
        }) || [];

    setChartDataByHour(result);
    setLoading(false);
  }, [DetailPendetail, chainIdSelected]);

  const handleCalcChartData = useCallback(async () => {
    if (!chartDataByHour) return;

    if (data.time !== '1H') {
      const dataGroupByTime = data.time === '1D' ? groupDataChart(chartDataByHour, getStartOfDay) : groupDataChart(chartDataByHour, getStartOfWeek);

      const dataByTime: number[][][] = [];

      Object.entries(dataGroupByTime).forEach(([key, items]) => {
        const updatedItems = items.map(item => [parseFloat(key), ...item.slice(1)]);
        dataByTime.push([...updatedItems]);
      });

      const dataShow = [];

      for (let i = 0; i < dataByTime.length; i++) {
        const total = dataByTime[i].reduce((sum: number, item: number[]) => sum + item[1], 0);
        const volumeByTime = dataByTime[i].reduce((sum: number, item: number[]) => sum + item[4], 0);
        let timeRangeFixedYield = dataByTime[i][0][3];

        if (data.time === '1D') {
          //Check is 7:00AM
          timeRangeFixedYield = dataByTime[i].find(item => formatDate(item[0], 'MMM dd, h:mm a').includes('7:00 AM'))?.[3] || dataByTime[i][0][3];
        } else {
          if (new Date(dataByTime[i][1][0]).getDay() === 1) {
            //Check is Mon 7:00AM
            const fixedYieldAtMon7AM = dataByTime[i].find(item => formatDate(item[0], 'MMM dd, h:mm a').includes('7:00 AM'))?.[3];
            if (fixedYieldAtMon7AM) {
              timeRangeFixedYield = fixedYieldAtMon7AM;
            }
          }
        }

        dataShow.push([dataByTime[i][0][0], total, ...dataByTime[i][0].slice(2, -2), timeRangeFixedYield, volumeByTime]);
      }
      setChartData(dataShow);
    } else {
      //handle case hour
      setChartData(chartDataByHour);
    }
  }, [data.time, chartDataByHour]);

  // mockOptions
  const mockOptions = useMemo(
    () => ({
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
            formatter: function (this: { isFirst: boolean; value: string }) {
              return `<div>
                          ${this.value} 
                    </div>`;
            },
          },
          title: {
            text: '',
          },
          plotLines: [
            {
              value: '120',
              color: '#2465DE',
              border: '1px dashed',
              width: 1,
              zIndex: 4,
              dashStyle: 'dash',
            },
          ],
          height: `${showUnder ? '60%' : '100%'}`,
          top: '0%',
          lineWidth: 1,
          resize: {
            enabled: false,
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
            formatter: function (this: { value: string; isLast: boolean }) {
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
          top: `${showUnder ? '60%' : '100%'}`,
          height: `${showUnder ? '40%' : '0%'}`,
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
                     ${formatDate(Number(this.x), 'MMM dd, h:mm a')}<br/>  
                      Fixed Yield: <b>${chartItem.fixedYield}</b><br/>
                      ${showUnder ? ` Underlying Apy:  <b>${chartItem.underlyingApy.toFixed(6)}</b> <br/>` : ''}
                      ${showUnder ? ` Trading Volume:  <b>${chartItem.tradingVolume.toFixed(6)}</b> <br/>` : ''}
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
          type: 'line',
          name: 'apy',
          data: handleConvertChartData(2), //underlyingApy
          visible: showUnder,
        },
        {
          type: 'line',
          name: 'fixed',
          data: handleConvertChartData(3), //Fixed Yield
        },
        {
          type: 'column',
          name: '',
          colorByPoint: true,
          data: handleConvertChartData(4), //Volume
          colors: (function () {
            const columnData = [];
            for (let i = 0; i < chartData.length; i++) {
              columnData.push(i % 3 === 0 ? '#15B097' : '#E4626F');
            }
            return columnData;
          })(),
          yAxis: 1,
        },
      ],
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 1,
        type: 'datetime',
        labels: {
          formatter: function () {
            const point = this as unknown as { value: string; isLast: boolean };

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
    }),
    [chartData, data.time, handleConvertChartData, showUnder],
  );

  // useEffect
  useEffect(() => {
    handleCalcChartData();
  }, [handleCalcChartData, tokenToggle]);

  useEffect(() => {
    handleCalcChartDataByHour();
  }, [handleCalcChartDataByHour]);

  if (!loading && chartData.length === 0) {
    //handle when error
    return <Box sx={{ p: '50px', textAlign: 'center', minHeight: '330px' }}></Box>;
  }

  return (
    <>
      {!loading ? (
        <HighchartsReact highcharts={HighStock} constructorType={'stockChart'} options={mockOptions} />
      ) : (
        <Box sx={{ p: '50px', textAlign: 'center' }}>
          <IconSpinLoading sx={{ fontSize: '100px' }} />
        </Box>
      )}
    </>
  );
}
