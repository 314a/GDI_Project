import "./OpenlayersPage.css";
import { useState } from "react";
import OpenlayersMap from "./OpenlayersMap.tsx";
import FeatureTable from "../shared_components/FeatureTable.tsx";
import type { KantonFeatureCollection } from "../../types.ts";

// load data
const kantone: KantonFeatureCollection = (await fetch("/kantone.geojson").then((res) =>
  res.json(),
)) as KantonFeatureCollection;

function OpenlayersPage() {
  const [selectedFeatureID, setSelectedFeatureID] = useState<number>();
  return (
    <div id="openlayers-content">
      <OpenlayersMap
        featureCollection={kantone}
        selectedFeatureID={selectedFeatureID}
        setSelectedFeatureID={setSelectedFeatureID}
      />
      <FeatureTable
        features={kantone.features}
        selectedFeatureID={selectedFeatureID}
        setSelectedFeatureID={setSelectedFeatureID}
      />
    </div>
  );
}
export default OpenlayersPage;
