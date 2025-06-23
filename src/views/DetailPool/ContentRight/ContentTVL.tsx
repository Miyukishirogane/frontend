import { Box, Typography, Slider } from "@mui/material"
import { usePendleData } from "src/jotai/pendle/pendle"
import { BN } from "src/utils"
import { formatNumber } from "src/utils/format"
import { marketTokensPendle } from "src/constants/mapTokenToIcon"
import { useChainId } from 'wagmi';

export default function ContentTVL() {

    // state
    const chainIdSelected = useChainId();

    // state jotai
    const { DetailPendetail } = usePendleData()

    // value slider: lp * price
    const priceLp = BN(DetailPendetail?.price || 0).multipliedBy(BN(DetailPendetail?.lpPosition || '0'))
        .dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`))
    const pricePT = BN(DetailPendetail?.price || 0).multipliedBy(BN(DetailPendetail?.ptPosition || '0'))
        .dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`))
    const valueSlider = pricePT.dividedBy(priceLp).toString() !== 'NaN' ? 100 - parseFloat(pricePT.dividedBy(priceLp).multipliedBy('1e2').toFixed(2)) : 100

    return (
        <Box
            sx={{
                boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
                borderRadius: '20px',
                padding: '28px',
                backgroundColor: '#fff',
            }}
        >
            <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption2" sx={{ fontSize: '12px', color: 'rgba(140, 140, 140, 1)' }}>
                    Total Value Locked
                </Typography>
                <Box sx={{ display: 'flex', fontSize: '12px', color: '#000', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption2" sx={{ fontSize: '14px', fontWeight: '700' }} >
                        ${formatNumber(BN(DetailPendetail?.price).multipliedBy(BN(DetailPendetail?.lpPosition)).dividedBy(BN(`1e${marketTokensPendle[chainIdSelected][DetailPendetail?.name || '']?.decimal || '1'}`)).toString(), { fractionDigits: 2 })}
                    </Typography>
                </Box>
            </Box>
            <Slider
                defaultValue={valueSlider}
                aria-label="Disabled slider"
                valueLabelDisplay="auto"
                disabled
                sx={{
                    '& .css-1m2vbb8-MuiSlider-thumb': {
                        display: 'none',
                        backgroundColor: 'blue'
                    },
                    '& .css-7o8aqz-MuiSlider-rail': {
                        backgroundColor: '#39B8FD'
                    },
                    '& .css-ttgsjq-MuiSlider-track': {
                        backgroundColor: '#1570EA',
                        border: 'none'
                    }
                }}
            />

            <Box sx={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'block', fontSize: '12px', color: '#000', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption2" sx={{ fontSize: '12px', fontWeight: '400', color: "#787E7E" }} >
                        SY - ezETH
                    </Typography>
                    <Typography variant="caption2" sx={{ fontSize: '14px', fontWeight: '700' }} >
                        ${formatNumber(priceLp.minus(pricePT).toFixed(2), { fractionDigits: 2 })}
                    </Typography>
                </Box>
                <Box sx={{ display: 'block', fontSize: '12px', color: '#000', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption2" sx={{ fontSize: '12px', fontWeight: '400', color: "#787E7E" }} >
                        PT ezETH :
                    </Typography>
                    <Typography variant="caption2" sx={{ fontSize: '14px', fontWeight: '700' }} >
                        ${formatNumber(pricePT.toFixed(2), { fractionDigits: 2 })}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
