import { Box, SxProps } from '@mui/material';
import React from 'react';
import { starAnimation } from 'src/animations/blink';
import { imagePath } from 'src/constants/imagePath';

type Props = {
    sx?: SxProps;
};
export default function StarBlink({ sx }: Props) {
    return (
        <Box
            sx={{
                animation: starAnimation,
                position: 'absolute',
                ...sx,
            }}
        >
            <img src={imagePath.STAR} alt="star" style={{ width: '100%' }} />
        </Box>
    );
}
