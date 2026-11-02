import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Asset } from "../types";

type MapProps = {
  assets: Asset[];
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
};

const markerIcon = L.divIcon({
  className: "asset-marker",
  html: '<span class="marker-dot"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

function MapView({ assets, selectedAsset }: Pick<MapProps, "assets" | "selectedAsset">) {
  const map = useMap();

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
        duration: 0.75,
      });
    }
  }, [map, selectedAsset]);

  return null;
}

export function Map({ assets, selectedAsset, onSelectAsset }: MapProps) {
  return (
    <div className="asset-map">
      <MapContainer
        center={[40.7532, -73.9822]}
        zoom={11}
        className="map-canvas"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapView assets={assets} selectedAsset={selectedAsset} />
        {assets.map((asset) => (
          <Marker
            key={asset.pointId}
            position={[asset.lat, asset.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => onSelectAsset(asset),
            }}
          >
            <Popup>{asset.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
