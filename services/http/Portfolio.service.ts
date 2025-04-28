import { IPortfolio, rawToPortfolio } from "@/structures/DTOs/Portfolio.dto";
import { recordError } from "@/services/Error.service";

import portfolioData from "@/public/mock/portfolio.json";

async function getPortfolio(): Promise<IPortfolio> {
  try {
    return rawToPortfolio(portfolioData);
  } catch (error: any) {
    await recordError(error);
    throw error;
  }
}

export { getPortfolio };
