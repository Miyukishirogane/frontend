export type TPRIVATESALE = {
    tcvPrice: string,
    bondPrice: string,
    terms: {
        buyingTimeStart: string,
        buyingTime: string,
        vestingTimeStart: string,
        vestingTerm: string,
        discountRatio: string,
        maxDebt: string,
        maxPayout: string,
        TGE: string
    },
};

export type TDETAIL = {
    tcvPrice: string,
    bondPrice: string,
    terms: {
        buyingTimeStart: string,
        buyingTime: string,
        vestingTimeStart: string,
        vestingTerm: string,
        discountRatio: string,
        maxDebt: string,
        maxPayout: string,
        TGE: string
    },
    bondInfo: {
        totalBought: string,
        amountClaim: string,
        payout: string,
        vesting: string,
        lastBlock: string,
        pricePaid: stirng,
    },
    totalDebt: string,
    TCV: string,
    received: string,
    withdrawable: string,
}