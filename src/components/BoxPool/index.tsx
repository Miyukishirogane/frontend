import { Box, SxProps } from "@mui/material"
import { boxPoolAnimation } from "src/animations/boxPool";

type Props = {
  sx?: SxProps;
  img: string;
};

export default function BoxPoolAnimation({ sx, img }: Props) {
  return (
    <Box
      sx={{
        animation: boxPoolAnimation,
        position: 'absolute',
        ...sx,
      }}
    >
      <img src={img} alt="star" style={{ width: '100%' }} />
    </Box>
  )
}
