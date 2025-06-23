import ClearRounded from '@mui/icons-material/ClearRounded';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IconDeny, IconExclamationMark, IconPassed } from 'src/assets/icon';
import { imagePath } from 'src/constants/imagePath';
import { useModalAirdrop, useModalAirdropAction } from 'src/jotai/modals/ModalAirdrop/ModalAirdrop';
import { abiAirdrop } from 'src/jotai/wallet/abi/Airdrop';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { mergeSx } from 'src/utils/format';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import useAccount from 'src/hooks/useAccount';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';

function useStyle() {
  return {
    text: {
      fontSize: '14px',
      color: '#0083C9',
    },
  };
}

export default function ModalAirdrop() {
  const { closeModal } = useModalAirdropAction();
  const { address } = useAccount();

  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const cls = useStyle();
  const modal = useModalAirdrop();
  const tcvAirdrop = contractAddress[chainIdSelected].TCV_AIRDROP;
  const airdropValue = modal.airdropValue;

  const [claimable, setClaimable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isAble = airdropValue.isGreaterThan(0);

  async function onClickClaim() {
    setLoading(true);
    // TODO: claim logic
    if (address && tcvAirdrop) {
      try {
        await switchToChainSelected();
        const result = await writeContract(configEvmChain, {
          abi: abiAirdrop,
          address: tcvAirdrop,
          functionName: 'airdrop',
          args: [address],
        });

        await waitForTransactionReceipt(configEvmChain, { hash: result });

        if (result) {
          setClaimable(true);
        }
      } catch (error) {
        const errorMessage = error as unknown as { shortMessage: string };
        console.log('🚀 ~ onClickClaim ~ errorMessage:', errorMessage);

        toast.error(errorMessage.shortMessage, {
          autoClose: 4000,
          closeButton: true,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  function onUseOfTCVClick() {
    const urlMarketingTCV = 'https://blog.tcvault.xyz/explore-tcp-airdrop-overall-information-ccde4c40aa8f';
    window.open(urlMarketingTCV, '_blank')?.focus();

    setClaimable(false);
    closeModal();
  }

  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogTitle sx={{ backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', color: '#303030', mb: '12px' }}>
          {typeof modal.title == 'string' ? <Typography variant="h5">{modal.title}</Typography> : modal.title}
          <ClearRounded
            sx={{ ml: 'auto', cursor: 'pointer', fontSize: '20px', color: '#2465DE' }}
            onClick={() => {
              closeModal();
              setClaimable(false);
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'white', pt: '0px !important' }}>
        {claimable ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              component={'img'}
              alt="claim-airdrop"
              src={imagePath.ClaimAirdrop}
              sx={{ width: '100%', height: '100%' }}
            />
            <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>You have received</Typography>
            <Typography
              sx={{
                fontSize: '20px',
                '& .small_number': {
                  display: 'inline',
                },
              }}
            >
              <TextSmallNumber value={airdropValue} decimal={6} /> TCP
            </Typography>
            <Button onClick={onUseOfTCVClick} fullWidth variant="gradient" sx={{ mt: 2, textTransform: 'unset' }}>
              Use of TCP
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Box sx={{ bgcolor: '#EFF2F8', borderRadius: '12px', px: '20px', py: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '8px' }}>
                  {isAble ? <IconPassed /> : <IconDeny />}
                  <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>Check Eligibility</Typography>
                </Box>
                <Typography sx={{ color: '#B5B8B8', fontWeight: 400, fontSize: '14px' }}>
                  Check if you are eligible to claim tokens
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: '5px' }}>
              <IconExclamationMark sx={{ fontSize: '16px', mt: 0.3 }} />
              <Box>
                {isAble ? (
                  <Typography
                    sx={mergeSx([
                      cls.text,
                      {
                        '& .small_number': {
                          display: 'inline',
                        },
                      },
                    ])}
                  >
                    You can claim{' '}
                    <b>
                      <TextSmallNumber value={airdropValue} decimal={6} />
                    </b>{' '}
                    TCP tokens for this airdrop
                  </Typography>
                ) : (
                  <Typography sx={cls.text}>You are not eligible to claim token.</Typography>
                )}
                <Typography sx={mergeSx([cls.text, { fontSize: '12px', fontWeight: 300 }])}>{address}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <LoadingButton
                props={{
                  variant: 'gradient',
                  fullWidth: true,
                  sx: {
                    '&.Mui-disabled': {
                      color: 'white',
                    },
                  },
                  disabled: !airdropValue || false,
                }}
                onClick={onClickClaim}
                loading={loading}
              >
                {airdropValue ? 'Claim TCV' : 'Eligibility Conditions'}
              </LoadingButton>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
