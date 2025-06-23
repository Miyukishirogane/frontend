import { Box, Slider, SliderProps, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

type Props = SliderProps & {
    onClickLable?: any;
};

const CustomSlider = styled(Slider)(({ theme }) => ({
    height: 6,
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        background: 'linear-gradient(90deg, #2465DE 0%, #39BAFD 100%)',
        boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
            '@media (hover: none)': {},
        },
        '&:before': {
            boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 5,
        background: 'linear-gradient(90deg, #2465DE 0%, #39BAFD 100%)',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        boxShadow: 'inset 0px 0px 4px -2px #000',
        backgroundColor: '#e3e3e3',
    },
}));

export default function SliderCustom(props: Props) {
    const [value, setValue] = useState<number | number[]>(0);
    const changeSlider = (event: Event, val: number | number[], activeThumb: number) => {
        props.onChange ? props.onChange(event, val, activeThumb) : (() => {})();
        setValue(val);
    };
    function clickLable(val: number | number[]) {
        props.onClickLable ? props.onClickLable(val) : (() => {})();
        setValue(val);
    }
    return (
        <Box sx={{ pt: 1, pb: 2, pl: 0.6, pr: 0.6, position: 'relative' }}>
            <CustomSlider size="medium" defaultValue={0} valueLabelDisplay="auto" onChange={changeSlider} sx={{ color: 'primary.main' }} value={props.value} />
            <Typography
                variant={Number(value || 0) == 0 ? 'h6' : 'body1'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(0% - 1px)',
                    cursor: 'pointer',
                    color: Number(value || 0) == 0 ? '#737373' : '#828282',
                }}
                onClick={() => clickLable(0)}
                component={'div'}
            >
                0%
            </Typography>
            <Typography
                variant={Number(value || 0) == 25 ? 'h6' : 'body1'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(25% - 15px)',
                    cursor: 'pointer',
                    color: Number(value || 0) == 25 ? '#737373' : '#828282',
                }}
                onClick={() => clickLable(25)}
                component={'div'}
            >
                25%
            </Typography>
            <Typography
                variant={Number(value || 0) == 50 ? 'h6' : 'body1'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(50% - 15px)',
                    cursor: 'pointer',
                    color: Number(value || 0) == 50 ? '#737373' : '#828282',
                }}
                onClick={() => clickLable(50)}
                component={'div'}
            >
                50%
            </Typography>
            <Typography
                variant={Number(value || 0) == 75 ? 'h6' : 'body1'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(75% - 15px)',
                    cursor: 'pointer',
                    color: Number(value || 0) == 75 ? '#737373' : '#828282',
                }}
                onClick={() => clickLable(75)}
                component={'div'}
            >
                75%
            </Typography>
            <Typography
                variant={Number(value || 0) == 100 ? 'h6' : 'body1'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(100% - 25px)',
                    cursor: 'pointer',
                    color: Number(value || 0) == 100 ? '#737373' : '#828282',
                }}
                onClick={() => clickLable(100)}
                component={'div'}
            >
                Max
            </Typography>
        </Box>
    );
}
