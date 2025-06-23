import { atom, useAtomValue, useSetAtom } from 'jotai';
import { appStore } from '../AppStore';

export type TUserPrivateSaleDetailInfo = {
    check?: boolean,
    name?: string;
    url?: string;
    loadingPage?: boolean,
    error?: Error | null;
};

const state = atom<TUserPrivateSaleDetailInfo>({ url: '', name: '', loadingPage: false, error: null, check: false } as TUserPrivateSaleDetailInfo);
appStore.set(state, { url: '', name: '', loadingPage: false, error: null, check: false });

export const useUserPrivateSaleDetail = () => useAtomValue(state);

export const useUserPrivateSaleDetailFunction = () => {
    const _setState = useSetAtom(state);
    function setState(data: Partial<TUserPrivateSaleDetailInfo>) {
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

    async function getStateAllVaultsPrivateSaleDetailData() {
        _setState((prev: TUserPrivateSaleDetailInfo) => ({
            ...prev,
            error: null,
            loadingPage: true,
        }));
        try {
            _setState((prev: TUserPrivateSaleDetailInfo) => ({
                ...prev,
                loadingPage: false,
                error: null,
            }));
        } catch (err) {
            _setState((prev: TUserPrivateSaleDetailInfo) => ({
                ...prev,
                loadingPage: false,
                error: err as Error,
            }));
        }
    }


    return {
        clearState,
        setState,
        getStateAllVaultsPrivateSaleDetailData
    };
};
