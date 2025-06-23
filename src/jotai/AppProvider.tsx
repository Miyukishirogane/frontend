import { ReactNode } from 'react';
import { Provider } from 'jotai';
import { appStore } from './AppStore';
import AppThemeProvider from './theme/AppThemeProvider';
import { WagmiProvider } from 'wagmi';
import { configEvmChain } from './wallet/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InitStateBaseTokenInfo from './baseTokenInfo/InitStateBaseTokenInfo';
import BigNumber from 'bignumber.js';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 60 * 1000 } } });

export default function AppProvider({ children }: { children: ReactNode }) {
  BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

  return (
    <WagmiProvider config={configEvmChain}>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <AppThemeProvider>
            <InitStateBaseTokenInfo />
            {children}
          </AppThemeProvider>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
