import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { TFetchDataChart } from '../../../../../../../services/api/fetchDataChart';
import { Typography } from '@mui/material';
import { formatNumber } from 'src/utils/format';

export default function AreaChartData({ data }: { data: TFetchDataChart }) {
    const optionChart = useMemo(() => {
        const options: Highcharts.Options = {
            chart: {
                type: 'area',
                height: window.innerWidth < 600 ? 160 : 200,
                zooming: { type: 'x', resetButton: { position: { align: 'right', verticalAlign: 'bottom', x: 0, y: 0 }, theme: { zIndex: 8 } } },
            },
            title: {
                text: '',
            },
            xAxis: {
                plotBands: [
                    {
                        from: data.newMin,
                        to: data.newMax,
                        color: 'rgba(182, 204, 244, 0.2)',
                        label: {
                            align: 'left',
                            x: 10,
                        },
                    },
                ],
                plotLines: [
                    {
                        value: data.newMin,
                        color: '#2465DE',
                        width: 1.5,
                        zIndex: 4,
                        label: {
                            useHTML: true,
                            formatter: function () {
                                return `
                        <div style="background-color: #8CACE9; padding: 1px 5px; color: #FFFFFF; border-radius: 4px";>
                        New Min
                        </div>`;
                            },
                            rotation: 0,
                            align: 'right',
                            x: -2,
                            y: 18,
                            style: {
                                color: '#2465DE',
                                fontFamily: 'Manrope, sans-serif',
                            },
                        },
                    },
                    {
                        value: data.currentIndex,
                        color: '#2465DE',
                        dashStyle: 'Dash',
                        width: 1,
                        zIndex: 4,
                        label: {
                            useHTML: true,
                            formatter: function () {
                                return `
                                    <div style="border-radius: 99px; width: 5px; height: 5px; background-color: #2465DE"; 
                                    title="Current Price: ${formatNumber(data.currentPrice, { fractionDigits: 6 })}\nCurrent Tick: ${data.currentTick}">
                                    </div>
                                    `;
                            },
                            x: -10,
                            y: -2,
                        },
                    },
                    {
                        value: data.newMax,
                        color: '#2465DE',
                        width: 1.5,
                        zIndex: 4,
                        label: {
                            useHTML: true,
                            formatter: function () {
                                return `
                        <div style="background-color: #5889E3; padding: 1px 5px; color: #FFFFFF; border-radius: 4px";>
                        New Max
                        </div>`;
                            },
                            rotation: 0,
                            x: 2,
                            y: 8,
                            style: {
                                color: '#2465DE',
                                fontFamily: 'Manrope, sans-serif',
                            },
                        },
                    },
                ],
                crosshair: true,
                categories: data.prices,
                lineWidth: 0,
                labels: {
                    style: {
                        fontFamily: 'Manrope, sans-serif',
                        color: '#97A8BC',
                    },
                    formatter: function () {
                        return parseFloat(this.value as string).toFixed(3);
                    },
                },
                tickInterval: Math.ceil(data.prices.length / 6),
                events: {
                    afterSetExtremes: function (e) {
                        const chart = this.chart;
                        if (e.trigger === 'zoom') {
                            chart.xAxis[0].update({
                                tickInterval: Math.ceil(data.prices.length / 30),
                            });
                        } else {
                            chart.xAxis[0].update({
                                tickInterval: Math.ceil(data.prices.length / 6),
                            });
                        }
                    },
                },
            },
            yAxis: {
                visible: false,
            },
            series: [
                {
                    name: '',
                    type: 'area',
                    data: data.liquiditys,
                    tooltip: {
                        valueDecimals: 6,
                    },
                    showInLegend: false,
                },
            ],
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return `
            <div>
            Price: <b>${formatNumber(this.x, { fractionDigits: 6 })}</b> <br/>
            Tick: <b>${data.ticks[this.point.index]}</b> 
            </div>`;
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
            plotOptions: {
                area: {
                    lineColor: '#2465DE',
                    lineWidth: 1,
                    marker: {
                        enabled: false,
                    },
                    fillOpacity: 0.1,
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#B6CCF4'],
                            [1, 'rgba(182, 204, 244, 0)'],
                        ],
                    },
                },
            },
            legend: {
                enabled: false,
            },
            credits: {
                enabled: false,
            },
        };
        return options;
    }, [data]);

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={optionChart} />
            <Typography textAlign={'end'} variant="body3" color={'#97A8BC'}>
                Refresh in 1 minute
            </Typography>
        </>
    );
}
