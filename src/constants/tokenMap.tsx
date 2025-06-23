import { Address } from 'viem';
import { TAppChainId } from 'src/jotai/wallet/type';
import { SvgComponent } from 'src/assets/icon';
import { mapTokenToIcon } from './mapTokenToIcon';

export const tokenList: { [k in TAppChainId]: { [t: string]: { address: Address; decimal: number; icon: SvgComponent, price: string } } } =
{
    '97': {

    },
    '42161': {
        ETH: {
            address: '0xd617e75f30a432e7ea158501f9e4fd6ce92cd2dc',
            decimal: 18,
            icon: mapTokenToIcon.WETH,
            price: "0x0000000000000000000000000000000000000000"
        },
        WETH: {
            address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            decimal: 18,
            icon: mapTokenToIcon.WETH,
            price: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
        },
        USDC: {
            address: '0x8d294256d858beAb208AdB60309AE04aEf99E93f',
            decimal: 6,
            icon: mapTokenToIcon.USDC,
            price: "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
        },
    },
    '421614': {
        aArbUSDC: {
            address: '0x460b97BD498E1157530AEb3086301d5225b91216',
            decimal: 6,
            icon: mapTokenToIcon.USDC,
            price: "0x460b97BD498E1157530AEb3086301d5225b91216"
        },
        'AaveWETH': {
            address: '0xf5f17EbE81E516Dc7cB38D61908EC252F150CE60',
            decimal: 18,
            icon: mapTokenToIcon.WETH,
            price: "0xf5f17EbE81E516Dc7cB38D61908EC252F150CE60"
        },
        'SY-AaveUSDC': {
            address: '0x1B75C9878BcD4648666DA0E641159cfddaa13694',
            decimal: 6,
            icon: mapTokenToIcon.USDC,
            price: "0x1B75C9878BcD4648666DA0E641159cfddaa13694"
        },
        'SY-AaveWETH': {
            address: '0xCA1b418275656522F7AF879679E88d848A58A6a5',
            decimal: 18,
            icon: mapTokenToIcon.WETH,
            price: "0xCA1b418275656522F7AF879679E88d848A58A6a5"
        },
    },
    '56': {}
}

export const optionSelectToken: { [k in TAppChainId]: string[] } = {
    '97': [] ,
    '42161': ['ETH', 'WETH', 'USDC'],
    '421614': ['aArbUSDC', 'AaveWETH'],
    '56': []
}