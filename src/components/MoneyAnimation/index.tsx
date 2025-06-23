import { coinAnimation } from "src/animations/coin";
import { Box, SxProps } from "@mui/material"

type Props = {
  sx?: SxProps;
  img: string;
};

export default function MoneyAnimation({ sx, img }: Props) {
  return (
    <Box
      sx={{
        animation: coinAnimation,
        position: 'absolute',
        
        ...sx,
      }}
    >
      <img src={img} alt="star" style={{ width: '100%' }} />
    </Box>
  )
}
