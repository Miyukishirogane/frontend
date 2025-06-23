import { Accordion, Box, Typography } from '@mui/material';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import DenomIconSale from 'src/views/Liquidity/common/DenomIconSale';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { TEARLYSEED } from 'src/jotai/earlySeed/type';
import { formatNumber, compactNumber } from 'src/utils/format';
import { BN, secondsToFormattedDays } from 'src/utils';
import { useEarlySeedFunction, useEarlySeed } from 'src/jotai/earlySeed';
import useAccount from 'src/hooks/useAccount';
import { TEARLYSEEDDETAIL } from 'src/jotai/earlySeed/type';

interface AccordionEarlySeedProps {
  props: TEARLYSEED;
  index: number;
}

export default function AccordionEarlySeed({ props, index }: AccordionEarlySeedProps) {
  const token1Info = {
    address: '0x8d294256d858beab208adb60309ae04aef99e93f',
    decimal: 18,
    symbol: 'TCV',
    rate: '0',
  };
  const token2Info = {
    address: '0xe6c7d5136af78721cf17d7b36e517e15f2608275',
    decimal: 18,
    symbol: 'USDT',
    rate: '0',
  };

  // jotai
  const { address } = useAccount();
  const { loadingBtn, checkJoin } = useEarlySeed();
  const { getBondInfo } = useEarlySeedFunction();

  // props
  const { tcvPrice, terms, totalDebt } = props;

  const checkJoinPool = () => {
    return true;
  };

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
                      TCV Price
                    </Typography>
                    <Typography variant="h6">
                      ${formatNumber(BN(tcvPrice).dividedBy(1e6), { fractionDigits: 6 })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Total sale
                    </Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                      <Typography variant="h6">{formatNumber('178571.429', { fractionDigits: 2 })}</Typography>
                      TCV (Saled{' '}
                      {formatNumber(
                        BN(totalDebt)
                          .multipliedBy('1e2')
                          .dividedBy(BN(terms?.maxDebt !== '0' ? terms?.maxDebt : '178571429000000000000000')),
                        { fractionDigits: 2 },
                      )}{' '}
                      %)
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={'text.secondary'}>
                      Vesting time
                    </Typography>
                    <Box>
                      <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                        <Typography variant="h6" sx={{ textAlign: 'right' }}>
                          {compactNumber((parseInt(terms.TGE) / 100000) * 100)}%
                          <span style={{ fontWeight: '400' }}> TGE + </span>
                          {secondsToFormattedDays(parseInt(terms?.cliffingTerm || '0'))}
                          <span style={{ fontWeight: '400' }}> cliff + </span>
                          {secondsToFormattedDays(parseInt(terms?.vestingTerm))}
                          <span style={{ fontWeight: '400' }}> vesting</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ gap: 1 }}>
                  <LoadingButton
                    loading={loadingBtn && loadingBtn === index ? true : false}
                    props={{
                      variant: 'gradient',
                      sx: { color: '#FFFFFF', marginTop: '32px' },
                      fullWidth: true,
                      disabled: !address || !checkJoinPool() ? true : false,
                    }}
                    onClick={() => {
                      getBondInfo(props as TEARLYSEEDDETAIL, props?.user ? props.user : null, index);
                    }}
                  >
                    Join Now
                  </LoadingButton>
                  <Box
                    sx={{
                      gap: 1,
                      mt: '16px',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption2"
                      sx={{
                        fontSize: '14px',
                        color: `${checkJoinPool() ? 'transparent' : '#0083C9'}`,
                      }}
                    >
                      {checkJoinPool() ? (
                        <>
                          <InfoOutlined
                            style={{
                              marginRight: '5px',
                              fontSize: '14px',
                            }}
                          />{' '}
                        </>
                      ) : (
                        <>
                          <InfoOutlined
                            style={{
                              marginRight: '5px',
                              fontSize: '14px',
                            }}
                          />
                          You can not join this early seed.{' '}
                        </>
                      )}
                      <a
                        target="_blank"
                        href={''}
                        style={{
                          color: 'unset',
                          display: `${
                            !(checkJoin && checkJoin?.filter(item => item === index).length > 0) ? 'none' : ''
                          }`,
                        }}
                      >
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
