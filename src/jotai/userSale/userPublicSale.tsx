import { atom, useAtomValue, useSetAtom } from 'jotai';
import { appStore } from '../AppStore';
export type TUserPublicSaleInfo = {
    name?: string;
    url?: string;
    messError?: boolean;
    loading?: boolean;
    loadingPage?: boolean,
    error?: Error | null;
};

const state = atom<TUserPublicSaleInfo>({ url: '', name: '', messError: false, loading: false, loadingPage: false, error: null } as TUserPublicSaleInfo);
appStore.set(state, { url: '', name: '', messError: false, loading: false, loadingPage: false, error: null });

export const useUserPublicSale = () => useAtomValue(state);

export const useUserPublicSaleFunction = () => {
    const _setState = useSetAtom(state);
    function setState(data: Partial<TUserPublicSaleInfo>) {
        _setState((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }

    async function clearState() {
        _setState(() => {
            return { url: '', name: '', messError: false, loading: false, loadingPage: false, error: null };
        });
    }

    async function getStateAllVaultsPublicSaleData() {
        _setState((prev: TUserPublicSaleInfo) => ({
            ...prev,
            error: null,
            loadingPage: true,
        }));
        try {
            const checkPublicSale = sessionStorage.getItem("PublicSaleToken")
            if (checkPublicSale) {
                _setState((prev: TUserPublicSaleInfo) => ({
                    ...prev,
                    loadingPage: false,
                    error: null,
                }));
            } else {
                _setState((prev: TUserPublicSaleInfo) => ({
                    ...prev,
                    loadingPage: false,
                    error: null,
                }));
            }
        } catch (err) {
            _setState((prev: TUserPublicSaleInfo) => ({
                ...prev,
                loadingPage: false,
                error: err as Error,
            }));
        }
    }


    return {
        setState,
        clearState,
        getStateAllVaultsPublicSaleData
    };
};
