import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Accordion, Box, Collapse, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';
import { ZERO_ADDRESS } from 'src/constants';
import { BN } from 'src/utils';
import { formatNumber, numberWithCommas } from 'src/utils/format';
import { TAccordionVaultState } from '../jotai/type';
import Apr from './APR/Apr';
import DetailsLiquid from './DetailLiquidity/DetailsLiquid';
import ButtonClaimReward from './DetailLiquidity/RightContent/ButtonClaimReward/ButtonClaimReward';
import BigNumber from 'bignumber.js';

export default function AccordionLiquid({
  index,
  loading,
  iconHeader,
  vaultData,
  incentiveApr,
  earnings,
  price,
  loadingGetPrice,
}: {
  index: number;
  loading: boolean;
  iconHeader: JSX.Element;
  vaultData: TAccordionVaultState;
  incentiveApr: BigNumber | null;
  earnings: BigNumber | 0;
  price: BigNumber;
  loadingGetPrice: boolean | undefined;
}) {
  const { tvl, deposited, tvlPool, vaultStaking } = vaultData;
  const [showClaim, setShowClaim] = useState<number | null>(null);

  return (
    <>
      <Accordion
        elevation={0}
        disableGutters
        sx={{
          background: '#fff',
          border: '1px solid var(--Primary-Primary300, #92B2EF)',
          boxShadow: '0px 3px 6px 0px #00000014',
        }}
      >
        <Box sx={{ width: '100%', background: 'linear-gradient(180deg, #FFFFFF 10.5%, #E9F4FF 24%, #FFFFFF 65%)' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              mt: '10px',
              px: 3,
              py: 1.5,
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: 3.5,
              mb: '15px',
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {iconHeader}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  {loadingGetPrice ? (
                    <Skeleton variant="text" width={50} />
                  ) : (
                    <Typography variant="h5" color={'primary'} fontWeight={700}>
                      {`$${numberWithCommas(price.times(tvl).toFixed(2))}`}
                    </Typography>
                  )}

                  <Typography variant="caption" color={'text.secondary'}>
                    TVL
                  </Typography>
                </Box>
              </Box>
              <Apr index={index} />
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    TVL Uniswap V3 Pool
                  </Typography>
                  {loadingGetPrice ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : (
                    <Typography variant="h6">
                      ${formatNumber(BN(tvlPool).times(price), { fractionDigits: 2 })}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Deposited Amount
                  </Typography>
                  {loading ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : (
                    <Typography variant="h6">${formatNumber(price.times(deposited), { fractionDigits: 2 })}</Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Earnings
                  </Typography>
                  {loading ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : (
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      <Typography variant="h6">{`$${formatNumber(earnings.toString(), {
                        fractionDigits: 6,
                      })}`}</Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Incentive APR
                  </Typography>
                  {!incentiveApr ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : (
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      <Typography variant="h6">{`${incentiveApr?.toFixed(2)}%`}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <DetailsLiquid index={index} vault={vaultData} loading={Boolean(loadingGetPrice)} />
            </Box>
          </Box>
          {vaultStaking !== ZERO_ADDRESS ? (
            <>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', mb: '24px' }}
                onClick={() => {
                  if (index === showClaim) {
                    setShowClaim(null);
                  } else {
                    setShowClaim(index);
                  }
                }}
              >
                <Typography variant="h6" color={'#2465DE'}>
                  Claim Your Reward
                </Typography>
                <ArrowDropDown sx={{ color: '#2465DE', fontSize: '24px' }} />
              </Box>
              <Collapse in={showClaim !== null}>
                <Box sx={{ mt: '24px', px: 3, py: 1.5, boxShadow: '0px 0px 6px 0px rgba(36, 101, 222, 0.30)' }}>
                  <Typography variant="caption2" color={'#828282'} sx={{ fontSize: '14px' }}>
                    Claimable Reward
                  </Typography>
                  <ButtonClaimReward dataLoading={loading} vault={vaultData} />
                </Box>
              </Collapse>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Accordion>
    </>
  );
}
