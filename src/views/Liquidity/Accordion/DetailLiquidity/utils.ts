import BigNumber from "bignumber.js";
import { BN } from "src/utils";

export const maxAmountAddLp = (balance: BigNumber, inputAmount: BigNumber, slippage: number) => {
    if(inputAmount.isGreaterThanOrEqualTo(balance)) {
        return inputAmount
    }

    return inputAmount.times(BN(1).plus(BN(slippage).div(100)))
}
