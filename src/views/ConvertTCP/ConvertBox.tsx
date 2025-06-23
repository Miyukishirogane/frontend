import { Accordion, Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import TypographyLoading from 'src/components/TypographyLoading/TypographyLoading';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import useAccount from 'src/hooks/useAccount';
import { abiConvertTCP } from 'src/jotai/wallet/abi/ConvertTCP';
import { abiTCP } from 'src/jotai/wallet/abi/TCP';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { BN } from 'src/utils';
import { useChainId } from 'wagmi';
import { getBalance, readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import DenomIconSale from '../Liquidity/common/DenomIconSale';
import { handleGetTotalVesting, handleGetVestingMechanism } from './utils/utils';
import { erc20Abi } from 'viem';

interface IProps {
  tcpAmount: number;
  setTcpAmount: (value: number) => void;
}

const ConvertBox = (props: IProps) => {
  const { tcpAmount, setTcpAmount } = props;
  const { address } = useAccount();
  const chainIdSelected = useChainId();

  const [totalVesting, setTotalVesting] = useState(0);
  const [vestingMechanism, setVestingMechanism] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const IconTCP = mapTokenToIcon['TCP'];

  const handleGetData = useCallback(async () => {
    if (address) {
      try {
        setLoading(true);
        const totalVestingRespond = await handleGetTotalVesting(chainIdSelected);
        const balance = await getBalance(configEvmChain, {
          address: address,
          token: contractAddress[chainIdSelected].TCP_ADDRESS,
        });
        const vestingMechanismData = await handleGetVestingMechanism(chainIdSelected);

        setTcpAmount(Number(balance.value) || 0);
        setTotalVesting(Number(totalVestingRespond[0].result) || 0);
        setVestingMechanism(vestingMechanismData);
      } catch (error) {
        const err = error as unknown as { shortMessage: string };
        toast.error(err.shortMessage);
      }

      setLoading(false);
    }
  }, [address, chainIdSelected, setTcpAmount]);

  const handleConvert = async () => {
    if (address) {
      setLoadingBtn(true);

      try {
        const CONVERT_TCP_ADDRESS = contractAddress[chainIdSelected].CONVERT_TCP_ADDRESS;
        const TCP_TOKEN_ADDRESS = contractAddress[chainIdSelected].TCP_ADDRESS;

        const allowance = await readContract(configEvmChain, { abi: erc20Abi, address: TCP_TOKEN_ADDRESS, functionName: 'allowance', args: [address, CONVERT_TCP_ADDRESS] });

        if (allowance < tcpAmount) {
          const approveToken = await writeContract(configEvmChain, {
            abi: abiTCP,
            address: TCP_TOKEN_ADDRESS,
            functionName: 'approve',
            args: [CONVERT_TCP_ADDRESS, BigInt(tcpAmount)],
          });

          await waitForTransactionReceipt(configEvmChain, { hash: approveToken });
        }

        const hash = await writeContract(configEvmChain, {
          abi: abiConvertTCP,
          address: CONVERT_TCP_ADDRESS,
          functionName: 'deposit',
          args: [address],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: hash });
        toast.success('Convert Success');
        handleGetData();
      } catch (error) {
        const err = error as unknown as { shortMessage: string };
        toast.error(err.shortMessage);
      }

      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: '1px solid var(--Primary-Primary300, #92B2EF)', boxShadow: '0px 3px 6px 0px #00000014', height: '100%' }}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5, p: 3, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DenomIconSale token1={'TCP'} sxIcon={{ fontSize: '50px' }} sxText={{ fontSize: '24px' }}></DenomIconSale>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              TCV Price
            </Typography>
            <Typography variant="h6">$0.34</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              Vesting Mechanism
            </Typography>
            <TypographyLoading
              loading={loading}
              content={
                <Typography variant="h6">
                  {vestingMechanism.toFixed(2)} {vestingMechanism > 1 ? 'days' : 'day'}
                </Typography>
              }
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              Total converted amount
            </Typography>
            <TypographyLoading loading={loading} content={<Typography variant="h6">{BN(totalVesting).dividedBy(1e18).toFixed(2)}</Typography>} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              TCP:TCV
            </Typography>
            <Typography variant="h6">1:1</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              Your Balance
            </Typography>
            <TypographyLoading loading={loading} content={<Typography variant="h6">{BN(tcpAmount).dividedBy(1e18).toFixed(2)}</Typography>} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color={'text.secondary'}>
              Convertible
            </Typography>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <TypographyLoading
                loading={loading}
                skeletonProps={{ width: '80px' }}
                content={
                  <>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '20px', xsm: '22px', sm: '24px' },
                        background: 'linear-gradient(90deg, #276FE2 0%, #39BAFD 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                      }}
                    >
                      {BN(tcpAmount).dividedBy(1e18).toFixed(2)}
                    </Typography>
                    <IconTCP sx={{ ml: 1, fontSize: { xs: '20px', xsm: '22px', sm: '24px' } }} />
                  </>
                }
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <LoadingButton
            props={{
              variant: 'gradient',
              sx: { color: '#FFFFFF' },
              fullWidth: true,
              disabled: tcpAmount == 0,
            }}
            loading={loadingBtn}
            onClick={handleConvert}
          >
            Convert
          </LoadingButton>
        </Box>
      </Box>
    </Accordion>
  );
};

export default ConvertBox;
