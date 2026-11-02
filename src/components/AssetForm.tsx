import { useState, type FormEvent } from "react";
import type { Asset } from "../types";

type AssetFormProps = {
  asset: Asset | null;
  isCreating: boolean;
  assets: Asset[];
  onCancel: () => void;
  onSave: (asset: Asset) => void;
};

export function AssetForm({
  asset,
  isCreating,
  assets,
  onCancel,
  onSave,
}: AssetFormProps) {
  const nextPointId =
    assets.length === 0
      ? 1
      : Math.max(...assets.map((currentAsset) => currentAsset.pointId)) + 1;

  const [form, setForm] = useState({
    arcColor: asset?.arcColor ?? "",
    description: asset?.description ?? "",
    groupId: String(asset?.groupId ?? ""),
    groupName: asset?.groupName ?? "",
    image: asset?.image ?? "",
    lat: String(asset?.lat ?? ""),
    link: asset?.link ?? "",
    lng: String(asset?.lng ?? ""),
    name: asset?.name ?? "",
    pointColor: asset?.pointColor ?? "",
    pointId: String(asset?.pointId ?? nextPointId),
    state: asset?.state ?? "",
    types: asset?.types.join(", ") ?? "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...form,
      groupId: Number(form.groupId),
      lat: Number(form.lat),
      lng: Number(form.lng),
      pointId: Number(form.pointId),
      types: form.types
        .split(",")
        .map((type) => type.trim())
        .filter(Boolean),
    });
  };

  return (
    <aside className="asset-form-panel" aria-label="Asset form">
      <h2>{isCreating ? "Create asset" : "Edit asset"}</h2>
      <form className="asset-form" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} />
        </label>
        <label>
          Latitude
          <input type="number" step="any" value={form.lat} onChange={(event) => updateField("lat", event.target.value)} required />
        </label>
        <label>
          Longitude
          <input type="number" step="any" value={form.lng} onChange={(event) => updateField("lng", event.target.value)} required />
        </label>
        <label>
          Group name
          <input value={form.groupName} onChange={(event) => updateField("groupName", event.target.value)} />
        </label>
        <label>
          Group ID
          <input type="number" value={form.groupId} onChange={(event) => updateField("groupId", event.target.value)} />
        </label>
        <label>
          Point ID
          <input type="number" value={form.pointId} onChange={(event) => updateField("pointId", event.target.value)} required />
        </label>
        <label>
          State
          <input value={form.state} onChange={(event) => updateField("state", event.target.value)} />
        </label>
        <label>
          Link
          <input type="url" value={form.link} onChange={(event) => updateField("link", event.target.value)} />
        </label>
        <label>
          Image URL
          <input type="url" value={form.image} onChange={(event) => updateField("image", event.target.value)} />
        </label>
        <label>
          Point color
          <input value={form.pointColor} onChange={(event) => updateField("pointColor", event.target.value)} />
        </label>
        <label>
          Arc color
          <input value={form.arcColor} onChange={(event) => updateField("arcColor", event.target.value)} />
        </label>
        <label>
          Types (comma-separated)
          <input value={form.types} onChange={(event) => updateField("types", event.target.value)} />
        </label>
        <div className="form-actions">
          <button type="submit" className="primary-button">Save</button>
          <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </aside>
  );
}
