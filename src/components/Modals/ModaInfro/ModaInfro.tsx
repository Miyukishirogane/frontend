import { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import ClearRounded from '@mui/icons-material/ClearRounded';
import { useModalJoinIn, useModalJoinInction } from 'src/jotai/modals/ModalJoinIn/ModalJoinIn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { imagePath } from 'src/constants/imagePath';
import { useUserPrivateSale } from 'src/jotai/userSale/userPrivateSale';
import { useUserPrivateSaleFunction } from 'src/jotai/userSale/userPrivateSale';
import LoadingButton from 'src/components/LoadingButton/LoadingButton';

export default function ModaInfro() {
  const modal = useModalJoinIn();
  const { closeModal } = useModalJoinInction();

  // jotai data
  const { messError, loading } = useUserPrivateSale();
  const { postLogin, setState } = useUserPrivateSaleFunction();

  // state
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setPassword('');
  }, []);

  // handle
  const hanleLogin = () => {
    const data = {
      password: password,
      url: 'VENWIGNvbW11bml0eSBzYWxl',
    };
    postLogin({ ...data });
    setPassword('');
    // close modal login true
    const checkPublicSale = sessionStorage.getItem('publicSaleToken');
    if (checkPublicSale) {
      closeModal();
      setPassword('');
    }
  };

  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogTitle sx={{ backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex' }}>
          {typeof modal.title == 'string' ? <Typography variant="h5">{modal.title}</Typography> : modal.title}
          <ClearRounded
            sx={{ ml: 'auto', cursor: 'pointer', fontSize: '20px', color: '#2465DE' }}
            onClick={() => {
              closeModal();
              setPassword('');
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'white' }}>
        <Box sx={{ mb: 2 }}>
          <FormControl>
            <Grid container spacing={{ md: 7, sm: 3, xs: 2 }}>
              <Grid
                item
                xs={12}
                sx={{
                  width: '100%',
                  display: 'flex',
                  borderRadius: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                }}
              >
                <img src={imagePath.IMGLOGIN} alt="icon login" />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: '#B5B8B8', fontSize: '14px', marginBottom: '8px' }} variant="caption2">
                  {modal.content}
                </Typography>
                <TextField
                  variant="standard" // <== changed this
                  margin="normal"
                  required
                  type={showPass ? 'text' : 'password'}
                  fullWidth
                  id="password"
                  name="password"
                  autoComplete="password"
                  autoFocus={false}
                  sx={{
                    width: '100%',
                    background: '#EFF2F8',
                    borderRadius: '8px',
                    margin: '0px',
                    marginTop: '8px',
                    boxShadow: '0px 0px 6px 0px rgba(176, 204, 218, 0.50) inset',
                  }}
                  disabled={loading}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setState({ messError: false });
                  }}
                  InputProps={{
                    endAdornment: showPass ? (
                      <Visibility
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => setShowPass(false)}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => setShowPass(true)}
                      />
                    ),
                    disableUnderline: true, // <== added this
                    style: {
                      width: '100%',
                      display: 'flex',
                      borderRadius: '8px',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                      background: '#EFF2F8',
                      padding: '15px 20px',
                      color: '#828282',
                      fontSize: '16px',
                      fontWeight: '700',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
                <span
                  style={{
                    color: '#D54040',
                    fontSize: '12px',
                    display: `${messError ? '' : 'none'}`,
                  }}
                >
                  Wrong password
                </span>
              </Grid>
              <Grid item xs={12} paddingTop="28px!important">
                <LoadingButton
                  props={{
                    variant: 'gradient',
                    sx: { color: '#FFFFFF' },
                    fullWidth: true,
                    // disabled: password?.length > 8 ? false : true,
                  }}
                  loading={loading}
                  onClick={hanleLogin}
                >
                  Join
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
