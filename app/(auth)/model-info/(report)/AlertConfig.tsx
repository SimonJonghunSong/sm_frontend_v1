import styled from "styled-components";
import { FormField } from "../page";
import { useTranslations } from "next-intl";
import { Button, Stack, Tab as MuiTab, Tabs } from "@mui/material";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { AlertConfig1, AlertConfig2, AlertConfig3 } from "./@index";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (
    id: string,
    value: string,
    selectValue?: string,
    alertId?: string
  ) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
  alertConfigFields?: {
    alertConfig1: string[];
    alertConfig2: string[];
    alertConfig3: string[];
  };
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

const AlertConfig = ({ formData, onChange, setFormData, alertConfigFields }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const [tab, setTab] = useState<"alert_config_1" | "alert_config_2" | "alert_config_3">(
    "alert_config_1"
  );
  const { sendFormData, isLoading } = useSendFormData();
  
  // 동적 필드가 없으면 기본값 사용 (fallback)
  const defaultFields = {
    alertConfig1: [],
    alertConfig2: [],
    alertConfig3: []
  };
  
  const fields = alertConfigFields || defaultFields;
  
  console.log("=== AlertConfig component ===");
  console.log("alertConfigFields:", alertConfigFields);
  console.log("fields:", fields);

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        ((tab === "alert_config_1"
          ? fields.alertConfig1.includes(key)
          : tab === "alert_config_2"
          ? fields.alertConfig2.includes(key)
          : fields.alertConfig3.includes(key)) &&
          formData[key].realValue !== formData[key].beforeValue) ||
        formData[key].alert_id !== formData[key].beforeAlertId
      );
    });
  }, [tab, formData, fields]);

  const handleChange = (id: string, value: string, alertId?: string) => {
    console.log("id :::", id);
    console.log("value :::", value);
    console.log("alertId :::", alertId);

    onChange(id, value, undefined, alertId);
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        const currentFields =
          tab === "alert_config_1"
            ? fields.alertConfig1
            : tab === "alert_config_2"
            ? fields.alertConfig2
            : fields.alertConfig3;

        // 모든 필드 값을 포함한 객체 생성
        const fieldValues = Object.keys(formData).reduce((acc, key) => {
          if (currentFields.includes(key)) {
            const { value, realValue, alert_id } = formData[key];

            // 파라미터 구조로 변환
            const formattedValue = formatFieldValue(realValue, alert_id || "0");

            acc[key] = {
              id: key,
              value: value,
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
        {fields.alertConfig3.length > 0 && (
          <Tab
            label={t("configuration.report.alert_config_3")}
            value="alert_config_3"
            sx={{ flex: 1 }}
          />
        )}
      </StyledTabs>

      <TabContent>
        {tab === "alert_config_1" && (
          <AlertConfig1
            formData={formData}
            onChange={handleChange}
            isDirtyFields={isDirtyFields}
            alertFields={fields.alertConfig1}
          />
        )}
        {tab === "alert_config_2" && (
          <AlertConfig2
            formData={formData}
            onChange={handleChange}
            isDirtyFields={isDirtyFields}
            alertFields={fields.alertConfig2}
          />
        )}
        {tab === "alert_config_3" && fields.alertConfig3.length > 0 && (
          <AlertConfig3
            formData={formData}
            onChange={handleChange}
            isDirtyFields={isDirtyFields}
            alertFields={fields.alertConfig3}
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
          {t("common.save")}
        </Button>
      </Stack>
    </Form>
  );
};

export default AlertConfig;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid #d7d8dc;
  padding-bottom: 36px;

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
