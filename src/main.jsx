import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { AssetMapEditor } from "./components/AssetMapEditor";

function App() {
  return (
    <main>
      <h1>Asset Map</h1>
      <AssetMapEditor />
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
