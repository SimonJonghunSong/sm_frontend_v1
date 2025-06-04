import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack, Tab as MuiTab, Tabs } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { FormField } from "../../page";
import Input from "./Input";
import Output from "./Output";
import { hasFormDataFields } from "../../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "../../(utils)/useSendFormData";
import EditDot from "../../(components)/EditDot";
import SelectField from "../../(components)/SelectField";
import InputOutputConfig from "app/(auth)/model-info/(input/output)/InputOutputConfig";

const fieldIds = INCLUDE_FIELDS[SECTIONS["Input/Output"].en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
}

const InputOutput = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const [tab, setTab] = useState<"input" | "output">("input");

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
      );
    });
  }, [formData]);

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const validateForm = (): boolean => {
    // formRef가 null이면 유효성 검사를 할 수 없음
    if (!formRef.current) return true;

    // 폼 내의 모든 input 요소 중 aria-invalid="true" 속성을 가진 요소 찾기
    const invalidInputs = formRef.current.querySelectorAll(
      '[aria-invalid="true"]'
    );

    if (invalidInputs.length > 0) {
      // 첫 번째 유효하지 않은 입력 필드로 스크롤
      (invalidInputs[0] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // 포커스 설정
      (invalidInputs[0] as HTMLElement).focus();

      return false;
    }

    return true;
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        // 폼 유효성 검사 실행
        if (!validateForm()) {
          return; // 유효하지 않은 필드가 있으면 제출을 중단
        }

        // 모든 필드 값을 포함한 객체 생성
        const fieldValues = Object.keys(formData).reduce((acc, key) => {
          // 네트워크 탭에 있는 필드만 포함
          if (fieldIds.includes(key)) {
            acc[key] = {
              id: key,
              value: formData[key].value,
              realValue: formData[key].realValue,
            };
          }
          return acc;
        }, {});

        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" gap={"4px"}>
          <h1 data-section-id={SECTIONS["Input/Output"].en}>
            {SECTIONS["Input/Output"][lang]}
          </h1>
          <InputBox.Number>17</InputBox.Number>
          {isDirtyFields.length > 0 && <EditDot />}
        </Stack>
      </Stack>

      <InputOutputConfig
        formData={formData}
        onChange={onChange}
        setFormData={setFormData}
      />

      <StyledTabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        variant="fullWidth"
      >
        <Tab
          label={t("configuration.input_output.input")}
          value="input"
          sx={{ flex: 1 }}
        />
        <Tab
          label={t("configuration.input_output.output")}
          value="output"
          sx={{ flex: 1 }}
        />
      </StyledTabs>

      <TabContent>
        {tab === "input" && <Input formData={formData} onChange={onChange} />}
        {tab === "output" && (
          <Stack gap={"32px"}>
            <Output formData={formData} onChange={onChange} />
            <SelectField
              id="1786"
              formData={formData}
              onChange={onChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1786")}
            />
          </Stack>
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

export default InputOutput;

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

const TabContent = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 0 0 8px 8px;
`;

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
