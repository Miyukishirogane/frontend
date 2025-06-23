import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import BoxCustom from 'src/components/BoxCustom/BoxCustom';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import IconAndName from 'src/components/IconAndName/IconAndName';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { Err_NotConnectWallet } from 'src/constants';
import { TAppDenom, tokenInfo } from 'src/constants/mapTokenToIcon';
import { abiFaucetToken } from 'src/jotai/wallet/abi/FaucetToken';
import { configEvmChain, contractAddress, infoChain } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { TAppChainId } from 'src/jotai/wallet/type';
import { parseEther } from 'viem';
import { useChainId } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import useAccount from 'src/hooks/useAccount';

const tokenList: { [key in TAppChainId]: TAppDenom[] } = {
    97: ['BUSD', 'CAKE'],
    42161: [],
    421614: ['USDC', 'ARB', 'USDT'],
    56: []
};
export default function Faucet() {
    const chainIdSelected = useChainId();
    const [tokenSelect, setTokenSelect] = React.useState<string>(tokenList[chainIdSelected][0] || '');

    const handleChange = (event: SelectChangeEvent) => {
        setTokenSelect(event.target.value as string);
    };
    
    return (
        <Box pt={8}>
            <Typography variant="h4" mb={3}>
                Faucet for token on {infoChain[chainIdSelected].name}! 🤑
            </Typography>
            <BoxCustom sx={{ maxWidth: '400px', margin: '0 auto' }} sxInnerBox={{ py: 5 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select token</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tokenSelect} label="Select token" onChange={handleChange}>
                        {tokenList[chainIdSelected].map((token, index) => {
                            return (
                                <MenuItem key={token + index} value={token}>
                                    <IconAndName nameToken={token} />
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <ButtonFaucet tokenInfo={tokenInfo[chainIdSelected][tokenSelect]} />
            </BoxCustom>
        </Box>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ButtonFaucet({ tokenInfo }: { tokenInfo: any }) {
    const [loading, setLoading] = useState<boolean>(false);
    const { switchToChainSelected, chainIdSelected } = useSwitchToSelectedChain();
    const { address } = useAccount();
    async function faucet() {
        setLoading(true);
        const idToast = toast.loading('Execute Faucet...');
        try {
            if (!tokenInfo || !tokenInfo.address) throw Error('Token Info Invalid!');
            if (!address) throw Err_NotConnectWallet;
            await switchToChainSelected();
            const response = await writeContract(configEvmChain, {
                abi: abiFaucetToken,
                address: contractAddress[chainIdSelected].FAUCET_ADDRESS,
                functionName: 'withdrawTokens',
                args: [tokenInfo.address, parseEther('0.000099')],
            });
            await waitForTransactionReceipt(configEvmChain, { hash: response });
            toast.update(idToast, { render: <RenderNofifySuccess hash={response} />, type: 'success', autoClose: 3500, isLoading: false });
        } catch (error) {
            toast.update(idToast, { render: <ErrorExeTransaction error={error} />, type: 'error', autoClose: 4000, isLoading: false, closeButton: true, });
        }
        setLoading(false);
    }

    return (
        <LoadingButton onClick={faucet} loading={loading} props={{ variant: 'gradient', fullWidth: true, sx: { mt: 2 } }}>
            Faucet
        </LoadingButton>
    );
}
