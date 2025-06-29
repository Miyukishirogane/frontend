import { Context } from '@derivation-tech/context';
import { DefaultEthGasEstimator, txPlugin } from '@derivation-tech/tx-plugin';
import { BigNumber } from '@ethersproject/bignumber';
import { DEFAULT_REFERRAL_CODE, PERP_EXPIRY, perpPlugin, PlaceParam, Side, utils } from '@synfutures/sdks-perp';
import { encodePlaceParam, encodeWithdrawParam } from '@synfutures/sdks-perp/dist/utils/encode';
import { signOfSide } from '@synfutures/sdks-perp/dist/utils/utils';
import { observerAbi } from 'src/jotai/wallet/abi/ObserverAbi';
import { abiVaultStaking } from 'src/jotai/wallet/abi/VaultStaking';
import { configEvmChain } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { Address, parseEther, parseUnits } from 'viem';
import { readContracts } from 'wagmi/actions';

export const handleCalcIncentiveApr = async (vaultStaking: Address, tvlByDollar: number) => {
  const assets = await readContracts(configEvmChain, {
    contracts: [
      {
        abi: abiVaultStaking,
        address: vaultStaking,
        functionName: 'assets',
        args: [vaultStaking],
      },
    ],
  });

  if (assets[0].status === 'success') {
    //assets(address)[0]:10^18*0.34*3600*24*365/số TVL(của vault)*100
    const minOfYear = 3600 * 24 * 365;
    const incentiveApr = BN(assets[0].result[0])
      .dividedBy(1e18)
      .multipliedBy(0.34)
      .multipliedBy(minOfYear)
      .dividedBy(tvlByDollar)
      .multipliedBy(100);

    return incentiveApr;
  }

  return BN(0);
};
// Tạo một hàm để encode các tham số cho hàm executeTrade
// export async function encodeCloseTrade(address: string): Promise<[Address, Address]> {
//   const ctx = new Context(
//     'base',
//     {
//       url: 'https://mainnet.base.org',
//     },
//     {},
//   )
//     .use(perpPlugin())
//     .use(txPlugin({ gasEstimator: new DefaultEthGasEstimator() }));
//   const expiry = PERP_EXPIRY;

//   await ctx.init();
//   const instrument = await ctx.perp.observer.getInstrument('ETH-USDC-LINK');
//   const portfolio = await ctx.perp.observer.getPortfolio({
//     traderAddr: address,
//     expiry,
//     instrumentAddr: instrument.instrumentAddr,
//   });
//   const position = portfolio.position;
//   console.log('🚀 ~ encodeCloseTrade ~ position:', position);

//   // Print your position info
//   const slippage = 100;
//   const result = await ctx.perp.simulate.simulateClose({
//     tradeInfo: position,
//     size: { base: position.size.abs() }, // close the whole position
//     slippage,
//   });

//   const sign = signOfSide(utils.reverseSide(position.side));
//   const tradeParam: PlaceParam = {
//     expiry: expiry,
//     size: result.size.base.mul(sign),
//     amount: result.margin,
//     tick: result.limitTick,
//     deadline: Math.floor(Date.now() / 1000) + 5 * 60,
//     referralCode: DEFAULT_REFERRAL_CODE,
//   };

//   return encodePlaceParam(tradeParam) as [Address, Address];
// }

export async function encodeCloseTrade(address: string): Promise<{ data: [Address, Address]; dataWithdraw: Address }> {
  // Kiểm tra địa chỉ hợp lệ
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

  const instrument = await ctx.perp.observer.getInstrument('ETH-USDC-LINK');
  const amm = instrument.amms.get(expiry)!;
  const portfolio = await ctx.perp.observer.getPortfolio({
    traderAddr: address,
    expiry,
    instrumentAddr: instrument.instrumentAddr,
  });
  // If position.size is 0 means no position
  const position = portfolio.position;
  const usdc = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
  // Print your position info
  const slippage = 100;
  console.log('Position info', utils.formatPosition(position, amm, instrument.setting.maintenanceMarginRatio));

  const result = await ctx.perp.simulate.simulateClose({
    tradeInfo: position,
    size: { base: position.size.abs() }, // close the whole position
    slippage,
  });

  const sign = signOfSide(utils.reverseSide(position.side));
  const tradeParam: PlaceParam = {
    expiry: expiry,
    size: result.size.base.mul(sign),
    amount: result.margin,
    tick: result.limitTick,
    deadline: Math.floor(Date.now() / 1000) + 5 * 60,
    referralCode: DEFAULT_REFERRAL_CODE,
  };
  const result1 = result.size.base.mul(sign);
  console.log(result1);
  const raw = result.postPosition.balance.toString();
  const padded = raw.length < 19 ? raw.padEnd(19, '0') : raw;
  console.log(padded);
  const intPart = padded.slice(0, -18) || '0'; // phần nguyên
  const fracPart = padded.slice(-18); // phần thập phân

  // Cắt 5 số đầu của phần thập phân, không làm tròn
  const withdrawAmount = intPart + '.' + fracPart.slice(0, 5);

  const dataWithdraw = encodeWithdrawParam(usdc, BigNumber.from(parseUnits(withdrawAmount, 6))) as Address;
  const data = encodePlaceParam(tradeParam) as [Address, Address];

  return {
    data,
    dataWithdraw,
  };
}

export async function encodeDataTrade(address: string): Promise<Address> {
  try {
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

    const usdc = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    const OBSERVER = '0xDb166a6E454d2a273Cd50CCD6420703564B2a830';
    const instrument = await ctx.perp.observer.getInstrument('ETH-USDC-LINK');
    const result = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: observerAbi,
          address: OBSERVER,
          functionName: 'getPortfolios',
          args: [address as `0x${string}`, instrument.instrumentAddr as `0x${string}`],
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tx = result[0].result as any;
    const tx1 = tx[1][0].position.balance;
    const decimal = 1e18;
    // Convert to decimal string with controlled decimal places
    const withdrawAmount = (Number(tx1) / decimal).toFixed(5);
    const dataWithdraw = encodeWithdrawParam(usdc, BigNumber.from(parseUnits(withdrawAmount, 6)));
    return dataWithdraw as Address;
  } catch (error) {
    console.log('🚀 ~ encodeDataTrade: ~ error:', error);
    return '0x0000000000000000000000000000000000000000' as Address;
  }
}

export async function encodeExecuteTrade(
  amount1: string,
  address: string,
  amount: string,
  sides: number,
): Promise<[Address, Address]> {
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
  let side;
  if (sides == 1) {
    side = Side.SHORT;
  } else {
    side = Side.LONG;
  }
  const instrument = await ctx.perp.observer.getInstrument('ETH-USDC-LINK');
  const expiry = PERP_EXPIRY;

  const tradeInfo = {
    instrumentAddr: instrument.instrumentAddr,
    expiry,
    traderAddr: address,
  };

  const slippage = 100;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sizeByQuote = { quote: BigNumber.from(parseEther(amount)) };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const margin = BigNumber.from(parseUnits(amount1, 18));

  const resultByMargin = await ctx.perp.simulate.simulateMarketOrderByMargin({
    tradeInfo,
    side,
    size: sizeByQuote,
    slippage,
    margin,
  });

  // console.log(resultByMargin);
  const sign = signOfSide(side);

  const tradeParam: PlaceParam = {
    expiry: expiry,
    size: resultByMargin.size.base.mul(sign),
    amount: resultByMargin.margin,
    tick: resultByMargin.limitTick,
    deadline: Math.floor(Date.now() / 1000) + 5 * 60,
    referralCode: DEFAULT_REFERRAL_CODE,
  };

  return encodePlaceParam(tradeParam) as [Address, Address];
}
