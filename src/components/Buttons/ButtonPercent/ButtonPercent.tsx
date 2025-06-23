import React from 'react';
import Button from '@mui/material/Button';
interface ButtonPercentProps {
    // children: React.ReactNode;
    selected: boolean;
    onClick: () => void;
    buttonContent: React.ReactNode;
}
const ButtonPercent = ({ selected, onClick, buttonContent }: ButtonPercentProps) => {
    const buttonColor = selected ? 'primary.main' : '#EFF2F8';
    const fontColor = selected ? '#FFFFFF' : '#828282';

    return (
        <Button
            // variant="contained"
            sx={{
                backgroundColor: buttonColor,
                width: '70px',
                height: '32px',
                borderRadius: '20px',
                cursor: 'pointer',
                color: fontColor,
                fontFamily: 'inherit',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '20px',
            }}
            onClick={onClick}
        >
            {buttonContent}
        </Button>
    );
};

export default ButtonPercent;
