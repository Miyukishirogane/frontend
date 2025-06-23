import React from 'react';
import { Tab, Tabs, Typography, Box } from "@mui/material"
import SwapDetailMarket from '../SwapDetailMarket';
import MintDetailMarket from '../MintDetailMarket';
import { usePendleData } from 'src/jotai/pendle/pendle';
import { usePendleFunction } from 'src/jotai/pendle/pendle';

export default function TabsCustom() {

    // state jotai
    const { tab } = usePendleData()
    const { UpdateAllKeyPendle, ResetDetailPendle } = usePendleFunction()

    // hanlde switch tab
    const handleChange = (event: React.SyntheticEvent, tab: string) => {
        event.preventDefault()
        ResetDetailPendle()
        UpdateAllKeyPendle('tab',tab)
    };

    return (
        <>
            <Tabs
                value={tab}
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
                        display: 'none'
                    }
                }}
            >
                <Tab
                    value="swap"
                    sx={{
                        width: '50%',
                        padding: '10px, 0px, 10px, 10px',
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        backgroundColor: `${tab === 'swap' ? 'white' : ''}`,
                        '&.Mui-selected': {
                            color: 'white',
                        },
                    }}
                    label={
                        <Typography
                            variant="caption2"
                            sx={{
                                fontSize: '16px',
                                color: `${tab === 'swap' ? '#000000' : ''}`,
                                fontWeight: `${tab === 'swap' ? '700' : ''}`,
                            }}>
                            Swap
                        </Typography>
                    }
                />
                <Tab
                    value="mint"
                    sx={{
                        width: '50%',
                        padding: '10px, 0px, 10px, 10px',
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        backgroundColor: `${tab === 'mint' ? 'white' : ''}`,
                        '&.Mui-selected': {
                            color: 'white',
                        },
                    }}
                    label={
                        <Typography
                            variant="caption2"
                            sx={{
                                fontSize: '16px',
                                color: `${tab === 'mint' ? '#000000' : ''}`,
                                fontWeight: `${tab === 'mint' ? '700' : ''}`,
                            }}>
                            Mint
                        </Typography>
                    }
                />

            </Tabs>
            <CustomTabPanel value={tab} index='swap'>
                <SwapDetailMarket />
            </CustomTabPanel >
            <CustomTabPanel value={tab} index='mint'>
                <MintDetailMarket />
            </CustomTabPanel>
        </>
    )
}


interface CustomTabPanel {
    children: React.ReactNode,
    index: string,
    value: string,
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
        </div >
    );
}
