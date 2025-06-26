import useDeviceVersions from "@/src/hooks/useDeviceVersions";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { Stack } from "@mui/material";
import CellularInformation from "app/(auth)/device-info/(device-status)/CellularInformation";
import DeviceInformation from "app/(auth)/device-info/(device-status)/DeviceInformation";
import GNSSInformation from "app/(auth)/device-info/(device-status)/GNSSInformation";
import { FormField } from "app/(auth)/device-info/page";

interface Props {
  originData: any;
  formData: {
    [key: string]: FormField;
  };
  buyer: string;
  deviceVersionsObject: Record<string, string>;
  handleReboot: () => void;
}

export default function DeviceStatusTab({
  formData,
  originData,
  deviceVersionsObject,
  buyer,
  handleReboot,
}: Props) {
  const modelInfo = originData?.[0]?.info?.[0];

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <DeviceInformation
        modelName={modelInfo?.S || "-"}
        modelVersion={modelInfo?.V || "-"}
        modelImei={modelInfo?.I || "-"}
        buyer={buyer || "-"}
        deviceVersionsObject={deviceVersionsObject}
        handleReboot={handleReboot}
      />
      <Stack direction="row" gap={"16px"}>
        <div style={{ flex: 1 }}>
          <GNSSInformation
            lat={modelInfo?.lat || 0}
            lng={modelInfo?.lng || 0}
            gnss={deviceVersionsObject?.GNSS || "N/A"}
            wwan={deviceVersionsObject?.WWAN || "N/A"}
          />
        </div>
        <div style={{ flex: 1 }}></div>
      </Stack>
    </Stack>
  );
}
