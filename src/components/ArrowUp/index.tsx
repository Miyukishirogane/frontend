import { arrowUpAnimation } from "src/animations/arrowUp";
import { Box, SxProps } from "@mui/material"

type Props = {
  sx?: SxProps;
  img: string;
};

export default function ArrowUpAnimation({ sx, img }: Props) {
  return (
    <Box
      sx={{
        animation: arrowUpAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={img} className="delay1" alt="star" style={{ width: '100%' }} />
    </Box >
  )
}
