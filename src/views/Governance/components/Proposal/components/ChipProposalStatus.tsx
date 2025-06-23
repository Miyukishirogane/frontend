import { Chip, ChipProps } from '@mui/material';
import { TStateProposalCard } from '../type';
import { mapStateCardToPropsChip } from '../const';

type TProps = {
  state: TStateProposalCard;
} & ChipProps;
export default function ChipProposalStatus(props: TProps) {
  const { state } = props;
  const propsChip = mapStateCardToPropsChip[state];
  return <Chip size="small" {...propsChip} {...props} />;
}
