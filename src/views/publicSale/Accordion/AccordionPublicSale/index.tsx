import { Accordion, Box, Typography, Button } from '@mui/material';
import DenomIconSale from 'src/views/Liquidity/common/DenomIconSale';
import { useUserPublicSaleDetailFunction } from 'src/jotai/userSale/detailPublicSale';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function AccordionPublicSale() {
  const token1Info = {
    address: '0x8d294256d858beab208adb60309ae04aef99e93f',
    decimal: 6,
    symbol: 'USDC',
    rate: '0',
  };
  const token2Info = {
    address: '0xe6c7d5136af78721cf17d7b36e517e15f2608275',
    decimal: 18,
    symbol: 'ARB',
    rate: '0',
  };

  // jotai
  const { setState } = useUserPublicSaleDetailFunction();

  return (
    <>
      <Accordion
        elevation={0}
        disableGutters
        sx={{
          background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)',
          border: '1px solid var(--Primary-Primary300, #92B2EF)',
          boxShadow: '0px 3px 6px 0px #00000014',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ mt: '10px', mb: '10px', width: '100%', px: 3, py: 1.5 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3.5 }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DenomIconSale token1={token1Info?.symbol ?? ''} token2={token2Info?.symbol ?? ''}></DenomIconSale>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Market Price
                    </Typography>
                    <Typography variant="h6">$0.02</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Discount Price
                    </Typography>
                    {/* {isFetchingUserVaultData ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : ( */}
                    <Typography variant="h6"> $0.015</Typography>
                    {/* )} */}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Total Bought
                    </Typography>
                    {/* {isFetchingUserVaultData ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : ( */}
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      <Typography variant="h6">100</Typography>
                      TCV (5%)
                    </Box>
                    {/* )} */}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Cliff time start
                    </Typography>
                    {/* {isFetchingUserVaultData ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : ( */}
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>15d 10h 30m</Box>
                    {/* )} */}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Vesting time
                    </Typography>
                    {/* {isFetchingUserVaultData ? (
                    <Skeleton variant="rounded" width={'100px'} />
                  ) : ( */}
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>6 months</Box>
                    {/* )} */}
                  </Box>
                </Box>
                <Box sx={{ gap: 1 }}>
                  <Button
                    variant="gradient"
                    fullWidth
                    disabled={true}
                    onClick={() => {
                      setState({ check: true });
                    }}
                  >
                    Join Now
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1, mt: '16px', textAlign: 'center', justifyContent: 'center' }}>
                    <Typography variant="caption2" color={'#0083C9'} sx={{ fontSize: '14px' }}>
                      <InfoOutlined style={{ marginRight: '5px', fontSize: '14px' }} />
                      You can not join this early seed.{' '}
                      <a target="_blank" href={''} style={{ color: 'unset' }}>
                        Go to check
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Accordion>
    </>
  );
}
