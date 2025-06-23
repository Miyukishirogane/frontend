import { Box, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import ModalConvertTOD from 'src/components/Modals/ModalConvertTOD/ModalConvertTOD';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { imagePath } from 'src/constants/imagePath';
import useAccount from 'src/hooks/useAccount';
import { abiConvertTOD } from 'src/jotai/wallet/abi/ConvertTOD';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { useChainId } from 'wagmi';
import { readContracts, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import IconBox from './IconBox';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const TodConvert = () => {
  const { address } = useAccount();
  const chainIdSelected = useChainId();

  const [openModal, setOpenModal] = useState(false);
  const [convertLoading, setConvertLoading] = useState(false);

  const {
    data: userTODBalance,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['ConvertTOD', address],
    queryFn: async () => {
      if (!address || !chainIdSelected) return 0;
      const TOD_CONVERSION_CONTRACT = contractAddress[chainIdSelected].TOD_CONVERSION_CONTRACT;

      const userBalance = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiConvertTOD,
            address: TOD_CONVERSION_CONTRACT,
            functionName: 'getBalance',
            args: [address],
          },
        ],
      });

      if (!userBalance[0].result) return 0;

      return BN(userBalance[0].result).dividedBy(1e9).toNumber();
    },
    enabled: !!address,
  });

  const handleConvertTOD = async () => {
    if (!address || !chainIdSelected) return;
    setConvertLoading(true);
    const TOD_CONVERSION_CONTRACT = contractAddress[chainIdSelected].TOD_CONVERSION_CONTRACT;

    try {
      const redeemHash = await writeContract(configEvmChain, {
        abi: abiConvertTOD,
        address: TOD_CONVERSION_CONTRACT,
        functionName: 'redeem',
        args: [address],
      });

      await waitForTransactionReceipt(configEvmChain, { hash: redeemHash });
      refetch();
      setOpenModal(true);
    } catch (error) {
      console.log(error);

      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setConvertLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>TCV | Convert TOD</title>
      </Helmet>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          backgroundImage: `url(${imagePath.ConvertTODBg})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          border: '1px solid #009FF5',
          borderRadius: '20px',
          width: '100%',
          maxHeight: '75vh',
          mt: { md: 5, xs: 3 },
        }}
      >
        <Box sx={{ my: 'auto', mx: { xs: 'auto', md: 10 }, zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '30px', xsm: '32px', md: '60px', lg: '80px' },
              background: 'linear-gradient(90deg, #276FE2 0%, #39BAFD 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              fontWeight: 1000,
              textTransform: 'uppercase',
            }}
          >
            Conversion
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '30px', xsm: '32px', md: '60px', lg: '80px' },
              background: 'linear-gradient(90deg, #276FE2 0%, #39BAFD 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              fontWeight: 1000,
              textTransform: 'uppercase',
            }}
          >
            {'$tod -> $tcv'}
          </Typography>

          {address && (
            <Typography variant="h1" sx={{ fontWeight: 500, display: 'inline-flex' }}>
              {isLoading ? (
                <Skeleton sx={{ minWidth: '300px' }} />
              ) : (
                <>
                  Your Balance:{' '}
                  <strong>
                    <TextSmallNumber value={BN(userTODBalance || 0)} />
                  </strong>{' '}
                  TOD
                </>
              )}
            </Typography>
          )}

          <LoadingButton
            props={{
              variant: 'gradient',
              disabled: !address || userTODBalance === 0,
              sx: {
                minWidth: '380px',
                height: '49px',
                mt: 4,
                fontSize: '20px',
                textTransform: 'uppercase',
                display: 'flex',
              },
            }}
            loading={convertLoading}
            onClick={handleConvertTOD}
          >
            Claim TCV
          </LoadingButton>
        </Box>

        <IconBox />

        <ModalConvertTOD open={openModal} todBalance={userTODBalance || 0} onClose={() => setOpenModal(false)} />
      </Box>
    </>
  );
};

export default TodConvert;
