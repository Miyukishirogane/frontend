import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import { Box, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import CustomStandardSelect from 'src/components/CustomForm/CustomStandardSelect';
import { mapTokenToIcon, TAppDenom } from 'src/constants/mapTokenToIcon';
import useListVaultByChainId from 'src/hooks/Liquidlity/useListVaultByChainId';
import { formatNumber } from 'src/utils/format';
import EarningSection from './DashboardSection.tsx/EarningSection';
import PNLSection from './DashboardSection.tsx/PNLSection';
import TVlSection from './DashboardSection.tsx/TVlSection';

const GeneralDashBoard = () => {
  const { data: listVault } = useListVaultByChainId();
  const [selectedVault, setSelectedVault] = useState('all');

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" fontWeight="700" my={2}>
          Details
        </Typography>

        <CustomStandardSelect
          defaultValue={selectedVault}
          onChange={e => {
            setSelectedVault(e.target.value as string);
          }}
          renderValue={value => {
            const selectedItem = listVault?.find(item => item.addressVault === value);
            if (!selectedItem) return 'All Pool';
            return `${selectedItem.token1.symbol === 'WETH' ? 'ETH' : selectedItem.token1.symbol}/${
              selectedItem.token2.symbol
            }`;
          }}
        >
          <MenuItem value="all">All Pool</MenuItem>
          {listVault?.map(vault => {
            const { token1, token2, addressVault, ranges } = vault;
            const Icon1 = mapTokenToIcon[token1.symbol as TAppDenom] ?? HelpOutlineRounded;
            const Icon2 = mapTokenToIcon[token2.symbol as TAppDenom] ?? HelpOutlineRounded;

            return (
              <MenuItem value={addressVault}>
                <Icon1 sx={{ fontSize: '20px' }} />
                <Icon2 sx={{ fontSize: '20px', transform: 'translateX(-22%)' }} />
                {token1.symbol === 'WETH' ? 'ETH' : token1.symbol}/{token2.symbol}
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <p
                    style={{
                      margin: '0px',
                      lineHeight: '14.4px',
                      fontSize: '0.8rem',
                      color: '#2465DE',
                      border: '1px solid #2465DE',
                      borderRadius: '10px',
                      padding: '1px 7px',
                    }}
                  >
                    {`${formatNumber(ranges / 10000, { fractionDigits: 2 })}`}%
                  </p>
                </Box>
              </MenuItem>
            );
          })}
        </CustomStandardSelect>
      </Box>

      <TVlSection selectedVaultAddress={selectedVault} />

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} mt={2} gap={2}>
        <EarningSection selectedVaultAddress={selectedVault} />
        <PNLSection selectedVaultAddress={selectedVault} />
      </Box>
    </Box>
  );
};

export default GeneralDashBoard;
