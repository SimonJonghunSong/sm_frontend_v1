import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import { hasFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const fieldsId = INCLUDE_FIELDS[SECTIONS.JammingDetection.en];

const JammingDetection = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();
  const [isJammingDetection, setIsJammingDetection] = useState(false);

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldsId.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
      );
    });
  }, [formData]);
  if (!hasFormDataFields(formData, fieldsId)) return null;

  const handleChange = (id: string, value: string) => {
    onChange(id, value);
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
          if (fieldsId.includes(key)) {
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
        <Stack direction="row" gap="4px" alignItems="center">
          <h1 data-section-id={SECTIONS.JammingDetection.en}>
            {SECTIONS.JammingDetection[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["1061"].tooltip[lang]}
              </span>
            }
          />
        </Stack>
        <SwitchPrimary
          onChange={(e) => {
            setIsJammingDetection(e.target.checked);
          }}
          checked={isJammingDetection}
        />
      </Stack>

      {isJammingDetection && (
        <>
          <Stack direction={"row"} gap={"24px"}>
            <Stack gap={"24px"} flex={1}>
              <SelectField
                id="1061"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1061")}
              />
              {formData["1061"]?.realValue !== "00" && (
                <>
                  <NumericInputField
                    id="1062"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1062")}
                  />

                  <NumericInputField
                    id="1063"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1063")}
                  />
                </>
              )}
            </Stack>
            <Stack gap={"24px"} flex={1}>
              {formData["1061"]?.realValue !== "00" && (
                <>
                  <NumericInputField
                    id="1065"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1065")}
                  />

                  <NumericInputField
                    id="1066"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1066")}
                  />

                  <NumericInputField
                    id="1067"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1067")}
                  />

                  <NumericInputField
                    id="1068"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1068")}
                  />
                </>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading || !isDirtyFields.length}
            >
              {t("notify.send")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default JammingDetection;

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
