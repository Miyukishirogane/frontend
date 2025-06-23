import CopyAll from '@mui/icons-material/CopyAll';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { BN } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { dataTableTODHeader, displayBgTableCell, displayRankTableCell } from 'src/views/LeaderBoard/util';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';
import { LeaderboardTableType } from 'src/views/LeaderBoard/type';

interface IProps {
  dataTable: LeaderboardTableType[] | undefined;
  loading: boolean;
  copyText: (address: string) => void;
}

export const TableTODRowItem = ({ data }: { data: LeaderboardTableType }) => {
  return (
    <TableCell>
      <TextSmallNumber value={BN(data.scoreReputationTrava)} decimal={2} fallbackDisplay="--" />
    </TableCell>
  );
};

const TableTOD = (props: IProps) => {
  const { dataTable, loading, copyText } = props;
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {dataTableTODHeader.map(item => (
            <TableCell
              width={item?.width ? item.width : undefined}
              key={item?.id}
              sx={{
                background: 'rgba(231, 235, 239)',
                textAlign: item?.align ? item.align : 'left',
                color: '#828282',
                fontSize: '14px',
                borderBottom: 'none',
                padding: '23px 18.5px',
              }}
            >
              {item?.label || item?.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <SkeletonTableBody cols={dataTableTODHeader.length} />
        ) : (
          dataTable?.map((item, index) => {
            const rank = item.rankReputationTrava || index;

            return (
              <TableRow sx={{ background: displayBgTableCell(rank) }} key={item?.id || index}>
                <TableCell align="center">{displayRankTableCell(rank)}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {formatAddress(item.wallet, 10, 10)}{' '}
                    <CopyAll sx={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => copyText(item.wallet)} />
                  </div>
                </TableCell>

                <TableTODRowItem data={item} />
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default TableTOD;
