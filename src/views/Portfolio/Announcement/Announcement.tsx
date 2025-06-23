import { Box, Button, Skeleton, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import BoxPoolAnimation from 'src/components/BoxPool';
import ModalPortfolioClaimAll from 'src/components/Modals/ModalPortfolio/ModalPortfolioClaimAll';
import MoneyAnimation from 'src/components/MoneyAnimation';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { imagePath } from 'src/constants/imagePath';
import { marketTokensPendle } from 'src/constants/mapTokenToIcon';
import useAccount from 'src/hooks/useAccount';
import { useModalPortfolioClaimAllFunction } from 'src/jotai/modals/ModalPortfolioClaimAll/ModalPortfolioClaimAll';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { BN } from 'src/utils';
import Star1Blink from 'src/views/Liquidity/Announcement/Star/Star1Blink';
import StarBlink from 'src/views/Liquidity/Announcement/Star/StarBlink';
import { useChainId } from 'wagmi';

function CalculateTotals(
  data: Array<{ lpPosition: string; ytPosition: string; ptPosition: string; price: number | null; name: string }>,
  chainIdSelected: 42161 | 421614 | 97 | 56,
): BigNumber {
  const result = data
    .map(item => {
      return BN(item.lpPosition || '0')
        .plus(BN(item.ytPosition || '0'))
        .plus(BN(item.ptPosition || '0'))
        .dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`))
        .multipliedBy(BN(item?.price));
    })
    .reduce((sum, item) => sum.plus(item), BN(0));

  return result;
}

export default function Announcement() {
  // state
  const chainIdSelected = useChainId();

  // state
  const { loading, listPendlePortfolio: listPendle } = usePendleData();
  const { address } = useAccount();
  const { openModal } = useModalPortfolioClaimAllFunction();

  const totalClaimable = listPendle
    .map(item => {
      return BN(item?.assetInterest !== 'NaN' && item?.assetInterest ? item.assetInterest : '0')
        .multipliedBy(BN(item?.price))
        .dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][item?.name || '1']?.decimal || 1}`));
    })
    .reduce((sum, item) => sum.plus(item), BN(0));

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: `url(${imagePath.BG1})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', xsm: 'cover', sm: 'contain', lg: 'contain' },
        maxWidth: '100%',
        borderRadius: {
          xs: '15px',
          xsm: '15px',
          sm: 'inherit',
          lg: 'inherit',
        },
        paddingY: { md: '50px', xs: '20px' },
        mt: { md: 0, xs: 3 },
      }}
    >
      <ModalPortfolioClaimAll />
      <Box sx={{ width: '100%', ml: { md: 5, xs: 1 }, pb: { md: 5, xs: 1 } }}>
        <Typography
          variant="h3"
          color={'#ffffff'}
          sx={{ fontSize: { xs: '20px', xsm: '28px', sm: '28px', lg: '48px' } }}
        >
          Portfolio
        </Typography>
        {loading ? (
          <>
            <Skeleton variant="rounded" width={'80%'} height={'55px'} />
          </>
        ) : (
          <>
            <Box
              color={'#fff'}
              sx={{
                mt: '13px',
                display: { xs: 'block', xsm: 'flex' },
                width: '80%',
                padding: { xs: '4px 5px', xsm: '10px 16px' },
                background: 'rgba(255, 255, 255, 0.20)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.20)',
              }}
            >
              <Box
                color={'#fff'}
                sx={{
                  display: 'flex',
                  width: '100%',
                  padding: { xs: '4px 5px', xsm: '10px 16px' },
                  borderRight: { xs: 'none', xsm: '1px solid #96C0F4' },
                  borderBottom: { xs: '1px solid #96C0F4', xsm: 'none' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="caption2"
                    sx={{ color: '#A0C6FF', fontSize: { xs: '12px', xsm: '14px', sm: '14px', lg: '16px' } }}
                  >
                    My Current Balance
                  </Typography>
                  <Typography
                    variant="h4"
                    color={'#ffffff'}
                    sx={{
                      fontSize: { xs: '20px', xsm: '22px', sm: '28px', lg: '36px' },
                      display: 'flex',
                      textAlign: 'center',
                      alignItems: 'baseline',
                    }}
                  >
                    {address ? (
                      <TextSmallNumber
                        value={CalculateTotals(listPendle, chainIdSelected)}
                        contentBeforeValue="$"
                        decimal={3}
                        fallbackDisplay="$0"
                      />
                    ) : (
                      0
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box
                color={'#fff'}
                sx={{
                  marginX: { xs: '0px', xsm: '16px' },
                  display: 'flex',
                  width: '100%',
                  padding: { xs: '4px 5px', xsm: '10px 16px' },
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="caption2"
                    sx={{ color: '#A0C6FF', fontSize: { xs: '12px', xsm: '14px', sm: '14px', lg: '16px' } }}
                  >
                    My Claimable Yield & Rewards
                  </Typography>
                  <Typography
                    variant="h4"
                    color={'#ffffff'}
                    sx={{
                      fontSize: { xs: '20px', xsm: '22px', sm: '28px', lg: '36px' },
                      display: 'flex',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {address ? (
                      <TextSmallNumber value={totalClaimable} contentBeforeValue="$" fallbackDisplay="$0" />
                    ) : (
                      0
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ ml: 2, color: 'white', height: '25px' }}
                      onClick={() => {
                        openModal({
                          title: 'Claim Earnings',
                          content: '',
                          modalProps: { maxWidth: 'md' },
                        });
                      }}
                    >
                      Claim
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ width: { xs: '60%', sm: '30%', lg: '30%' } }}>
        <img
          src={imagePath.PortfolioBanner}
          style={{
            width: '100%',
            position: 'relative',
            zIndex: '2',
          }}
        />
      </Box>
      <MoneyAnimation
        sx={{
          right: {
            xs: '25%',
            sm: '15%',
            lg: '14%',
          },
          width: {
            xs: '30px',
            sm: '32px',
            lg: '49px',
          },
          top: '60%',
          zIndex: '3',
        }}
        img={imagePath.PoolMoney1}
      />
      <MoneyAnimation
        sx={{
          right: {
            xs: '26%',
            sm: '16%',
            lg: '15%',
          },
          width: {
            xs: '30px',
            sm: '29px',
            lg: '40px',
          },
          top: '20%',
          zIndex: '3',
        }}
        img={imagePath.PoolMoney2}
      />
      <MoneyAnimation
        sx={{
          right: {
            xs: '4%',
            sm: '2%',
            lg: '2%',
          },
          top: '40%',
          width: {
            xs: '30px',
            sm: '29px',
            lg: '40px',
          },
          zIndex: '3',
        }}
        img={imagePath.PoolMoney3}
      />
      <BoxPoolAnimation
        sx={{
          right: {
            xs: '13%',
            sm: '5%',
            lg: '5%',
          },
          top: '20%',
          width: {
            xs: '5px',
            sm: '10px',
            lg: '18px',
          },
          zIndex: '3',
        }}
        img={imagePath.PoolBox1}
      />
      <BoxPoolAnimation
        sx={{
          right: {
            xs: '26%',
            sm: '16%',
            lg: '16%',
          },
          top: '40%',
          width: {
            xs: '5px',
            sm: '10px',
            lg: '18px',
          },
          zIndex: '3',
        }}
        img={imagePath.PoolBox2}
      />
      <StarBlink sx={{ right: '45%', top: '70%', width: '23px' }} />
      <StarBlink sx={{ right: '55%', top: '30%', width: '15px', rotate: '35deg', animationDelay: '1000ms' }} />
      <StarBlink sx={{ right: '40%', top: '20%', width: '22px', rotate: '25deg', animationDelay: '500ms' }} />
      <Star1Blink sx={{ right: '3%', top: '30%', width: '22px', rotate: '10deg', animationDelay: '2000ms' }} />
      <Star1Blink sx={{ right: '6%', top: '60%', width: '20px', rotate: '5deg', animationDelay: '300ms' }} />
    </Box>
  );
}
