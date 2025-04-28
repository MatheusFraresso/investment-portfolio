import Asset from "@/app/components/Asset";
import Card from "@/app/components/Card";
import { WalletsContext } from "@/app/contexts/Wallets.context";
import { useContext } from "react";

export default function SelectedAsset() {
  const { openAsset } = useContext(WalletsContext);

  if (!!openAsset)
    return (
      <Card className="text-white bg-purple-medium w-full md:w-[70%] my-5  shadow-2xl text-left">
        <Asset asset={openAsset} />
      </Card>
    );

  return <></>;
}
