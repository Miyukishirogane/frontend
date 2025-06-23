import { Box, SxProps } from '@mui/material';
import React from 'react';
type BoxCustomProps = {
    children: React.ReactNode;
    sx?: SxProps;
    sxInnerBox?: SxProps;
};
export default function BoxCustom({ children, sx, sxInnerBox }: BoxCustomProps) {
    return (
        <Box
            sx={{
                background: 'linear-gradient(58deg, #97CDFF -12%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 79.01%, #97CDFF 112.35%);',
                padding: '2px',
                borderRadius: '27px',
                ...sx,
            }}
        >
            <Box
                sx={{
                    borderRadius: '25px',
                    background: '#FFFFFF',
                    p: 2,
                    ...sxInnerBox,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
