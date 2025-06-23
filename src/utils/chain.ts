import { configEvmChain } from 'src/jotai/wallet/config';
import { getChains, getChainId } from 'wagmi/actions';

export default function getChainDetail(chainId?: number) {
  const currentChainId = getChainId(configEvmChain);
  const chains = getChains(configEvmChain);
  const id = chainId ? chainId : currentChainId;
  const index = chains.findIndex(c => c.id === id);

  return chains[index];
}
