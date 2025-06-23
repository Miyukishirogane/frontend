import { Box, Grid, Paper, Typography } from '@mui/material';
import SelectPairs from 'src/components/CustomForm/SelectPairs';
import TableHistoryPosition from 'src/components/Table/YieldFlex/TableHistoryPosition/TableHistoryPosition';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import useGetFarmingPrice from 'src/hooks/Projeet/useGetFarmingPrice';
import { formatNumber } from 'src/utils/format';
import ChartData from 'src/views/YieldFlex/components/ChartData/ChartData';
import { defaultBuyInfo, defaultValueStrategy } from '../../constants';
import { useBuyInfoAtomState, useIsSwapAtom, usePairsAtomState, useStrategyState } from '../../state/hooks';
import BuySection from './BuySection/BuySection';

// const tabOptions: IToggleButton[] = [
//   {
//     value: 'buy',
//     label: 'Buy',
//   },
//   {
//     value: 'sell',
//     label: 'Sell',
//   },
// ];

const ActionSection = () => {
  const [pair, setPairs] = usePairsAtomState();
  const { price, status } = useGetFarmingPrice(pair);
  const [, setBuyInfo] = useBuyInfoAtomState();
  const [, setStrategyItems] = useStrategyState();
  const [, setIsSwap] = useIsSwapAtom();

  const currPriceDigits = price && price < 1 ? 4 : 2;

  const handleChangePair = (value: string) => {
    const tokenByPair = value.split('/');
    setPairs(value);
    setBuyInfo({ ...defaultBuyInfo, selectedToken: tokenByPair[0] });
    setStrategyItems([defaultValueStrategy]);
    setIsSwap(false);
  };

  return (
    <>
      <Paper elevation={1}>
        <Grid
          container
          sx={{
            borderRadius: '20px',
            backgroundColor: '#fff',
            p: '28px',
          }}
        >
          <Grid
            item
            xs={12}
            xl={7}
            sx={{ border: '1px solid #DADBDD', borderRadius: '20px', p: '28px', overflow: 'auto' }}
          >
            <Box sx={{ minWidth: '500px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SelectPairs
                  value={pair}
                  onChange={event => {
                    handleChangePair(event.target.value as string);
                  }}
                  sx={{
                    maxWidth: '230px',
                    fontSize: '20px',
                    '& .MuiTypography-root': {
                      fontSize: '20px',
                    },
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Typography>Current Price:</Typography>
                  <TypographyByStatus status={status} sx={{ fontWeight: '700' }}>
                    {formatNumber(price, { fractionDigits: currPriceDigits })}$
                  </TypographyByStatus>
                </Box>
              </Box>
              <ChartData />
            </Box>
          </Grid>
          <Grid item xs={12} xl={5} sx={{ mt: { xs: '28px', xl: '0px' } }}>
            <Box
              sx={{
                ml: { xl: '28px' },
                border: '1px solid #DADBDD',
                borderRadius: '20px',
                height: '100%',
              }}
            >
              {/* <CustomTab value={tabValue} onChange={(_e, value) => setTabValue(value)} options={tabOptions} /> */}
              <BuySection />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <TableHistoryPosition />
    </>
  );
};

export default ActionSection;
