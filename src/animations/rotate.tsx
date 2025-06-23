import { keyframes } from '@emotion/react';
export const rotate = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
});

export const rotateInfinity = `${rotate} 1s infinite linear`;

export const rotateInfinity18s = `${rotate} 18s infinite linear`;
