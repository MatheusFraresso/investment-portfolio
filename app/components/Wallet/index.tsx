import { IWallet } from "@/structures/DTOs/Wallet.dto";
import { formatCurrency } from "@/utils/StringUtils";
import { useContext, useEffect, useMemo, useState } from "react";
import Card from "../Card";
import { FaChevronRight } from "react-icons/fa6";
import { ChevronRight, ChevronRight2 } from "@deemlol/next-icons";
import Asset from "../Asset";
import { WalletsContext } from "@/app/contexts/Wallets.context";
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
    <div className="md:flex h-full w-full overflow-hidden text-text-light">
      <section
        id="wallet-info"
        className="w-full md:w-[40%] h-full flex pt-[10%]"
      >
        <div className="space-y-6 px-1 w-full ">
          <div className="text-center">
            <h2 className="text-md md:text-lg font-medium w-fit mx-auto rounded-sm p-2 flex items-center space-x-2">
              <div className="size-2 md:size-3 bg-green-pastel-light rounded-full" />
              <span>
                Current: <span>{formatCurrency(currentAmount)}</span>
              </span>
            </h2>
          </div>

          <div className="w-[70%] mx-auto h-[px] bg-neutral-300 rounded-full" />

          <div className="inline-flex basis-20 space-x-2 justify-between w-full text-lg">
            <div className="w-full flex items-center space-x-2">
              <div className="size-2 md:size-3 bg-purple-light rounded-full" />
              <h2 className="w-full font-medium flex text-sm md:text-lg ">
                Spent: {formatCurrency(spentAmount)}
              </h2>
            </div>
            <div className="w-full flex items-center space-x-2">
              <div className="size-2 md:size-3 bg-red-700 rounded-full" />
              <h2 className="w-full font-medium flex text-sm md:text-lg">
                Loss: {formatCurrency(profitLoss)}
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="my-4 w-[85%] h-[2px] mx-auto md:h-[85%] md:w-[2px] md:my-auto bg-neutral-400 rounded-full" />

      <section
        id="assets-info"
        className="w-full md:w-[60%] pt-8 md:space-y-2 h-full"
      >
        {!!assets && (
          <div className="md:flex w-full h-full">
            <div className="w-full md:w-[30%] space-y-4 ">
              <h3 className="w-full text-md md:text-lg text-center">
                Wallet assets:
              </h3>

              {/* Asset list card */}

              <div
                id="assets-list"
                className="flex flex-row md:flex-col overflow-x-scroll md:overflow-hidden md:pr-4 md:space-y-2 md:pl-2 w-full md:mt-10 md:space-x-4"
              >
                {assets.map((asset, index) => (
                  <div
                    className={`cursor-pointer w-full h-fit md:py-2 md:pl-3 mx-3 md:mx-0 ${
                      asset.name === openAsset?.name &&
                      "border-b-3 rounded-md border-purple-light "
                    }`}
                    key={index}
                    onClick={() =>
                      asset.name === openAsset?.name
                        ? setOpenAsset!(undefined)
                        : setOpenAsset!(asset)
                    }
                  >
                    <p
                      className={`whitespace-nowrap text-ellipsis text-sm ${
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
