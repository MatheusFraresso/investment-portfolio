import { IAsset } from "@/structures/DTOs/Asset.dto";
import { assetNameStrategy, assetOrderStrategy } from "@/utils/AssetTypeUtils";
import { formatCurrency } from "@/utils/StringUtils";
import { ChevronRight2 } from "@deemlol/next-icons";
import { ReactNode } from "react";

interface IAssetProps {
  asset: IAsset;
}

interface IAssetPropertyProps {
  title: string;
  value: string;
  last?: boolean;
}

function AssetProperty({
  title,
  value,
  last = false,
}: IAssetPropertyProps): ReactNode {
  return (
    <div className="space-y-2">
      <span className="flex space-x-2 items-center">
        <ChevronRight2 className="text-green-pastel-light text-xs" />
        <h2>
          {title}: {value}{" "}
        </h2>
      </span>
      {!last && (
        <div className="bg-purple-darkest h-[3px] rounded-full w-[70%] ml-6" />
      )}
    </div>
  );
}

export default function Asset({ asset }: IAssetProps) {
  return (
    <div className="h-fit space-y-6 pl-2">
      {Object.keys(asset)
        .filter((key) => assetOrderStrategy[key as assetOrderStrategy] > 0)
        .toSorted(
          (a, b) =>
            assetOrderStrategy[a as assetOrderStrategy] -
            assetOrderStrategy[b as assetOrderStrategy]
        )
        .map((assetKey, index) => {
          let typedAssetKey = assetKey as keyof IAsset;

          return (
            <AssetProperty
              title={assetNameStrategy[assetKey as assetNameStrategy]}
              key={index}
              value={
                typedAssetKey === "currentPrice" ||
                typedAssetKey === "purchasePrice"
                  ? formatCurrency(asset[typedAssetKey])
                  : asset[typedAssetKey].toString()
              }
            />
          );
        })}
    </div>
  );
}
