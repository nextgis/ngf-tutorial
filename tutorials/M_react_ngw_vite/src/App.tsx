import {
  Box,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from "@mui/material";
import NgwConnector from "@nextgis/ngw-connector";
import { MapControl, ReactNgwLayer } from "@nextgis/react-ngw-map";
import ReactNgwMap from "@nextgis/react-ngw-ol";
import { useMemo, useState } from "react";

import { useResource } from "./hooks/useResource";

import type { NgwLayerAdapterType } from "@nextgis/ngw-kit";
import type { Operation, PropertyFilter } from "@nextgis/properties-filter";
import type {
  FeatureLayerFieldDatatype,
  FeatureLayerFieldRead,
} from "@nextgisweb/feature-layer/type/api";

import "ol/ol.css";
import "@nextgis/ol-map-adapter/lib/ol-map-adapter.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const BASE_URL = "https://demo.nextgis.com";
const RESOURCE_ID = 10048;

const OPERATORS: { value: Operation; label: string }[] = [
  { value: "eq", label: "=" },
  { value: "ne", label: "!=" },
  { value: "gt", label: ">" },
  { value: "ge", label: ">=" },
  { value: "lt", label: "<" },
  { value: "le", label: "<=" },
];

type FilterOperator = (typeof OPERATORS)[number]["value"];

function isNumericDatatype(datatype?: FeatureLayerFieldDatatype) {
  return datatype === "INTEGER" || datatype === "BIGINT" || datatype === "REAL";
}

function isUnsupportedDatatype(datatype?: FeatureLayerFieldDatatype) {
  return datatype === "DATE" || datatype === "TIME" || datatype === "DATETIME";
}

function parseFieldValue(
  field: FeatureLayerFieldRead | undefined,
  value: string,
): string | number | undefined {
  if (!field || value === "") {
    return undefined;
  }

  if (isNumericDatatype(field.datatype)) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return value;
}

export default function App() {
  const [adapter, setAdapter] = useState<NgwLayerAdapterType>("GEOJSON");
  const [value, setValue] = useState("yes");
  const [selectedField, setSelectedField] = useState("BUILDING");
  const [selectedOperator, setSelectedOperator] =
    useState<FilterOperator>("ne");

  const connector = useMemo(() => new NgwConnector({ baseUrl: BASE_URL }), []);

  const { fields, loading } = useResource(RESOURCE_ID, {
    connector,
  });

  const availableFields = useMemo(
    () => fields.filter((field) => field.keyname),
    [fields],
  );

  const currentField = useMemo(
    () => availableFields.find((field) => field.keyname === selectedField),
    [availableFields, selectedField],
  );

  const parsedValue = useMemo(
    () => parseFieldValue(currentField, value),
    [currentField, value],
  );

  const filter: PropertyFilter | undefined = useMemo(() => {
    if (!selectedField || parsedValue === undefined) {
      return undefined;
    }

    return [selectedField, selectedOperator, parsedValue];
  }, [parsedValue, selectedField, selectedOperator]);

  const filters = useMemo(() => {
    return filter ? [filter] : undefined;
  }, [filter]);

  const isUnsupportedField = isUnsupportedDatatype(currentField?.datatype);
  const isNumericField = isNumericDatatype(currentField?.datatype);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
        <ReactNgwMap
          osm
          baseUrl={BASE_URL}
          style={{ width: "100%", height: "100%" }}
        >
          {!loading && (
            <>
              <ReactNgwLayer
                resource={RESOURCE_ID}
                fit
                adapter={adapter}
                filters={filters}
              />

              <MapControl position="top-right">
                <Paper
                  elevation={3}
                  sx={{
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    minWidth: 260,
                  }}
                >
                  <Typography variant="body2">Select layer adapter</Typography>

                  <ToggleButtonGroup
                    value={adapter}
                    exclusive
                    size="small"
                    onChange={(_, value: NgwLayerAdapterType | null) => {
                      if (value) {
                        setAdapter(value);
                      }
                    }}
                  >
                    <ToggleButton value="GEOJSON">GeoJSON</ToggleButton>
                    <ToggleButton value="TILE">Tile</ToggleButton>
                    <ToggleButton value="IMAGE">Image</ToggleButton>
                  </ToggleButtonGroup>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Simple filter
                  </Typography>

                  <FormControl size="small" fullWidth disabled={loading}>
                    <InputLabel id="field-label">Field</InputLabel>
                    <Select
                      labelId="field-label"
                      value={selectedField}
                      label="Field"
                      onChange={(e) => {
                        setSelectedField(e.target.value);
                        setValue("");
                      }}
                    >
                      {availableFields.map((field) => (
                        <MenuItem key={field.keyname} value={field.keyname}>
                          {field.display_name || field.keyname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    size="small"
                    fullWidth
                    disabled={!selectedField || loading || isUnsupportedField}
                  >
                    <InputLabel id="operator-label">Operator</InputLabel>
                    <Select
                      labelId="operator-label"
                      value={selectedOperator}
                      label="Operator"
                      onChange={(e) =>
                        setSelectedOperator(e.target.value as FilterOperator)
                      }
                    >
                      {OPERATORS.map((operator) => (
                        <MenuItem key={operator.value} value={operator.value}>
                          {operator.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {!selectedField && (
                    <TextField size="small" label="Value" disabled />
                  )}

                  {selectedField && isUnsupportedField && (
                    <TextField
                      size="small"
                      label="Value"
                      value=""
                      disabled
                      helperText="DATE / TIME / DATETIME пока не поддерживаются"
                    />
                  )}

                  {selectedField && !isUnsupportedField && (
                    <TextField
                      size="small"
                      label="Value"
                      type={isNumericField ? "number" : "text"}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      disabled={!selectedField}
                    />
                  )}
                </Paper>
              </MapControl>
            </>
          )}
        </ReactNgwMap>
      </Box>
    </ThemeProvider>
  );
}
