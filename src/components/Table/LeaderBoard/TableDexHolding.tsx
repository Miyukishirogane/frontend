import CopyAll from '@mui/icons-material/CopyAll';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import TextSmallNumber from 'src/components/TextSmallNumber/TextSmallNumber';
import { BN } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { LeaderboardTableType } from 'src/views/LeaderBoard/type';
import { dataTableDexHeader, displayBgTableCell, displayRankTableCell } from 'src/views/LeaderBoard/util';
import SkeletonTableBody from '../TableLoading/SkeletonTableBody';

interface IProps {
  dataTable: LeaderboardTableType[] | undefined;
  loading: boolean;
  copyText: (address: string) => void;
}

export const TableDexHoldingRowItem = ({ data }: { data: LeaderboardTableType }) => {
  return (
    <>
      <TableCell>
        <TextSmallNumber value={BN(data.scoreDEXTokenHolding)} decimal={2} fallbackDisplay="--" />
      </TableCell>

      <TableCell>
        <TextSmallNumber value={BN(data.scoreUniTokenHolding)} decimal={2} />
      </TableCell>

      <TableCell>
        <TextSmallNumber value={BN(data.scoreGrailTokenHolding)} decimal={2} />
      </TableCell>

      <TableCell>
        <TextSmallNumber value={BN(data.scoreCakeTokenHolding)} decimal={2} />
      </TableCell>
    </>
  );
};

const TableDexHolding = (props: IProps) => {
  const { dataTable, loading, copyText } = props;
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {dataTableDexHeader.map(item => (
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
          <SkeletonTableBody cols={dataTableDexHeader.length} />
        ) : (
          dataTable?.map((item, index) => {
            const rank = item.rankDEXTokenHolding || index;

            return (
              <TableRow sx={{ background: displayBgTableCell(rank) }} key={item?.id || index}>
                <TableCell align="center">{displayRankTableCell(rank)}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {formatAddress(item.wallet, 10, 10)}{' '}
                    <CopyAll sx={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => copyText(item.wallet)} />
                  </div>
                </TableCell>

                <TableDexHoldingRowItem data={item} />
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default TableDexHolding;
