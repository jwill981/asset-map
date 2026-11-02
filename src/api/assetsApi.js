import { mockAssetData } from "../data/mockAssets";

export async function fetchAssets() {
  return mockAssetData.points.map((asset) => ({ ...asset }));
}
