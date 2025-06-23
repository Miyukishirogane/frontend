import React, { useEffect } from 'react';
import { useBaseTokenFunction } from './baseTokenInfo';
import { useChainId, useClient } from 'wagmi';
import { UniswapV3 } from 'tcv-platform-sdk';
import { Address } from 'viem';
import { BN } from 'src/utils';
import { TAppDenom } from 'src/constants/mapTokenToIcon';

export default function InitStateBaseTokenInfo() {
  const { setState } = useBaseTokenFunction();
  const chainIdSelected = useChainId();
  const { chain } = useClient();
  useEffect(() => {
    (async () => {
      setState({ loading: true });
      const uniswapv3 = new UniswapV3(chain.rpcUrls.default.http[0], chainIdSelected);
      const response = await uniswapv3.basePriceToUSD(chainIdSelected);
      setState({
        symbol: response.name as TAppDenom,
        address: response.address as Address,
        decimal: BN(response.decimals).toNumber(),
        price: BN(response.price).div(BN(10).pow(BN(response.decimals))),
        loading: false,
      });
    })();
  }, [chainIdSelected]);
  return <></>;
}
