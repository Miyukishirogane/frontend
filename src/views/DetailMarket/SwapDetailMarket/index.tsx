import SwapYT from './SwapYT';
import SwapPT from './SwapPT';
import { usePendleData } from 'src/jotai/pendle/pendle';

export default function SwapDetailMarket() {

    // state jotai
    const { tokenToggle } = usePendleData()

    return (
        <>
            {tokenToggle === 'YT' ? (
                <SwapYT />
            ) : (
                <SwapPT />
            )}
        </>
    )
}
