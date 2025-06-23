import { keyframes } from '@emotion/react';

const arrowUp = keyframes({
    '0%': {
        opacity: '0',
        transform: 'translateY(3rem)',
    },

    '20%': {
        opacity: '1',
        transform: 'translateY(1.5rem)',
    },

    '80%': {
        opacity: '1',
        transform: 'translateY(-1.5rem)',
    },

    '100%': {
        opacity: '0',
        transform: 'translateY(-3rem)',
    },
});


export const arrowUpAnimation = `${arrowUp} 8s infinite linear`;
