import "./SpatialAnalysisPage.css";
import SpatialAnalysisMap from "./SpatialAnalysisMap.tsx";
import { ChangeEvent, useState } from "react";

function SpatialAnalysisPage() {
  const [bufferDistance, setBufferDistance] = useState(50);
  return (
    <div id="spatialanalysis-content">
      <p>
        Roads are a useful proxy for emissions. This example loads the SwissTopo vector tiles
        basemap and uses the included road data to highlight areas that are far away from roads and
        thus likely less affected by traffic emissions.
      </p>
      <p>
        <label>
          Buffer distance around roads in meters:
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBufferDistance(Number(e.target.value));
            }}
            type="number"
            value={bufferDistance}
          />
        </label>
      </p>
      <SpatialAnalysisMap bufferDistance={bufferDistance} />
    </div>
  );
}
export default SpatialAnalysisPage;
