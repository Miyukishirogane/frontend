import { keyframes } from '@emotion/react';

const blink = keyframes({
    '0%': {
        opacity: 0,
    },
    '50%': {
        opacity: 1,
    },
    '100%': {
        opacity: 0,
    },
});

export const starAnimation = `${blink} 2s infinite`;
