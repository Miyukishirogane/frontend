import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SwitchBtn from 'src/views/Liquidity/common/SwitchBtn';
import InputTokens from './InputTokens/InputTokens';
import SliderCustom from 'src/components/SliderCustom/SliderCustom';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { useLiquidityFunction } from 'src/views/Liquidity/jotai/state';
import { useBaseTokenData } from 'src/jotai/baseTokenInfo/baseTokenInfo';
import { formatNumber } from 'src/utils/format';
import ButtonWithdrawLP from './ButtonWithdrawLP/ButtonWithdrawLP';
import { useChainId, useClient } from 'wagmi';
import { UniswapV3 } from 'tcv-platform-sdk';
import BigNumber from 'bignumber.js';
import { BN } from 'src/utils';
import BoxLoading from 'src/components/BoxLoading/BoxLoading';
import useAccount from 'src/hooks/useAccount';

type Props = {
    index: number;
    vault: TAccordionVaultState;
};

export default function RemoveLiquidity({ index, vault }: Props) {
    const { removeLiquidity, isCanUseETH, addressVault, vaultStaking, token1Info, token2Info } = vault;
    const baseToken = useBaseTokenData();
    const client = useClient();
    const chainIdSelected = useChainId();
    const { address } = useAccount();
    const { changeWithdrawLpStateByIndex } = useLiquidityFunction();
    const [sliderVal, setSliderVal] = useState<number | number[]>(0);
    const [rate, setRate] = useState<{ lpAmount: BigNumber; amount1: BigNumber; amount2: BigNumber; isFetching: boolean }>({
        amount1: BN(0),
        amount2: BN(0),
        lpAmount: BN(0),
        isFetching: true,
    });

    const burnAmount = BN(vault.deposited).times(BN(sliderVal)).div(100);

    const changeSlider = (event: Event, val: number | number[], activeThumb: number) => {
        console.log('activeThumb',activeThumb)
        setSliderVal(val);
    };
    function clickLable(val: number | number[]) {
        setSliderVal(val);
    }

    async function getRate() {
        setRate((prev) => ({ ...prev, isFetching: true }));
        if (address) {
            try {
                const uniswapv3 = new UniswapV3(client.chain.rpcUrls.default.http[0], chainIdSelected);
                const response = await uniswapv3.amountsRemoveLiquidity([{ stakerAddress: address, vaultStaking: vaultStaking, tcvVault: vault.addressVault }]);
                setRate((prev) => {
                    const dataRate = response.get(addressVault);
                    return {
                        ...prev,
                        amount1: BN(dataRate?.amount0 || 0).div(BN(10).pow(token1Info.decimal)),
                        amount2: BN(dataRate?.amount1 || 0).div(BN(10).pow(token2Info.decimal)),
                        lpAmount: BN(dataRate?.amountBurn || 0),
                        isFetching: false,
                    };
                });
            } catch (e) {
                setRate((prev) => ({ ...prev, isFetching: false }));
            }
        } else {
            setRate((prev) => ({ ...prev, isFetching: false }));
        }
    }

    useEffect(() => {
        getRate();
    }, [chainIdSelected, address]);


    return (
        <>
            <Box mb={2}>
                <Box sx={{ display: 'flex', placeItems: 'center' }}>
                    {/* <Box>
                        <Box onClick={goBack} sx={{ display: 'flex', alignItems: 'center' }} style={{ cursor: 'pointer' }}>
                            <IconArrowLeft sx={{ mr: 1 }} />
                            <Typography variant="h6" color={'text.primary'}>
                                View Liquidity
                            </Typography>
                        </Box>
                    </Box> */}
                    {isCanUseETH ? (
                        <Box ml={'auto'} sx={{ display: 'flex', alignItems: 'center', margin: '0px', justifyContent: { lg: 'flex-end', xs: 'flex-start' } }}>
                            <SwitchBtn checked={removeLiquidity.isUseETH} onChange={(e) => changeWithdrawLpStateByIndex(index, { isUseETH: e.target.checked })} sx={{ mr: 1.5 }} />
                            <Typography variant="body1" color={'text.primary'}>
                                Use ETH
                            </Typography>
                        </Box>
                    ) : null}
                </Box>
            </Box>
            <BoxLoading loading={rate.isFetching}>
                <InputTokens index={index} vault={vault} value1={rate.amount1.times(BN(sliderVal)).div(100)} value2={rate.amount2.times(BN(sliderVal)).div(100)} />
            </BoxLoading>
            <Typography variant="subtitle2" sx={{ color: '#828282' }}>
                Amount to remove ${formatNumber(baseToken.price.times(burnAmount), { fractionDigits: 2 })}
            </Typography>
            <SliderCustom value={sliderVal} onChange={changeSlider} onClickLable={clickLable} />
            <ButtonWithdrawLP
                vault={vault}
                burnAmount={rate.lpAmount.times(BN(sliderVal)).div(100)}
                value1={rate.amount1.times(BN(sliderVal)).div(100)}
                value2={rate.amount2.times(BN(sliderVal)).div(100)}
                isCanUseETH={isCanUseETH ? true : false}
            />
        </>
    );
}
