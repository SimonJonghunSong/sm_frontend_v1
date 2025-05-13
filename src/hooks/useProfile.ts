import { useRef, useState } from "react";
import useSerialStore from "../stores/useSerialStore";
import { delayPromise } from "./useSerial";
import {
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_JSON,
  AT_GET_POLYGON_GEOFENCE_LIST,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "./useSerial/constant";
import { useTransformedConfigData } from "./useTransformConfigData";
import { chunkDataByNumber } from "../functions";
import { fileDownload } from "@/utils/fileDownload";

interface UseProfileType {
  port: SerialPort;
  writer: WritableStreamDefaultWriter<string>;
  imei: string;
  writeSerial: ({
    data,
    port,
    writer,
    callback,
  }: {
    data: string;
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
    callback?: () => void;
  }) => Promise<boolean>;
}

/**
 *
 * @param arr
 * @returns
 * @example createPolygonGeofenceArray(["00#2d0101", "01#210101", "02#160101", "03#310101"]);
 *  결과값 => ['60;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19',
 * '60;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39',
 * '60;40,41,42,43,44',
 * '61;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19',
 * '61;20,21,22,23,24,25,26,27,28,29,30,31,32',
 * '62;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19',
 * '62;20,21',
 * '63;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19',
 * '63;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39',
 * '63;40,41,42,43,44,45,46,47,48']
 */

const createPolygonGeofenceArray = (arr: string[]) => {
  const result = arr.flatMap((item) => {
    // item을 분해해서 index와 polygon 정보를 얻음
    const [index, polygonData] = item.split("#");

    // polygonData에서 앞의 두 자리를 가져와 16진수를 10진수로 변환
    const polygonCount = parseInt(polygonData.slice(0, 2), 16);

    // index로 POLYGON_GEOFENCE_POINTS에서 값을 찾음
    const pointValue = POLYGON_GEOFENCE_POINTS[parseInt(index, 10)];

    // 00부터 polygonCount - 1 까지의 숫자를 쉼표로 연결
    const range = Array.from({ length: polygonCount }, (_, i) =>
      i.toString().padStart(2, "0")
    );

    // 20개씩 자르기 위한 로직
    const chunkedRanges = [];
    for (let i = 0; i < range.length; i += 20) {
      chunkedRanges.push(range.slice(i, i + 20));
    }

    // 잘린 배열 각각에 대해 pointValue를 prefix로 붙임
    return chunkedRanges.map((chunk) => `${pointValue};${chunk.join(",")}`);
  });

  return result;
};

/**
 * 
 * @param data  const data = [
  "RRE;1231231321;60;00#00000000000000;01#00000000000000;02#00000000000000;03#00000000000000;04#00000000000000;05#00000000000000;06#00000000000000;07#00000000000000;08#00000000000000;09#00000000000000;10#00000000000000;11#00000000000000;12#00000000000000;13#00000000000000;14#00000000000000;15#00000000000000;16#00000000000000;17#00000000000000;18#00000000000000;19#00000000000000",
  "RRE;1231231321;60;20#00000000000000;21#00000000000000;22#00000000000000;23#00000000000000;24#00000000000000;25#00000000000000;26#00000000000000;27#00000000000000;28#00000000000000;29#00000000000000;30#00000000000000;31#00000000000000;32#00000000000000;33#00000000000000;34#00000000000000;35#00000000000000;36#00000000000000;37#00000000000000;38#00000000000000;39#00000000000000",
  "RRE;1231231321;61;00#00000000000000;01#00000000000000;02#00000000000000;03#00000000000000;04#00000000000000;05#00000000000000;06#00000000000000;07#00000000000000;08#00000000000000;09#00000000000000;10#00000000000000;11#00000000000000;12#00000000000000;13#00000000000000;14#00000000000000;15#00000000000000;16#00000000000000;17#00000000000000;18#00000000000000;19#00000000000000",
  "RRE;1231231321;61;20#00000000000000;21#00000000000000;22#00000000000000;23#00000000000000;24#00000000000000;25#00000000000000;26#00000000000000;27#00000000000000;28#00000000000000;29#00000000000000;30#00000000000000;31#00000000000000;32#00000000000000;33#00000000000000;34#00000000000000;35#00000000000000;36#00000000000000;37#00000000000000;38#00000000000000;39#00000000000000"
];

 * @param imei 
 * @returns [
  [
    "PLG,PRG;;60;00#00000000000000;01#00000000000000;02#00000000000000;03#00000000000000;04#00000000000000;05#00000000000000;06#00000000000000;07#00000000000000;08#00000000000000;09#00000000000000;10#00000000000000;11#00000000000000;12#00000000000000;13#00000000000000;14#00000000000000;15#00000000000000;16#00000000000000;17#00000000000000;18#00000000000000;19#00000000000000",
    "PLG,PRG;;60;20#00000000000000;21#00000000000000;22#00000000000000;23#00000000000000;24#00000000000000;25#00000000000000;26#00000000000000;27#00000000000000;28#00000000000000;29#00000000000000;30#00000000000000;31#00000000000000;32#00000000000000;33#00000000000000;34#00000000000000;35#00000000000000;36#00000000000000;37#00000000000000;38#00000000000000;39#00000000000000"
  ],
  [
    "PLG,PRG;;61;00#00000000000000;01#00000000000000;02#00000000000000;03#00000000000000;04#00000000000000;05#00000000000000;06#00000000000000;07#00000000000000;08#00000000000000;09#00000000000000;10#00000000000000;11#00000000000000;12#00000000000000;13#00000000000000;14#00000000000000;15#00000000000000;16#00000000000000;17#00000000000000;18#00000000000000;19#00000000000000",
    "PLG,PRG;;61;20#00000000000000;21#00000000000000;22#00000000000000;23#00000000000000;24#00000000000000;25#00000000000000;26#00000000000000;27#00000000000000;28#00000000000000;29#00000000000000;30#00000000000000;31#00000000000000;32#00000000000000;33#00000000000000;34#00000000000000;35#00000000000000;36#00000000000000;37#00000000000000;38#00000000000000;39#00000000000000"
  ]
]
 */
const groupById = (data: string[], imei: string) => {
  const groupedData: { [key: string]: string[] } = {};

  data.forEach((entry) => {
    const [, , id] = entry.split(";");
    if (!groupedData[id]) {
      groupedData[id] = [];
    }

    // PLC,PRG
    groupedData[id].push(entry.replaceAll(`RRE;${imei}`, "PLG,PRG;"));
  });

  return Object.values(groupedData);
};

const DELAY_MS = 100;

const useProfile = ({ port, writer, writeSerial, imei }: UseProfileType) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const {
    setPackageFetchingStart,
    portList,
    getPolygonData: getStorePolygonData,
    getCircularData: getStoreCircularData,
  } = useSerialStore();
  const polygonPointRef = useRef("");

  const currentPort = portList.find(({ port }) => port.imei === imei);
  const { getProfileData } = useTransformedConfigData({
    data: currentPort.packageToJson.synctrak,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  const geofenceMaxCount = currentPort.packageToJson.synctrak.reduce(
    (acc, tab) => {
      const tabsValue = Object.values(tab);

      tabsValue.forEach((item) => {
        if (
          (item as any).find((obj) => obj.info)?.["info"][0].tab_id === "53"
        ) {
          acc.polygonGeofenceMax = (item as any).find((obj) => obj.info)?.[
            "info"
          ][0].max;
        }

        if (
          (item as any).find((obj) => obj.info)?.["info"][0].tab_id === "50"
        ) {
          acc.circularGeofenceMax = (item as any).find((obj) => obj.info)?.[
            "info"
          ][0].max;
        }
      });

      return acc;
    },
    {
      polygonGeofenceMax: 0,
      circularGeofenceMax: 0,
    }
  );
  const polygonGeofenceMax = geofenceMaxCount.polygonGeofenceMax;
  const circularGeofenceMax = geofenceMaxCount.circularGeofenceMax;

  const write = ({ data }: { data: string }) => {
    writeSerial({
      data,
      port,
      writer,
    });
  };

  const getJsonPkg = async ({ onSuccess }: { onSuccess?: () => void }) => {
    const pkgCount = currentPort.jsonPackageCount;

    const commands = Array.from(
      { length: pkgCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );

    setPackageFetchingStart({ imei: port.imei });
    port.isjsonpackagefetching = true;
    port.onafterjsonpacket = () => {
      onSuccess?.();
    };

    for (const command of commands) {
      write({
        data: command,
      });
      await delayPromise(DELAY_MS); // 100ms 지연
    }
  };

  const getPolygonData = async ({ onSuccess }: { onSuccess?: () => void }) => {
    currentPort.port.polygonfetchcount = 0;
    currentPort.port.polygonmax = Number(polygonGeofenceMax);

    if (Number(polygonGeofenceMax) === 0) {
      return onSuccess?.();
    }

    currentPort.port.ispolygonfetching = true;
    currentPort.port.onafterpolygongeofence = () => {
      onSuccess?.();
    };

    for (const command of AT_GET_POLYGON_GEOFENCE_LIST(imei)) {
      write({
        data: command,
      });
      await delayPromise(DELAY_MS); // 300ms 지연
    }
  };

  const getCircularData = async ({ onSuccess }: { onSuccess?: () => void }) => {
    console.log("circularGeofenceMax::::::::::::", circularGeofenceMax);
    if (Number(circularGeofenceMax) === 0) {
      console.log("circularGeofenceMax", circularGeofenceMax);
      return onSuccess?.();
    }

    currentPort.port.circularfetchcount = 0;
    currentPort.port.iscircularfetching = true;
    currentPort.port.circlemax = Number(circularGeofenceMax);

    currentPort.port.onaftercirculargeofence = () => {
      onSuccess?.();
    };

    for (const command of circularGeofenceMax === "255"
      ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(imei)
      : AT_GET_CIRCULAR_GEOFENCE_999_LIST(imei)) {
      write({
        data: command,
      });
      await delayPromise(DELAY_MS); // 10ms 지연
    }
  };

  const getPolygonPointData = async ({
    onSuccess,
  }: {
    onSuccess?: () => void;
  }) => {
    if (Number(polygonGeofenceMax) === 0) {
      return onSuccess?.();
    }

    const polygonGeofence = getStorePolygonData({ imei });
    const validPolygon = polygonGeofence.filter((polygon) => {
      const [number, value] = polygon.split("#");
      return value.substring(0, 2) !== "00";
    });
    const polygonPointReqList = createPolygonGeofenceArray(validPolygon);

    if (polygonPointReqList.length === 0) {
      onSuccess();
    }

    port.ispolygonpointfetching = true;
    port.polygonhandler = (polygonPointBuffer) => {
      polygonPointRef.current += polygonPointBuffer;

      if (
        polygonPointBuffer.includes(CR) &&
        polygonPointReqList.length ===
          polygonPointRef.current.split(CR).length - 1
      ) {
        onSuccess?.();
      }
    };

    for (const command of polygonPointReqList) {
      write({
        data: `AT^REQ;${imei};${command}`,
      });
      await delayPromise(DELAY_MS); // 10ms 지연
    }
  };

  // Polygon 데이터를 Promise로 처리
  const getPolygonDataWithPromise = () => {
    return new Promise<void>((resolve) => {
      getPolygonData({
        onSuccess: () => {
          port.ispolygonfetching = false;
          port.polygongeofence = "";
          resolve(); // Polygon 데이터가 완료되면 resolve 호출
        },
      });
    });
  };

  // Polygon Point 데이터를 Promise로 처리
  const getPolygonPointDataWithPromise = () => {
    return new Promise<void>((resolve) => {
      getPolygonPointData({
        onSuccess: () => {
          port.ispolygonpointfetching = false;
          port.polygonhandler = null;
          resolve(); // Polygon Point 데이터가 완료되면 resolve 호출
        },
      });
    });
  };

  // Circular 데이터를 Promise로 처리
  const getCircularDataWithPromise = () => {
    return new Promise<void>((resolve) => {
      getCircularData({
        onSuccess: () => {
          port.iscircularfetching = false;
          port.circulargeofence = "";
          port.onaftercirculargeofence = null;
          resolve(); // Circular 데이터가 완료되면 resolve 호출
        },
      });
    });
  };

  const getProfileAllData = async (isDownload: boolean = true) => {
    setPercentage(0);
    setIsDownloading(true);
    await getJsonPkg({});
    setPercentage(25);
    await delayPromise(DELAY_MS);

    // Polygon 데이터 가져오기
    await getPolygonDataWithPromise();
    setPercentage(50);
    await delayPromise(DELAY_MS);

    // Polygon Point 데이터 가져오기
    await getPolygonPointDataWithPromise();
    setPercentage(75);
    await delayPromise(DELAY_MS);

    // Circular 데이터 가져오기
    await getCircularDataWithPromise();
    setPercentage(100);
    const profilePartial = getProfileData();

    const circularGeofence = getStoreCircularData({ imei });
    const validCircular = circularGeofence.filter((circle) => {
      const [number, value] = circle.split("#");
      return value !== "NoData";
    });

    const pointResponseArr = groupById(polygonPointRef.current.split(CR), imei)
      .slice(0, -1)
      .filter((group) => !!group)
      .map((point) => {
        const polygonPointId = point[0].split(";")[2];
        const index = POLYGON_GEOFENCE_POINTS.findIndex(
          (v) => v === Number(polygonPointId)
        );
        const polygonGeofence = getStorePolygonData({ imei });
        return [...point, `PLG,PRG;;53;${polygonGeofence[index]}`];
      })
      .flat();

    polygonPointRef.current = ""; // 초기화

    const circleProfileData =
      validCircular.length === 0
        ? []
        : chunkDataByNumber({
            prefix: "CGF,PRG;;",
            target: validCircular.join(";"),
          });

    const text = [
      `MODEL=${port.modelinfo.split("_")[0]}`,
      `VERSION=${
        port.modelinfo.split("_")[port.modelinfo.split("_").length - 1]
      }`,
      ...profilePartial,
      ...pointResponseArr,
      ...circleProfileData,
    ];

    const blob = new Blob([text.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    if (isDownload) {
      fileDownload(
        blob,
        `${port.modelinfo.split("_")[0]}_${
          port.modelinfo.split("_")[port.modelinfo.split("_").length - 1]
        }.profile`
      );
    }

    setIsDownloading(false);

    return text;
  };

  return {
    state: {
      isDownloading,
      percentage,
    },
    func: { getProfileAllData },
  };
};

export default useProfile;
