import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Divider, FormControl, IconButton, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForm/CustomTextField';
import SelectToken from 'src/components/CustomForm/SelectToken';
import CustomReactDatePicker from 'src/components/DatetimePicker/CustomReactDatePicker';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';
import TableHistory from 'src/components/Table/YieldFlex/TableHistory/TableHistory';
import ToggleButtonGroupCustom from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import TypographyByStatus from 'src/components/TypographyLoading/TypographyByStatus';
import useGetUserPortfolioBalance from 'src/hooks/Projeet/useGetUserPortfolioBalance';
import useAccount from 'src/hooks/useAccount';
import { formatDate, formatNumber } from 'src/utils/format';
import { defaultValueAutoDCA } from '../../constants';
import useSubmitAutoDca from '../../hooks/useSubmitAutoDca';
import { TAutoDCA } from '../../type';
import { autoDcaTokenInOptions, autoDcaTokenOutOptions, recurringCycleData, sellDcaTokenInOptions } from './constant';
import { useIsSellDca } from '../../state/hooks';

const AutoDCA = () => {
  const { address } = useAccount();
  const [autoDCA, setAutoDCA] = useState<TAutoDCA>(defaultValueAutoDCA);
  const [isSellDca, setIsSellDca] = useIsSellDca();
  const { userBalances, status: statusUserPortfolioBalance } = useGetUserPortfolioBalance();

  // const { openModal } = useModalFunction();
  const { mutateAsync, isPending } = useSubmitAutoDca({
    onSuccess: () => {
      setAutoDCA(prev => ({
        ...defaultValueAutoDCA,
        tokenInSelect: prev.tokenInSelect,
        tokenOutSelect: prev.tokenOutSelect,
      }));
    },
  });

  const totalAmount = Number(autoDCA.amount) * Number(autoDCA.totalRound) || 0;
  const currTokenLendingOfUser = useMemo(
    () => userBalances?.find(item => item.token === autoDCA.tokenInSelect),
    [autoDCA.tokenInSelect, userBalances],
  );
  const isUserHasValidBalance = useMemo(() => {
    return currTokenLendingOfUser && currTokenLendingOfUser.balanceFree >= totalAmount;
  }, [currTokenLendingOfUser, totalAmount]);

  const tokenInOptions = useMemo(() => {
    return isSellDca ? sellDcaTokenInOptions : autoDcaTokenInOptions;
  }, [isSellDca]);

  const handleChangeInput = (key: keyof typeof autoDCA, value: string | null) => {
    if (value === null) return;
    if (key === 'tokenOutSelect') {
      if (autoDcaTokenInOptions.indexOf(value) > -1) {
        //Change token-in if selected token-out is the same as token-in
        const newToken = sellDcaTokenInOptions[0];
        setIsSellDca(true);
        setAutoDCA({ ...autoDCA, tokenInSelect: newToken, tokenOutSelect: value });
        return;
      } else {
        const newToken = autoDcaTokenInOptions[0];
        setIsSellDca(false);
        setAutoDCA({ ...autoDCA, tokenInSelect: newToken, tokenOutSelect: value });
        return;
      }
    }

    setAutoDCA({ ...autoDCA, [key]: value });
  };

  const handleSetMax = () => {
    if (autoDCA.totalRound && currTokenLendingOfUser?.balanceFree && Number(autoDCA.totalRound) > 0) {
      const amountInRound = currTokenLendingOfUser?.balanceFree / Number(autoDCA.totalRound);
      setAutoDCA({ ...autoDCA, amount: String(amountInRound) });
    }
  };

  const handleSubmit = async () => {
    if (currTokenLendingOfUser?.balanceFree !== undefined) {
      await mutateAsync({ autoDCA: autoDCA, yieldFlexDeposited: currTokenLendingOfUser.balanceFree });
    }
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          borderRadius: '20px',
          mb: '20px',
          backgroundColor: '#fff',
          padding: '28px',
        }}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1} mb={1}>
          <Typography variant="h5" fontWeight={700}>
            Buy
          </Typography>
          <SelectToken
            options={autoDcaTokenOutOptions}
            value={autoDCA.tokenOutSelect}
            onChange={e => handleChangeInput('tokenOutSelect', e.target.value as string)}
            sx={{
              maxWidth: '120px',
              fontSize: '20px',
              '& .MuiTypography-root': {
                fontSize: '20px',
              },
            }}
          />
        </Stack>

        <Stack gap={10} justifyContent="space-between" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Stack gap={2} flex={1}>
            <Stack gap={1}>
              <Typography minWidth={'120px'}>Amount in Round</Typography>
              <CustomTextField
                value={autoDCA.amount}
                inputType="number"
                onChange={e => handleChangeInput('amount', e.target.value)}
                name="amount"
                sx={{ flex: 1, width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <FormControl sx={{ width: { xs: '190px', sm: '140px' } }}>
                      <Stack direction={'row'}>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: '#ABCDED' }} />
                        <SelectToken
                          options={tokenInOptions}
                          value={autoDCA.tokenInSelect}
                          onChange={e => handleChangeInput('tokenInSelect', e.target.value as string)}
                        />
                      </Stack>
                    </FormControl>
                  ),
                }}
              />
            </Stack>

            <Stack gap={1}>
              <Typography minWidth={'120px'}>Total Round</Typography>
              <CustomTextField
                inputType="number"
                value={autoDCA.totalRound}
                name="totalRound"
                onChange={e => handleChangeInput('totalRound', e.target.value)}
                sx={{ flex: 1, width: '100%' }}
              />
            </Stack>

            <Stack gap={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography minWidth={'120px'}>Total Amount</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Typography fontSize={'14px'} width="fit-content">
                    YieldFlex Deposited:{' '}
                  </Typography>
                  <TypographyByStatus fontSize={'14px'} status={statusUserPortfolioBalance} errorContent="0.00">
                    {formatNumber(currTokenLendingOfUser?.balanceFree, { fractionDigits: 6 })}
                  </TypographyByStatus>
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: '12px' }}>
                        The amount of {autoDCA.tokenInSelect} tokens you hold in YieldFlex can be used for Auto DCA. You
                        can view{' '}
                        <Link href="/dashboard?tab=yieldFlex" color="#0083C9">
                          YieldFlex Portfolio
                        </Link>{' '}
                        page for overview.
                      </Typography>
                    }
                  >
                    <IconButton sx={{ padding: 0 }}>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              <CustomTextField
                value={totalAmount}
                sx={{ flex: 1, width: '100%' }}
                inputType="number"
                disabled
                name="totalAmount"
                InputProps={{
                  endAdornment: (
                    <FormControl
                      sx={{
                        width: { xs: '280px', md: '220px' },
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip title="You need fill total round first to calculate total amount">
                        <Typography
                          variant="body1"
                          sx={{
                            mr: 1,
                            color: 'primary.main',
                            cursor: 'pointer',
                          }}
                          onClick={handleSetMax}
                        >
                          Max
                        </Typography>
                      </Tooltip>
                      <Stack direction={'row'} width={'100%'}>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                          sx={{ borderColor: '#ABCDED', my: 1.5 }}
                        />
                        <SelectToken options={tokenInOptions} disabled value={autoDCA.tokenInSelect} />
                      </Stack>
                    </FormControl>
                  ),
                }}
                helperText={
                  totalAmount === 0 || isUserHasValidBalance ? undefined : (
                    <>
                      (<span style={{ color: '#FF0000' }}>*</span>) We’ll use{' '}
                      {formatNumber(totalAmount - (currTokenLendingOfUser?.balanceFree || 0), {
                        fractionDigits: 8,
                        fallback: 0,
                      })}{' '}
                      {autoDCA.tokenInSelect} from your wallet to proceed with this DCA order.
                    </>
                  )
                }
              />
            </Stack>
          </Stack>

          <Stack gap={2} flex={1}>
            <Stack gap={2}>
              <Typography>Recurring Cycle</Typography>
              <ToggleButtonGroupCustom
                value={autoDCA.recurringCycle}
                handleToggleChange={(e, newAlignment) => handleChangeInput('recurringCycle', newAlignment)}
                data={recurringCycleData}
                sx={{
                  width: 'fit-content',
                  border: '1px solid #D9D9D9',
                  bgcolor: 'transparent',
                }}
              />
            </Stack>

            <Stack gap={1}>
              <Typography minWidth={'120px'}>Time Start</Typography>
              <CustomReactDatePicker
                onChange={date => {
                  if (date && !Array.isArray(date)) {
                    handleChangeInput('timeStart', date.toString());
                  }
                }}
                showTimeSelect
                selected={autoDCA.timeStart ? new Date(autoDCA.timeStart) : null}
                dateFormat="MM/dd/yyyy, hh:mm aa"
              />
            </Stack>

            <Stack gap={1} direction="row" alignItems={'center'} mt={2}>
              <InfoIcon sx={{ color: '#0083C9' }} />
              <Typography variant="body2" sx={{ color: '#0083C9' }}>
                Your first auto invest cycle will begin on{' '}
                <strong>
                  {autoDCA.timeStart
                    ? formatDate(new Date(autoDCA.timeStart), 'MM/dd/yyyy') +
                      ' at ' +
                      formatDate(new Date(autoDCA.timeStart), 'hh:mm a')
                    : formatDate(new Date(), 'MM/dd/yyyy') + ' at ' + formatDate(new Date(), 'hh:mm a')}
                </strong>
                , it will repeat every <strong>{autoDCA.recurringCycle}</strong>.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <LoadingButton
          loading={isPending}
          props={{ variant: 'gradient', sx: { mt: 2 }, fullWidth: true, disabled: !address || totalAmount <= 0 }}
          onClick={handleSubmit}
        >
          DCA Now
        </LoadingButton>
      </Paper>

      <TableHistory />
    </>
  );
};

export default AutoDCA;
