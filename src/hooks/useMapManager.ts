import { useCallback, useRef, useState } from "react";

type LatLng = {
  lat: number;
  lng: number;
};

export type PolygonData = {
  id: number;
  path: LatLng[];
};

type CircleData = {
  id: number;
  center: LatLng;
  radius: number;
};

type MapManagerHook = {
  shapesRef: React.MutableRefObject<google.maps.drawing.OverlayCompleteEvent[]>;
  polygons: PolygonData[];
  circles: CircleData[];
  addPolygon: (polygon: PolygonData) => void;
  addCircle: (circle: CircleData) => void;
  removeCircle: (circleId: number) => void;
  removePolygon: (polygonId: number) => void;
  removePolygonPoint: (polygon: PolygonData, index: number) => void;
  updateCircleCenter: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  updatePolygonPoint: (
    polygonId: number,
    pointIndex: number,
    newLat: number,
    newLng: number
  ) => void;
  updateCircleRadius: (circleId: number, newRadius: number) => void;
  completeOverlay: (e: google.maps.drawing.OverlayCompleteEvent) => void;
  registerEditableHandlers: () => void;
  setPolygons: (polygonData: PolygonData[]) => void;
  setCircles: (circleData: CircleData[]) => void;
};

export const useMapManager = (_mapId?: string): MapManagerHook => {
  const shapesRef = useRef<google.maps.drawing.OverlayCompleteEvent[]>([]);
  const [polygons, setPolygons] = useState<PolygonData[]>([]);
  const [circles, setCircles] = useState<CircleData[]>([]);

  const addPolygon = (polygon: PolygonData) => {
    setPolygons((prevPolygons) => [...prevPolygons, polygon]);
  };

  const addCircle = (circle: CircleData) => {
    setCircles((prevCircles) => [...prevCircles, circle]);
  };

  const removeCircle = (circleId: number) => {
    const circle = shapesRef.current[circleId]?.overlay as google.maps.Circle;
    if (circle) {
      circle.setMap(null);
      setCircles((prevCircles) =>
        prevCircles.filter((prevCircle) => prevCircle.id !== circleId)
      );
      delete shapesRef.current[circleId];
    }
  };

  const removePolygon = (polygonId: number) => {
    const polygon = shapesRef.current[polygonId]
      ?.overlay as google.maps.Polygon;
    if (polygon) {
      polygon.setMap(null);
      setPolygons((prevPolygons) =>
        prevPolygons.filter(({ id }) => id !== polygonId)
      );
      delete shapesRef.current[polygonId];
    }
  };

  const removePolygonPoint = useCallback(
    (polygon: PolygonData, index: number) => {
      const newPoints = polygon.path.filter((_, i) => i !== index);
      setPolygons((prevPolygons) =>
        prevPolygons.map((p) =>
          p.id === polygon.id ? { ...p, path: newPoints } : p
        )
      );
      const polygonShape = shapesRef.current[polygon.id]
        ?.overlay as google.maps.Polygon;
      if (polygonShape) {
        (polygonShape as google.maps.Polygon).getPath().removeAt(index);

        if ((polygonShape as google.maps.Polygon).getPath().getLength() === 0) {
          removePolygon(polygon.id);
        }
      }
    },
    []
  );

  const updateCircleCenter = (
    circleId: number,
    newLat: number,
    newLng: number
  ) => {
    if (circleId >= shapesRef.current.length) return;

    setCircles((prevCircles) =>
      prevCircles.map((c) => {
        if (c.id === circleId) {
          return { ...c, center: { lat: newLat, lng: newLng } };
        }
        return c;
      })
    );

    const circleShape = shapesRef.current[circleId]
      ?.overlay as google.maps.Circle;
    if (circleShape) {
      circleShape.setCenter(new google.maps.LatLng(newLat, newLng));
    }
  };

  const updateCircleRadius = (circleId: number, newRadius: number) => {
    if (circleId >= shapesRef.current.length) return;

    setCircles((prevCircles) =>
      prevCircles.map((c) => {
        if (c.id === circleId) {
          return { ...c, radius: newRadius };
        }
        return c;
      })
    );

    const circleShape = shapesRef.current[circleId]
      ?.overlay as google.maps.Circle;
    if (circleShape) {
      circleShape.setRadius(newRadius);
    }
  };

  const updatePolygonPoint = (
    polygonId: number,
    pointIndex: number,
    newLat: number,
    newLng: number
  ) => {
    if (polygonId >= shapesRef.current.length) return;

    setPolygons((prevPolygons) =>
      prevPolygons.map((polygon) => {
        if (polygon.id === polygonId && polygon.path[pointIndex]) {
          const newPath = [...polygon.path];
          newPath[pointIndex] = {
            ...newPath[pointIndex],
            lat: newLat,
            lng: newLng,
          };
          return { ...polygon, path: newPath };
        }
        return polygon;
      })
    );

    const polygonShape = shapesRef.current[polygonId]
      ?.overlay as google.maps.Polygon;
    if (polygonShape) {
      const path = polygonShape.getPath();
      path.setAt(pointIndex, new google.maps.LatLng(newLat, newLng));
    }
  };

  const registerEditableHandlers = () => {
    shapesRef.current.forEach((shape, index) => {
      if (shape) {
        if (shape.type === google.maps.drawing.OverlayType.POLYGON) {
          const polygon = shape.overlay as google.maps.Polygon;
          const path = polygon.getPath();

          path.addListener("set_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });

          path.addListener("insert_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });

          path.addListener("remove_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });
        } else if (shape.type === google.maps.drawing.OverlayType.POLYLINE) {
          const polyline = shape.overlay as google.maps.Polyline;
          const path = polyline.getPath();

          path.addListener("set_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });

          path.addListener("insert_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });

          path.addListener("remove_at", () => {
            const newPath = path.getArray().map((latLng) => ({
              lat: latLng.lat(),
              lng: latLng.lng(),
            }));
            setPolygons((prevPolygons) =>
              prevPolygons.map((p) =>
                p.id === index ? { ...p, path: newPath } : p
              )
            );
          });
        } else if (shape.type === google.maps.drawing.OverlayType.CIRCLE) {
          const circle = shape.overlay as google.maps.Circle;

          circle.addListener("radius_changed", () => {
            const newRadius = circle.getRadius();
            setCircles((prevCircles) =>
              prevCircles.map((c) =>
                c.id === index ? { ...c, radius: newRadius } : c
              )
            );
          });

          circle.addListener("center_changed", () => {
            const newCenter = circle.getCenter();
            if (newCenter) {
              setCircles((prevCircles) =>
                prevCircles.map((c) =>
                  c.id === index
                    ? {
                        ...c,
                        center: { lat: newCenter.lat(), lng: newCenter.lng() },
                      }
                    : c
                )
              );
            }
          });
        }
      }
    });
  };

  const completeOverlay = useCallback(
    (e: google.maps.drawing.OverlayCompleteEvent) => {
      shapesRef.current.push(e);
      if (e.type === google.maps.drawing.OverlayType.POLYGON) {
        const newPolygon = e.overlay as google.maps.Polygon;
        const newPolygonId = shapesRef.current.length - 1;

        const path = newPolygon.getPath();
        const initialPath: { lat: number; lng: number }[] = [];
        path.forEach((latLng: google.maps.LatLng) => {
          initialPath.push({ lat: latLng.lat(), lng: latLng.lng() });
        });

        addPolygon({ id: newPolygonId, path: initialPath });
      }
      if (e.type === google.maps.drawing.OverlayType.CIRCLE) {
        const newCircle = e.overlay as google.maps.Circle;
        const newCircleId = shapesRef.current.length - 1;

        const center = newCircle.getCenter();
        const radius = newCircle.getRadius();

        addCircle({
          id: newCircleId,
          center: { lat: center?.lat() || 0, lng: center?.lng() || 0 },
          radius,
        });
      }
      registerEditableHandlers();
    },
    []
  );

  return {
    shapesRef,
    polygons,
    circles,
    addPolygon,
    addCircle,
    updateCircleCenter,
    updatePolygonPoint,
    updateCircleRadius,
    removeCircle,
    removePolygon,
    removePolygonPoint,
    completeOverlay,
    registerEditableHandlers,
    setPolygons,
    setCircles,
  };
};
