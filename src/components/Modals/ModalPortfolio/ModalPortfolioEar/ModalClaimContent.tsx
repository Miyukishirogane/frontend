import { TableRow, TableCell, Checkbox } from '@mui/material';
import React from 'react';
import { mapTokenToIcon, marketTokensPendle, TAppDenom } from 'src/constants/mapTokenToIcon';
import { BN } from 'src/utils';
import { formatDate } from 'src/utils/format';
import TextSmallNumber from '../../../TextSmallNumber/TextSmallNumber';
import useSwitchToSelectedChain from 'src/jotai/wallet/hooks/useSwitchToSelectedChain';
import Help from '@mui/icons-material/Help';
import { TPendleState } from 'src/jotai/pendle/type';
import { IDataCheckBoxItem } from 'src/views/Portfolio/type';

interface IProps {
  dataModalClaim: TPendleState | null;
  isUseCheckBox?: boolean;
  selectedItems?: IDataCheckBoxItem[];
  handleChangeCheckbox?: (key: string, value: string) => void;
}

const ModalClaimContent = (props: IProps) => {
  const { dataModalClaim, isUseCheckBox = false, selectedItems = [], handleChangeCheckbox = () => {} } = props;
  const { chainIdSelected } = useSwitchToSelectedChain();
  const IconToken = mapTokenToIcon[dataModalClaim?.name as TAppDenom] ?? Help;

  const isChecked = (type: string) => {
    const value = type === 'YT' ? dataModalClaim?.YT : dataModalClaim?.marketAddress;
    return selectedItems.findIndex(item => item.value === value) >= 0;
  };

  const handleCheckYT = () => {
    handleChangeCheckbox(`YT`, dataModalClaim?.YT);
  };

  const handleCheckLP = () => {
    handleChangeCheckbox(`LP`, dataModalClaim?.marketAddress);
  };

  return (
    <>
      {/* YT Pool */}
      {Number(dataModalClaim?.ytPosition) ? (
        <TableRow
          sx={{
            cursor: 'pointer',
            borderBottom: '1px solid #D6D6D6',
            '&:hover': {
              background: 'rgba(215, 241, 255, 0.50);',
            },
          }}
        >
          {isUseCheckBox && (
            <TableCell sx={{ borderBottom: '1px solid #D6D6D6', padding: '23px 18.5px' }}>
              <Checkbox checked={isChecked('YT')} onChange={handleCheckYT} />
            </TableCell>
          )}
          <TableCell sx={{ borderBottom: '1px solid #D6D6D6', padding: '23px 18.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginLeft: '16px', fontWeight: '700', width: 'max-content' }}>
                YT {dataModalClaim?.name}{' '}
                <span>({dataModalClaim ? formatDate(dataModalClaim?.expiry, 'dd MMM yyyy') : ''})</span>
                <br />
                <span style={{ color: '#8C8C8C', fontSize: '14px' }}>Ether.fi</span>
              </span>
            </div>
          </TableCell>
          <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconToken sx={{ width: '35px', height: '35px' }} />
              <span style={{ marginLeft: '16px', fontWeight: '700' }}>{dataModalClaim?.name}</span>
            </div>
          </TableCell>
          <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
            <span style={{ fontWeight: '700' }}>
              <TextSmallNumber
                value={BN(dataModalClaim?.syInterest).dividedBy(
                  BN(`1e${marketTokensPendle[chainIdSelected][dataModalClaim?.name || 'eEth']?.decimal || 1} `),
                )}
              />
            </span>
          </TableCell>
          <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
            <span style={{ fontWeight: '700' }}>
              <TextSmallNumber
                value={BN(dataModalClaim?.assetInterest || '0')
                  .dividedBy(
                    BN(`1e${marketTokensPendle[chainIdSelected][dataModalClaim?.name || 'eEth']?.decimal || 1}`),
                  )
                  .multipliedBy(BN(dataModalClaim?.price || '1'))}
              />
            </span>
          </TableCell>
        </TableRow>
      ) : null}

      {/* LP pool */}
      {Number(dataModalClaim?.lpPosition) ? (
        // <TableRow
        //   sx={{
        //     cursor: 'pointer',
        //     borderBottom: '1px solid #D6D6D6',
        //     '&:hover': {
        //       background: 'rgba(215, 241, 255, 0.50);',
        //     },
        //   }}
        // >
        //   {isUseCheckBox && (
        //     <TableCell sx={{ borderBottom: '1px solid #D6D6D6', padding: '23px 18.5px' }}>
        //       <Checkbox checked={isChecked('LP')} onChange={handleCheckLP} />
        //     </TableCell>
        //   )}
        //   <TableCell sx={{ borderBottom: '1px solid #D6D6D6', padding: '23px 18.5px' }}>
        //     <div style={{ display: 'flex', alignItems: 'center' }}>
        //       <span style={{ marginLeft: '16px', fontWeight: '700', width: 'max-content' }}>
        //         {dataModalClaim?.name} Pool <span>({dataModalClaim ? formatDate(dataModalClaim?.expiry, 'dd MMM yyyy') : ''})</span>
        //         <br />
        //         <span style={{ color: '#8C8C8C', fontSize: '14px' }}>Ether.fi</span>
        //       </span>
        //     </div>
        //   </TableCell>
        //   <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
        //     <div style={{ display: 'flex', alignItems: 'center' }}>
        //       <IconToken sx={{ width: '35px', height: '35px' }} />
        //       <span style={{ marginLeft: '16px', fontWeight: '700' }}>{dataModalClaim?.name}</span>
        //     </div>
        //   </TableCell>
        //   <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
        //     <span style={{ fontWeight: '700' }}>{/* {userPositions?.ptPosition || '0'} */}</span>
        //   </TableCell>
        //   <TableCell sx={{ borderBottom: '1px solid #D6D6D6', textAlign: 'left', padding: '23px 18.5px' }}>
        //     <span style={{ fontWeight: '700' }}>{/* {BN(userPositions?.ptPosition || '0').multipliedBy(BN(dataModalClaim?.price || '0')).toFixed(2)} */}</span>
        //   </TableCell>
        // </TableRow>
        <></>
      ) : null}
    </>
  );
};

export default ModalClaimContent;
