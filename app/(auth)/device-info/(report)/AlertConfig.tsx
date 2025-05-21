import styled from "styled-components";
import { FormField } from "../page";
import { useTranslations } from "next-intl";
import { Button, Stack, Tab as MuiTab, Tabs } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AlertConfig1, AlertConfig2 } from "./@index";
import { ALERT_CONFIG_1 } from "./AlertConfig1";
import { ALERT_CONFIG_2 } from "./AlertConfig2";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, alertId?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

// 형식 변환 유틸리티 함수
const formatFieldValue = (enabled: string, alertId: string) => {
  const enableByte = enabled === "1" ? "01" : "00";

  const idValue = alertId ? parseInt(alertId, 10) : 0;
  const idByte = idValue.toString(16).padStart(2, "0").toUpperCase();

  return {
    raw: `0x${enableByte} 0x${idByte}`,
  };
};

const Tab = styled(MuiTab)`
  font-weight: 600;
  padding: 12px 16px;
  min-height: 48px;
  background-color: var(--grey1);
  border-radius: 8px 8px 0 0;
  margin-right: 2px;

  &:not(.Mui-selected):hover {
    background-color: #e0e0e0;
  }
`;

const StyledTabs = styled(Tabs)`
  border-radius: 8px 8px 0 0;

  .MuiTabs-indicator {
    height: 3px;
  }
`;

const AlertConfig = ({ formData, onChange, setFormData }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const [tab, setTab] = useState<"alert_config_1" | "alert_config_2">(
    "alert_config_1"
  );
  const { sendFormData, isLoading } = useSendFormData();

  console.log("isLoading :::", isLoading);

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      (tab === "alert_config_1" ? ALERT_CONFIG_1 : ALERT_CONFIG_2)
        .map(String)
        .includes(key) &&
      (formData[key].beforeValue !== formData[key].realValue ||
        formData[key].beforeAlertId !== formData[key].alert_id)
    );
  });

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        const fields =
          tab === "alert_config_1"
            ? ALERT_CONFIG_1.map(String)
            : ALERT_CONFIG_2.map(String);

        // 모든 필드 값을 포함한 객체 생성
        const fieldValues = Object.keys(formData).reduce((acc, key) => {
          if (fields.map(String).includes(key)) {
            const { realValue, alert_id } = formData[key];

            // 파라미터 구조로 변환
            const formattedValue = formatFieldValue(realValue, alert_id || "0");

            acc[key] = {
              id: key,
              realValue,
              alert_id: alert_id || "0",
              parameterFormat: formattedValue.raw, // 0x01 0x22 형식
            };
          }
          return acc;
        }, {});

        // 변환 작업된 values
        sendFormData(fieldValues, setFormData);
      }}
    >
      <h1 data-section-id={SECTIONS.AlertConfig.en}>
        {SECTIONS.AlertConfig[lang]}
      </h1>

      <StyledTabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        variant="fullWidth"
      >
        <Tab
          label={t("configuration.report.alert_config_1")}
          value="alert_config_1"
          sx={{ flex: 1 }}
        />
        <Tab
          label={t("configuration.report.alert_config_2")}
          value="alert_config_2"
          sx={{ flex: 1 }}
        />
      </StyledTabs>

      <TabContent>
        {tab === "alert_config_1" && (
          <AlertConfig1
            formData={formData}
            onChange={onChange}
            isDirtyFields={isDirtyFields}
          />
        )}
        {tab === "alert_config_2" && (
          <AlertConfig2
            formData={formData}
            onChange={onChange}
            isDirtyFields={isDirtyFields}
          />
        )}
      </TabContent>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading || isDirtyFields.length === 0}
        >
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default AlertConfig;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;

const TabContent = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 0 0 8px 8px;
`;
