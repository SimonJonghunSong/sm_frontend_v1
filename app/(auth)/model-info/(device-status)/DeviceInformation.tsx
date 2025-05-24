import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { Button, Stack } from "@mui/material";
import { SECTIONS } from "constants/searchField";
import styled from "styled-components";

interface Props {
  modelName: string;
  modelVersion: string;
  modelImei: string;
  deviceVersionsObject: Record<string, string>;
  handleReboot: () => void;
}

export default function DeviceInformation({
  modelName,
  modelVersion,
  modelImei,
  deviceVersionsObject,
  handleReboot,
}: Props) {
  const { lang } = useLangStore();

  const renderVersion = (type: string) => {
    const value = deviceVersionsObject?.[type] || "N/A";

    if (value.includes("NotSupport")) {
      return "N/A";
    }

    return value;
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={"4px"}>
          <h1 data-section-id={SECTIONS.DeviceInformation.en}>
            {SECTIONS.DeviceInformation[lang]}
          </h1>
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={"32px 16px"}>
        <Stack direction="column" flex={1}>
          <FieldItem>
            <FieldLabel>Model Name</FieldLabel>
            <FieldValue>{modelName}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>F/W Version</FieldLabel>
            <FieldValue>{modelVersion}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Modem Version</FieldLabel>
            <FieldValue>{renderVersion("MODEM")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>BLE Version</FieldLabel>
            <FieldValue>{renderVersion("BLE")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Wi-Fi Version</FieldLabel>
            <FieldValue>{renderVersion("WIFI")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>MCU Version</FieldLabel>
            <FieldValue>{renderVersion("MODEM_BYPASS_MCU")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>RTC Time</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Operating Time</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Battery Activation Time</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
        </Stack>
        <Stack direction="column" flex={1}>
          <FieldItem>
            <FieldLabel>IMEI</FieldLabel>
            <FieldValue>{modelImei}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>ESN</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>GNSS Version</FieldLabel>
            <FieldValue>{renderVersion("GNSS")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Backup Battery Level</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Battery Activation Log</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>GNSS State</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>WWAN State</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Reboot</FieldLabel>
            <FieldValue
              style={{
                height: 62,
                padding: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{ height: 30 }}
                size="small"
                disabled
                onClick={handleReboot}
              >
                Reboot
              </Button>
            </FieldValue>
          </FieldItem>
        </Stack>
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--grey3);
`;
const FieldLabel = styled.div`
  flex: 1;
  padding: 24px 4px;
  font-size: 14px;
  line-height: 14px;
`;
const FieldValue = styled.div`
  flex: 1;
  padding: 24px 8px;
  font-size: 14px;
  line-height: 14px;
`;
