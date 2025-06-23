import { Theme, ThemeOptions, darken } from '@mui/material';
import { THEME_MODE } from './type';

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;
const buildVariant = (fontWeight: number, size: number, lineHeight: number, letterSpacing?: number) => ({
    fontWeight,
    fontSize: pxToRem(size),
    lineHeight: `${round(lineHeight / size)}`,
    ...(letterSpacing !== undefined ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
});

// ***********************************************************************************************************************************************

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        default: string;
        paper: string;
        primary: string;
        secondary: string;
        header: string;
        contentHeader: string;
        card: string;
    }

    interface Palette {
        gradient: {
            main: string;
        };
    }

    interface PaletteOptions {
        gradient: {
            main: string;
        };
    }
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xsm: true;
        xxl: true;
    }

    interface TypographyVariants {
        body3: React.CSSProperties;
        caption2: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        body3?: React.CSSProperties;
        caption2: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body3: true;
        caption2: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        gradient: true;
    }
}

declare module '@mui/material/Hidden' {
    interface HiddenProps {
        xsmDown?: boolean;
        xsmUp?: boolean;
    }
}

// ***********************************************************************************************************************************************

export function getThemeConfig(mode: THEME_MODE): ThemeOptions {
    const getColor = (darkColor: string, lightColor: string) => {
        return mode === 'dark' ? darkColor : lightColor;
    };

    return {
        breakpoints: {
            keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
            values: { xs: 0, xsm: 600, sm: 760, md: 960, lg: 1280, xl: 1440, xxl: 1800 },
        },
        // shadows: [
        //     'none', // 0
        //     '0px 4px 8px 0px rgba(4, 62, 53, 0.25)', // 1
        //     '0px 4px 8px 0px rgba(44, 151, 143, 0.48)', // 2
        //     '1px 1px 3px 0px rgba(0, 0, 0, 0.20)', // 3
        //     '0px 2px 6px 0px rgba(0, 0, 0, 0.20)', // 4
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        // ],
        palette: {
            mode,
            divider: getColor('#fefef745', '#131c181a'),
            background: {
                paper: getColor('#111C18', '#FFFFFD'),
                default: '#FFFFFF',
                primary: getColor('#6CB7D4', '#111C18'), // mau xanh nen button
                secondary: getColor('#595f5a3d', '#585f5a12'), // mau nen accoridon
                header: '#0E1713',
                contentHeader: '#0E1713',
                card: '#565F5A',
            },
            gradient: {
                // main: 'linear-gradient(90deg, #2465DE 0%, #39BAFD 100%)',
                main: '#2465DE',
            },
            primary: {
                main: '#2465DE',
                light: '#73D4FF',
            },
            secondary: {
                main: '#39BAFD',
                light: '#C9EDFF',
            },
            info: {
                main: '#1C8CF3',
                light: '#25A0E226',
            },
            success: {
                main: '#03BD9D',
                light: '#00BD9026',
            },
            warning: {
                main: '#FFBC0A',
                light: '#FFBC0A26',
            },
            error: {
                main: '#F06542',
                light: '#F0654226',
            },
            text: {
                primary: '#303030',
                secondary: '#8C8C8C',
            },
            action: {
                selected: getColor('#021C39', '#6cb7d42b'),
                hover: getColor('#FFFFFF0F', '#0000000F'),
            },
        },
        typography: {
            fontFamily: `"Manrope", sans-serif`,
            h1: { ...buildVariant(700, 44, 60) },
            h2: { ...buildVariant(600, 32, 44) },
            h3: { ...buildVariant(700, 28, 38) },
            h4: { ...buildVariant(600, 24, 39) },
            h5: buildVariant(600, 20, 28),
            h6: buildVariant(700, 16, 22),
            body1: buildVariant(400, 16, 22),
            body2: buildVariant(400, 14, 20),
            body3: buildVariant(400, 12, 17),
            subtitle1: buildVariant(700, 12, 17),
            subtitle2: buildVariant(400, 16, 22, 0),
            caption: buildVariant(400, 14, 19, 0.15),
            caption2: buildVariant(500, 12, 15),
            button: {
                ...buildVariant(700, 16, 21),
                textTransform: 'capitalize',
            },
        },
    };
}
// ***********************************************************************************************************************************************
export function getThemedComponent(theme: Theme): ThemeOptions {
    return {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '.SnackbarItem-wrappedRoot .SnackbarItem-contentRoot .SnackbarItem-message': {
                        ...theme.typography.body3,
                    },
                    // disable arrow from input number
                    // Chrome, Safari, Edge, Opera
                    'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    // Firefox
                    'input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    'div.MuiBox-root': {
                        '::-webkit-scrollbar': {
                            height: '4px' /* height of horizontal scrollbar ← You're missing this */,
                            width: '4px' /* width of vertical scrollbar */,
                        },
                        '::-webkit-scrollbar-track': {
                            borderRadius: 0,
                            background: '#f7f7f7',
                        },

                        '::-webkit-scrollbar-thumb': {
                            borderRadius: 10,
                            background: '#e3e3e3',
                            cursor: 'pointer',
                            '&:hover': {
                                background: '#d3d3d3',
                            },
                        },
                    },
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backdropFilter: 'blur(3px)',
                    },
                },
            },
            MuiInputAdornment: {
                styleOverrides: {
                    root: {
                        '& .MuiTypography-root': {
                            color: 'white',
                            fontWeight: 600,
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderColor: '#C3C4C3!important',
                        borderRadius: 24,
                        height: '52px',
                        '.MuiInputBase-root.MuiOutlinedInput-root': {
                            background: '#111C18',
                            borderRadius: '24px!important',
                            color: 'white',
                            height: '52px',
                            paddingRight: '33px',
                            '.MuiInputBase-input': {
                                padding: '14.5px 33px',
                            },
                            '.MuiOutlinedInput-notchedOutline': {
                                borderRadius: '24px!important',
                                border: 'none',
                                outline: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '2px solid',
                                borderColor: theme.palette.primary.main + '!important',
                            },
                        },
                    },
                },
            },
            MuiButton: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '99px',
                        height: '44px',
                        boxShadow: 'none',
                    },
                    sizeMedium: {
                        ...theme.typography.button,
                        lineHeight: 1,
                        padding: '0px 16px',
                    },
                    sizeLarge: {
                        height: '52px',
                        padding: '0px 20px',
                    },
                    sizeSmall: {
                        height: '36px',
                        padding: '0px 10px',
                    },
                    containedSecondary: {
                        backgroundColor: theme.palette.secondary.dark,
                        color: '#FFFFFF',
                        '&:hover, &.Mui-focusVisible': {
                            backgroundColor: darken(theme.palette.secondary.dark, 0.2),
                        },
                    },
                    containedPrimary: {
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.primary.main,
                        color: '#FFFFFF',
                        '&:hover, &.Mui-focusVisible': {
                            backgroundColor: darken(theme.palette.primary.main, 0.1),
                            boxShadow: ' 0px 2px 5px 0px ' + theme.palette.primary.light,
                        },
                    },
                    outlinedPrimary: {
                        fontWeight: 'bold',
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: ' 0px 2px 5px 0px ' + theme.palette.primary.light,
                        },
                    },
                    textSecondary: {
                        color: theme.palette.mode === 'dark' ? '#FEFEF6' : '#585F5A',
                    },
                    textPrimary: {
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: 'gradient' },
                        style: {
                            color: theme.palette.common.white,
                            background: `linear-gradient(90deg, #2465DE 0%, #39BAFD 100%)`,
                            transition: 'all 250ms ease',
                            '&:hover, &.Mui-focusVisible': {
                                opacity: 0.9,
                            },
                            '&.Mui-disabled': {
                                background: `linear-gradient(90deg, #2465de5e 0%, #39bafd8c 100%)`,
                            },
                        },
                    },
                ],
            },
            MuiTypography: {
                defaultProps: {
                    variant: 'body1',
                    variantMapping: {
                        h1: 'h1',
                        h2: 'h2',
                        h3: 'h3',
                        h4: 'h4',
                        h5: 'h5',
                        h6: 'h6',
                        body1: 'p',
                        body2: 'p',
                        body3: 'p',
                        subtitle1: 'p',
                        subtitle2: 'p',
                        button: 'p',
                        caption: 'p',
                        caption2: 'p'
                    },
                },
            },
            MuiContainer: {
                defaultProps: {
                    maxWidth: false,
                },
                styleOverrides: {
                    root: {
                        maxWidth: '1280px',
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: pxToRem(20),
                    },
                    fontSizeSmall: {
                        fontSize: pxToRem(16),
                    },
                    fontSizeLarge: {
                        fontSize: pxToRem(24),
                    },
                },
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 0,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                    },
                },
            },
            MuiDialog: {
                defaultProps: {
                    scroll: 'body',
                    PaperProps: {
                        elevation: 0,
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        paddingTop: theme.spacing(2.5),
                        // paddingTop: `${theme.spacing(2.5)} !important`, // prevent override
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        padding: theme.spacing(2, 2.5),
                        backgroundColor: theme.palette.mode === 'dark' ? '#585F5A' : '#EDEDED',
                        '&.MuiDialogTitle-root+.MuiDialogContent-root': {
                            paddingTop: theme.spacing(2.5),
                        },
                    },
                },
            },
            MuiUseMediaQuery: {
                defaultProps: {
                    noSsr: true,
                },
            },
            MuiTooltip: {
                defaultProps: {
                    arrow: true,
                    placement: 'top',
                },
                styleOverrides: {
                    tooltip: {
                        ...theme.typography.body3,
                        boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        padding: theme.spacing(1),
                        maxWidth: 400,
                        color: '#fff',
                    },
                    arrow: {
                        '&:before': {
                            boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px',
                            backgroundColor: 'rgba(0,0,0,0.9)',
                        },
                        color: '#fff',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.secondary.dark,
                            borderWidth: 2,
                        },
                    },
                    focused: {
                        '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    input: {
                        // padding: theme.spacing(1.5, 2),
                    },
                    notchedOutline: {
                        borderColor: theme.palette.secondary.dark,
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        boxShadow: '0px 0px 8px 0px #0000001F',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        '&:first-of-type': {
                            borderRadius: '16px',
                        },
                        '&:last-of-type': {
                            borderRadius: '16px',
                        },
                        '&:before': {
                            display: 'none',
                        },
                        '&.Mui-expanded': {
                            //     backgroundColor: theme.palette.bakground.secondary,
                        },
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        padding: theme.spacing(1, 2.5),
                        '&.Mui-expanded': {
                            boxShadow: '0px 4px 4px 0px #0000001F',
                            borderRadius: '16px',
                            margin: 0,
                        },
                    },
                },
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        padding: theme.spacing(3, 2.5),
                    },
                },
            },
            MuiButtonGroup: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.palette.mode === 'dark' ? '#3b4142' : '#C3C4C3',
                        border: '1px solid #777c784f',
                        borderRadius: 18,
                        overflow: 'hidden',
                        '.MuiButtonBase-root': {
                            paddingRight: '16px',
                            paddingLeft: '16px',
                        },
                    },

                    grouped: {
                        '&:not(:last-of-type)': {
                            borderTopRightRadius: 18,
                            borderBottomRightRadius: 18,
                            borderRightColor: 'inherit',
                        },
                        '&:not(:first-of-type)': {
                            borderTopLeftRadius: 18,
                            borderBottomLeftRadius: 18,
                        },
                    },
                },
            },
            MuiPopover: {
                styleOverrides: {
                    root: {
                        '& .MuiBackdrop-root': {
                            backdropFilter: 'none',
                        },
                    },
                },
            },
            MuiPagination: {
                defaultProps: {
                    color: 'primary',
                    shape: 'rounded',
                },
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            color: '#fff',
                            boxShadow: '0px 0px 10px 1px rgba(196, 196, 196, 0.5)',
                        },
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        overflow: 'auto',
                        position: 'inherit',
                        maxHeight: '400px',
                        '&::-webkit-scrollbar': {
                            backgroundColor: 'rgba(0,0,0,0)',
                            width: 8,
                            height: 8,
                            zIndex: 999999,
                            position: 'absolute'
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            borderRadius: 8,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            borderRadius: 8,
                            border: '2px solid',
                            borderColor: '#F1F3F5',
                            '&:hover': {
                            backgroundColor: '#C1C8CD',
                            },
                        },
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                        },
                    }
                }
            }
        },
    };
}
