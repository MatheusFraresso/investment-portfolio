import { IAsset, rawToAsset } from "./Asset.dto";

export interface IWallet {
  walletName: string;
  currentAmount: number;
  spentAmount: number;
  profitLoss: number;
  assets: IAsset[];
}

export function rawToWallet(raw: any): IWallet {
  const assets = raw?.assets?.map((asset: any) => rawToAsset(asset));

  return {
    walletName: raw.walletName,
    currentAmount: raw.currentAmount,
    spentAmount: raw.spentAmount,
    profitLoss: raw.profitLoss,
    assets,
  } as IWallet;
}
