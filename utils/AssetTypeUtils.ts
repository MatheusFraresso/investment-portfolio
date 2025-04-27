export const assetOrderStrategy = {
  type: 5,
  symbol: 4,
  name: -1,
  quantity: 3,
  purchasePrice: 2,
  currentPrice: 1,
};

export const assetNameStrategy = {
  type: "Type",
  symbol: "Symbol",
  name: "Name",
  quantity: "Quantity",
  purchasePrice: "Purchase price",
  currentPrice: "Current price",
};

export type assetOrderStrategy = keyof typeof assetOrderStrategy;
export type assetNameStrategy = keyof typeof assetNameStrategy;
