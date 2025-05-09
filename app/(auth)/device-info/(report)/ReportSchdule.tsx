import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import SwitchField from "../(components)/SwitchField";
import TimeHMA from "../(components)/TimeHMA";

const fieldIds = INCLUDE_FIELDS[SECTIONS.ReportSchdule.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const ReportSchdule = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();
  console.log(formData);
  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleChange = (id: string, value: string) => {
    onChange(id, value);
  };

  // 요일별 Y/N 값 처리 함수
  const handleDayChange = (index: number) => {
    // 기존 값이 없는 경우 기본값으로 "NNNNNNN" 설정 (모든 요일 비활성화)
    const currentValue = formData["1640"]?.realValue || "NNNNNNN";

    // 문자열을 배열로 변환하여 특정 인덱스 값 변경
    const updatedChars = currentValue.split("");
    // 현재 값이 'Y'면 'N'으로, 'N'이면 'Y'로 변경
    updatedChars[index] = updatedChars[index] === "Y" ? "N" : "Y";

    // 배열을 다시 문자열로 변환
    const updatedValue = updatedChars.join("");

    // 변경된 값으로 업데이트
    handleChange("1640", updatedValue);
  };

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
        sendFormData(fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="8px">
          <h1 data-section-id={SECTIONS.ReportSchdule.en}>
            {SECTIONS.ReportSchdule[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["1637"].tooltip[lang]}
              </span>
            }
          />
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SwitchField id="1637" formData={formData} onChange={handleChange} />

          {!!formData["1640"]?.realValue && (
            <Stack width={"100%"} gap={"8px"}>
              <Stack direction="row" gap="4px" alignItems="center">
                <InputBox.Title>
                  {FIELD_VALIDATIONS["1640"].title[lang]}
                  <span style={{ color: "#FF0000", paddingLeft: "4px" }}>
                    *
                  </span>
                </InputBox.Title>
                <InputBox.Info
                  tooltipText={
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      {FIELD_VALIDATIONS["1640"].tooltip[lang]}
                    </span>
                  }
                />
                <InputBox.Number>{1640}</InputBox.Number>
              </Stack>

              <Stack direction="row" gap="8px" flexWrap="wrap">
                <DayCheckbox
                  day="Sun"
                  checked={formData["1640"]?.realValue?.[0] === "Y"}
                  onChange={() => handleDayChange(0)}
                />
                <DayCheckbox
                  day="Mon"
                  checked={formData["1640"]?.realValue?.[1] === "Y"}
                  onChange={() => handleDayChange(1)}
                />
                <DayCheckbox
                  day="Tue"
                  checked={formData["1640"]?.realValue?.[2] === "Y"}
                  onChange={() => handleDayChange(2)}
                />
                <DayCheckbox
                  day="Wed"
                  checked={formData["1640"]?.realValue?.[3] === "Y"}
                  onChange={() => handleDayChange(3)}
                />
                <DayCheckbox
                  day="Thu"
                  checked={formData["1640"]?.realValue?.[4] === "Y"}
                  onChange={() => handleDayChange(4)}
                />
                <DayCheckbox
                  day="Fri"
                  checked={formData["1640"]?.realValue?.[5] === "Y"}
                  onChange={() => handleDayChange(5)}
                />
                <DayCheckbox
                  day="Sat"
                  checked={formData["1640"]?.realValue?.[6] === "Y"}
                  onChange={() => handleDayChange(6)}
                />
              </Stack>
            </Stack>
          )}

          <SelectField
            isSwitch
            id="1656"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <TimeHMA
            id="1649"
            formData={formData}
            isRequired
            isSwitch
            value={formData["1649"]?.realValue}
            onChange={handleChange}
          />
          <TimeHMA
            id="1650"
            formData={formData}
            isRequired
            isSwitch
            value={formData["1650"]?.realValue}
            onChange={handleChange}
          />
          <TimeHMA
            id="1651"
            formData={formData}
            isRequired
            isSwitch
            value={formData["1651"]?.realValue}
            onChange={handleChange}
          />
          <TimeHMA
            id="1652"
            formData={formData}
            isRequired
            isSwitch
            value={formData["1652"]?.realValue}
            onChange={handleChange}
          />
          <NumericInputField
            id="1653"
            formData={formData}
            onChange={handleChange}
            isRequired
            isSwitch
          />
          <TimeHMA
            id="1655"
            formData={formData}
            isRequired
            isSwitch
            value={formData["1655"]?.realValue}
            onChange={handleChange}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

// 요일 체크박스 컴포넌트
const DayCheckbox = ({ day, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={day}
    />
  );
};

export default ReportSchdule;

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
    font-size: 16px;
    line-height: 14px;
  }
`;

const ValueDisplay = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  font-family: monospace;
`;
