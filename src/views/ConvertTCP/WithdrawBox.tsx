import { Accordion, Box, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { imagePath } from 'src/constants/imagePath';
import { handleGetReceivedAmount, handleGetVestingAmount, handleGetWithdrawableAmount, WithdrawBoxFields } from './utils/utils';
import { useAccount, useChainId } from 'wagmi';
import { toast } from 'react-toastify';
import TypographyLoading from 'src/components/TypographyLoading/TypographyLoading';
import { abiConvertTCP } from 'src/jotai/wallet/abi/ConvertTCP';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import { BN } from 'src/utils';

interface IProps {
  tcpAmount: number;
}

const WithdrawBox = (props: IProps) => {
  const { address } = useAccount();
  const chainIdSelected = useChainId();

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [withdrawFields, setWithdrawFields] = useState<WithdrawBoxFields>({
    tcpConverted: 0,
    tcvReceived: 0,
    withdrawable: 0,
  });

  const handleGetWithdrawFields = useCallback(
    async (loadingOnChange: boolean = true) => {
      if (address) {
        if (loadingOnChange) {
          setLoading(true);
        }

        try {
          const tcpConvertData = await handleGetVestingAmount(address, chainIdSelected);
          const tcvReceiveData = await handleGetReceivedAmount(address, chainIdSelected);
          const withdrawableData = await handleGetWithdrawableAmount(address, chainIdSelected);
          
          setWithdrawFields({
            tcpConverted: BN(tcpConvertData[0].result).dividedBy(1e18).toNumber() | 0,
            tcvReceived: BN(tcvReceiveData[0].result).dividedBy(1e18).toNumber() | 0,
            withdrawable: BN(withdrawableData[0].result).dividedBy(1e18).toNumber() | 0,
          });
        } catch (error) {
          const err = error as unknown as { shortMessage: string };
          toast.error(err.shortMessage);
        }

        setLoading(false);
      }
    },
    [address, chainIdSelected]
  );

  const handleWithdraw = async () => {
    if (address) {
      setLoadingBtn(true);
      try {
        const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;

        const hash = await writeContract(configEvmChain, {
          abi: abiConvertTCP,
          address: CONVERT_TCP_ADDRESS,
          functionName: 'redeem',
          args: [address],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: hash });
        handleGetWithdrawFields();
        toast.success('Withdraw Success');
      } catch (error) {
        const err = error as unknown as { shortMessage: string };
        toast.error(err.shortMessage);
      }

      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    handleGetWithdrawFields();
  }, [handleGetWithdrawFields, props.tcpAmount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetWithdrawFields(false);
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [handleGetWithdrawFields]);

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: '1px solid var(--Primary-Primary300, #92B2EF)', boxShadow: '0px 3px 6px 0px #00000014', height: '100%' }}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5, p: 3, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              Your TCP converted
            </Typography>
            <TypographyLoading loading={loading} content={<Typography variant="h6">{withdrawFields.tcpConverted.toFixed(2)}</Typography>} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              TCV Received
            </Typography>
            <TypographyLoading loading={loading} content={<Typography variant="h6">{withdrawFields.tcvReceived.toFixed(2)}</Typography>} />
          </Box>
        </Box>

        <Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8 }}>
            <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
              <img src={imagePath.DownloadIcon} alt="icon download" />
              <Typography variant="h6">Withdrawable</Typography>
            </Box>
            <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
              <TypographyLoading
                loading={loading}
                content={
                  <>
                    <Typography variant="h6">{withdrawFields.withdrawable.toFixed(2)}</Typography>
                    TCV
                  </>
                }
              />
            </Box>
          </Box>

          <LoadingButton
            props={{
              variant: 'gradient',
              sx: { color: '#FFFFFF', mt: 4 },
              fullWidth: true,
              disabled: withdrawFields.withdrawable == 0,
            }}
            loading={loadingBtn}
            onClick={handleWithdraw}
          >
            Withdraw
          </LoadingButton>
        </Box>
      </Box>
    </Accordion>
  );
};

export default WithdrawBox;
