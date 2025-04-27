import Asset from "@/components/Asset";
import Card from "@/components/Card";
import { WalletsContext } from "@/contexts/Wallets.context";
import { useContext } from "react";

export default function SelectedAsset() {
  const { openAsset } = useContext(WalletsContext);

  if (!!openAsset)
    return (
      <Card className="text-white bg-purple-medium w-[70%] my-5  shadow-2xl text-left">
        <Asset asset={openAsset} />
      </Card>
    );

  return <></>;
}
