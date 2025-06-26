import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { Button, Stack } from "@mui/material";
import { SECTIONS } from "constants/searchField";
import { useTranslations } from "next-intl";
import styled from "styled-components";

interface Props {
  modelName: string;
  modelVersion: string;
  modelImei: string;
  modelEsn: string;
  buyer: string;
  deviceVersionsObject: Record<string, string>;
  handleReboot: () => void;
  handleLoadImei: () => void;
  isLoadingModelImei: boolean;
}

export default function DeviceInformation({
  modelName,
  modelVersion,
  modelImei,
  modelEsn,
  buyer,
  deviceVersionsObject,
  handleReboot,
  handleLoadImei,
  isLoadingModelImei,
}: Props) {
  const t = useTranslations();
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
            <FieldLabel>{t("device_information.model_name")}</FieldLabel>
            <FieldValue>{modelName}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.buyer")}</FieldLabel>
            <FieldValue>{buyer}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.fw_version")}</FieldLabel>
            <FieldValue>{modelVersion}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.modem_version")}</FieldLabel>
            <FieldValue>{renderVersion("MODEM")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.ble_version")}</FieldLabel>
            <FieldValue>{renderVersion("BLE")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.wifi_version")}</FieldLabel>
            <FieldValue>{renderVersion("WIFI")}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.mcu_version")}</FieldLabel>
            <FieldValue>{renderVersion("MODEM_BYPASS_MCU")}</FieldValue>
          </FieldItem>
        </Stack>
        <Stack direction="column" flex={1}>
          <FieldItem>
            <FieldLabel>IMEI</FieldLabel>
            <FieldValue>
              <Stack direction="row" alignItems="center" gap={"12px"}>
                {modelImei}
                {(!modelImei || modelImei === "ERROR") && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ height: 30 }}
                    size="small"
                    onClick={handleLoadImei}
                    disabled={isLoadingModelImei}
                  >
                    {t("device_information.load")}
                  </Button>
                )}
              </Stack>
            </FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>ESN</FieldLabel>
            <FieldValue>{modelEsn}</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.gnss_version")}</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.gnss_state")}</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.wwan_state")}</FieldLabel>
            <FieldValue>N/A</FieldValue>
          </FieldItem>
          <FieldItem>
            <FieldLabel>{t("device_information.reboot")}</FieldLabel>
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
                onClick={handleReboot}
              >
                {t("device_information.reboot")}
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
