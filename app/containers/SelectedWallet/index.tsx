"use client";

import Wallet from "@/app/components/Wallet";
import { WalletsContext } from "@/app/contexts/Wallets.context";
import { useContext, useEffect, useMemo } from "react";

export default function SelectedWallet() {
  const { openWallet } = useContext(WalletsContext);

  return (
    <section id="balance" className="space-y-2 pl-2 h-full w-full">
      {!openWallet && (
        <h2 className="text-text-light">
          Select a wallet on the menu to check your balance!
        </h2>
      )}
      {!!openWallet && <Wallet wallet={openWallet} />}
    </section>
  );
}
