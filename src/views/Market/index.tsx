import { useEffect } from 'react';
import TableMarket from 'src/components/Table/TableMarket';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { useMarketState, useMarketStateAction } from 'src/jotai/pendle/Market/market';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { useChainId } from 'wagmi';
import Announcement from './Announcement/Announcement';
import useAccount from 'src/hooks/useAccount';

const btnGroupData: IToggleButton[] = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'inactive',
    label: 'Inactive',
  },
];

export default function Market() {
  // state
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const { listPendle } = usePendleData();
  const { filter: showActivePendle } = useMarketState();

  const { getMarketInfo, getNativeTokenBalance, clearAll } = usePendleFunction();
  const { setFilterPendleList } = useMarketStateAction();

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setFilterPendleList(newAlignment);
  };

  useEffect(() => {
    clearAll();
    getMarketInfo();
  }, [chainIdSelected]);

  // call token
  useEffect(() => {
    (async () => {
      if (address && listPendle.length > 0) {
        getNativeTokenBalance();
      }
    })();
  }, [address, listPendle.length]);

  return (
    <div style={{ paddingBottom: '100px' }}>
      <Announcement />
      <ToggleButtonGroupCustom value={showActivePendle} handleToggleChange={handleToggleChange} data={btnGroupData} />
      <TableMarket showActivePendle={showActivePendle} />
    </div>
  );
}
