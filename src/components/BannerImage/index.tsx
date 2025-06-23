import { Box, SxProps } from '@mui/material';
import { bannerSaleAnimation1, bannerSaleAnimation2 } from 'src/animations/bannerSale';


type Props = {
    sx?: SxProps;
    image?: string;
    check?: boolean;
};
export default function BannerImage({ sx, image, check }: Props) {
    return (
        <Box
            sx={{
                animation: check === true ? bannerSaleAnimation1 : check === false ? bannerSaleAnimation2 : '',
                position: 'absolute',
                ...sx,
            }}
        >
            <img src={image} alt="star" style={{ width: '100%' }} />
        </Box>
    );
}
