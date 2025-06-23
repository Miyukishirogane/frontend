import { keyframes } from '@emotion/react';

const boxPool = keyframes({
    '0%': {
        rotate: '0deg',
    },
    '20%': {
        rotate: '72deg',
    },
    '40%': {
        rotate: '144deg',
    },
    '60%': {
        rotate: '216deg',
    },
    '80%': {
        rotate: '288deg',
    },
    '100%': {
        rotate: '360deg',
    },
});

export const boxPoolAnimation = `${boxPool} 15s  infinite linear`;
