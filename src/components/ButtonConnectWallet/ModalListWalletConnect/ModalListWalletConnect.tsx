import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { IconSpinLoading } from 'src/assets/icon';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import useLoginQuest from 'src/hooks/Quest/useLoginQuest';
import { useModalFunction } from 'src/jotai/modals/modal/modal';
import { infoChain, infoWallet } from 'src/jotai/wallet/config';
import { Connector, useChainId, useConnect } from 'wagmi';

export default function ModalListWalletConnect() {
  const { connectAsync, connectors, isPending } = useConnect();
  const { closeModal } = useModalFunction();
  const chainIdConnected = useChainId();
  const { mutateAsync: loginQuest } = useLoginQuest();

  const infoChainConnected = infoChain[chainIdConnected];
  const ChainIcon = infoChainConnected.logoChain;
  const isNotInstallWalletList = Object.keys(infoWallet).filter(
    item => connectors.findIndex(connector => connector.id === item) < 0,
  );

  const handleConnect = async (connector: Connector) => {
    try {
      const result = await connectAsync({ connector });
      loginQuest(result?.accounts?.[0]);
      closeModal();
    } catch (error) {
      toast.error(<ErrorExeTransaction error={error} />, {
        autoClose: 4000,
        closeButton: true,
      });
    }
  };

  const handleRedirect = (url: string) => {
    window.open(url);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
        <ChainIcon sx={{ fontSize: '32px', mr: 1 }} />
        <Typography variant="body2" fontWeight={600} textAlign={'center'} sx={{ display: 'block', fontSize: '25px' }}>
          {infoChainConnected.name}
        </Typography>
      </Box>
      {isPending ? (
        <Box mt={2} mb={4}>
          <IconSpinLoading sx={{ fontSize: '120px' }} />
        </Box>
      ) : (
        <>
          <Typography variant="h6" color="skyblue">
            Installed
          </Typography>
          <Box mt={2} mb={4}>
            {connectors.map((connector, index) => {
              const walletInfo = infoWallet[connector.id];
              if (connector.id === 'io.metamask') {
                return null;
              }

              return (
                <Box
                  key={connector.id + index}
                  sx={{
                    borderRadius: '8px',
                    px: 2.5,
                    display: 'flex',
                    gap: 1.5,
                    py: 1,
                    mb: 1,
                    placeItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                    bgcolor: '#3396ff17',
                  }}
                  onClick={() => handleConnect(connector)}
                >
                  <img
                    src={connector.icon || walletInfo?.logoWallet}
                    alt={`logo wallet ${connector.name}`}
                    style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                  />
                  <Typography
                    className="wallet-name"
                    variant="body2"
                    fontWeight={600}
                    sx={{ transition: 'color 0.2s' }}
                  >
                    {connector.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {isNotInstallWalletList.length > 0 ? (
            <>
              <Typography variant="h6">Other</Typography>
              <Box mt={2} mb={4}>
                {isNotInstallWalletList.map((key, index) => {
                  const connector = infoWallet[key];
                  return (
                    <Box
                      key={connector.name + index}
                      sx={{
                        borderRadius: '8px',
                        px: 2.5,
                        display: 'flex',
                        gap: 1.5,
                        py: 1,
                        mb: 1,
                        placeItems: 'center',
                        cursor: 'pointer',
                        '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                        bgcolor: '#3396ff17',
                      }}
                      //   onClick={() => handleConnect(connector)}
                      onClick={() => handleRedirect(connector.url)}
                    >
                      <img
                        src={connector.logoWallet}
                        alt={`logo wallet ${connector.name}`}
                        style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                      />
                      <Typography
                        className="wallet-name"
                        variant="body2"
                        fontWeight={600}
                        sx={{ transition: 'color 0.2s' }}
                      >
                        {connector.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </>
          ) : null}
        </>
      )}
    </Box>
  );
}
