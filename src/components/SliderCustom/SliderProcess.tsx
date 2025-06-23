import Slider, { SliderProps } from '@mui/material/Slider';

type TProps = { processColor: string; colorRail?: string } & SliderProps;

export default function SliderProcess(props: TProps) {
  const { processColor, colorRail, slotProps, sx, ...rest } = props;

  return (
    <Slider
      sx={{
        boxSizing: 'border-box',
        height: '16px',
        color: processColor,
        p: '0!important',
        '& .MuiSlider-markActive': {
          backgroundColor: '#ffffff',
        },
        ...sx,
      }}
      slotProps={{
        root: {
          style: {
            border: '2px solid',
            borderColor: processColor,
            backgroundColor: processColor,
            overflow: 'hidden',
          },
          ...(slotProps?.root || {}),
        },
        mark: {
          style: {
            height: '12px',
            width: '3px',
            opacity: 1,
          },

          ...(slotProps?.mark || {}),
        },
        thumb: {
          style: {
            display: 'none',
          },
          ...(slotProps?.thumb || {}),
        },
        track: {
          style: {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            border: '1px solid',
            borderColor: processColor,
          },
          ...(slotProps?.track || {}),
        },
        rail: {
          style: {
            border: 'none',
            backgroundColor: colorRail ?? '#ffffff',
            opacity: 1,
          },
          ...(slotProps?.rail || {}),
        },
      }}
      {...rest}
    />
  );
}
