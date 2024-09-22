/* eslint-disable react/no-array-index-key */

"use client";

import type { GoogleMapProps, Libraries } from "@react-google-maps/api";
import {
  Circle,
  DrawingManager,
  GoogleMap,
  Marker,
  Polygon,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";

import type { CircleType, MarkerType, PolygonType, PolylineType } from "./type";

interface MapComponentProps extends GoogleMapProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  markers?: MarkerType[];
  polylines?: PolylineType[];
  polygons?: PolygonType[];
  circles?: CircleType[];
  onMarkerClick?: (marker: MarkerType) => void;
  onOverlayComplete?: (e: google.maps.drawing.OverlayCompleteEvent) => void;
  drawingModes?: google.maps.drawing.OverlayType[];
  drawingControl?: boolean;
  editableDrawing?: boolean;
  disableDrawing?: boolean;
}

const libraries = ["drawing"] as const;

const defaultMapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const MapComponent: React.FC<MapComponentProps> = ({
  apiKey,
  center,
  zoom = 8,
  mapTypeId = "roadmap",
  mapContainerStyle = defaultMapContainerStyle,
  options,
  markers = [],
  polylines = [],
  polygons = [],
  circles = [],
  onClick,
  onMarkerClick,
  onZoomChanged,
  onBoundsChanged,
  onOverlayComplete,
  drawingControl = true,
  editableDrawing = false,
  drawingModes = [
    "circle",
    "marker",
    "polygon",
    "polyline",
  ] as google.maps.drawing.OverlayType[],
  disableDrawing = false,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries as unknown as Libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      map.setCenter(center);
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      mapTypeId={mapTypeId}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
      onZoomChanged={onZoomChanged}
      onBoundsChanged={onBoundsChanged}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={marker.icon}
          onClick={() => onMarkerClick && onMarkerClick(marker)}
        />
      ))}
      {polylines.map((polyline, index) => (
        <Polyline
          key={index}
          path={polyline.path}
          options={{
            strokeColor: polyline.strokeColor,
            strokeOpacity: polyline.strokeOpacity,
            strokeWeight: polyline.strokeWeight,
          }}
        />
      ))}
      {polygons.map((polygon, index) => (
        <Polygon
          key={index}
          paths={polygon.paths}
          options={{
            strokeColor: polygon.strokeColor,
            strokeOpacity: polygon.strokeOpacity,
            strokeWeight: polygon.strokeWeight,
            fillColor: polygon.fillColor,
            fillOpacity: polygon.fillOpacity,
          }}
        />
      ))}
      {circles.map((circle, index) => (
        <Circle
          key={index}
          center={circle.center}
          radius={circle.radius}
          options={{
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokeWeight: circle.strokeWeight,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
          }}
        />
      ))}
      {!disableDrawing && (
        <DrawingManager
          options={{
            drawingControl,
            polygonOptions: {
              editable: editableDrawing,
            },
            circleOptions: {
              editable: editableDrawing,
            },
            polylineOptions: {
              editable: editableDrawing,
            },
            drawingControlOptions: {
              drawingModes,
            },
          }}
          onOverlayComplete={onOverlayComplete}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
