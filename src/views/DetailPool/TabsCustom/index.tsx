import React from 'react'
import { Tab, Tabs, Typography, Box } from "@mui/material"
import { usePendleData, usePendleFunction } from 'src/jotai/pendle/pendle';
import AddPoolDetail from '../AddPoolDetail'
import RemovePoolDetail from '../RemovePoolDetail'

export default function TabsCustom() {

    // state jotai
    const { tabPool } = usePendleData()
    const { UpdateAllKeyPendle, ResetDetailPendle } = usePendleFunction()

    // hanlde switch tab
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        ResetDetailPendle()
        UpdateAllKeyPendle('tabPool', newValue)
    };

    return (
        <>
            <Tabs
                value={tabPool}
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
                    value="add"
                    sx={{
                        width: '50%',
                        padding: '10px, 0px, 10px, 10px',
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        backgroundColor: `${tabPool === 'add' ? 'white' : ''}`,
                        '&.Mui-selected': {
                            color: 'white',
                        },
                    }}
                    label={
                        <Typography
                            variant="caption2"
                            sx={{
                                fontSize: '16px',
                                color: `${tabPool === 'add' ? '#000000' : ''}`,
                                fontWeight: `${tabPool === 'add' ? '700' : ''}`,
                            }}>
                            Add Liquidity
                        </Typography>
                    }
                />
                <Tab
                    value="remove"
                    sx={{
                        width: '50%',
                        padding: '10px, 0px, 10px, 10px',
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                        backgroundColor: `${tabPool === 'remove' ? 'white' : ''}`,
                        '&.Mui-selected': {
                            color: 'white',
                        },
                    }}
                    label={
                        <Typography
                            variant="caption2"
                            sx={{
                                fontSize: '16px',
                                color: `${tabPool === 'remove' ? '#000000' : ''}`,
                                fontWeight: `${tabPool === 'remove' ? '700' : ''}`,
                            }}>
                            Remove Liquidity
                        </Typography>
                    }
                />
            </Tabs>
            <CustomTabPanel value={tabPool} index='add'>
                <AddPoolDetail />
            </CustomTabPanel >
            <CustomTabPanel
                value={tabPool}
                index='remove'
            >
                <RemovePoolDetail />
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
