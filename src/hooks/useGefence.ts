import { useEffect, useState } from "react";
import { delayPromise } from "./useSerial";
import {
  AT_GET_CIRCULAR_GEOFENCE_10_LIST,
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE,
  AT_GET_POLYGON_GEOFENCE_LIST,
} from "./useSerial/constant";
import { SerialPortState } from "../stores/useSerialStore";
import { generateNumberSequence } from "@/src/utils/generateNumberSequence";

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
  isForceFetch?: boolean;
}

const useGefence = ({
  port: propsPort,
  isReady,
  write,
  polygonGeofenceMax,
  circularGeofenceMax,
  imei,
  onAfterFetch,
  isForceFetch,
}: UseGefenceProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const port = propsPort.port;
  useEffect(() => {
    console.log("test ?:::::::", polygonGeofenceMax);


    if (!port?.readable || !port?.writable || !isReady) return;

    if (!polygonGeofenceMax) {
      setIsFetching(true);
      return setIsCircularFetchReady(true);
    }

    if (port.ispolygonfetching) {
      return;
    }

    port.polygonfetchcount = 0;
    port.ispolygonfetching = true;
    port.polygongeofence = "";
    port.polygonmax = Number(polygonGeofenceMax);
    port.onafterpolygongeofence = () => {
      console.log("언제 타나유₩??");

      port.ispolygonfetching = false;

      // 요청 겹치는거 방지
      setTimeout(() => {
        setIsCircularFetchReady(true);
      }, 1000);
      port.polygongeofence = "";
    };

    setIsFetching(true);

    (async () => {
      console.log("polygonGeofenceMax ::::", polygonGeofenceMax);
      console.log(
        "generateNumberSequence ::::",
        generateNumberSequence(polygonGeofenceMax)
      );

      for (const command of generateNumberSequence(polygonGeofenceMax)) {
        await delayPromise(100); // 60ms 지연

        write({
          data: AT_GET_POLYGON_GEOFENCE(imei) + command.join(","),
          port: propsPort,
          writer: propsPort.writer,
        });
      }
    })();
  }, [isForceFetch]);

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

    if (port.iscircularfetching) {
      return;
    }

    port.circularfetchcount = 0;
    port.iscircularfetching = true;
    port.circulargeofence = "";
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
          circularGeofenceMax === 10 || circularGeofenceMax === 255 ? 100 : 200
        ); // 100ms 지연

        write({
          data: command,
          port: propsPort,
          writer: propsPort.writer,
        });
      }
    })();
  }, [isForceFetch, isCircularFetchReady]);

  return { isFetching };
};

export default useGefence;
