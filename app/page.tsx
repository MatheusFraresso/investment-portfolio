import { getPortfolio } from "@/services/http/Portfolio.service";
import Navbar from "./containers/Navbar";
import { NavbarProvider } from "../contexts/Navbar.context";
import Card from "@/components/Card";
import { WalletsContext, WalletsProvider } from "@/contexts/Wallets.context";
import SelectedWallet from "./containers/SelectedWallet";

export default async function Home() {
  const portfolio = await getPortfolio();

  if (portfolio.wallets.length < 1)
    return (
      <div className="flex justify-center">
        <h1 className="">Portfolio is empty</h1>
      </div>
    );

  return (
    <main className="md:flex md:space-x-5 bg-neutral-950 w-full">
      <NavbarProvider>
        <WalletsProvider wallets={portfolio.wallets}>
          <Navbar portfolio={portfolio} />
          <div className="w-full min-h-full py-8 px-8">
            <Card className="bg-linear-to-br from-neutral-900 to-neutral-700 text-text-light w-full h-full">
              <SelectedWallet />
            </Card>
          </div>
        </WalletsProvider>
      </NavbarProvider>
    </main>
  );
}
