import { keyframes } from '@emotion/react';

const bannerSale = keyframes({
    '0%': {
        transform: 'translateY(10px)',
        animationTimingFunction: 'ease-in-out',
    },
    '100%': {
        transform: 'translateY(-10px)',
        animationTimingFunction: 'ease-in-out',
    },
});
const bannerSale2 = keyframes({
    '0%': {
        transform: 'translateY(-10px)',
        animationTimingFunction: 'ease-in-out',
    },
    '100%': {
        transform: 'translateY(10px)',
        animationTimingFunction: 'ease-in-out',
    },
})


export const bannerSaleAnimation1 = `${bannerSale} 2s  infinite  alternate`;
export const bannerSaleAnimation2 = `${bannerSale2} 2s  infinite  alternate`;
