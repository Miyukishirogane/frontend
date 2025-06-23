import BigNumber from 'bignumber.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { TAppDenom } from 'src/constants/mapTokenToIcon';
import { Address } from 'viem';
import { appStore } from '../AppStore';
import { BN } from 'src/utils';
import { ZERO_ADDRESS } from 'src/constants';

export type TBaseTokenInfo = {
    symbol: TAppDenom;
    address: Address;
    price: BigNumber;
    decimal: number;
    loading?: boolean;
};

const state = atom<TBaseTokenInfo>({ address: ZERO_ADDRESS, price: BN(1), symbol: 'WBNB', decimal: 18 } as TBaseTokenInfo);
appStore.set(state, { address: ZERO_ADDRESS, price: BN(1), symbol: 'WBNB', decimal: 18 });

export const useBaseTokenData = () => useAtomValue(state);

export const useBaseTokenFunction = () => {
    const _setState = useSetAtom(state);
    function setState(data: Partial<TBaseTokenInfo>) {
        _setState((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }

    return { setState };
};
