import { Box } from '@mui/material';
import BookMark from 'src/views/Liquidity/common/BookMark';
import YourBalance from './YourBalance/YourBalance';
import Slippage from './Slippage/Slippage';
import InputTokens from './InputTokens/InputTokens';
import ButtonAddLiquidity from './ButtonAddLiquidity/ButtonAddLiquidity';
import { TAccordionVaultState } from 'src/views/Liquidity/jotai/type';
import Fee from './Fee/Fee';

type Props = {
  // goBack: () => void;
  index: number;
  vault: TAccordionVaultState;
};

export default function AddLiquidity({ index, vault }: Props) {
  return (
    <Box>
      <BookMark index={index} vault={vault} />
      <InputTokens index={index} vault={vault} />
      <Slippage index={index} vault={vault} />
      {/* <Fee vault={vault} /> */}
      <YourBalance vault={vault} />
      {/* <YourPoisition /> */}
      <ButtonAddLiquidity vault={vault} />
    </Box>
  );
}
