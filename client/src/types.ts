import type { Feature, FeatureCollection, Geometry } from "geojson";

export interface KantonProperties {
  kantonsflaeche: number;
  name: string;
  einwohnerzahl: number;
}

export type KantonFeature = Feature<Geometry, KantonProperties>;
export type KantonFeatureCollection = FeatureCollection<Geometry, KantonProperties>;
