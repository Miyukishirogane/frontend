import { useState } from 'react';
import { Accordion, Box, Typography } from '@mui/material';
import IconAndName from '../IconAndName/IconAndName';
import InputCustomDetail from '../InputCustomDetail';
import SliderCustom from '../SliderCustom/SliderCustom';
import { useUserPrivateSale } from 'src/jotai/userSale/userPrivateSale';
import { formatNumber } from 'src/utils/format';
import { BN } from 'src/utils';
import ErrorExeTransaction from '../ErrorExeTransaction/ErrorExeTransaction';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { Err_NotConnectWallet } from 'src/constants';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import { abiPrivateSale } from 'src/jotai/wallet/abi/PrivateSale';
import { writeContract, readContracts, waitForTransactionReceipt } from 'wagmi/actions';
import RenderNofifySuccess from '../RenderNofifySuccess/RenderNofifySuccess';
import LoadingButton from '../LoadingButton/LoadingButton';
import { TDETAIL } from 'src/jotai/userSale/type';
import { erc20Abi } from 'viem';
import { useUserPrivateSaleFunction } from 'src/jotai/userSale/userPrivateSale';

export default function BoxBuy() {
  // state jotai
  const { address } = useAccount();
  const { detail, balance } = useUserPrivateSale();
  const { getDetail } = useUserPrivateSaleFunction();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const TCVTCVPRIVATESALEROUTER = contractAddress[chainIdSelected].TCV_PRIVATE_SALE;

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | number[]>(0);
  const [valChang, setValChang] = useState<number | number[]>(0);
  const [val, setVal] = useState<number | number[]>(0);

  // change Slider
  async function changeSlider(event: Event, val: number | number[], activeThumb: number) {
    const getPayout = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abiPrivateSale,
          address: TCVTCVPRIVATESALEROUTER,
          functionName: 'getPayout',
          args: [BigInt(val.toString())],
        },
      ],
    });
    setValChang(val);
    setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    setAmount(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toString()));
  }

  async function clickLable(val: number | number[]) {
    const getPayout = await readContracts(configEvmChain, {
      contracts: [
        {
          abi: abiPrivateSale,
          address: TCVTCVPRIVATESALEROUTER,
          functionName: 'getPayout',
          args: [BigInt(val.toString())],
        },
      ],
    });
    setValChang(val);
    setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    setAmount(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toString()));
  }

  // handleBuy
  async function handleBuy() {
    setLoading(true);
    const idNotify = toast.loading('Buy token!');
    try {
      if (!address) throw Err_NotConnectWallet;
      const tcvPrivateSaleRouter = contractAddress[chainIdSelected].TCV_PRIVATE_SALE;
      // const tokenAddress = tokenList[chainIdSelected]['ARB'].address

      const tokenAddress = '0x5Af7c16A7c2A8DD5126b1a3B4bF31094bdd395F5';
      await switchToChainSelected();

      const allowance = BN(amount);
      const amountMax = BN(balance['USDT']);

      if (BN(allowance).isLessThan(amountMax)) {
        toast.update(idNotify, { render: `Approve more balance` });

        const approve1 = await writeContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: 'approve',
          args: [
            tcvPrivateSaleRouter,
            // BigInt(BN(amount).multipliedBy(1e6).toFixed(0))
            BigInt(BN(amount).toFixed(0)),
          ],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve1 });

        toast.update(idNotify, { render: `Approve success!` });
      }

      const response = await writeContract(configEvmChain, {
        abi: abiPrivateSale,
        address: tcvPrivateSaleRouter,
        functionName: 'deposit',
        args: [
          // BigInt(BN(amount).multipliedBy(1e6).toFixed(0)),
          BigInt(BN(amount).toFixed(0)),
          address,
        ],
        chainId: chainIdSelected,
      });
      toast.update(idNotify, {
        render: <RenderNofifySuccess hash={response} />,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      await getDetail();
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
      sx={{
        background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)',
        border: 'none',
        boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12);',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mt: '10px', mb: '10px', width: '100%', px: 3, py: 1.5 }}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3.5 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Price
                  </Typography>
                  <Typography variant="h6">
                    ${formatNumber(BN((detail as TDETAIL)?.tcvPrice || '0').dividedBy(1e6), { fractionDigits: 6 })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Remaining
                  </Typography>
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">
                      {formatNumber(BN((detail as TDETAIL)?.terms?.maxDebt || '0').dividedBy(1e18), {
                        fractionDigits: 2,
                      })}
                      / {formatNumber(BN((detail as TDETAIL)?.totalDebt || '0').dividedBy(1e18), { fractionDigits: 2 })}
                    </Typography>
                    TCV
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Balance
                  </Typography>
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">${formatNumber(balance['TCV'], { fractionDigits: 6 })}</Typography>
                    TCV
                  </Box>
                </Box>
                <span
                  style={{
                    textAlign: 'right',
                    color: '#8C8C8C',
                    fontSize: '12px',
                  }}
                >
                  USDT Balance: ${BN(balance['USDT']).toString()}
                </span>
                <Box>
                  <InputCustomDetail
                    value={amount.toString()}
                    onChange={() => {}}
                    endElement={<IconAndName nameToken={'USDT'} sxIcon={{ fontSize: '20px' }} />}
                    onClickMax={() => {}}
                  />
                  <SliderCustom value={valChang} onChange={changeSlider} onClickLable={clickLable} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    <IconAndName nameToken={'TCV'} sxIcon={{ fontSize: '20px' }} />
                  </Typography>
                  <Box sx={{ display: 'flex', fontSize: '16px', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontSize: '16px' }}>
                      {formatNumber((BN(val) || '0').dividedBy(1e18), { fractionDigits: 6 })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Min
                  </Typography>
                  <Box sx={{ display: 'flex', fontSize: '12px', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontSize: '12px' }}>
                      0
                    </Typography>
                    USDT
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Max
                  </Typography>
                  <Box sx={{ display: 'flex', fontSize: '12px', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6" sx={{ fontSize: '12px' }}>
                      {formatNumber(BN((detail as TDETAIL)?.terms?.maxDebt || '0').dividedBy(1e6), {
                        fractionDigits: 2,
                      })}
                    </Typography>
                    USDT
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LoadingButton
                  props={{
                    variant: 'gradient',
                    sx: { color: '#FFFFFF', marginTop: '32px' },
                    fullWidth: true,
                    disabled: !address,
                  }}
                  loading={loading}
                  onClick={handleBuy}
                >
                  Buy
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Accordion>
  );
}
