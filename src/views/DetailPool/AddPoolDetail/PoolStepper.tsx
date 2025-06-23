import styled from '@emotion/styled';
import Check from '@mui/icons-material/Check';
import {
  CircularProgress,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
} from '@mui/material';

export const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // borderColor: '#15B097',
      border: '1px ridge #15B097',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#fff',
      border: '1px ridge #15B097',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#787E7E',
    borderTopWidth: 1,
    border: '1px dashed #787E7E',
  },
}));

export function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : active ? (
        <CircularProgress sx={{ width: '20px !important', height: '20px !important', color: '#5CEAB7' }} />
      ) : (
        <div className="QontoStepIcon-circle">
          <div className="checkTime" />
        </div>
      )}
    </QontoStepIconRoot>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QontoStepIconRoot = styled('div')(({ theme, ownerState }: { theme?: any; ownerState: any }) => ({
  color: theme?.palette?.mode === 'dark' ? theme?.palette?.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#fff',
    zIndex: 1,
    fontSize: 14,
    background: '#15B097',
    borderRadius: '300px',
    width: 20,
    height: 20,
  },
  '& .QontoStepIcon-circle': {
    width: 20,
    height: 20,
    border: '2px solid #787E7E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
  },
  '& .checkTime': {
    width: 5,
    height: 5,
    background: '#787E7E',
    borderRadius: '300px',
  },
}));

const PoolStepper = ({ steps, activeSteps = 0 }: { steps: string[]; activeSteps: number }) => {
  return (
    <Stepper sx={{ color: '#15B097' }} activeStep={activeSteps} alternativeLabel connector={<QontoConnector />}>
      {steps.map(label => (
        <Step
          key={label}
          sx={{
            backgournd: '#15B097',
            '.css-fv8sjk-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
              color: '#15B097',
            },
            '.css-z7uhs0-MuiStepConnector-line': {
              borderColor: '#15B097',
            },
            '.css-1577hm2-MuiStepConnector-root .MuiStepConnector-line': {
              border: 'dashed',
            },
          }}
        >
          <StepLabel
            sx={{
              '.css-ev7nsx-MuiStepLabel-label.Mui-completed': {
                color: '#B5B8B8',
              },
              '.css-ev7nsx-MuiStepLabel-label.Mui-active': {
                color: '#B5B8B8',
              },
            }}
            StepIconComponent={QontoStepIcon}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default PoolStepper;
