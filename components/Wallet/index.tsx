import { IWallet } from "@/structures/DTOs/Wallet.dto";
import { formatCurrency } from "@/utils/StringUtils";
import { useContext, useEffect, useMemo, useState } from "react";
import Card from "../Card";
import { FaChevronRight } from "react-icons/fa6";
import { ChevronRight, ChevronRight2 } from "@deemlol/next-icons";
import Asset from "../Asset";
import { WalletsContext } from "@/contexts/Wallets.context";
import SelectedAsset from "@/app/containers/SelectedWallet/containers/SelectedAsset";

interface IWalletProps {
  wallet: IWallet;
  showAssets?: boolean;
}
export default function Wallet({
  wallet: { walletName, assets, profitLoss, currentAmount, spentAmount },
  showAssets = true,
}: IWalletProps) {
  const { setOpenAsset, openAsset } = useContext(WalletsContext);

  return (
    <div className="flex h-full w-full overflow-hidden text-text-light">
      <section id="wallet-info" className="w-[40%] h-full flex pt-[10%]">
        <div className="space-y-6 px-1 w-full">
          <div className="text-center">
            <h2 className="text-lg font-medium w-fit mx-auto rounded-sm p-2 flex items-center space-x-2">
              <div className="size-3 bg-green-pastel-light rounded-full" />
              <span>
                Current: <span>{formatCurrency(currentAmount)}</span>
              </span>
            </h2>
          </div>

          <div className="w-[70%] mx-auto h-[px] bg-neutral-300 rounded-full" />

          <div className="inline-flex basis-20  justify-between w-full text-lg">
            <div className="w-full flex items-center space-x-2">
              <div className="size-3 bg-purple-light rounded-full" />
              <h2 className="w-full font-medium flex  ">
                Spent: {formatCurrency(spentAmount)}
              </h2>
            </div>
            <div className="w-full flex items-center space-x-2">
              <div className="size-3 bg-red-700 rounded-full" />
              <h2 className="w-full font-medium flex">
                Loss: {formatCurrency(profitLoss)}
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[85%] w-[2px] my-auto bg-neutral-400 rounded-full" />

      <section id="assets-info" className="w-[60%] pl-4 pt-8 space-y-2 h-full">
        {!!assets && (
          <div className="flex w-full h-full">
            <div className="w-[30%] space-y-4">
              <h3 className="text-lg">Wallet assets:</h3>

              {/* Asset list card */}

              <div id="assets-list" className="space-y-2 pl-2 w-full mt-10">
                {assets.map((asset, index) => (
                  <div
                    className={`relative cursor-pointer w-full h-fit py-2 pl-3 ${
                      asset.name === openAsset?.name &&
                      " border-l-3 border-purple-light rounded-l-xl"
                    }`}
                    key={index}
                    onClick={() =>
                      asset.name === openAsset?.name
                        ? setOpenAsset!(undefined)
                        : setOpenAsset!(asset)
                    }
                  >
                    <p
                      className={`whitespace-nowrap text-ellipsis ${
                        asset.name === openAsset?.name &&
                        "font-semibold scale-[101%]"
                      }`}
                    >
                      <em>{asset.name}</em>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset info card */}

            <SelectedAsset />
          </div>
        )}
      </section>
    </div>
  );
}
