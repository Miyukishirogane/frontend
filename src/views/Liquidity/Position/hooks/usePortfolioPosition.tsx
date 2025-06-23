import { PERP_EXPIRY, perpPlugin } from '@synfutures/sdks-perp';
import { useQuery } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { Context } from '@derivation-tech/context';
import { DefaultEthGasEstimator, txPlugin } from '@derivation-tech/tx-plugin';
import useUserTradingAddress from '../../LiquidityLending/hooks/useUserTradingAddress';

const usePortfolioPosition = () => {
  const { address } = useAccount();
  const { data: userTradingAddress } = useUserTradingAddress();

  const query = useQuery({
    queryKey: ['portfolioPosition', userTradingAddress],
    queryFn: async () => {
      if (!userTradingAddress) return;
      const ctx = new Context(
        'base',
        {
          url: 'https://mainnet.base.org',
        },
        {},
      )
        .use(perpPlugin())
        .use(txPlugin({ gasEstimator: new DefaultEthGasEstimator() }));

      await ctx.init();
      const expiry = PERP_EXPIRY;
      const instrument = '0x04d72fb4803b4e02f14971e5bd092375eb330749';
      const portfolio = await ctx.perp.observer.getPortfolio({
        traderAddr: userTradingAddress,
        expiry,
        instrumentAddr: instrument,
      });
      const position = portfolio.position;
      console.log('🚀 ~ queryFn: ~ portfolio:', portfolio);

      return position;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!address,
  });

  return query;
};

export default usePortfolioPosition;
