import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded';
import { ChipProps } from '@mui/material';
import { IToggleButton } from 'src/components/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import { TStateProposalCard } from './type';

export const stateProposalCard = [
  'active',
  'active',
  'rejected',
  'rejected',
  'executable',
  'passed',
  'rejected',
  'executed',
] as const;

// const proposalStates = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
export const mapStateCardToPropsChip: Record<TStateProposalCard, ChipProps> = {
  active: {
    icon: <SensorsRoundedIcon sx={{ color: '#136F45!important' }} />,
    sx: { color: '#136F45', backgroundColor: '#CDFEE1' },
    label: 'Active',
  },
  executable: {
    icon: <CheckCircleRoundedIcon sx={{ color: '#5E4200!important' }} />,
    sx: { color: '#5E4200', backgroundColor: '#FFD6A4' },
    label: 'Executable',
  },
  executed: {
    icon: <CheckCircleRoundedIcon sx={{ color: '#303030!important' }} />,
    sx: { color: '#303030', backgroundColor: '#0000000F' },
    label: 'Executed',
  },
  passed: {
    icon: <HourglassEmptyRoundedIcon sx={{ color: '#00527C!important' }} />,
    sx: { color: '#00527C', backgroundColor: '#E0F0FF' },
    label: 'Passed',
  },
  rejected: {
    icon: <CancelRoundedIcon sx={{ color: '#DC2626!important' }} />,
    sx: { color: '#DC2626', backgroundColor: '#FEDAD9' },
    label: 'Rejected',
  },
};

export const btnGroupInProposal: IToggleButton[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'passed',
    label: 'Passed',
  },
  {
    value: 'executable',
    label: 'Executable',
  },
  {
    value: 'executed',
    label: 'Executed',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
];

export const mapPresetProposalInfo: { [key: number]: { shortDes: string } } = {
  0: { shortDes: 'Add new token' },
  1: { shortDes: 'Update interest rate' },
  2: { shortDes: "Update tokens' price oracle" },
  3: { shortDes: 'Add new token' },
  4: { shortDes: 'Update interest rate' },
  5: { shortDes: "Update tokens' price oracle" },
  6: { shortDes: 'Add new token' },
  7: { shortDes: 'Update interest rate' },
  8: { shortDes: "Update tokens' price oracle" },
  9: { shortDes: 'Add new token' },
  10: { shortDes: 'Update interest rate' },
  11: { shortDes: "Update tokens' price oracle" },
  12: { shortDes: 'Add new token' },
  13: { shortDes: 'Update interest rate' },
  14: { shortDes: "Update tokens' price oracle" },
  15: { shortDes: 'Add new token' },
  16: { shortDes: 'Update interest rate' },
  17: { shortDes: "Update tokens' price oracle" },
  18: { shortDes: 'Add new token' },
  19: { shortDes: 'Update interest rate' },
  20: { shortDes: "Update tokens' price oracle" },
  21: { shortDes: 'Add new token' },
  22: { shortDes: 'Update interest rate' },
  23: { shortDes: "Update tokens' price oracle" },
  24: { shortDes: 'Add new token' },
  25: { shortDes: 'Update interest rate' },
  26: { shortDes: "Update tokens' price oracle" },
  27: { shortDes: 'Add new token' },
  28: { shortDes: 'Update interest rate' },
  29: { shortDes: "Update tokens' price oracle" },
  30: { shortDes: 'Emergency actions for testing purpose' },
};
