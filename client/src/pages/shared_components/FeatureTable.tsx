import { useMemo } from "react";
import "./FeatureTable.css";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import type { KantonFeature } from "../../types.ts";

interface FeatureRow {
  id: number;
  name: string;
  einwohnerzahl: number;
  flaeche: number;
}

const columns: GridColDef<FeatureRow>[] = [
  { field: "id", type: "number", headerName: "ID" },
  { field: "name", headerName: "Name", width: 120 },
  { field: "einwohnerzahl", headerName: "Einwohnerzahl", width: 170 },
  { field: "flaeche", headerName: "Fläche in ha", width: 160 },
];

interface FeatureTableProps {
  features: KantonFeature[];
  selectedFeatureID: number | undefined;
  setSelectedFeatureID: (id: number | undefined) => void;
}

function FeatureTable({ features, selectedFeatureID, setSelectedFeatureID }: FeatureTableProps) {
  const data = useMemo(() => {
    return features.map((i) => ({
      id: Number(i.id),
      name: i.properties.name,
      einwohnerzahl: i.properties.einwohnerzahl,
      flaeche: i.properties.kantonsflaeche,
    }));
  }, [features]);

  return (
    <div id="featuretable">
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5]}
        keepNonExistentRowsSelected
        filterModel={{ items: [{ field: "id", operator: "=", value: selectedFeatureID }] }}
        rowSelectionModel={
          selectedFeatureID === undefined
            ? undefined
            : { type: "include", ids: new Set([selectedFeatureID]) }
        }
        sortModel={[{ field: "id", sort: "asc" }]}
        onRowSelectionModelChange={(selectionModel: GridRowSelectionModel) => {
          const firstSelected = selectionModel.ids.values().next().value;
          if (firstSelected === undefined) {
            setSelectedFeatureID(undefined);
          } else {
            setSelectedFeatureID(Number(firstSelected));
          }
        }}
      />
    </div>
  );
}

export default FeatureTable;
