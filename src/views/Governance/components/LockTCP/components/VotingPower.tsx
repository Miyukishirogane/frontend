import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import CustomTab from 'src/components/CustomTab/CustomTab';
import ToggleButtonGroupCustom from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { btnGroupInLockTCP, tabOptionsInLockTCP } from '../const';
import useGetUnlockTCV from '../hooks/useGetUnlockTCV';
import ChangeUnlockTime from './ChangeUnlockTime';
import IncreaseAmount from './IncreaseAmount';
import LockTCP from './LockTCP';
import VotingPowerWithdraw from './VotingPowerWithdraw';

export default function VotingPower() {
  const [tabValue, setTabValue] = useState<string>('lock_tcp');
  const [toggleValue, setToggleValue] = useState<string>('increase_amount');
  const { data } = useGetUnlockTCV();

  const isLocked = data && Number(data) > 0;

  const handleTabChange = (value: string) => {
    if (!value) return;
    setTabValue(value);
  };

  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== toggleValue && newAlignment) {
      setToggleValue(newAlignment);
    }
  };

  return (
    <Stack sx={{ border: '1px solid #DBE5FA', borderRadius: '16px', height: '100%' }}>
      <CustomTab value={tabValue} onChange={(_e, value) => handleTabChange(value)} options={tabOptionsInLockTCP} />
      <Box sx={{ padding: '20px', height: '100%' }}>
        {tabValue === 'lock_tcp' && (
          <>
            {isLocked ? (
              <Stack justifyContent="space-between" sx={{ height: '100%' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <ToggleButtonGroupCustom
                    value={toggleValue}
                    handleToggleChange={handleToggleChange}
                    data={btnGroupInLockTCP}
                    sx={{ mb: 2 }}
                  />
                </Box>
                <>
                  {toggleValue === 'increase_amount' && <IncreaseAmount />}
                  {toggleValue === 'change_unlock_time' && <ChangeUnlockTime />}
                </>
              </Stack>
            ) : (
              <LockTCP />
            )}
          </>
        )}
        {tabValue === 'withdraw' && <VotingPowerWithdraw />}
      </Box>
    </Stack>
  );
}
