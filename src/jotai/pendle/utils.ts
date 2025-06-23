import { errorMonitor } from 'events';
import { getListMarketPriceInfoChainIdNow } from 'src/services/api/pendle/getPrice';
import { handleCalcAPYInfo, handleGetApyPrice } from 'src/views/DetailMarket/utils';
import { TPendleState } from './type';

export const handleGetPricePendleInfo = async (currData: TPendleState[], poolArr: TPendleState[], chainIdSelected: 42161 | 421614 | 97 | 56) => {
  let result: TPendleState[] = [...currData];

  for (let i = 0; i < poolArr.length; i++) {
    try {
      const itemTokenMintSy = poolArr[i].tokenMintSy;
      const latestPriceMint = await getListMarketPriceInfoChainIdNow(chainIdSelected, itemTokenMintSy);
      const { longYield, underlyingApy } = await handleCalcAPYInfo(chainIdSelected, poolArr[i], latestPriceMint);
      const { ptPrice, ytPrice } = await handleGetApyPrice(poolArr[i], chainIdSelected, latestPriceMint);

      result = result.map(item => {
        if (item.marketAddress === poolArr[i].marketAddress) {
          return {
            ...item,
            longYield: longYield.multipliedBy(100).toNumber(), //convert to percent
            underlyingApy: underlyingApy.multipliedBy(100).toNumber(), //convert to percent
            ptPrice: ptPrice.toNumber(),
            ytPrice: ytPrice.toNumber(),
            price: latestPriceMint,
          };
        } else {
          return item;
        }
      });
    } catch (err) {
      console.log('err', errorMonitor);
    }
  }
  return result;
};
