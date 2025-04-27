"use client";

import { NavbarContext } from "@/contexts/Navbar.context";
import { IPortfolio } from "@/structures/DTOs/Portfolio.dto";
import { useContext, useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa6";

interface NavbarProps {
  portfolio: IPortfolio;
}
export default function Navbar({ portfolio: { wallets } }: NavbarProps) {
  const [hide, setHide] = useState<boolean>(false);

  const { selectedWallet, setSelectedWalletName } = useContext(NavbarContext);

  if (wallets.length < 1) return <></>;

  if (hide) return <></>;

  const navbarItems = useMemo(
    () => (
      <div className="space-y-4">
        <div className="flex items-center space-x-3 pl-4">
          <FaWallet size={22} />
          <h3 className="font-semibold">Your Wallets</h3>
        </div>

        {wallets.map((wallet, index) => (
          <div
            key={index}
            onClick={() =>
              selectedWallet === wallet.walletName
                ? setSelectedWalletName(undefined)
                : setSelectedWalletName(wallet.walletName)
            }
            className={`z-10 py-4 pl-8 cursor-pointer  hover:bg-linear-to-r hover:from-green-pastel-light hover:to-green-pastel-lighter hover:rounded-r-full ${
              selectedWallet === wallet.walletName &&
              "bg-linear-to-r from-green-pastel-light bg-green-pastel-lighter rounded-r-full scale-[101%]"
            }`}
          >
            <h2 className="w-full h-full hover:scale-[101%]">
              {wallet.walletName}
            </h2>
          </div>
        ))}
      </div>
    ),
    [wallets, selectedWallet]
  );

  return (
    <nav
      className={`border-r-2 rounded-r-xs border-purple-dark relative min-w-[200px] w-[20vw] h-fit min-h-[100vh] bg-purple-medium space-y-4 shadow-2xl  text-neutral-100 pt-8 pr-4`}
    >
      {navbarItems}
    </nav>
  );
}
