import { keyframes } from '@emotion/react';

const moveVertical = keyframes({
    '0%': {
        transform: 'translatey(0px)',
        animationTimingFunction: 'linear',
    },
    '100%': {
        transform: 'translatey(10px)',
        animationTimingFunction: 'linear',
    },
});

export const airDropItemAnimation = `${moveVertical} 1.5s infinite alternate`;
