import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { Err_NotConnectWallet } from 'src/constants';
import { abiTCVRouter } from 'src/jotai/wallet/abi/TCVRouter';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN } from 'src/utils';
import { useLiquidityData, useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { erc20Abi, parseUnits } from 'viem';
import useAccount from 'src/hooks/useAccount';
import { readContract, readContracts, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { maxAmountAddLp } from '../../../utils';

export default function ButtonAddLiquidity({ vault }: { vault: TAccordionVaultState }) {
    const { addressVault, token1Info, token2Info, addLiquidity, vaultStaking, isCanUseETH,  } = vault;
    const { getBalanceToken, getRateTokenInVault, getUserDepositReward, nativeToken } = useLiquidityFunction();
    const [loading, setLoading] = useState<boolean>(false);
    const { address } = useAccount();
    const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
    const { balance } = useLiquidityData();

    async function addLP() {
        setLoading(true);
        const idNotify = toast.loading('Check token allowance!');
        try {
            if (!address) throw Err_NotConnectWallet;
            const tcvRouter = contractAddress[chainIdSelected].TCV_ROUTER;

            await switchToChainSelected();
            const amount1 = BN(parseUnits(addLiquidity.amount1Input, token1Info.decimal));
            const amount2 = BN(parseUnits(addLiquidity.amount2Input, token2Info.decimal));

            const amount1Max = maxAmountAddLp(balance[token1Info.symbol], amount1, Number(addLiquidity.slippage));
            const amount2Max = maxAmountAddLp(balance[token2Info.symbol], amount2, Number(addLiquidity.slippage));

            if (addLiquidity.isUseETH && isCanUseETH) {
                const tokenErc20Prove = isCanUseETH == 'token1' ? token2Info : token1Info;
                const amountMax = isCanUseETH == 'token1' ? amount2Max : amount1Max;
                const allowance = await readContract(configEvmChain, { abi: erc20Abi, address: tokenErc20Prove.address, functionName: 'allowance', args: [address, tcvRouter] });

                if (BN(allowance).isLessThan(amountMax)) {
                    toast.update(idNotify, { render: `Approve more balance for ${tokenErc20Prove.symbol}!` });
                    const approve1 = await writeContract(configEvmChain, {
                        abi: erc20Abi,
                        address: tokenErc20Prove.address,
                        functionName: 'approve',
                        args: [tcvRouter, BigInt(amountMax.plus('1000000000').toFixed(0))],
                        chainId: chainIdSelected,
                    });
                    await waitForTransactionReceipt(configEvmChain, { hash: approve1 });
                    toast.update(idNotify, { render: `Approve ${tokenErc20Prove.symbol} success!` });
                }
                toast.update(idNotify, { render: `Execute provide liquidity...` });

                const response = await writeContract(configEvmChain, {
                    abi: abiTCVRouter,
                    address: tcvRouter,
                    functionName: 'addLiquidity',
                    args: [
                        {
                            amount0Max: BigInt(amount1Max.toFixed(0)),
                            amount1Max: BigInt(amount2Max.toFixed(0)),
                            amount0Min: BigInt(amount1.times(BN(1).minus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amount1Min: BigInt(amount2.times(BN(1).minus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amountSharesMin: BigInt(1),
                            vault: addressVault,
                            receiver: address,
                            gauge: vaultStaking,
                        },
                    ],
                    chainId: chainIdSelected,
                    value: isCanUseETH == 'token1' ? BigInt(amount1Max.toFixed(0)) : BigInt(amount2Max.toFixed(0)),
                });
                toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
            } else {
                const allowance = await readContracts(configEvmChain, {
                    contracts: [
                        { abi: erc20Abi, address: token1Info.address, functionName: 'allowance', args: [address, tcvRouter] },
                        { abi: erc20Abi, address: token2Info.address, functionName: 'allowance', args: [address, tcvRouter] },
                    ],
                });

                if (allowance[0].status === 'failure' || BN(allowance[0].result).isLessThan(amount1Max)) {
                    toast.update(idNotify, { render: `Approve more balance for ${token1Info.symbol}!` });
                    const approve1 = await writeContract(configEvmChain, {
                        abi: erc20Abi,
                        address: token1Info.address,
                        functionName: 'approve',
                        args: [tcvRouter, BigInt(amount1Max.plus('1000000000').toFixed(0))],
                        chainId: chainIdSelected,
                    });
                    await waitForTransactionReceipt(configEvmChain, { hash: approve1 });
                    toast.update(idNotify, { render: `Approve ${token1Info.symbol} success!` });
                }
                if (allowance[1].status === 'failure' || BN(allowance[1].result).isLessThan(amount2Max)) {
                    toast.update(idNotify, { render: `Approve more balance for ${token2Info.symbol}!` });
                    const approve2 = await writeContract(configEvmChain, {
                        abi: erc20Abi,
                        address: token2Info.address,
                        functionName: 'approve',
                        args: [tcvRouter, BigInt(amount2Max.plus('1000000000').toFixed(0))],
                        chainId: chainIdSelected,
                    });
                    await waitForTransactionReceipt(configEvmChain, { hash: approve2 });
                    toast.update(idNotify, { render: `Approve ${token2Info.symbol} success!` });
                }

                toast.update(idNotify, { render: `Execute provide liquidity...` });

                const response = await writeContract(configEvmChain, {
                    abi: abiTCVRouter,
                    address: tcvRouter,
                    functionName: 'addLiquidity',
                    args: [
                        {
                            amount0Max: BigInt(amount1.times(BN(1).plus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amount1Max: BigInt(amount2.times(BN(1).plus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amount0Min: BigInt(amount1.times(BN(1).minus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amount1Min: BigInt(amount2.times(BN(1).minus(BN(addLiquidity.slippage).div(100))).toFixed(0)),
                            amountSharesMin: BigInt(1),
                            vault: addressVault,
                            receiver: address,
                            gauge: vaultStaking,
                        },
                    ],
                    chainId: chainIdSelected,
                });
                // const isSuccess = await waitForTransactionReceipt(configEvmChain, { hash: response });
                toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
            }

            getBalanceToken([vault]);
            getRateTokenInVault([{ tcvVault: addressVault }]);
            getUserDepositReward([{ tcvVault: addressVault, stakerAddress: address, vaultStaking: vaultStaking }]);
        } catch (err) {
            const error = err as unknown as {shortMessage: string}
            toast.update(idNotify, {
                render: error.shortMessage,
                type: 'error',
                isLoading: false,
                autoClose: 4000,
                closeButton: true,
            });
        }
        setLoading(false);
    }

    const isInvalidMaxValue = useMemo(() => {
        if (addLiquidity.amount1Input === '0' && addLiquidity.amount2Input === '0') {
          return false;
        }
    
        const amountMaxToken1 = isCanUseETH == 'token1' && addLiquidity.isUseETH ? balance[nativeToken] || BN(0) : balance[token1Info.symbol] || BN(0);
        const amountMaxToken2 = isCanUseETH == 'token2' && addLiquidity.isUseETH ? balance[nativeToken] || BN(0) : balance[token2Info.symbol] || BN(0);
    
        return BN(addLiquidity.amount1Input).isGreaterThan(amountMaxToken1) || BN(addLiquidity.amount2Input).isGreaterThan(amountMaxToken2);
    }, [addLiquidity.amount1Input, addLiquidity.amount2Input, balance, isCanUseETH, addLiquidity.isUseETH, nativeToken, token1Info.symbol, token2Info.symbol]);

    return (
        <LoadingButton
            props={{
                variant: 'gradient',
                sx: { color: '#FFFFFF', marginTop: '32px' },
                fullWidth: true,
                disabled: isInvalidMaxValue || !(BN(addLiquidity.amount1Input).isGreaterThan(0) && BN(addLiquidity.amount2Input).isGreaterThan(0)),
            }}
            loading={loading}
            onClick={addLP}
        >
            Add LP
        </LoadingButton>
    );
}
