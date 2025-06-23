import { StatesObject } from './type';

export const getFormatStatePortfolio = (states: StatesObject) => ({
  '0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6': states['0xf9f9779d8ff604732eba9ad345e6a27ef5c2a9d6'],
  '0x875f154f4ec93255beaea9367c3adf71cdcb4cc0': states['0x875f154f4ec93255beaea9367c3adf71cdcb4cc0'],
  '0x35f3db08a6e9cb4391348b0b404f493e7ae264c0': states['0x35f3db08a6e9cb4391348b0b404f493e7ae264c0'],
  '0x2fb73d98b1d60b35fd12508933578098f352ce7e': states['0x2fb73d98b1d60b35fd12508933578098f352ce7e'],
  '0x6b92feb89ed16aa971b096e247fe234db4aaa262': states['0x6b92feb89ed16aa971b096e247fe234db4aaa262'],
});

export const guessPtReceivedFromSy = {
  guessMin: BigInt(0), // adjust as desired
  guessMax: BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935'), // adjust as desired
  guessOffchain: BigInt(0), // strictly 0
  maxIteration: BigInt(256), // adjust as desired
  eps: BigInt(1e14), // max 0.01% unused, adjust as desired
} as const;
