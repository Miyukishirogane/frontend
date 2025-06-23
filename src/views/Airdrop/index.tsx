import { Box, Button, Skeleton, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { imagePath } from 'src/constants/imagePath';
import { useModalAirdrop, useModalAirdropAction } from 'src/jotai/modals/ModalAirdrop/ModalAirdrop';
import { useModalConnectWalletAction } from 'src/jotai/modals/ModalConnectWallet/ModalConnectWallet';
import { abiAirdrop } from 'src/jotai/wallet/abi/Airdrop';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { useChainId } from 'wagmi';
import { readContracts } from 'wagmi/actions';
import useAccount from 'src/hooks/useAccount';
import { handleGetClaimedTCP } from './utils';
import ModalConnectWallet from 'src/components/Modals/ModalConnectWallet/ModalConnectWallet';
import ModalAirdrop from 'src/components/Modals/ModalAirdrop/ModalAirdrop';
import { Helmet } from 'react-helmet';

type DisplayAirdrop = {
  textClaimed: boolean;
  btnCheckEligibilty: boolean;
};

export default function Airdrop() {
  const { openModal } = useModalAirdropAction();
  const modal = useModalAirdrop();
  const { closeModal: closeConnectWallet, openModal: openConnectWallet } = useModalConnectWalletAction();
  const { address } = useAccount();
  const chainIdSelected = useChainId();
  const tcvAirdrop = contractAddress[chainIdSelected].TCV_AIRDROP;

  const [airdropClaimedValue, setAirdropClaimedValue] = useState<BigNumber>(BN(0));
  const [airdropValue, setAirdropValue] = useState<BigNumber>(BN(0));
  const [isLoading, setIsLoading] = useState(false);

  const [displayAirdrop, setDisplayAirdrop] = useState<DisplayAirdrop>({
    textClaimed: false,
    btnCheckEligibilty: true,
  });

  const getClaimedValue = useCallback(async () => {
    if (address && tcvAirdrop) {
      try {
        setIsLoading(true);
        const claimedValue = await handleGetClaimedTCP(address, chainIdSelected);

        if (claimedValue[0].status === 'success') {
          setAirdropClaimedValue(BN(claimedValue[0].result).dividedBy(1e18));
        } else {
          toast.error(claimedValue[0].error.message);
        }
      } catch (error) {
        const err = error as unknown as { shortMessage: string };
        toast.error(err.shortMessage);
        setAirdropClaimedValue(BN(0));
      }
      setIsLoading(false);
      return;
    }

    setAirdropClaimedValue(BN(0));
  }, [address, chainIdSelected, tcvAirdrop]);

  const checkRewardInfo = useCallback(async () => {
    if (address && tcvAirdrop) {
      try {
        const rewardInfo = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiAirdrop,
              address: tcvAirdrop,
              functionName: 'rewardInfo',
              args: [address],
            },
          ],
        });

        if (rewardInfo[0].status === 'success') {
          if (BN(rewardInfo[0].result).isGreaterThan(0)) {
            setAirdropValue(BN(rewardInfo[0].result).dividedBy(1e18));
            return;
          }
        } else {
          toast.error(rewardInfo[0].error.message);
        }
      } catch (error) {
        console.log('error', error);
        setAirdropValue(BN(0));
        return;
      }

      setAirdropValue(BN(0));
    }
  }, [address, tcvAirdrop]);

  const handleCheckDisplayAirdrop = useCallback(() => {
    //claimed > 0 && rewardInfo == 0 -- The user has taken it all
    if (airdropClaimedValue.isGreaterThan(0) && airdropValue?.isEqualTo(0)) {
      setDisplayAirdrop({
        textClaimed: true,
        btnCheckEligibilty: false,
      });

      //claimed>0 && rewardInfo>0 -- The user has claimed once but still have airdropValue
    } else if (airdropClaimedValue.isGreaterThan(0) && airdropValue?.isGreaterThan(0)) {
      setDisplayAirdrop({
        textClaimed: true,
        btnCheckEligibilty: true,
      });

      //claimed == 0 -- The user never claimed
    } else if (airdropClaimedValue.isEqualTo(0)) {
      setDisplayAirdrop({
        textClaimed: false,
        btnCheckEligibilty: true,
      });
    }
  }, [airdropClaimedValue, airdropValue]);

  useEffect(() => {
    if (address) {
      closeConnectWallet();
    } else {
      openConnectWallet({ title: 'Choose Wallet', content: <ModalConnectWallet />, modalProps: { maxWidth: 'xs' } });
    }
  }, [address, closeConnectWallet, openConnectWallet]);

  useEffect(() => {
    getClaimedValue();
    checkRewardInfo();
  }, [getClaimedValue, checkRewardInfo, modal.open]);

  useEffect(() => {
    handleCheckDisplayAirdrop();
  }, [handleCheckDisplayAirdrop]);

  return (
    <>
      <Helmet>
        <title>TCV | Airdrop</title>
      </Helmet>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          backgroundImage: `url(${imagePath.AirdropBanner})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          border: '1px solid #009FF5',
          borderRadius: '20px',
          width: '100%',
          maxHeight: '75vh',
          maxWidth: '100%',
          mt: { md: 5, xs: 3 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '30px', xsm: '38px', md: '50px', lg: '76px' },
              background: 'linear-gradient(90deg, #276FE2 0%, #39BAFD 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              fontWeight: 1000,
              textTransform: 'uppercase',
            }}
          >
            TCV Airdrop portal
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '18px', xsm: '20px', md: '30px', lg: '42px' },
              fontWeight: 400,
              textTransform: 'capitalize',
            }}
          >
            Check Your Eligibility to Claim
          </Typography>
          {isLoading ? (
            <Skeleton sx={{ minWidth: '320px', height: '52px', borderRadius: '12px' }} />
          ) : (
            <Box display="flex" flexDirection="column" justifyContent="center">
              {displayAirdrop.btnCheckEligibilty && (
                <Button
                  onClick={() =>
                    openModal({
                      title: 'TCV Airdrop',
                      content: '',
                      modalProps: { maxWidth: 'xs' },
                      airdropValue: airdropValue || BN(0),
                    })
                  }
                  variant="gradient"
                  sx={{ minWidth: '320px', height: '49px', mt: 2 }}
                >
                  Check eligibility
                </Button>
              )}

              {displayAirdrop.textClaimed && (
                <Typography
                  variant="h4"
                  sx={{
                    '& .small_number': {
                      display: 'inline',
                    },
                    mt: 2,
                    textAlign: 'center',
                  }}
                >
                  You have claimed <TextSmallNumber value={airdropClaimedValue} decimal={6} fallbackDisplay="" /> TCP
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <ModalAirdrop />
    </>
  );
}
