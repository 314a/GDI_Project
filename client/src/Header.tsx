import { NavLink } from "react-router";
import type { ReactNode } from "react";

interface NavButtonProps {
  path: string;
  children: ReactNode;
}

function NavButton({ path, children }: NavButtonProps) {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        display: "inline-block",
        margin: ".5em 1em",
        color: isActive ? "dodgerblue" : "black",
      })}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  return (
    <>
      <h1>
        4230 Webmapping Beispiele mit
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="./react.svg" className="logo" alt="React logo" />
        </a>
        React
      </h1>
      <h2>
        <NavButton path="openlayers">
          <img src="./OpenLayers_logo.svg" className="logo" alt="OpenLayers logo" />
          OpenLayers
        </NavButton>
        <NavButton path="maplibre">
          <img src="./Maplibre-logo.png" className="logo" alt="MapLibre logo" />
          MapLibre (Reactive)
        </NavButton>
        <NavButton path="spatialanalysis">Spatial Analysis</NavButton>
        <NavButton path="geotiff">Cloud-optimized GeoTIFF</NavButton>
      </h2>
    </>
  );
}
export default Header;
