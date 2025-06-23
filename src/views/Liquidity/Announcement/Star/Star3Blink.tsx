import { Box, SxProps } from '@mui/material';
import { starAnimation } from 'src/animations/blink';
import { imagePath } from 'src/constants/imagePath';

type Props = {
    sx?: SxProps;
};
export default function Star3Blink({ sx }: Props) {
    return (
        <Box
            sx={{
                animation: starAnimation,
                position: 'absolute',
                ...sx,
            }}
        >
            <img src={imagePath.STAR3} alt="star" style={{ width: '100%' }} />
        </Box>
    );
}
