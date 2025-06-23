import { Accordion, Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import { Err_NotConnectWallet } from 'src/constants';
import { imagePath } from 'src/constants/imagePath';
import { useEarlySeed, useEarlySeedFunction } from 'src/jotai/earlySeed';
import { TEARLYSEEDDETAIL } from 'src/jotai/earlySeed/type';
import { abiEarlySeedTrava } from 'src/jotai/wallet/abi/EarlySeed';
import { abiEarlySeedSpecialUser } from 'src/jotai/wallet/abi/EarlySeedSpecialUser';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { BN, secondsToFormattedDays } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import useAccount from 'src/hooks/useAccount';
import { writeContract } from 'wagmi/actions';

export default function BoxWithdraw() {
  // state jotai
  const { address } = useAccount();
  const { chainIdSelected } = useSwitchToSelectedChain();
  const { detail, claimeAmount, user, withdrawableAmount } = useEarlySeed();
  const { getBondInfo } = useEarlySeedFunction();
  const targetTimestamp = Number((detail as TEARLYSEEDDETAIL)?.terms?.cliffingTimeStart) * 1000 || Date.now();
  const bondInfo = (detail as TEARLYSEEDDETAIL)?.getBondInfo ? (detail as TEARLYSEEDDETAIL)?.getBondInfo : (detail as TEARLYSEEDDETAIL)?.getBondInfoTrava;

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(targetTimestamp - Date.now());

  const isDisableWithdraw = useMemo(() => {
    if (!address || timeLeft > 0) {
      return true;
    }

    if (user === 'special') return BN(withdrawableAmount?.specical || '0').isLessThanOrEqualTo(BN('0'));
    if (user === 'trava') return BN(withdrawableAmount?.trava || '0').isLessThanOrEqualTo(BN('0'));

    return true;
  }, [address, timeLeft, user, withdrawableAmount?.specical, withdrawableAmount?.trava]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        const newTimeLeft = targetTimestamp - Date.now();
        if (newTimeLeft <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [targetTimestamp]);

  // handleBuy
  async function handleWithDraw() {
    setLoading(true);
    const idNotify = toast.loading('Withdraw!');
    try {
      if (!address) throw Err_NotConnectWallet;

      const TCVEARLYSEEDSPECIALUSER = contractAddress[chainIdSelected].TCV_EARLY_SEED_SPECIAL_USER;
      const TCVEARLYSEEDTRAVA = contractAddress[chainIdSelected].TCV_EARLY_SEED_TRAVA_USERS;

      if (user === 'trava') {
        const response = await writeContract(configEvmChain, {
          abi: abiEarlySeedTrava,
          address: TCVEARLYSEEDTRAVA,
          functionName: 'redeem',
          args: [address],
          chainId: chainIdSelected,
        });
        toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
        await getBondInfo(detail as TEARLYSEEDDETAIL, user);
      } else if (user === 'special') {
        const response = await writeContract(configEvmChain, {
          abi: abiEarlySeedSpecialUser,
          address: TCVEARLYSEEDSPECIALUSER,
          functionName: 'redeem',
          args: [address],
          chainId: chainIdSelected,
        });
        toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
        await getBondInfo(detail as TEARLYSEEDDETAIL, user);
      }
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
    <Accordion
      elevation={0}
      disableGutters
      sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: 'none', boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12);', minHeight: '100%', display: 'flex' }}
    >
      <Box sx={{ width: '100%', minHeight: '100%', display: 'flex' }}>
        <Box sx={{ mt: '10px', mb: '10px', minHeight: '100%', width: '100%', px: 3, py: 1.5, display: 'flex' }}>
          <Box sx={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3.5 }}>
            <Box sx={{ width: '100%', flexDirection: 'column', rowGap: 3.5, minHeight: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px', minHeight: '55%', borderBottom: '2px solid #F1F1F1' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <Typography variant="h4">Withdraw</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Cliff Time
                  </Typography>
                  <Typography variant="caption2">{secondsToFormattedDays(parseInt((detail as TEARLYSEEDDETAIL)?.terms?.cliffingTerm || '0'))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Vesting Time
                  </Typography>
                  <Typography variant="caption2">{secondsToFormattedDays(parseInt((detail as TEARLYSEEDDETAIL)?.terms?.vestingTerm || '0'))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Bought
                  </Typography>
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">
                      {BN(bondInfo?.totalBought || '0')
                        .dividedBy(1e18)
                        .toFixed(8)}
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
                      {user === 'special' && formatNumber(BN(claimeAmount?.specical || '0').dividedBy(1e18), { fractionDigits: 2 })}
                      {user === 'trava' && formatNumber(BN(claimeAmount?.trava || '0').dividedBy(1e18), { fractionDigits: 2 })}
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
                      {user === 'special' && formatNumber(BN(withdrawableAmount?.specical || '0').dividedBy(1e18), { fractionDigits: 8 })}
                      {user === 'trava' && formatNumber(BN(withdrawableAmount?.trava || '0').dividedBy(1e18), { fractionDigits: 8 })}
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
                      disabled: isDisableWithdraw,
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
  );
}
