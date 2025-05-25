import { useMemo, useState } from "react";
import { fileDownload } from "@/utils/fileDownload";
import { useTransformConfigDataWithOutDevice } from "@/src/hooks/useTransformConfigDataWithOutDevice";
import { generateFilename } from "@/src/utils/profileUtil";
import { getModelDataFromIDB } from "@/utils/idbModelUtil";
import useModelInfoStore from "../stores/useModelInfo";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import {
  convertCircleCoordinatesToHexString,
  convertCoordinatesToHexString,
} from "@/utils/coordinateToHex";
import { POLYGON_GEOFENCE_POINTS } from "./useSerial/constant";

interface UseProfileType {
  modelName: string;
  modelVersion: string;
  data: { [key: string]: any[] }[];
  formData: { [key: string]: any };
}

const useProfileWithoutDevice = ({
  modelName,
  modelVersion,
  data,
  formData,
}: UseProfileType) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { getFwVer, getTargetCountry } = useModelInfoStore();

  const fwVer = useMemo(() => getFwVer(), [getFwVer]);
  const targetCountry = useMemo(() => getTargetCountry(), [getTargetCountry]);

  const { getProfileData } = useTransformConfigDataWithOutDevice({
    data,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  const getProfileAllData = async (
    originData: Record<string, any>[],
    isDownload: boolean = true
  ) => {
    if (!formData) return [];

    setPercentage(0);
    setIsDownloading(true);

    const profilePartial = getProfileData(originData);

    const modelData = await getModelDataFromIDB(
      modelName,
      fwVer,
      targetCountry
    );

    const circularGeofenceObj = originData.find(
      (item) => item["Circular Geofence"]
    );
    const polygonGeofenceObj = originData.find(
      (item) => item["Polygon Geofence"]
    );

    const circularGeofenceArray =
      circularGeofenceObj?.["Circular Geofence"] || [];
    const polygonGeofenceArray = polygonGeofenceObj?.["Polygon Geofence"] || [];

    const circularGeofenceKeys: string[] = (circularGeofenceArray || []).map(
      (item) => Object.keys(item)[0]
    );

    const polygonGeofenceInfo: {
      [key: string]: { [key: string]: string[] };
    }[] = polygonGeofenceArray
      .find((item) => Object.keys(item)[0] === "Set Geofence Parameter")
      ?.["Set Geofence Parameter"].find(
        (item) => Object.keys(item)[0] === "sub"
      )?.["sub"];

    const polygonGeofenceKeys = (polygonGeofenceInfo || []).map(
      (object) => Object.keys(object)[0]
    );

    const circularGeofence = modelData.geofence.circular;
    const polygonGeofence = modelData.geofence.polygon;

    const circularGeofenceProfileList = circularGeofence.map(
      ({
        id,
        latitude,
        longitude,
        distance,
        enterAlert,
        exitAlert,
        outputActive,
        outputActiveDelay,
        outputKeepActive,
        buzzerSpeedLimit,
        antiJamming,
      }) => {
        const circleIndex = findCircleIndexByNumber(id - 1);

        const coordinateToHexString = convertCircleCoordinatesToHexString({
          lat: latitude,
          lng: longitude,
          radius: distance,
        });

        const enterAlertHexString = enterAlert ? "01" : "00";
        const exitAlertHexString = exitAlert ? "01" : "00";

        const getOutputActiveHexString = () => {
          if (
            !formData["9001"] ||
            formData["9001"].realValue === "00" ||
            !circularGeofenceKeys.includes("OUT_ACT")
          )
            return "";

          if (outputActive === "00") return "00";

          if (outputKeepActive) {
            if (outputActive === "01") return "06";
            if (outputActive === "02") return "07";
            if (outputActive === "03") return "08";
            if (outputActive === "04") return "09";
            if (outputActive === "05") return "0A";
          }

          return outputActive;
        };

        const getOutputActiveDelayHexString = () => {
          if (
            !formData["9001"] ||
            formData["9001"].realValue === "00" ||
            !circularGeofenceKeys.includes("OUT_ACT_DELAY")
          )
            return "";
          return Math.floor(Number(outputActiveDelay) * 1000000)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();
        };

        const getBuzzerSpeedLimitHexString = () => {
          if (
            !formData["9002"] ||
            formData["9002"].realValue === "00" ||
            !circularGeofenceKeys.includes("BUZZER_SPEED_LIMIT")
          )
            return "";

          if (
            circularGeofenceKeys.includes("SPEED_2") &&
            circularGeofenceKeys.includes("SPEED_1")
          ) {
            return (
              Math.floor(Number(buzzerSpeedLimit) * 1000000)
                .toString(16)
                .padStart(8, "0")
                .toUpperCase() +
              Math.floor(Number(buzzerSpeedLimit) * 1000000)
                .toString(16)
                .padStart(8, "0")
                .toUpperCase() +
              "00" // 01로 하면 무조건 에러 남
            );
          }

          return (
            Math.floor(Number(buzzerSpeedLimit) * 1000000)
              .toString(16)
              .padStart(8, "0")
              .toUpperCase() + "00" // 01로 하면 무조건 에러 남
          );
        };

        const getSpeedLimitDebounceHexString = () => {
          if (
            !formData["9002"] ||
            formData["9002"].realValue === "00" ||
            !circularGeofenceKeys.includes("SPEED_LIMIT_DEBOUNCE")
          )
            return "";

          return "0000"; // 01로 하면 무조건 에러 남
        };

        const getAntiJammingHexString = () => {
          if (
            !circularGeofenceKeys.includes("ANTI_JAM") ||
            !formData["9002"] ||
            formData["9002"].realValue === "00"
          )
            return "";
          return antiJamming ? "01" : "00";
        };

        const enterExitHexString = `${enterAlertHexString}${exitAlertHexString}`;
        const outputActiveHexString = getOutputActiveHexString();
        const outputActiveDelayHexString = getOutputActiveDelayHexString();
        const buzzerSpeedLimitHexString = getBuzzerSpeedLimitHexString();
        const antiJammingHexString = getAntiJammingHexString();
        const speedLimitDebounceHexString = getSpeedLimitDebounceHexString();

        const restString = `CGF,PRG;;${circleIndex};${coordinateToHexString}${enterExitHexString}${outputActiveHexString}${outputActiveDelayHexString}${buzzerSpeedLimitHexString}${antiJammingHexString}${speedLimitDebounceHexString}`;

        return restString;
      }
    );

    const polygonGeofenceProfileList = polygonGeofence.map(
      ({
        id,
        enterAlert,
        exitAlert,
        buzzerSpeedLimit,
        speedLimitDebounce,
        coordinates,
      }) => {
        const pointId = POLYGON_GEOFENCE_POINTS[id - 1];
        const coordinateToHexString =
          convertCoordinatesToHexString(coordinates);

        const enterAlertHexString = enterAlert ? "01" : "00";
        const exitAlertHexString = exitAlert ? "01" : "00";
        const enterExitHexString = `${enterAlertHexString}${exitAlertHexString}`;

        const isPolygonSpeedLimitDisabled =
          !formData["9000"] || formData["9000"]?.realValue === "00";

        const buzzerSpeedLimitHex = Math.floor(
          Number(buzzerSpeedLimit) * 1000000
        )
          .toString(16)
          .padStart(8, "0")
          .toUpperCase();

        const speedLimitDebounceHex = Math.floor(Number(speedLimitDebounce))
          .toString(16)
          .padStart(4, "0")
          .toUpperCase();

        const getPolygonSpeedLimitHex =
          !isPolygonSpeedLimitDisabled &&
          polygonGeofenceKeys.includes("Polygon Speed Limit")
            ? buzzerSpeedLimitHex
            : "";

        const getSpeedLimitDebounceHex =
          !isPolygonSpeedLimitDisabled &&
          polygonGeofenceKeys.includes("Speed Limit Debounce")
            ? speedLimitDebounceHex
            : "";

        const restString = `PLG,PRG;;${pointId};${coordinateToHexString}`;
        const restString2 = `PLG,PRG;;53;${String(id - 1).padStart(
          2,
          "0"
        )};${enterExitHexString}${getPolygonSpeedLimitHex}${getSpeedLimitDebounceHex}`;

        return {
          points: restString,
          zone: restString2,
        };
      }
    );

    const text = [
      `MODEL=${modelName}`,
      `VERSION=${modelVersion}`,
      ...profilePartial,
      ...(circularGeofenceProfileList || []),
      ...(polygonGeofenceProfileList.flatMap(({ points, zone }) => [
        points,
        zone,
      ]) || []),
    ];

    const blob = new Blob([text.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    if (isDownload) {
      const downloadFileName = await generateFilename(
        new File([blob], `${modelName}_${modelVersion}.profile`),
        modelName,
        modelVersion
      );
      fileDownload(blob, downloadFileName);
    }

    setPercentage(100);
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

export default useProfileWithoutDevice;
