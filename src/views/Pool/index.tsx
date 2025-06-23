import { useEffect } from 'react';
import Announcement from './Announcement/Announcement';
import TablePool from 'src/components/Table/TablePool';
import { useChainId, useAccount } from 'wagmi';
import { usePendleFunction, usePendleData } from 'src/jotai/pendle/pendle';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { usePoolState, usePoolStateAction } from 'src/jotai/pendle/Pool/pool';

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

export default function Pool() {
  // state
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const { listPendle } = usePendleData();
  const { filter: showActivePendle } = usePoolState();
  const { getMarketInfo, getNativeTokenBalance, clearAll } = usePendleFunction();

  const { setFilterPendleList } = usePoolStateAction();

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

      <ToggleButtonGroupCustom
        value={showActivePendle}
        handleToggleChange={handleToggleChange}
        data={btnGroupData}
        sx={{ mt: { xs: 2, md: 1 } }}
      />

      <TablePool showActivePendle={showActivePendle} />
    </div>
  );
}
