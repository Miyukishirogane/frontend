import VerticalAlignBottomRoundedIcon from '@mui/icons-material/VerticalAlignBottomRounded';
import XIcon from '@mui/icons-material/X';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import { Typography, Divider, Stack, Box } from '@mui/material';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import ProposalChip from './ProposalChip';
import { mapPresetProposalInfo } from '../const';

export type TProps = {
  index: number;
};
export default function ProposalDescription(props: TProps) {
  const { index } = props;
  const Icon = mapTokenToIcon['TCV'];
  const title = mapPresetProposalInfo[index].shortDes;

  return (
    <>
      <Typography fontWeight={700} fontSize={'24px'} sx={{ p: '20px' }}>
        {title}
      </Typography>
      <Divider />
      <Stack sx={{ gap: 1, p: '20px' }}>
        <Box display="flex" gap={2} alignItems={'center'}>
          <Icon sx={{ fontSize: '50px' }} />
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              0xb4c0...6f13 In Arbitrum DAO - 2mo ago - #82988
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              In Arbitrum DAO - 2mo ago - #82988
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <ProposalChip icon={<CallMadeRoundedIcon />} label={'Discuss on forum'} />
          <ProposalChip icon={<XIcon />} label={'Share on Twitter (X)'} />
          <ProposalChip icon={<VerticalAlignBottomRoundedIcon />} label={'Download'} />
        </Box>
      </Stack>
      <Divider />
      <Stack sx={{ p: '20px' }} gap="20px">
        <Typography fontWeight={700} fontSize={'16px'}>
          Non-Constitutional
        </Typography>
        <Typography fontWeight={700} fontSize={'16px'}>
          Abstract
        </Typography>
        <Typography>
          This proposal builds on the ideas and concepts introduced by @dk3 in the initial Operation Company (OpCo)
          proposal. The OpCo is a legal entity that delegates and key stakeholders can leverage to achieve DAO-defined
          goals, principally by forming an operational mesh layer and assigning internal employees or negotiating and
          entering into agreements with service providers and individual contributors to facilitate initiatives. OpCo’s
          mission is to negate identified frictions affecting the DAO’s strategy execution, such as allowing for the
          establishment of more operational roles for the DAO, facilitating efficient and competitive contributor and
          service provider negotiations and information flow between these parties, creating clear responsibilities for
          carrying out initiatives, and helping ensure the continuation of programs the DAO depends upon. OpCo is also
          required to be proactive, meaning that if the entity has the bandwidth and recognizes a potential advancement
          that could be made within its mandated focus areas, it can work on and propose a strategy through which the
          entity would
        </Typography>
      </Stack>
    </>
  );
}
