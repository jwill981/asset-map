import type { Asset, AssetsResponse } from "../types";

const ASSETS_API_URL = "https://www.enterprise-kc.com/api/globe/points";

export async function fetchAssets(): Promise<Asset[]> {
  const response = await fetch(ASSETS_API_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load assets (${response.status}).`);
  }

  const data: AssetsResponse = await response.json();
  return data.data;
}
