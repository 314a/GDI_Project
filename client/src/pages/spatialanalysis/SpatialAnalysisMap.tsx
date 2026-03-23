import { useCallback, useEffect, useRef } from "react";
import maplibregl, { GeoJSONSource } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import buffer from "@turf/buffer";
import type { Feature, FeatureCollection, Position, Polygon, MultiPolygon } from "geojson";

interface SpatialAnalysisMapProps {
  bufferDistance: number;
}

// FNV-hash over coordinate arrays
function hashCoordinates(coords: Position | Position[] | Position[][] | Position[][][]): number {
  const flattenedCoordinates = (coords as number[]).flat(Infinity) as number[];
  let h = 0x811c9dc5; // FNV offset basis (32-bit)
  for (const n of flattenedCoordinates) {
    h ^= (n * 0x100000) | 0;
    h = Math.imul(h, 0x01000193); // FNV prime (32-bit)
  }
  return h >>> 0; // ensure unsigned
}

function SpatialAnalysisMap({ bufferDistance }: SpatialAnalysisMapProps) {
  // create state ref that can be accessed in callbacks
  const mapRef = useRef<maplibregl.Map | null>(null);
  // cache: road geometry hash → computed buffer feature
  const bufferCache = useRef(new Map<number, Feature<Polygon | MultiPolygon>>());
  const cachedDistance = useRef(0);

  // create reference for event handler so we can setup the event listener once in the
  // initial useEffet and update it later
  const updateRoadBuffers = useCallback(() => {
    if (!bufferDistance || bufferDistance === 0) return;
    const map = mapRef.current;
    if (!map) return;

    // invalidate cache when buffer distance changes
    if (cachedDistance.current !== bufferDistance) {
      bufferCache.current.clear();
      cachedDistance.current = bufferDistance;
    }

    const roads = map.queryRenderedFeatures({ layers: ["road_fill"] });
    const roadsBuffers: Feature<Polygon | MultiPolygon>[] = [];
    let cacheHits = 0;

    const t0 = performance.now();
    for (const road of roads) {
      if (road.geometry.type === "GeometryCollection") continue;
      const key = hashCoordinates(road.geometry.coordinates);
      const cached = bufferCache.current.get(key);
      if (cached) {
        roadsBuffers.push(cached);
        cacheHits++;
        continue;
      }
      const buffered = buffer(road, bufferDistance, { units: "meters" });
      if (buffered) {
        bufferCache.current.set(key, buffered);
        roadsBuffers.push(buffered);
      }
    }
    const dt = performance.now() - t0;
    console.log(
      `Buffer calculation: ${roads.length} roads, ${cacheHits} cache hits, ${roads.length - cacheHits} computed in ${dt.toFixed(1)}ms`,
    );

    const source = map.getSource("roadbuffers");
    if (source instanceof GeoJSONSource) {
      source.setData({
        type: "FeatureCollection",
        features: roadsBuffers,
      } satisfies FeatureCollection);
    }
  }, [bufferDistance]);

  // initialize map on first render
  useEffect(() => {
    // if map already initialised, exit function
    if (mapRef.current) return;
    const map = new maplibregl.Map({
      container: "spatialanalysis-map-container", // html container id
      style: "https://vectortiles.geo.admin.ch/styles/ch.swisstopo.lightbasemap.vt/style.json", //stylesheet location
      center: [7.642323, 47.534655], // starting position
      zoom: 15.5, // starting zoom
      maxBounds: [
        [4, 43],
        [13, 50],
      ],
    });
    mapRef.current = map;
    // buffer roads on load and navigation
    void map.once("load", () => {
      map.addSource("roadbuffers", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "roadbuffers",
        // fill-extrusion because opacity is then rendered on a per layer, not per feature
        // basis, making it much faster and visually more appealing without us having to
        // merge the buffers
        type: "fill-extrusion",
        source: "roadbuffers",
        paint: { "fill-extrusion-color": "#08306B", "fill-extrusion-opacity": 0.5 },
      });
      updateRoadBuffers();
      // update buffers when viewport changes
      map.on("moveend", () => {
        updateRoadBuffers();
      });
    });
  }, [updateRoadBuffers]);

  // update road buffers when buffer distance changes
  useEffect(() => {
    if (mapRef.current?.getSource("roadbuffers")) updateRoadBuffers();
  }, [bufferDistance, updateRoadBuffers]);

  return <div id="spatialanalysis-map-container" />;
}

export default SpatialAnalysisMap;
