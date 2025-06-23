import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material"
import Redeem from './Redeem';
import Mint from './Mint';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { usePendleFunction } from 'src/jotai/pendle/pendle';

export default function MintDetailMarket() {

    // state jotai
    const { mint } = usePendleData()
    const { UpdateAllKeyPendle, ResetDetailPendle } = usePendleFunction()

    // handle toogle
    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        ResetDetailPendle()
        if (newAlignment !== mint && newAlignment) {
            UpdateAllKeyPendle('mint', newAlignment);
        }
    };


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: 'auto',
                    position: 'relative',
                }}>
                <ToggleButtonGroup
                    color="primary"
                    value={mint}
                    exclusive

                    onChange={handleToggleChange}
                    aria-label="Platform"
                    sx={{
                        padding: '4px',
                        height: 'auto',
                        borderRadius: '24px',
                        background: '#F1F1F1',
                        '&.MuiTouchRipple-root': {
                            display: 'none'
                        },
                        "&& .Mui-selected": {
                            backgroundColor: "rgba(36, 101, 222, 1)",
                            color: 'white',
                            borderRadius: '24px'
                        },
                        "&& .Mui-selected:hover": {
                            backgroundColor: "rgba(36, 101, 222, 1)",
                            color: 'white',
                            borderRadius: '24px'
                        }
                    }}
                >
                    <ToggleButton
                        sx={{
                            padding: '6px 16px',
                            borderRadius: '24px',
                            border: 'none',
                            height: 'auto',
                            '&.MuiTouchRipple-root': {
                                display: 'none'
                            }
                        }}
                        value="mint">Mint</ToggleButton>
                    <ToggleButton
                        sx={{
                            padding: '6px 16px',
                            borderRadius: '24px',
                            border: 'none',
                            height: 'auto',
                            '&.MuiTouchRipple-root': {
                                display: 'none'
                            }
                        }}
                        value="redeem">Redeem</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {mint === 'redeem' ? (
                <Redeem />
            ) : (
                <Mint />
            )}
        </>
    )
}
