import { atom, useAtomValue, useSetAtom } from 'jotai';
import { appStore } from '../AppStore';

export type TUserPublicSaleDetailInfo = {
    check?: boolean,
    name?: string;
    url?: string;
    loadingPage?: boolean,
    error?: Error | null;
    messError?: Error | null;
};

const state = atom<TUserPublicSaleDetailInfo>({ url: '', name: '', loadingPage: false, error: null, messError: null } as TUserPublicSaleDetailInfo);
appStore.set(state, { url: '', name: '', loadingPage: false, error: null, messError: null });

export const useUserPublicSaleDetail = () => useAtomValue(state);

export const useUserPublicSaleDetailFunction = () => {
    const _setState = useSetAtom(state);
    function setState(data: Partial<TUserPublicSaleDetailInfo>) {
        _setState((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }

    async function clearState() {
        _setState(() => {
            return { url: '', name: '', loadingPage: false, error: null, check: false };
        });
    }
    
    async function getStateAllVaultsPublicSaleDetailData() {
        _setState((prev: TUserPublicSaleDetailInfo) => ({
            ...prev,
            error: null,
            loadingPage: true,
        }));
        try {
            _setState((prev: TUserPublicSaleDetailInfo) => ({
                ...prev,
                loadingPage: false,
                error: null,
            }));
        } catch (err) {
            _setState((prev: TUserPublicSaleDetailInfo) => ({
                ...prev,
                loadingPage: false,
                error: err as Error,
            }));
        }
    }


    return {
        setState,
        clearState,
        getStateAllVaultsPublicSaleDetailData
    };
};
