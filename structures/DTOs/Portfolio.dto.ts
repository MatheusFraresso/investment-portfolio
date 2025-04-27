import { IAsset } from "./Asset.dto";
import { rawToWallet, IWallet } from "./Wallet.dto";

export interface IPortfolio {
  wallets: IWallet[];
}

export function rawToPortfolio(raw: any): IPortfolio {
  return {
    wallets: raw.map((wallet: any) => rawToWallet(wallet)),
  } as IPortfolio;
}
