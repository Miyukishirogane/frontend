import { atom, useAtom } from 'jotai';

export const chartOptionAtom = atom('15m');

export const useChartOption = () => useAtom(chartOptionAtom);
