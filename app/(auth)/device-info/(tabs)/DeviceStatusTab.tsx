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
  deviceVersionsObject: Record<string, string>;
  handleReboot: () => void;
}

export default function DeviceStatusTab({
  formData,
  originData,
  deviceVersionsObject,
  handleReboot,
}: Props) {
  const modelInfo = originData?.[0]?.info?.[0];

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <DeviceInformation
        modelName={modelInfo?.S || "-"}
        modelVersion={modelInfo?.V || "-"}
        modelImei={modelInfo?.I || "-"}
        deviceVersionsObject={deviceVersionsObject}
        handleReboot={handleReboot}
      />
      <Stack direction="row" gap={"16px"}>
        <div style={{ flex: 1 }}>
          <GNSSInformation
            lat={modelInfo?.lat || 0}
            lng={modelInfo?.lng || 0}
            angle={0}
            speed={0}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CellularInformation />
        </div>
      </Stack>
    </Stack>
  );
}
