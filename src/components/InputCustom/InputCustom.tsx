import { ReactNode, useMemo, useState } from 'react';
import { Box, Typography, Skeleton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import IconAndName from '../IconAndName/IconAndName';
import { optionSelectToken, tokenList } from 'src/constants/tokenMap';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { usePendleFunction } from 'src/jotai/pendle/pendle';

type Props = {
  endElement: ReactNode;
  value: string | null;
  onChange: (value: string) => void;
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  selected?: boolean;
  selectName?: string;
  pendleName?: string;
};
export default function InputCustom({
  endElement,
  value,
  onChange,
  subValue,
  readonly = false,
  onClickMax,
  loading,
  selected,
  selectName,
  pendleName,
}: Props) {
  // jotai sate
  const { getNativeTokenBalanceSelect, UpdateAllKeyPendle } = usePendleFunction();
  const { chainIdSelected } = useSwitchToSelectedChain();

  // state
  const [select, setSelect] = useState(() => {
    if (chainIdSelected === 421614) {
      return pendleName || selectName;
    }

    return selectName;
  });

  const options = useMemo(() => {
    if (chainIdSelected === 421614 && pendleName) {
      const listOption = new Set([pendleName, ...optionSelectToken[chainIdSelected], `SY-${pendleName}`]);
      return [...listOption];
    }

    return optionSelectToken[chainIdSelected];
  }, [pendleName, chainIdSelected]);

  // hanlde select
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelect(event.target.value);
    UpdateAllKeyPendle('tokenSelect', tokenList[chainIdSelected][event.target.value].address);
    getNativeTokenBalanceSelect(tokenList[chainIdSelected][event.target.value].address);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        borderRadius: '16px',
        backgroundColor: '#EFF2F8',
        py: 2,
        px: { xs: 1, md: 2.5 },
        justifyContent: 'space-between',
        width: '100%',
        height: '83px',
        marginBottom: '16px',
        boxShadow: '0px 0px 6px 0px #B0CCDA80 inset',
        placeItems: 'center',
      }}
    >
      <Box sx={{ width: '-webkit-fill-available' }}>
        {loading ? (
          <Skeleton
            variant="rounded"
            width={'50%'}
            height={'40px'}
            sx={{
              marginX: '20px',
            }}
          />
        ) : (
          <>
            <input
              readOnly={readonly}
              style={{
                display: 'block',
                border: 'none',
                outline: 'none',
                background: 'none',
                fontSize: '24px',
                fontFamily: 'inherit',
                fontWeight: '700',
                width: '100%',
              }}
              placeholder="0"
              type="number"
              value={value ? value : ''}
              onChange={e => {
                onChange(e.target.value);
              }}
              onWheel={event => event.currentTarget.blur()}
            ></input>
            {subValue ? (
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                {subValue}
              </Typography>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
        {readonly ? (
          <></>
        ) : (
          <Typography sx={{ cursor: 'pointer', fontWeight: 600 }} component={'div'} onClick={onClickMax}>
            Max
          </Typography>
        )}
        <Box sx={{ height: '100%', width: '1px', background: '#ABCDED' }}></Box>
        {selected ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Age"
            fullWidth
            onChange={e => handleChange(e)}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    padding: 2,
                  },
                },
              },
            }}
            sx={{
              border: 'none',
              '.css-1x6px41-MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent !important',
              },
              overflow: 'hidden',
            }}
          >
            {options.map(item => (
              <MenuItem value={item} key={item}>
                <Box>
                  <IconAndName nameToken={item} sxIcon={{ fontSize: '20px' }} />
                </Box>
              </MenuItem>
            ))}
          </Select>
        ) : (
          <>
            <Box>{endElement}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}
