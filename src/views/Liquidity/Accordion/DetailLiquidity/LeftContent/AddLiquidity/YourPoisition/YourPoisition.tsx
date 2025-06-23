import { Box, Typography } from '@mui/material';

export default function YourPoisition() {
    return (
        <Box sx={{ borderTop: '1px solid #F1F1F1', paddingTop: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="body2" sx={{ color: '#828282' }}>
                        Your Poisition
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', rowGap: 1.5, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'end' }}>
                        <Typography sx={{ marginRight: '5px' }} variant="h5">
                            100
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>ETH</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'end' }}>
                        <Typography sx={{ marginRight: '5px' }} variant="h5">
                            100
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>RETH</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
