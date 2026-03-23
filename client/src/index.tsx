import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import OpenlayersPage from "./pages/openlayers/OpenlayersPage.tsx";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import Header from "./Header.tsx";
import MaplibrePage from "./pages/maplibre/MaplibrePage.tsx";
import SpatialAnalysisPage from "./pages/spatialanalysis/SpatialAnalysisPage.tsx";
import GeoTIFFPage from "./pages/geotiff/GeoTIFFPage.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/openlayers" replace />} />
        <Route path="openlayers" element={<OpenlayersPage />} />
        <Route path="maplibre" element={<MaplibrePage />} />
        <Route path="spatialanalysis" element={<SpatialAnalysisPage />} />
        <Route path="geotiff" element={<GeoTIFFPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
