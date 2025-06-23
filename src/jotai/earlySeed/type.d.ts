export type TEARLYSEED = {
    user?: 'special' | 'trava' | null,
    tcvPrice: string,
    totalDebt: string,
    terms: {
        buyingTimeStart: string,
        buyingTime: string,
        cliffingTimeStart: string,
        cliffingTerm: string,
        vestingTimeStart: string,
        vestingTerm: string,
        discountRatio: string,
        maxDebt: string,
        maxPayout: string,
        TGE: string
    },
};

export type TEARLYSEEDDETAIL = {
    tcvPrice: string,
    totalDebt: string,
    terms: {
        buyingTimeStart: string,
        buyingTime: string,
        cliffingTimeStart: string,
        cliffingTerm: string,
        vestingTimeStart: string,
        vestingTerm: string,
        discountRatio: string,
        maxDebt: string,
        maxPayout: string,
        TGE: string
    },
    getBondInfo?: {
        amountClain: string,
        lastBlock: string,
        payout: string,
        pricePaid: string,
        totalBought: string,
        userLimit: string,
        vesting: string
    },
    getBondInfoTrava?: {
        amountClaim: string,
        isTravaHolder: bloolean,
        lastBlock: string,
        payout: string,
        pricePaid: StaticRange,
        totalBought: string,
        vesting: string
    },
    getPayOut?: string
};