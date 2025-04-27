import { AssetType } from "@/structures/enums/AssetType.enum";

export interface IAsset {
  type: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export function rawToAsset(raw: any): IAsset {
  return {
    type: raw.type,
    symbol: raw.symbol,
    name: raw.name,
    quantity: raw.quantity,
    purchasePrice: raw.purchasePrice,
    currentPrice: raw.currentPrice,
  } as IAsset;
}
