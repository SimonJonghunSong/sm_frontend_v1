import useDeviceVersions from "@/src/hooks/useDeviceVersions";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { Stack } from "@mui/material";
import DeviceInformation from "../(device-status)/DeviceInformation";
import CellularInformation from "../(device-status)/CellularInformation";
import GNSSInformation from "../(device-status)/GNSSInformation";
import { FormField } from "../page";

interface Props {
  originData: any;
  formData: {
    [key: string]: FormField;
  };
  buyer: string;
  modelImei: string;
  deviceVersionsObject: Record<string, string>;
  handleReboot: () => void;
  handleLoadImei: () => void;
  isLoadingModelImei: boolean;
}

export default function DeviceStatusTab({
  formData,
  originData,
  deviceVersionsObject,
  buyer,
  modelImei,
  handleReboot,
  handleLoadImei,
  isLoadingModelImei,
}: Props) {
  const modelInfo = originData?.[0]?.info?.[0];

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <DeviceInformation
        gnss={deviceVersionsObject?.GNSS || "N/A"}
        wwan={deviceVersionsObject?.WWAN || "N/A"}
        modelName={modelInfo?.S || "-"}
        modelVersion={modelInfo?.V || "-"}
        modelEsn={modelInfo?.I || "-"}
        modelImei={modelImei}
        buyer={buyer || "-"}
        deviceVersionsObject={deviceVersionsObject}
        handleReboot={handleReboot}
        handleLoadImei={handleLoadImei}
        isLoadingModelImei={isLoadingModelImei}
      />
      <Stack direction="row" gap={"16px"}>
        <div style={{ flex: 1 }}>
          <GNSSInformation
            lat={modelInfo?.lat || 0}
            lng={modelInfo?.lng || 0}
          />
        </div>
        <div style={{ flex: 1 }}></div>
      </Stack>
    </Stack>
  );
}
