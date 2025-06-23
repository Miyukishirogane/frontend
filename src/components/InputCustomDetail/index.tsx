import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    endElement: ReactNode;
    value: string | number;
    onChange: (value: string) => void;
    subValue?: string;
    readonly?: boolean;
    onClickMax?: () => void;
    regex?: string;
};
export default function InputCustomDetail({ endElement, value, onChange, subValue, readonly = false, regex = '' }: Props) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                borderRadius: '16px',
                backgroundColor: '#EFF2F8',
                py: 2,
                px: { xs: 1, md: 2.5 },
                justifyContent: 'space-between',
                width: '100%',
                height: '83px',
                marginBottom: '16px',
                boxShadow: '0px 0px 6px 0px #B0CCDA80 inset',
                placeItems: 'center',
            }}
        >
            <Box sx={{ width: '-webkit-fill-available' }}>
                <input
                    readOnly={readonly}
                    style={{ display: 'block', border: 'none', outline: 'none', background: 'none', fontSize: '24px', fontFamily: 'inherit', fontWeight: '700', width: '100%' }}
                    type="number"
                    pattern={regex ? regex : ''}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                ></input>
                {subValue ? (
                    <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                        {subValue}
                    </Typography>
                ) : (
                    <></>
                )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
                <Box>{endElement}</Box>
            </Box>
        </Box>
    );
}
