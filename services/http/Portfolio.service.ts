import { IPortfolio, rawToPortfolio } from "@/structures/DTOs/Portfolio.dto";
import { recordError } from "@/utils/Error.utils";

async function getPortfolio(): Promise<IPortfolio> {
  try {
    const response = await fetch("http://localhost:3000/mock/portfolio.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return rawToPortfolio(data);
  } catch (error: any) {
    await recordError(error);
    throw error;
  }
}

export { getPortfolio };
