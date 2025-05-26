import { SetStateAction, Dispatch, useRef, useMemo } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Divider, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import {
  modeSettingsFieldsWithoutUnderbar,
  modeSettingsFieldsWithUnderbar,
  SECTIONS,
} from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const ModeSettings = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isUnderbar = !formData["1670"].key.includes("Time[1]");
  const fieldIds = isUnderbar
    ? modeSettingsFieldsWithUnderbar
    : modeSettingsFieldsWithoutUnderbar;

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
      );
    });
  }, [formData]);

  if (!hasFormDataFields(formData, fieldIds)) return null;

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
      <h1 data-section-id={SECTIONS.ModeSettings.en}>
        {SECTIONS.ModeSettings[lang]}
      </h1>

      <>
        <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
          {isUnderbar ? (
            <>
              <Stack width={"calc(50% - 8px)"}>
                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <NumericInputField
                    id="1670"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1670")}
                  />
                  <NumericInputField
                    id="1673"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1673")}
                  />
                  <NumericInputField
                    id="1676"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1676")}
                  />
                </Stack>
              </Stack>

              <Stack width={"calc(50% - 8px)"}>
                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <NumericInputField
                    id="1679"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1679")}
                  />
                  <NumericInputField
                    id="1685"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1685")}
                  />
                  <NumericInputField
                    id="1688"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1688")}
                  />

                  <NumericInputField
                    id="1682"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1682")}
                  />
                  <NumericInputField
                    id="1697"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1697")}
                  />
                  <NumericInputField
                    id="1681"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1681")}
                  />
                  <NumericInputField
                    id="1684"
                    formData={formData}
                    onChange={handleChange}
                    isSwitch
                    isUnderbarId
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1684")}
                  />
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <Stack width={"calc(50% - 8px)"}>
                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 1</h3>

                  <NumericInputField
                    id="1670"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1670")}
                  />
                  <NumericInputField
                    id="1671"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1671")}
                  />
                  <NumericInputField
                    id="1672"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1672")}
                  />
                </Stack>

                <Divider
                  orientation="horizontal"
                  flexItem
                  style={{ width: "100%", margin: "32px 0" }}
                />

                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 2</h3>

                  <NumericInputField
                    id="1673"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1673")}
                  />
                  <NumericInputField
                    id="1674"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1674")}
                  />
                  <NumericInputField
                    id="1675"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1675")}
                  />
                </Stack>

                <Divider
                  orientation="horizontal"
                  flexItem
                  style={{ width: "100%", margin: "32px 0" }}
                />

                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 3</h3>

                  <NumericInputField
                    id="1676"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1676")}
                  />
                  <NumericInputField
                    id="1677"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1677")}
                  />
                  <NumericInputField
                    id="1678"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1678")}
                  />
                </Stack>
              </Stack>

              <Stack width={"calc(50% - 8px)"}>
                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 4</h3>

                  <NumericInputField
                    id="1679"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1679")}
                  />
                  <NumericInputField
                    id="1680"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1680")}
                  />
                  <NumericInputField
                    id="1681"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1681")}
                  />
                </Stack>

                <Divider
                  orientation="horizontal"
                  flexItem
                  style={{ width: "100%", margin: "32px 0" }}
                />

                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 5</h3>

                  <NumericInputField
                    id="1682"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1682")}
                  />
                  <NumericInputField
                    id="1683"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1683")}
                  />
                  <NumericInputField
                    id="1684"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1684")}
                  />
                </Stack>

                <Divider
                  orientation="horizontal"
                  flexItem
                  style={{ width: "100%", margin: "32px 0" }}
                />

                <Stack direction="column" width={"100%"} gap={"32px"}>
                  <h3>Mode 6</h3>

                  <NumericInputField
                    id="1685"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1685")}
                  />
                  <NumericInputField
                    id="1686"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1686")}
                  />
                  <NumericInputField
                    id="1687"
                    formData={formData}
                    isSwitch
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1687")}
                  />
                </Stack>

                {/* <Divider
                  orientation="horizontal"
                  flexItem
                  style={{ width: "100%", margin: "32px 0" }}
                /> */}

                {/* <SelectField
                  id="1078"
                  formData={formData}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                /> */}
              </Stack>
            </>
          )}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
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
    </Form>
  );
};

export default ModeSettings;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }

  h3 {
    font-weight: 500;
    font-size: 15px;
    line-height: 14px;
    color: #6f6f6f;
    width: calc(50% - 8px);
  }
`;
