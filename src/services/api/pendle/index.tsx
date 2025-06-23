import axios from 'axios';
import { TAppChainId } from 'src/jotai/wallet/type';
import { apiUrl } from 'src/services/apiUrl';
import { Address } from 'viem';

export type TMarketRawData = {
    impliedAPY: string[];
    ptToAsset: string[];
    ytToAsset: string[];
    timestamp: string[]
};


type TInnerStructure = {
    impliedAPY: Record<string, string>;
    ptToAsset: Record<string, string>;
    ytToAsset: Record<string, string>;
    timestamp: Record<string, string>
};

type TResponseMarketData = Record<string, TInnerStructure>;

export async function getListMarketInfoChainId(chainId: TAppChainId, address: Address): Promise<TMarketRawData> {
    try {
        const response = await axios.get(apiUrl.getListMarketInfo(chainId, address));

        const data = response.data as TResponseMarketData;

        const marketData: TMarketRawData = transformData(address, data);

        return (
            {
                impliedAPY: marketData.impliedAPY,
                ptToAsset: marketData.ptToAsset,
                ytToAsset: marketData.ytToAsset,
                timestamp: marketData.timestamp
            }
        )

    } catch (err) {
        console.log(err);
        return (
            {
                impliedAPY: [],
                ptToAsset: [],
                ytToAsset: [],
                timestamp: []
            }
        )
    }
}

// Transform function
const transformData = (address: Address, data: TResponseMarketData): TMarketRawData => {
    // Extract data
    const impliedAPY: string[] = Object.values(data[address].impliedAPY);
    const ptToAsset: string[] = Object.values(data[address].ptToAsset);
    const ytToAsset: string[] = Object.values(data[address].ytToAsset);
    const timestamp: string[] = Object.keys(data[address].impliedAPY);

    // Return transformed data
    return {
        impliedAPY,
        ptToAsset,
        ytToAsset,
        timestamp
    };
};

// * ####################################################################################################################
