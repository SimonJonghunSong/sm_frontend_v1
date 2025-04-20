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
import React, { useCallback, useRef, forwardRef } from "react";

import type { CircleType, MarkerType, PolygonType, PolylineType } from "./type";

interface MapComponentProps extends GoogleMapProps {
  apiKey: string;
  center?: google.maps.LatLngLiteral;
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

const MapComponent = forwardRef<google.maps.Map | null, MapComponentProps>(
  (
    {
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
    },
    ref
  ) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries: libraries as unknown as Libraries,
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    // forward ref to expose the mapRef
    const onLoad = useCallback(
      (map: google.maps.Map) => {
        mapRef.current = map;

        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          map.setCenter(center || currentLocation);
        });

        if (!ref) return;
        if (typeof ref === "function") {
          ref(map);
        } else {
          ref.current = map;
        }
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
              strokeColor: polygon.strokeColor || "#0500FF",
              strokeOpacity: polygon.strokeOpacity,
              strokeWeight: polygon.strokeWeight || 0,
              fillColor: polygon.fillColor || "#0500FF",
              fillOpacity: polygon.fillOpacity || 0.2,
            }}
          />
        ))}
        {circles.map((circle, index) => (
          <Circle
            key={index}
            center={circle.center}
            radius={circle.radius}
            options={{
              strokeColor: circle.strokeColor || "#0500FF",
              strokeOpacity: circle.strokeOpacity,
              strokeWeight: circle.strokeWeight || 0,
              fillColor: circle.fillColor || "#0500FF",
              fillOpacity: circle.fillOpacity || 0.2,
            }}
          />
        ))}
        {!disableDrawing && (
          <DrawingManager
            options={{
              drawingControl,
              polygonOptions: {
                editable: editableDrawing,
                fillColor: "#0500FF",
                fillOpacity: 0.2,
                strokeColor: "#0500FF",
                strokeWeight: 0,
              },
              circleOptions: {
                editable: editableDrawing,
                fillColor: "#0500FF",
                fillOpacity: 0.2,
                strokeColor: "#0500FF",
                strokeWeight: 0,
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
  }
);

export default MapComponent;
