import { useEffect } from "react";
import L, { type LeafletMouseEvent } from "leaflet";
import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Asset } from "../types";
import { AssetPopup } from "./AssetPopup";
import ksMoBoundaries from "../data/ks-mo.json";
import type { FeatureCollection } from "geojson";

type MapProps = {
  assets: Asset[];
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
  onCreateAssetAt: (lat: number, lng: number) => void;
};

const getMarkerIcon = (color: string) =>
  L.divIcon({
    className: "asset-marker",
    html: `<span class="marker-dot" style="background-color: ${color}"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

function MapView({
  assets,
  selectedAsset,
  onCreateAssetAt,
}: Pick<MapProps, "assets" | "selectedAsset" | "onCreateAssetAt">) {
  const map = useMap();

  useEffect(() => {
    const handleContextMenu = (event: LeafletMouseEvent) => {
      event.originalEvent.preventDefault();
      onCreateAssetAt(event.latlng.lat, event.latlng.lng);
    };

    map.on("contextmenu", handleContextMenu);
    return () => {
      map.off("contextmenu", handleContextMenu);
    };
  }, [map, onCreateAssetAt]);

  useEffect(() => {
    if (assets.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(
      assets.map((asset) => [asset.lat, asset.lng]),
    );
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
  }, [assets, map]);

  useEffect(() => {
    if (selectedAsset) {
      map.flyTo([selectedAsset.lat, selectedAsset.lng], 15, {
        duration: 0.25,
      });
    }
  }, [map, selectedAsset]);

  return null;
}

export function Map({
  assets,
  selectedAsset,
  onSelectAsset,
  onCreateAssetAt,
}: MapProps) {
  const stateBoundaries = ksMoBoundaries as FeatureCollection;

  return (
    <div className="asset-map">
      <MapContainer
        center={[39.0997, -94.5786]}
        zoom={9}
        className="map-canvas"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapView
          assets={assets}
          selectedAsset={selectedAsset}
          onCreateAssetAt={onCreateAssetAt}
        />
        <GeoJSON
          data={stateBoundaries}
          style={{
            color: "#000000",
            weight: 2,
            fillOpacity: 0,
          }}
        />
        {assets.map((asset) => (
          <Marker
            key={asset.pointId}
            position={[asset.lat, asset.lng]}
            icon={getMarkerIcon(asset.pointColor)}
            eventHandlers={{
              click: () => onSelectAsset(asset),
            }}
          >
            <AssetPopup asset={asset} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
