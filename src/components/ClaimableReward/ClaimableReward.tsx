import { Box, Typography } from '@mui/material';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import { formatAddress } from 'src/utils/format';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useChainId } from 'wagmi';
import { infoChain } from 'src/jotai/wallet/config';

export default function ClaimableReward({ vault }: { vault: TAccordionVaultState }) {

    const chainIdConnected = useChainId();
    const infoChainConnected = infoChain[chainIdConnected];

    return (
        <>
            <Typography
                style={{ display: 'flex', justifyContent: 'space-between', color: '#828282' }}
                variant="body2"
            >
                Contract Address
                <Box style={{
                    display: 'flex', fontSize: '16px',
                    textDecoration: 'none', alignItems: 'center',
                    margin: '0px', color: '#5F5F5F'
                }}
                    component={'a'} href={`${infoChainConnected?.url}/address/${vault?.addressVault}`} target='_blank' sx={{ display: { sm: 'block', xs: 'none' }, mr: 1 }} className='css-hozgdc-MuiTypography-root'>
                    {formatAddress(vault?.addressVault)}
                    <OpenInNewIcon style={{ marginLeft: '3px' }} />
                </Box>
            </Typography >
        </>
    );
}
