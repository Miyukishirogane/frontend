/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { IconSpinLoading } from 'src/assets/icon';
import ToggleButtonGroupCustom, { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import useAccount from 'src/hooks/useAccount';
import { TVaultRawData } from 'src/services/api/liquidity';
import { useChainId } from 'wagmi';
import { useLiquidityData, useLiquidityFunction } from '../jotai/state';
import { TAccordionVaultState } from '../jotai/type';
import LiquidityAllAssets from '../LiquidityLending/Components/AllAssets';
import LiquidityPosition from '../Position/LiquidityPosition';
import AccordionLiquidityDex from './Components/AccordionLiquidityDex';
// import Advertisement from './Announcement/Advertisement/Advertisement';

const btnGroupData: IToggleButton[] = [
  // {
  //   value: 'dex',
  //   label: 'Liquidity Dex',
  // },
  {
    value: 'lending',
    label: 'Liquidity Lending',
  },
  {
    value: 'position',
    label: 'Position',
  },
];

export default function LiquidityDex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleValue, setToggleValue] = useState(searchParams.get('tab') || 'lending');

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (!newAlignment) return;
    setToggleValue(newAlignment);
    searchParams.set('tab', newAlignment);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const searchValue = searchParams.get('tab');
    if (searchValue !== null && searchValue !== toggleValue) {
      setToggleValue(searchValue);
    }
  }, [searchParams]);

  return (
    <>
      {/* <Slider infinite={true} slidesToShow={1} speed={1000} autoplay={true} autoplaySpeed={10000}>
        <AnnouncementLiquidity />
        <AnnouncementLeaderBoard />
        <AnnouncementLending />
      </Slider> */}

      <ToggleButtonGroupCustom
        sx={{ my: 2 }}
        data={btnGroupData}
        value={toggleValue}
        handleToggleChange={handleToggleChange}
      />

      {toggleValue === 'position' && <LiquidityPosition />}
      {toggleValue === 'lending' && <LiquidityAllAssets />}
      {/* {toggleValue === 'dex' && <Wapper />} */}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Wapper() {
  const chainIdSelected = useChainId();
  const { address } = useAccount();
  const { error, listVault, loading } = useLiquidityData();
  const {
    getStateAllVaultsData,
    getBalanceToken,
    getUserDepositReward,
    getNativeTokenBalance,
    getFeeEarnAmountsInVault,
  } = useLiquidityFunction();

  const [isLoading, setIsLoading] = useState(false);

  const handleGetOtherData = useCallback(async () => {
    if (address && listVault.length > 0) {
      setIsLoading(true);

      await getBalanceToken(listVault as TAccordionVaultState[]);
      await getNativeTokenBalance();
      await getUserDepositReward(
        listVault.map(vault => ({
          stakerAddress: address,
          tcvVault: vault.addressVault,
          vaultStaking: vault.vaultStaking,
        })),
      );

      setIsLoading(false);
    }
  }, [address, listVault.length]);

  useEffect(() => {
    getStateAllVaultsData();
  }, [chainIdSelected]);

  useEffect(() => {
    handleGetOtherData();
  }, [handleGetOtherData]);

  useEffect(() => {
    // Định nghĩa hàm để làm việc mỗi 15 giây
    if (chainIdSelected && listVault.length > 0) {
      const response: TVaultRawData[] = listVault.map(vault => ({
        chainId: chainIdSelected,
        addressVault: vault.addressVault,
        vaultStaking: vault.vaultStaking,
        token1: (vault as TAccordionVaultState).token1Info,
        token2: (vault as TAccordionVaultState).token2Info,
        tokenReward: vault.tokenRewardInfo,
        tvl: vault.tvl,
        tvlPool: vault.tvlPool,
        apr: vault.apr,
      })) as unknown as TVaultRawData[];
      const intervalId = setInterval(() => {
        getFeeEarnAmountsInVault(response, true);
      }, 60000);

      // clear
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [listVault.length, address]);

  return (
    <>
      <Helmet>
        <title>TCV | Liquidity</title>
      </Helmet>

      {loading ? (
        <Box>
          <IconSpinLoading sx={{ fontSize: '100px', minHeight: '440px' }} />
        </Box>
      ) : (
        <>
          {error ? (
            <Box>
              <Typography>{error.message || 'Error!!'}</Typography>
            </Box>
          ) : (
            <Box sx={{ pb: 10 }}>
              <Grid container spacing={{ md: 2.5, xs: 4 }}>
                {listVault.map((vault, index) => {
                  if (vault) {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={vault?.addressVault + index}>
                        <AccordionLiquidityDex
                          index={index}
                          vaultData={vault as TAccordionVaultState}
                          isLoading={isLoading}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Box>
          )}
        </>
      )}
    </>
  );
}
