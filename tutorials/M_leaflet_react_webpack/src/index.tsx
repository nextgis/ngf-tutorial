import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReactNgwMap from '@nextgis/react-ngw-leaflet';
// import ReactNgwMap from '@nextgis/react-ngw-ol';
// import ReactNgwMap from '@nextgis/react-ngw-maplibre-gl';

import type {
  Point,
  Feature,
  Position,
  LineString,
  FeatureCollection,
} from 'geojson';
import type { MapContainerProps } from '@nextgis/react-ngw-map';
import type { VectorLayerAdapter } from '@nextgis/webmap';
import type { NgwMap } from '@nextgis/ngw-map';

// Function to calculate arrow points for visualization
function getArrowPoints(
  end: Position,
  prev: Position,
  length = 1,
  angle = Math.PI / 6,
) {
  // Vector calculations for arrowheads
  const dx = end[0] - prev[0];
  const dy = end[1] - prev[1];
  const theta = Math.atan2(dy, dx);

  // Calculating positions for two sides of the arrowhead
  const arrowPoint1 = [
    end[0] - length * Math.cos(theta - angle),
    end[1] - length * Math.sin(theta - angle),
  ];
  const arrowPoint2 = [
    end[0] - length * Math.cos(theta + angle),
    end[1] - length * Math.sin(theta + angle),
  ];

  return [arrowPoint1, arrowPoint2];
}

// Function to calculate a control point for the bezier curve
function getControlPoint(start: Position, end: Position, bend = 0.5): Position {
  // Calculating midpoint
  const midPoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  // Offset for control point
  const offsetX = bend * distance * Math.sin(angle);
  const offsetY = bend * distance * -Math.cos(angle);

  return [midPoint[0] + offsetX, midPoint[1] + offsetY];
}

// Function to generate a series of points forming an arc
function getArcPoints(
  start: Position,
  end: Position,
  controlPoint: Position,
  numPoints = 100,
): Position[] {
  // Generate points along a bezier curve
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x =
      Math.pow(1 - t, 2) * start[0] +
      2 * (1 - t) * t * controlPoint[0] +
      t * t * end[0];
    const y =
      Math.pow(1 - t, 2) * start[1] +
      2 * (1 - t) * t * controlPoint[1] +
      t * t * end[1];
    points.push([x, y]);
  }
  return points;
}

// Function to create a LineString feature from coordinates
function createLineFeature(coordinates: Position[]): Feature<LineString> {
  return {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates },
  };
}

function App() {
  const [ngwMap, setNgwMap] = useState<NgwMap>(null);

  const mapOptions: MapContainerProps = {
    id: 'map',
    baseUrl: 'https://demo.nextgis.com',
    osm: true,
    resources: [
      {
        resource: 1733,
        id: 'cafe',
        fit: true,
        adapterOptions: { limit: 10 },
      },
    ],
    whenCreated: (readyNgwMap) => {
      setNgwMap(readyNgwMap);
    },
  };

  // Effect hook to perform operations after the map is created
  useEffect(() => {
    if (ngwMap) {
      // Accessing a specific layer and processing its features
      const points = ngwMap.getLayer('cafe') as VectorLayerAdapter;
      if (points && points.getLayers) {
        const layerItems = points.getLayers();
        const features = layerItems.map(
          (item) => item.feature,
        ) as Feature<Point>[];
        const lines: FeatureCollection<LineString> = {
          type: 'FeatureCollection',
          features: [],
        };

        // Creating lines and arcs between points
        for (let i = 0; i < features.length; i += 2) {
          // Extracting start and end coordinates for each pair of features
          const [start, end]: number[][] = [i, i + 1].map(
            (index) => features[index].geometry.coordinates,
          );

          // Checking if both start and end points exist
          if (start && end) {
            // Calculate control point for bezier curve
            const controlPoint = getControlPoint(start, end);

            // Get points along the arc
            const arc = getArcPoints(start, end, controlPoint);

            // Add line feature representing the arc to the collection
            lines.features.push(createLineFeature(arc));

            // Add arrow heads at the end of the arc if the arc has sufficient length
            if (arc.length > 1) {
              const [arrowLeft, arrowRight] = getArrowPoints(
                arc[arc.length - 1],
                controlPoint,
                0.3, // Length of arrow
              );
              // Add arrow head line features to the collection
              lines.features.push(
                createLineFeature([arrowLeft, end, arrowRight]),
              );
            }
          }
        }

        // Add the line collection as a GeoJSON layer to the map if there are features to add
        if (lines.features.length) {
          ngwMap.addGeoJsonLayer({
            data: lines,
            paint: { color: 'red', opacity: 1, weight: 3 },
          });
        }
      }
    }
  }, [ngwMap]);

  return <ReactNgwMap {...mapOptions}></ReactNgwMap>;
}

const rootNode = document.getElementById('app');
if (rootNode) {
  const root = createRoot(rootNode);
  root.render(<App />);
}
