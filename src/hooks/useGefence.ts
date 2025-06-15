import { useEffect, useState } from "react";
import { delayPromise } from "./useSerial";
import {
  AT_GET_CIRCULAR_GEOFENCE_10_LIST,
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
} from "./useSerial/constant";
import { SerialPortState } from "../stores/useSerialStore";

interface UseGefenceProps {
  port: SerialPortState;
  isReady: boolean;
  write: ({
    data,
    port,
    writer,
  }: {
    data: string;
    port: SerialPortState;
    writer: WritableStreamDefaultWriter<string>;
  }) => Promise<Boolean>;
  polygonGeofenceMax: number;
  circularGeofenceMax: number;
  imei: string;
  onAfterFetch?: () => void;
}

const useGefence = ({
  port: propsPort,
  isReady,
  write,
  polygonGeofenceMax,
  circularGeofenceMax,
  imei,
  onAfterFetch,
}: UseGefenceProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const port = propsPort.port;
  useEffect(() => {
    if (!port?.readable || !port?.writable || !isReady) return;

    if (!polygonGeofenceMax) {
      setIsFetching(true);
      return setIsCircularFetchReady(true);
    }

    port.polygonfetchcount = 0;
    port.ispolygonfetching = true;
    port.polygonmax = Number(polygonGeofenceMax);
    port.onafterpolygongeofence = () => {
      port.ispolygonfetching = false;
      setIsCircularFetchReady(true);
      port.polygongeofence = "";
    };

    setIsFetching(true);

    (async () => {
      for (const command of AT_GET_POLYGON_GEOFENCE_LIST(imei)) {
        await delayPromise(60); // 60ms 지연

        write({
          data: command,
          port: propsPort,
          writer: propsPort.writer,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (!circularGeofenceMax || !isCircularFetchReady) {
      return;
    }

    if (!circularGeofenceMax) {
      setIsFetching(false);
      setIsCircularFetchReady(false);
      onAfterFetch?.();
      return;
    }

    port.circularfetchcount = 0;
    port.iscircularfetching = true;
    port.circlemax = Number(circularGeofenceMax);
    port.onaftercirculargeofence = () => {
      port.iscircularfetching = false;
      setIsFetching(false);
      setIsCircularFetchReady(false);
      port.circulargeofence = "";
      onAfterFetch?.();
    };

    (async () => {
      for (const command of circularGeofenceMax === 10
        ? AT_GET_CIRCULAR_GEOFENCE_10_LIST(imei)
        : circularGeofenceMax === 255
        ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(imei)
        : AT_GET_CIRCULAR_GEOFENCE_999_LIST(imei)) {
        await delayPromise(
          circularGeofenceMax === 10 || circularGeofenceMax === 255 ? 60 : 100
        ); // 100ms 지연

        write({
          data: command,
          port: propsPort,
          writer: propsPort.writer,
        });
      }
    })();
  }, [isReady, port?.readable, port?.writable, isCircularFetchReady]);

  return { isFetching };
};

export default useGefence;
