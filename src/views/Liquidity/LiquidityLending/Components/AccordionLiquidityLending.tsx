import { Accordion, Box, Skeleton, Typography } from '@mui/material';
import useQueryPrice from 'src/hooks/Liquidlity/useQueryPrice';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import { useChainId } from 'wagmi';
import IconLiquid from '../../common/IconLiquid';
// import { useLiquidityLendingData } from '../jotai/state';
import { TAccordionVaultLendingState } from '../jotai/type';
import AccordionContent from './AccordionContent';
import useGetVaultInfo from '../hooks/useGetVaultInfo';
import { useMemo } from 'react';
import Apr from './Apy';

interface IProps {
  index: number;
  vaultData: TAccordionVaultLendingState;
  isLoading: boolean;
}

export default function AccordionLiquidityLending(props: IProps) {
  const { index, vaultData } = props;
  const chainId = useChainId();
  const { address, symbol } = vaultData.tokenInfo;
  const { data: vaultInfor, isLoading: loadingVaultInfor } = useGetVaultInfo({ vaultAddress: vaultData.addressVault });
  const { isLoading: loadingGetPrice } = useQueryPrice({
    chainId: chainId,
    address: address,
  });

  const earnings = useMemo(() => {
    const result = BN(vaultInfor?.depositorBalance).minus(BN(vaultInfor?.deposited));
    return result.toNumber() < 0 ? 0 : result.toString();
  }, [vaultInfor]);

  const loading = loadingVaultInfor || loadingGetPrice;
  const iconHeader = <IconLiquid token={symbol} />;

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        background: '#fff',
        border: '1px solid var(--Primary-Primary300, #92B2EF)',
        boxShadow: '0px 3px 6px 0px #00000014',
      }}
    >
      <Box sx={{ width: '100%', background: 'linear-gradient(180deg, #FFFFFF 10.5%, #E9F4FF 24%, #FFFFFF 65%)' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mt: '10px',
            px: 3,
            py: 1.5,
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 3.5,
            mb: '15px',
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{iconHeader}</Box>
            <Apr vaultAddress={vaultData.addressVault} />
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={'text.secondary'}>
                  Balance of Vault
                </Typography>
                {loading ? (
                  <Skeleton variant="rounded" width={'100px'} />
                ) : (
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">
                      {`$${formatNumber(BN(vaultInfor?.deposited), {
                        fractionDigits: 6,
                      })}`}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <AccordionContent index={index} vault={vaultData} loading={loading} />
          </Box>
        </Box>
      </Box>
    </Accordion>
  );
}
