export type Asset = {
  arcColor: string;
  description: string;
  groupId: number;
  groupName: string;
  image: string;
  lat: number;
  link: string;
  lng: number;
  name: string;
  pointColor: string;
  pointId: number;
  state: string;
  types: string[];
};

export type AssetsResponse = {
  data: Asset[];
};

export type MapViewProps = {
  assets: Asset[];
  selectedAsset: Asset | null;
};
