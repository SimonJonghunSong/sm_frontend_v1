import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";
import SwitchField from "../(components)/SwitchField";
import CheckboxComp from "app/(auth)/model-info/CheckboxComp";
import { hasFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";

const optionsString =
  "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b29, b30, b31";
const labelsString = {
  TEXT_EN_ITEM_CONTENT:
    "Status, Alert, Travel, External Serial, OBDII Travel, OBDII, RFA, PID, OVD, CAM, BLE, TWS, TIC, TIS, TRQ, TPR, Sensor (ASNB), Sensor (ASNE), BSA, EMD, CID, JID",
  TEXT_ES_ITEM_CONTENT:
    "Estado, Alerta, Viaje, Serial Externo, Viaje OBDII, OBDII, RFA, PID, OVD, CAM, BLE, TWS, TIC, TIS, TRQ, TPR, Sensor (ASNB), Sensor (ASNE), BSA, EMD, CID, JID",
  TEXT_PT_ITEM_CONTENT:
    "Status, Alerta, Viagem, Serial Externo, Viagem OBDII, OBDII, RFA, PID, OVD, CAM, BLE, TWS, TIC, TIS, TRQ, TPR, Sensor (ASNB), Sensor (ASNE), BSA, EMD, CID, JID",
};
interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const fieldsId = INCLUDE_FIELDS[SECTIONS.BackupServer.en];

const BackupServer = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

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
          // 네트워크 탭에 있는 필드만 포함
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
        sendFormData(fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <h1 data-section-id={SECTIONS.BackupServer.en}>
        {SECTIONS.BackupServer[lang]}
      </h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <TextInputField
            id="1008"
            formData={formData}
            onChange={handleChange}
            error={!/^[A-Za-z0-9\-.]*$/.test(formData["1005"].realValue)}
            helperText={
              !/^[A-Za-z0-9\-.]*$/.test(formData["1005"].realValue)
                ? FIELD_ERRORS["alphaNumericPattern"][lang]
                : undefined
            }
            style={{ width: "100%" }}
          />

          <NumericInputField
            id="1009"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="1010"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <Stack gap={"16px"}>
            <SwitchField
              id="1011"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              customChecked={
                formData["1011"]?.realValue !== "0" &&
                formData["1011"]?.realValue !== "00"
              }
            />

            {formData["1011"]?.realValue !== "0" &&
              formData["1011"]?.realValue !== "00" && (
                <CheckboxComp
                  value={formData["1011"]?.realValue}
                  optionsString={optionsString}
                  labelsString={labelsString}
                  hasAllCheckbox={false}
                  lang={lang}
                  onChange={(newValue) => {
                    handleChange("1011", newValue);
                  }}
                />
              )}
          </Stack>

          <NumericInputField
            id="1012"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <NumericInputField
            id="1017"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <NumericInputField
            id="1018"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <NumericInputField
            id="1019"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
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

export default BackupServer;

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
