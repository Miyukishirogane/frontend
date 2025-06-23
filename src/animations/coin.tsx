import { keyframes } from '@emotion/react';

const coin = keyframes({
    '0%':{
		// boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
		transform: 'translatey(0px)'
	},
	'50%': {
		// boxShadow: '0 25px 15px 0px rgba(0,0,0,0.2)',
		transform: 'translatey(-10px)'
	},
	'100%': {
		// boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
		transform: 'translatey(0px)'
	}
});

export const coinAnimation = `${coin} 10s infinite linear`;
