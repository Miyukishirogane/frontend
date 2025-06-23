import { useState } from 'react';
import { Accordion, Box, Typography } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import { useUserPrivateSale } from 'src/jotai/userSale/userPrivateSale';
import { formatDate } from 'src/utils/format';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { writeContract } from 'wagmi/actions';
import RenderNofifySuccess from '../RenderNofifySuccess/RenderNofifySuccess';
import LoadingButton from '../LoadingButton/LoadingButton';
import { Err_NotConnectWallet } from 'src/constants';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { abiPrivateSale } from 'src/jotai/wallet/abi/PrivateSale';
import ErrorExeTransaction from '../ErrorExeTransaction/ErrorExeTransaction';
import { BN } from 'src/utils';
import { TDETAIL } from 'src/jotai/userSale/type';
import { formatNumber } from 'src/utils/format';
import { useUserPrivateSaleFunction } from 'src/jotai/userSale/userPrivateSale';

export default function BoxWithdraw() {

    // state jotai
    const { address } = useAccount();
    const { detail } = useUserPrivateSale()
    const { chainIdSelected } = useSwitchToSelectedChain();
    const { getDetail } = useUserPrivateSaleFunction()

    // state
    const [loading, setLoading] = useState<boolean>(false);

    // handleBuy
    async function handleWithDraw() {
        setLoading(true);
        const idNotify = toast.loading('Withdraw!');
        try {
            if (!address) throw Err_NotConnectWallet;
            const tcPrivateSaleRouter = contractAddress[chainIdSelected].TCV_PRIVATE_SALE;

            const response = await writeContract(configEvmChain, {
                abi: abiPrivateSale,
                address: tcPrivateSaleRouter,
                functionName: 'redeem',
                args: [
                    address
                ],
                chainId: chainIdSelected,
            });
            toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
            await getDetail()
        } catch (err) {
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
        <Accordion elevation={0} disableGutters sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: 'none', boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12);', minHeight: '100%', display: 'flex' }}>
            <Box sx={{ width: '100%', minHeight: '100%', display: 'flex' }}>
                <Box sx={{ mt: '10px', mb: '10px', minHeight: '100%', width: '100%', px: 3, py: 1.5, display: 'flex' }}>
                    <Box sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3.5 }}>
                        <Box sx={{ width: '100%', flexDirection: 'column', rowGap: 3.5, minHeight: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px', minHeight: '55%', borderBottom: '2px solid #F1F1F1' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
                                    <Typography variant="h4">
                                        Withdraw
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color={'text.secondary'}>
                                        Cliff time start
                                    </Typography>
                                    <Typography variant="caption2">
                                        {formatDate(parseInt((detail as TDETAIL)?.terms?.vestingTimeStart || '0') * 1000, 'dd MMM yyyy')}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color={'text.secondary'}>
                                        Vesting Time
                                    </Typography>
                                    <Typography variant="caption2">
                                        {formatDate(parseInt((detail as TDETAIL)?.terms?.vestingTimeStart || '0') * 1000, 'dd MMM yyyy')}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color={'text.secondary'}>
                                        Bought
                                    </Typography>
                                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                                        <Typography variant="h6">
                                            {formatNumber(BN((detail as TDETAIL)?.bondInfo?.totalBought || '0').dividedBy(1e18), { fractionDigits: 3 })}
                                        </Typography>
                                        TCV
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color={'text.secondary'}>
                                        Received
                                    </Typography>
                                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                                        <Typography variant="h6">
                                            {formatNumber(BN((detail as TDETAIL)?.received || '0').dividedBy(1e18), { fractionDigits: 3 })}
                                        </Typography>
                                        TCV
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '28px', justifyContent: 'end', rowGap: '32px', minHeight: '45%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                                        <img src={imagePath.DownloadIcon} alt="icon download" />
                                        <Typography variant="h6" color={'text.secondary'}>
                                            Withdrawable
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                                        <Typography variant="h6">
                                            {/* {formatNumber(BN((detail as TDETAIL)?.withdrawable || '0').dividedBy(1e18), { fractionDigits: 3 })} */}
                                            01
                                        </Typography>
                                        TCV
                                    </Box>
                                </Box>
                                <Box sx={{ gap: 1, alignItems: 'end' }}>
                                    <LoadingButton
                                        props={{
                                            variant: 'gradient',
                                            sx: { color: '#FFFFFF', marginTop: '32px' },
                                            fullWidth: true,
                                            disabled: !address,
                                        }}
                                        loading={loading}
                                        onClick={handleWithDraw}
                                    >
                                        Withdraw
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Accordion>
    )
}
