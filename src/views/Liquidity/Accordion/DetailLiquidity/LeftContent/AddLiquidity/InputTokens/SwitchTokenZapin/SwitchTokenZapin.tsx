import { Box, ClickAwayListener, MenuItem } from '@mui/material';
import React from 'react';
import { IconArrowDown } from 'src/assets/icon';
import IconAndName from 'src/components/IconAndName/IconAndName';
import { useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';

export default function SwitchTokenZapin({ index, vault }: { index: number; vault: TAccordionVaultState }) {
    const { addLiquidity, token1Info, token2Info, isCanUseETH } = vault;
    const { changeAddLpStateByIndex, nativeToken } = useLiquidityFunction();
    const isUseETH = addLiquidity.isUseETH;

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'flex', placeItems: 'center', cursor: 'pointer' }} onClick={handleClick}>
                    <IconAndName
                        nameToken={
                            addLiquidity.tokenSelectedZapInOn == 'token1'
                                ? isCanUseETH == 'token1' && isUseETH
                                    ? nativeToken
                                    : token1Info.symbol
                                : isCanUseETH == 'token2' && isUseETH
                                ? nativeToken
                                : token2Info.symbol
                        }
                        sxIcon={{ fontSize: '20px' }}
                    />
                    <IconArrowDown sx={{ fontSize: '24px', transform: 'translateX(5px)' }} color="primary" />
                </Box>
                {open ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 'calc(100% + 5px)',
                            right: 0,
                            zIndex: 1,
                            py: 1,
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: '12px',
                        }}
                    >
                        <MenuItem
                            sx={{ minWidth: '100px' }}
                            onClick={() => {
                                changeAddLpStateByIndex(index, { tokenSelectedZapInOn: addLiquidity.tokenSelectedZapInOn == 'token1' ? 'token2' : 'token1' });
                                handleClickAway();
                            }}
                        >
                            <IconAndName
                                nameToken={
                                    addLiquidity.tokenSelectedZapInOn == 'token1'
                                        ? isCanUseETH == 'token2' && isUseETH
                                            ? nativeToken
                                            : token2Info.symbol
                                        : isCanUseETH == 'token1' && isUseETH
                                        ? nativeToken
                                        : token1Info.symbol
                                }
                                sxIcon={{ fontSize: '20px' }}
                            />
                        </MenuItem>
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
}
