import LeftContent from './LeftContent/LeftContent';
import { TAccordionVaultState } from '../../jotai/type';

export default function DetailsLiquid({
  index,
  vault,
  loading,
}: {
  index: number;
  vault: TAccordionVaultState;
  loading: boolean;
}) {
  return <LeftContent index={index} vault={vault} loading={loading} />;
}
