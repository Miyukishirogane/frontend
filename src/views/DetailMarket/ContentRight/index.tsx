import { Box, Checkbox, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import AreaChartDataAPY from '../AreaChartData/APY';
import AreaChartDataPrice from '../AreaChartData/Price';

export default function ContentRight() {
  // state jotai
  const { tabsRight, tokenToggle, timeChart, DetailPendetail, showUnder } = usePendleData();
  const { UpdateAllKeyPendle } = usePendleFunction();
  const poolSrcName = DetailPendetail?.protocol;

  //handle Tab
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    UpdateAllKeyPendle('timeChart', '1H');
    UpdateAllKeyPendle('tabsRight', newValue);
  };

  // handle toogle
  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    UpdateAllKeyPendle('timeChart', newAlignment);
  };

  return (
    <>
      <Tabs
        value={tabsRight}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          width: '100%',
          background: '#F1F1F1',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
        }}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Tab
          value="APY"
          sx={{
            width: '50%',
            padding: '10px, 0px, 10px, 10px',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            backgroundColor: `${tabsRight === 'APY' ? 'white' : ''}`,
            '&.Mui-selected': {
              color: 'white',
            },
          }}
          label={
            <Typography
              variant="caption2"
              sx={{
                fontSize: '16px',
                color: `${tabsRight === 'APY' ? '#000000' : ''}`,
                fontWeight: `${tabsRight === 'APY' ? '700' : ''}`,
              }}
            >
              APY
            </Typography>
          }
        />
        <Tab
          value="Price"
          sx={{
            width: '50%',
            padding: '10px, 0px, 10px, 10px',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            backgroundColor: `${tabsRight === 'Price' ? 'white' : ''}`,
            '&.Mui-selected': {
              color: 'white',
            },
          }}
          label={
            <Typography
              variant="caption2"
              sx={{
                fontSize: '16px',
                color: `${tabsRight === 'Price' ? '#000000' : ''}`,
                fontWeight: `${tabsRight === 'Price' ? '700' : ''}`,
              }}
            >
              Price
            </Typography>
          }
        />
      </Tabs>
      <CustomTabPanel value={tabsRight} index="APY">
        <Box sx={{ marginBottom: '24px' }}>
          <Box sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}>
            <Typography variant="h5" sx={{ fontSize: '20px', color: '#2A7AE6' }}>
              {/* {formatNumber(BN(DetailPendetail?.impliedAPY[0]).dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '1']?.decimal || 1}`)).toFixed(4))} */}
              {formatNumber(BN(DetailPendetail?.ptFixedYield).dividedBy('1e16').toFixed(), { fractionDigits: 2, fallback: '----' })}%
            </Typography>
            <Typography variant="caption2" sx={{ fontSize: '12px', color: '#B5B8B8' }}>
              on {poolSrcName}
            </Typography>
          </Box>
          <Typography variant="caption2" sx={{ fontSize: '12px', color: '#B5B8B8' }}>
            {tokenToggle === 'YT'
              ? `1 YT ${DetailPendetail?.name} represents the yield of 1 ${DetailPendetail?.name} deposited on ${poolSrcName} until maturity.`
              : `1 PT ${DetailPendetail?.name} is equal to 1 ${DetailPendetail?.name} deposited on ${poolSrcName} at maturity.`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', sm: 'flex', xs: 'block' },
            justifyContent: 'space-between',
            height: 'auto',
            position: 'relative',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={timeChart}
            exclusive
            onChange={handleToggleChange}
            aria-label="Platform"
            sx={{
              padding: '4px',
              height: 'auto',
              borderRadius: '24px',
              background: '#FFF',
              border: '1px solid #F1F1F1',
              '&.MuiTouchRipple-root': {
                display: 'none',
              },
              '&& .Mui-selected': {
                backgroundColor: 'rgba(36, 101, 222, 1)',
                color: 'white',
                borderRadius: '24px',
              },
              '&& .Mui-selected:hover': {
                backgroundColor: 'rgba(36, 101, 222, 1)',
                color: 'white',
                borderRadius: '24px',
              },
            }}
          >
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1H"
            >
              1H
            </ToggleButton>
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1D"
            >
              1D
            </ToggleButton>
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1W"
            >
              1W
            </ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
            <Checkbox
              defaultChecked
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              value={showUnder}
              onClick={() => {
                UpdateAllKeyPendle('showUnder', !showUnder);
              }}
            />
            <Typography variant="caption2" sx={{ fontSize: '12px', color: '#B5B8B8' }}>
              Show Underlying & Volume
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '24px' }}>
          <AreaChartDataAPY
            data={{
              time: timeChart,
            }}
          />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={tabsRight} index="Price">
        <Box sx={{ marginBottom: '24px' }}>
          <Box sx={{ display: 'flex', fontSize: '12px', color: 'rgba(140, 140, 140, 1)', placeItems: 'center', gap: 0.5 }}>
            <Typography variant="h5" sx={{ fontSize: '20px', color: '#2A7AE6' }}>
              {tokenToggle === 'YT'
                ? formatNumber(BN(DetailPendetail?.ytToAsset[0]).dividedBy(BN(`1e18`)).toFixed(4))
                : formatNumber(BN(DetailPendetail?.ptToAsset[0]).dividedBy(BN(`1e18`)).toFixed(4))}
            </Typography>
            <Typography variant="caption2" sx={{ fontSize: '12px', color: '#B5B8B8' }}>
              on {poolSrcName}
            </Typography>
          </Box>
          <Typography variant="caption2" sx={{ fontSize: '12px', color: '#B5B8B8' }}>
            {tokenToggle === 'YT'
              ? `1 YT ${DetailPendetail?.name} represents the yield of1 ${DetailPendetail?.name} deposited on ${poolSrcName} until maturity.`
              : `1 PT ${DetailPendetail?.name} is equal to1 ${DetailPendetail?.name} deposited on ${poolSrcName} at maturity.`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', sm: 'flex', xs: 'block' },
            justifyContent: 'space-between',
            height: 'auto',
            position: 'relative',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={timeChart}
            exclusive
            onChange={handleToggleChange}
            aria-label="Platform"
            sx={{
              padding: '4px',
              height: 'auto',
              borderRadius: '24px',
              background: '#FFF',
              border: '1px solid #F1F1F1',
              '&.MuiTouchRipple-root': {
                display: 'none',
              },
              '&& .Mui-selected': {
                backgroundColor: 'rgba(36, 101, 222, 1)',
                color: 'white',
                borderRadius: '24px',
              },
              '&& .Mui-selected:hover': {
                backgroundColor: 'rgba(36, 101, 222, 1)',
                color: 'white',
                borderRadius: '24px',
              },
            }}
          >
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1H"
            >
              1H
            </ToggleButton>
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1D"
            >
              1D
            </ToggleButton>
            <ToggleButton
              sx={{
                padding: '6px 16px',
                borderRadius: '24px',
                border: 'none',
                height: 'auto',
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
              value="1W"
            >
              1W
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ marginBottom: '24px' }}>
          <AreaChartDataPrice
            data={{
              time: timeChart,
            }}
          />
        </Box>
      </CustomTabPanel>
    </>
  );
}

interface CustomTabPanel {
  children: React.ReactNode;
  index: string;
  value: string;
}

// custom tab show
function CustomTabPanel(props: CustomTabPanel) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        backgroundColor: '#fff',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
