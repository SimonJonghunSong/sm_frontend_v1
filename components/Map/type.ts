export interface MarkerType {
  position: google.maps.LatLngLiteral;
  icon?: string;
}

export interface PolylineType {
  path: google.maps.LatLngLiteral[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}

export interface PolygonType {
  paths: google.maps.LatLngLiteral[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
}

export interface CircleType {
  center: google.maps.LatLngLiteral;
  radius: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
}
