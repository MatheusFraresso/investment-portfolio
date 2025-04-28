"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface INavbarContext {
  selectedWallet: string | undefined;
  setSelectedWalletName: (name: string | undefined) => void;
}

interface INavbarProvider {
  children: ReactNode;
}

export const NavbarContext = createContext({} as INavbarContext);

export function NavbarProvider({ children }: INavbarProvider) {
  if (typeof window === "undefined") return;

  const [selectedWallet, setSelectedWallet] = useState<string>();

  function setSelectedWalletName(wallet: string | undefined) {
    setSelectedWallet(wallet);

    if (!wallet) {
      window.localStorage.removeItem("open-wallet");
      window.localStorage.removeItem("open-asset");
    } else {
      window.localStorage.setItem("open-wallet", wallet);
    }
  }

  useEffect(() => {
    if (!window?.localStorage) return;

    const localStorageWallet = window.localStorage.getItem("open-wallet");

    if (!localStorageWallet) return;

    setSelectedWallet(localStorageWallet);
  }, []);

  return (
    <NavbarContext.Provider
      value={{ setSelectedWalletName, selectedWallet: selectedWallet }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
