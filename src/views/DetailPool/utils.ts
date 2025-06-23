import { Address, encodeFunctionData } from 'viem';

const abiExactInputSingle = [
  'function exactInputSingle((address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)',
] as const;

export const exactInputSingle = (tokenInAddress: Address, mintSY: Address) => {
  const exactInputSingleParams = {
    tokenIn: tokenInAddress,
    tokenOut: mintSY,
    fee: 3000,
    recipient: process.env.ROUTER_ADDRESS!,
    amountIn: 0,
    amountOutMinimum: 1,
    sqrtPriceLimitX96: 0,
  };

  const result = encodeFunctionData({
    abi: abiExactInputSingle,
    functionName: 'exactInputSingle',
    args: [exactInputSingleParams],
  });

  return result;
};
