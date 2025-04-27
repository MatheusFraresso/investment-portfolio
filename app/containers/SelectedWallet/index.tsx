"use client";

import Wallet from "@/components/Wallet";
import { WalletsContext } from "@/contexts/Wallets.context";
import { useContext, useEffect, useMemo } from "react";

export default function SelectedWallet() {
  const { openWallet } = useContext(WalletsContext);

  return (
    <section id="balance" className="space-y-2 pl-2 h-full w-full">
      {!openWallet && (
        <h2 className="text-text-dark">
          Select a wallet on the menu to check your balance!
        </h2>
      )}
      {!!openWallet && <Wallet wallet={openWallet} />}
    </section>
  );
}
