"use client";

import { IWallet } from "@/structures/DTOs/Wallet.dto";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavbarContext } from "./Navbar.context";
import { IAsset } from "@/structures/DTOs/Asset.dto";

interface IWalletContext {
  wallets: IWallet[];
  openWallet?: IWallet;
  openAsset?: IAsset;
  setOpenAsset?: (asset?: IAsset) => void;
}

interface IWalletProvider {
  wallets: IWallet[];
  children: ReactNode;
}

export const WalletsContext = createContext({} as IWalletContext);

export function WalletsProvider({ wallets, children }: IWalletProvider) {
  const { selectedWallet } = useContext(NavbarContext);

  const [openAsset, setOpenAssetState] = useState<IAsset>();

  function setOpenAsset(asset?: IAsset) {
    if (!asset) {
      window.localStorage.removeItem("open-asset");
      setOpenAssetState(undefined);
      return;
    }

    if (asset.name === openAsset?.name) {
      setOpenAssetState(undefined);
      window.localStorage.removeItem("open-asset");
    } else {
      setOpenAssetState(asset);
      window.localStorage.setItem("open-asset", asset.name);
    }
  }

  const openWallet = useMemo(
    () => wallets.find((wlt) => wlt.walletName === selectedWallet),
    [selectedWallet]
  );

  useEffect(() => {
    setOpenAssetState(undefined);

    if (!openWallet || openWallet.assets?.length < 1 || !window?.localStorage)
      return;

    const localStorageAsset = window.localStorage.getItem("open-asset");

    if (!localStorageAsset) return;

    const asset = openWallet.assets.find(
      (asset) => asset.name === localStorageAsset
    );

    if (!!asset) {
      setOpenAsset(asset);
    }
  }, [openWallet]);

  return (
    <WalletsContext.Provider
      value={{ wallets, openWallet, openAsset, setOpenAsset }}
    >
      {children}
    </WalletsContext.Provider>
  );
}
