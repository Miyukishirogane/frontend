import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material';

type TProps = {
  start: string;
  end: string;
};

export default function GovernanceTimeline(props: TProps) {
  const { end, start } = props;

  const timelineData = [
    { label: 'Start', date: start },
    { label: 'End', date: end },
  ];

  return (
    <Box sx={{ p: '20px', width: '100%' }}>
      <Typography fontSize={'20px'} fontWeight={600} sx={{ marginBottom: '16px' }}>
        Timeline
      </Typography>
      <Stepper
        orientation="vertical"
        sx={{
          '& .MuiStepConnector-line': {
            borderLeftWidth: '2px',
            borderColor: '#000000',
            height: '24px',
            transform: 'scaleY(2)',
          },
          '& .MuiStepConnector-root': {
            ml: '2.5px',
          },
        }}
      >
        {timelineData.map((item, index) => (
          <Step key={index} active>
            <StepLabel
              StepIconComponent={() => (
                <Box sx={{ height: '8px', width: '8px', borderRadius: '1000px', backgroundColor: '#000000' }}></Box>
              )}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
