import { useState, useEffect } from 'react';
import { Accordion, Box, Typography } from '@mui/material';
import IconAndName from 'src/components/IconAndName/IconAndName';
import InputCustomDetail from 'src/components/InputCustomDetail';
import SliderCustom from 'src/components/SliderCustom/SliderCustom';
import { formatNumber, formatStringNumber } from 'src/utils/format';
import { BN } from 'src/utils';
import ErrorExeTransaction from 'src/components/ErrorExeTransaction/ErrorExeTransaction';
import { toast } from 'react-toastify';
import useAccount from 'src/hooks/useAccount';
import { Err_NotConnectWallet } from 'src/constants';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import { configEvmChain, contractAddress } from 'src/jotai/wallet/config';
import RenderNofifySuccess from 'src/components/RenderNofifySuccess/RenderNofifySuccess';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import { writeContract, readContracts, waitForTransactionReceipt, readContract } from 'wagmi/actions';
import { Address, erc20Abi } from 'viem';
import { useEarlySeed, useEarlySeedFunction } from 'src/jotai/earlySeed';
import { abiEarlySeedSpecialUser } from 'src/jotai/wallet/abi/EarlySeedSpecialUser';
import { abiEarlySeedTrava } from 'src/jotai/wallet/abi/EarlySeed';
import { TEARLYSEEDDETAIL } from 'src/jotai/earlySeed/type';
import { configTokenEarlySeed } from 'src/constants/mapTokenToIcon';

export default function BoxBuy() {
  // state jotai
  const { address } = useAccount();
  const { detail, user, balance, dataList } = useEarlySeed();
  const { getBondInfo } = useEarlySeedFunction();
  const { chainIdSelected, switchToChainSelected } = useSwitchToSelectedChain();
  const TCVEARLYSEEDSPECIALUSER = contractAddress[chainIdSelected].TCV_EARLY_SEED_SPECIAL_USER;
  const TCVEARLYSEEDTRAVA = contractAddress[chainIdSelected].TCV_EARLY_SEED_TRAVA_USERS;

  // state
  const targetTimestamp = Number((detail as TEARLYSEEDDETAIL)?.terms?.buyingTimeStart + (detail as TEARLYSEEDDETAIL)?.terms?.buyingTime) * 1000 || Date.now();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('0');
  const [valChang, setValChang] = useState<number | number[]>(0);
  const [val, setVal] = useState<number | number[]>(0);
  const [timeLeft, setTimeLeft] = useState(targetTimestamp - Date.now());

  const timeAbleToBuy = parseInt(dataList[0]?.terms?.buyingTimeStart + '000' || '0') < Date.now();

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

  // change Slider
  async function changeSlider(event: Event, val: number | number[], activeThumb: number) {
    console.log('activeThumb', activeThumb);
    setValChang(val);
    if (user === 'trava') {
      setAmount(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toFixed(5));
      const getPayout = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiEarlySeedTrava,
            address: TCVEARLYSEEDTRAVA,
            functionName: 'getPayout',
            args: [BigInt(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).multipliedBy('1e6').toFixed(0)))],
          },
        ],
      });
      setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    } else if (user === 'special') {
      setAmount(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toFixed(5));
      const getPayout = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiEarlySeedSpecialUser,
            address: TCVEARLYSEEDSPECIALUSER,
            functionName: 'getPayout',
            args: [BigInt(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).multipliedBy('1e6').toFixed(0)))],
          },
        ],
      });
      setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    }
  }

  async function clickLable(val: number | number[]) {
    if (user === 'trava') {
      setValChang(val);
      setAmount(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toFixed(5));
      const getPayout = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiEarlySeedTrava,
            address: TCVEARLYSEEDTRAVA,
            functionName: 'getPayout',
            args: [BigInt(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).multipliedBy('1e6').toFixed(0)))],
          },
        ],
      });
      setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    } else if (user === 'special') {
      setValChang(val);
      setAmount(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).toFixed(5));
      const getPayout = await readContracts(configEvmChain, {
        contracts: [
          {
            abi: abiEarlySeedSpecialUser,
            address: TCVEARLYSEEDSPECIALUSER,
            functionName: 'getPayout',
            args: [BigInt(parseFloat(BN(balance['USDT']).dividedBy(100).multipliedBy(BN(val)).multipliedBy('1e6').toFixed(0)))],
          },
        ],
      });
      setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
    }
  }

  // onChange input
  async function onChangeInput(val: string) {
    const regex = /^\d*(\.\d{0,5})?$/;

    if (regex.test(val.toString())) {
      setAmount(val);
      if (user === 'trava') {
        const getPayout = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedTrava,
              address: TCVEARLYSEEDTRAVA,
              functionName: 'getPayout',
              args: [BigInt(BN(val).multipliedBy('1e6').toString())],
            },
          ],
        });
        setValChang(parseFloat(BN(val).dividedBy(BN(balance['USDT'])).multipliedBy(100).toString()));
        setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
      } else if (user === 'special') {
        const getPayout = await readContracts(configEvmChain, {
          contracts: [
            {
              abi: abiEarlySeedSpecialUser,
              address: TCVEARLYSEEDSPECIALUSER,
              functionName: 'getPayout',
              args: [BigInt(BN(val).multipliedBy('1e6').toString())],
            },
          ],
        });
        setValChang(parseFloat(BN(val).dividedBy(BN(balance['USDT'])).multipliedBy(100).toString()));
        setVal(parseInt(BN(getPayout[0]?.result || '0').toFixed(0)) || 0);
      }
    }
  }

  // handleBuy
  async function handleBuy() {
    setLoading(true);
    const idNotify = toast.loading('Buy token!');
    try {
      if (!address) throw Err_NotConnectWallet;

      const tokenAddress = configTokenEarlySeed[chainIdSelected]['USDT'].address as Address;
      const tcvEarlySeed = user === 'trava' ? TCVEARLYSEEDTRAVA : TCVEARLYSEEDSPECIALUSER;
      const abiEarlySeed = user === 'trava' ? abiEarlySeedTrava : abiEarlySeedSpecialUser;

      await switchToChainSelected();

      const inputAmount = BN(amount);

      const allowance = await readContract(configEvmChain, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'allowance',
        args: [address, tcvEarlySeed],
        chainId: chainIdSelected,
      });

      if (BN(allowance).isLessThan(inputAmount)) {
        toast.update(idNotify, { render: `Approve more balance` });

        const approve1 = await writeContract(configEvmChain, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: 'approve',
          args: [tcvEarlySeed, BigInt(inputAmount.multipliedBy('1e6').toFixed(0))],
          chainId: chainIdSelected,
        });

        await waitForTransactionReceipt(configEvmChain, { hash: approve1 });

        toast.update(idNotify, { render: `Approve success!` });
      }

      const response = await writeContract(configEvmChain, {
        abi: abiEarlySeed,
        address: tcvEarlySeed,
        functionName: 'deposit',
        args: [BigInt(inputAmount.multipliedBy('1e6').toFixed(0)), address],
        chainId: chainIdSelected,
      });

      toast.update(idNotify, { render: <RenderNofifySuccess hash={response} />, type: 'success', isLoading: false, autoClose: 3000 });
      await getBondInfo(detail as TEARLYSEEDDETAIL, user);
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
    <Accordion elevation={0} disableGutters sx={{ background: 'linear-gradient(180deg, #FFF 57.2%, #E9F4FF 99.45%)', border: 'none', boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.12);' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mt: '10px', mb: '10px', width: '100%', px: 3, py: 1.5 }}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3.5 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Price
                  </Typography>
                  <Typography variant="h6">${formatNumber(BN((detail as TEARLYSEEDDETAIL)?.tcvPrice || '0').dividedBy(1e6), { fractionDigits: 6 })}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Remaining
                  </Typography>
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">
                      {user === 'special' && (
                        <>
                          {formatNumber(
                            BN((detail as TEARLYSEEDDETAIL)?.getPayOut || '0')
                              .minus(BN((detail as TEARLYSEEDDETAIL)?.getBondInfo?.totalBought || '0'))
                              .dividedBy('1e18'),
                            { fractionDigits: 2 }
                          )}{' '}
                          / {formatNumber(BN((detail as TEARLYSEEDDETAIL)?.getPayOut || '0').dividedBy('1e18'), { fractionDigits: 2 })}
                        </>
                      )}
                      {user === 'trava' && (
                        <>
                          {formatNumber(
                            BN((detail as TEARLYSEEDDETAIL)?.terms?.maxDebt || '0')
                              .minus(BN((detail as TEARLYSEEDDETAIL)?.totalDebt || '0'))
                              .dividedBy('1e18'),
                            { fractionDigits: 0 }
                          )}
                          /{formatNumber(BN((detail as TEARLYSEEDDETAIL)?.terms.maxDebt || '0').dividedBy('1e18'), { fractionDigits: 0 })}
                        </>
                      )}
                    </Typography>
                    TCV
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color={'text.secondary'}>
                    Balance
                  </Typography>
                  <Box sx={{ display: 'flex', placeItems: 'center', gap: 0.5 }}>
                    <Typography variant="h6">${formatNumber(balance['USDT'], { fractionDigits: 2 })}</Typography>
                    USDT
                  </Box>
                </Box>
                <Box>
                  <InputCustomDetail
                    value={amount}
                    onChange={(e) => {
                      if (e) {
                        onChangeInput(formatStringNumber(e));
                      } else {
                        onChangeInput('0');
                      }
                    }}
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
                      {formatNumber((BN(val) || '0').dividedBy(1e18), { fractionDigits: 4 })}
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
                      {user === 'trava' && formatNumber(BN((detail as TEARLYSEEDDETAIL)?.terms?.maxPayout || '0').dividedBy('1e6'), { fractionDigits: 2 })}
                      {user === 'special' &&
                        formatNumber(
                          BN((detail as TEARLYSEEDDETAIL)?.getBondInfo?.userLimit || '0')
                            .dividedBy('1e6')
                            .minus(
                              BN((detail as TEARLYSEEDDETAIL)?.getBondInfo?.totalBought || '0')
                                .dividedBy('1e18')
                                .multipliedBy(BN((detail as TEARLYSEEDDETAIL)?.tcvPrice || '0'))
                                .dividedBy('1e6')
                            ),
                          { fractionDigits: 2 }
                        )}
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
                    disabled: !address || parseFloat(amount) <= 0 || timeLeft <= 0 || !timeAbleToBuy,
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
