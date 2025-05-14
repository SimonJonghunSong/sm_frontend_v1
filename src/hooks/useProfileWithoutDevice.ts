import { useState } from "react";
import { fileDownload } from "@/utils/fileDownload";
import { useTransformConfigDataWithOutDevice } from "@/src/hooks/useTransformConfigDataWithOutDevice";

interface UseProfileType {
  modelName: string;
  modelVersion: string;
  data: { [key: string]: any[] }[];
}

const useProfileWithoutDevice = ({
  modelName,
  modelVersion,
  data,
}: UseProfileType) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { getProfileData } = useTransformConfigDataWithOutDevice({
    data,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  const getProfileAllData = async (isDownload: boolean = true) => {
    setPercentage(0);
    setIsDownloading(true);

    const profilePartial = getProfileData();

    const text = [
      `MODEL=${modelName}`,
      `VERSION=${modelVersion}`,
      ...profilePartial,
    ];

    const blob = new Blob([text.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    if (isDownload) {
      fileDownload(blob, `${modelName}_${modelVersion}.profile`);
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
