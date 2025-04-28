"use client";

import { NavbarContext } from "@/app/contexts/Navbar.context";
import useScreen from "@/app/hooks/UseScreen";
import { IPortfolio } from "@/structures/DTOs/Portfolio.dto";
import { useContext, useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa6";

interface NavbarProps {
  portfolio: IPortfolio;
}
export default function Navbar({ portfolio: { wallets } }: NavbarProps) {
  const { isMobile } = useScreen();
  const { selectedWallet, setSelectedWalletName } = useContext(NavbarContext);

  if (wallets.length < 1) return <></>;

  const desktopNavbarItems = useMemo(
    () =>
      !isMobile && (
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
    [wallets, selectedWallet, isMobile]
  );

  const mobileNavbarItems = useMemo(
    () =>
      isMobile && (
        <div className="w-full pt-4 overflow-x-scroll">
          <div className="flex items-center justify-center space-x-3 pl-4">
            <FaWallet size={16} />
            <h3 className="font-semibold">Your Wallets</h3>
          </div>
          <div className="flex space-x-2 px-2 justify-between pt-2">
            {wallets.map((wallet, index) => (
              <div
                key={index}
                onClick={() =>
                  selectedWallet === wallet.walletName
                    ? setSelectedWalletName(undefined)
                    : setSelectedWalletName(wallet.walletName)
                }
                className={`${
                  selectedWallet === wallet.walletName &&
                  "flex justify-center bg-linear-to-b from-green-pastel-light pb-2 bg-green-pastel-lighter rounded-t-lg scale-[101%] "
                }`}
              >
                <h2 className="text-sm text-center w-full h-full hover:scale-[101%]">
                  {wallet.walletName}
                </h2>
              </div>
            ))}
          </div>
        </div>
      ),
    [wallets, selectedWallet, isMobile]
  );

  if (isMobile)
    return (
      <div className="w-full  bg-purple-light rounded-b-sm border-b border-b-purple-dark flex">
        {mobileNavbarItems}
      </div>
    );

  return (
    <nav
      className={`border-r-2 rounded-r-xs border-r-purple-dark relative min-w-[200px] w-[20vw] h-fit min-h-[100vh] bg-purple-medium space-y-4 shadow-2xl  text-neutral-100 pt-8 pr-4`}
    >
      {desktopNavbarItems}
    </nav>
  );
}
