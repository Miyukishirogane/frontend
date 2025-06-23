import { Accordion, Box, Typography, Button } from '@mui/material';
import DenomIconSale from 'src/views/Liquidity/common/DenomIconSale';
import { useUserPrivateSaleDetailFunction } from 'src/jotai/userSale/detailPrivateSale';
import { TPRIVATESALE } from 'src/jotai/userSale/type';
import { formatNumber } from 'src/utils/format';
import { formatDate, formatDuration } from 'src/utils/format';
import { BN } from 'src/utils';
import { compactNumber } from 'src/utils/format';
import { useUserPrivateSaleFunction } from 'src/jotai/userSale/userPrivateSale';

export default function AccordionPrivateSale(props: TPRIVATESALE) {

  const token1Info = {
    "address": "0x8d294256d858beab208adb60309ae04aef99e93f",
    "decimal": 6,
    "symbol": "USDT",
    "rate": "0"
  }
  const token2Info = {
    "address": "0xe6c7d5136af78721cf17d7b36e517e15f2608275",
    "decimal": 18,
    "symbol": "ARB",
    "rate": "0"
  }

  // props
  const { tcvPrice, bondPrice, terms } = props;

  // jotai
  const { setState } = useUserPrivateSaleDetailFunction();
  const { getDetail } = useUserPrivateSaleFunction()
  
  return (
    <>
      <Accordion elevation={0} disableGutters sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: '1px solid var(--Primary-Primary300, #92B2EF)', boxShadow: '0px 3px 6px 0px #00000014' }}>
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
                    <Typography variant="h6">
                      ${formatNumber(BN(tcvPrice).dividedBy(1e6), { fractionDigits: 2 })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Discount Price
                    </Typography>
                    <Typography variant="h6">
                      ${formatNumber(BN(bondPrice).dividedBy(1e6), { fractionDigits: 2 })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Total Bought
                    </Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      <Typography variant="h6">
                        {/* ${formatNumber(BN(tcvPrice).dividedBy(tokenList[chainIdSelected]['ARB'].decimal || '0'), { fractionDigits: 2 })} */}
                      </Typography>
                      TCV ({compactNumber(parseInt(terms.TGE) / 100000)}%)
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Vesting time start
                    </Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      {formatDate(parseInt(terms?.vestingTimeStart) * 1000, 'dd MMM yyyy')}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Vesting time
                    </Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      {formatDuration(parseInt(terms?.vestingTerm))}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="gradient"
                    fullWidth
                    onClick={async () => {
                      setState({ check: true })
                      await getDetail(props)
                    }}
                  >
                    Join Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Accordion>
    </>
  )
}
