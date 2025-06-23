import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { Err_NotConnectWallet, ZERO_ADDRESS } from 'src/constants';
import { abiTCVRouter } from 'src/jotai/wallet/abi/TCVRouter';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { erc20Abi } from 'viem';
import useAccount from 'src/hooks/useAccount';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';

export default function ButtonWithdrawLP({ vault, value1, value2, burnAmount, isCanUseETH }: { vault: TAccordionVaultState; value1: BigNumber; value2: BigNumber; burnAmount: BigNumber, isCanUseETH?: boolean }) {
    const { addressVault, vaultStaking, removeLiquidity } = vault;
    const { getBalanceToken, getRateTokenInVault, getUserDepositReward } = useLiquidityFunction();
    const [loading, setLoading] = useState<boolean>(false);
    const { address } = useAccount();
    const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
    async function withdraw() {
        setLoading(true);
        const idNotify = toast.loading('Check Token Allowance!');
        try {
            if (!address) throw Err_NotConnectWallet;
            const tcvRouter = contractAddress[chainIdSelected].TCV_ROUTER;
            await switchToChainSelected();

            const allowance = await readContract(configEvmChain, {
                abi: erc20Abi,
                address: vaultStaking == ZERO_ADDRESS ? addressVault : vaultStaking,
                functionName: 'allowance',
                args: [address, tcvRouter],
            });
            console.log(allowance);

            // rc20  remove approve tcv vault token new không cần nữa
            // if (BN(allowance).isLessThan(burnAmount)) {
            //     toast.update(idNotify, { render: `Approve more balance for vault!` });
            //     const approve1 = await writeContract(configEvmChain, {
            //         abi: erc20Abi,
            //         address: vaultStaking == ZERO_ADDRESS ? addressVault : vaultStaking,
            //         functionName: 'approve',
            //         args: [tcvRouter, BigInt(burnAmount.plus('1000000000').toFixed(0))],
            //         chainId: chainIdSelected,
            //     });
            //     const isSuccessApprove1 = await waitForTransactionReceipt(configEvmChain, { hash: approve1 });
            //     toast.update(idNotify, { render: `Approve success! Execute withdraw liquidity...` });
            // } else {
            //     toast.update(idNotify, { render: `Execute withdraw liquidity...` });
            // }
            const response = await writeContract(configEvmChain, {
                abi: abiTCVRouter,
                address: tcvRouter,
                functionName: 'removeLiquidity',
                args: [
                    {
                        burnAmount: BigInt(burnAmount.toFixed(0)),
                        amount0Min: BigInt(value1.toFixed(0)),
                        amount1Min: BigInt(value2.toFixed(0)),
                        gauge: vaultStaking,
                        receiveETH: isCanUseETH ? removeLiquidity.isUseETH : false,
                        receiver: address,
                        vault: addressVault,
                    },
                ],
                chainId: chainIdSelected,
            });


            await waitForTransactionReceipt(configEvmChain, { hash: response });

            getBalanceToken([vault]);
            getRateTokenInVault([{ tcvVault: addressVault }]);
            getUserDepositReward([{ tcvVault: addressVault, stakerAddress: address, vaultStaking: vaultStaking }]);

            toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
        } catch (err) {
            console.log('errorerr',err)
            toast.update(idNotify, {
                render: <ErrorExeTransaction error={err} />,
                type: 'error',
                isLoading: false,
                autoClose: 4000,
                closeButton: true,
            });
        }
        setLoading(false);
    }
    
    return (
        <LoadingButton
            props={{
                variant: 'gradient',
                sx: { color: '#FFFFFF', marginTop: '32px' },
                fullWidth: true,
                disabled: parseInt(burnAmount.toString()) > 0 ? false : true
            }}
            loading={loading}
            onClick={withdraw}
        >
            Withdraw LP
        </LoadingButton>
    );
}
