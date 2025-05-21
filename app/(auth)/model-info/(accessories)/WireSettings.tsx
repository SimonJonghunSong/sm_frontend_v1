import { useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import TextInputField from "../(components)/TextInputField";
import SwitchField from "../(components)/SwitchField";
import NumericInputField from "../(components)/NumericInputField";
import RangeThresholdField from "../(components)/RangeThresholdField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import DualCheckboxField from "../(components)/DualCheckboxField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.WireSettings.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}
const errorMessages = {
  longBytes: {
    en: "Cannot input over 16 bytes.",
    es: "No se pueden ingresar más de 16 bytes.",
    pt: "No se pueden ingresar más de 16 bytes.",
  },
  duplicateValues: {
    en: "1974 and 1975 cannot have the same values.",
    es: "1974 y 1975 no pueden tener los mismos valores.",
    pt: "1974 y 1975 no pueden tener los mismos valores.",
  },
};

const WireSettings = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter(
    (key) =>
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
  );

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleChange = (id: string, value: string, selectValue?: string) => {
    onChange(id, value, selectValue);
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
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <h1 data-section-id={SECTIONS.WireSettings.en}>
        {SECTIONS.WireSettings[lang]}
      </h1>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <DualCheckboxField
            id="1970"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            firstOptionLabel={{
              en: t("configuration.accessories.driver_id"),
              es: t("configuration.accessories.driver_id"),
              pt: t("configuration.accessories.driver_id"),
            }}
            secondOptionLabel={{
              en: t("configuration.accessories.temperature_sensors"),
              es: t("configuration.accessories.temperature_sensors"),
              pt: t("configuration.accessories.temperature_sensors"),
            }}
            isDirty={isDirtyFields.includes("1970")}
          />

          <h2>{t("configuration.report.driver_id")}</h2>

          <NumericInputField
            id="1971"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1971")}
          />

          <NumericInputField
            id="1972"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1972")}
          />

          <SwitchField
            id="1973"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1973")}
          />

          <TextInputField
            id="1974"
            formData={formData}
            onChange={handleChange}
            error={
              formData["1974"]?.value &&
              (new TextEncoder().encode(formData["1974"].value).length > 16 ||
                (formData["1975"]?.value &&
                  formData["1974"].value === formData["1975"].value))
            }
            style={{ width: "100%" }}
            helperText={
              formData["1974"]?.value
                ? new TextEncoder().encode(formData["1974"].value).length > 16
                  ? errorMessages.longBytes[lang]
                  : formData["1975"]?.value &&
                    formData["1974"].value === formData["1975"].value
                  ? errorMessages.duplicateValues[lang]
                  : undefined
                : undefined
            }
            isDirty={isDirtyFields.includes("1974")}
          />

          <TextInputField
            id="1975"
            formData={formData}
            onChange={handleChange}
            error={
              formData["1975"]?.value &&
              (new TextEncoder().encode(formData["1975"].value).length > 16 ||
                (formData["1975"]?.value &&
                  formData["1974"].value === formData["1975"].value))
            }
            style={{ width: "100%" }}
            helperText={
              formData["1975"]?.value
                ? new TextEncoder().encode(formData["1975"].value).length > 16
                  ? errorMessages.longBytes[lang]
                  : formData["1975"]?.value &&
                    formData["1974"].value === formData["1975"].value
                  ? errorMessages.duplicateValues[lang]
                  : undefined
                : undefined
            }
            isDirty={isDirtyFields.includes("1975")}
          />

          <NumericInputField
            id="1999"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("1999")}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <h2>{t("configuration.accessories.temperature_sensors")}</h2>

          <RangeThresholdField
            id={["1981", "1980"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1980~1"
            isDirty={
              isDirtyFields.includes("1980") || isDirtyFields.includes("1981")
            }
          />
          <RangeThresholdField
            id={["1983", "1982"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1982~3"
            isDirty={
              isDirtyFields.includes("1982") || isDirtyFields.includes("1983")
            }
          />

          <RangeThresholdField
            id={["1985", "1984"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1984~5"
            isDirty={
              isDirtyFields.includes("1984") || isDirtyFields.includes("1985")
            }
          />
          <RangeThresholdField
            id={["1987", "1986"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1986~7"
            isDirty={
              isDirtyFields.includes("1986") || isDirtyFields.includes("1987")
            }
          />
          <RangeThresholdField
            id={["1989", "1988"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1988~9"
            isDirty={
              isDirtyFields.includes("1988") || isDirtyFields.includes("1989")
            }
          />
          <RangeThresholdField
            id={["1991", "1990"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1990~1"
            isDirty={
              isDirtyFields.includes("1990") || isDirtyFields.includes("1991")
            }
          />
          <RangeThresholdField
            id={["1993", "1992"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1992~3"
            isDirty={
              isDirtyFields.includes("1992") || isDirtyFields.includes("1993")
            }
          />
          <RangeThresholdField
            id={["1995", "1994"]}
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            titleId="1994~5"
            isDirty={
              isDirtyFields.includes("1994") || isDirtyFields.includes("1995")
            }
          />

          <NumericInputField
            id="1996"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("1996")}
          />
          <NumericInputField
            id="1997"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("1997")}
          />
          <NumericInputField
            id="1998"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("1998")}
          />

          <DualCheckboxField
            id="2313"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            firstOptionLabel={{
              en: "Falling Edge",
              es: "Flanco de bajada",
              pt: "Borda de descida",
            }}
            secondOptionLabel={{
              en: "Rising Edge",
              es: "Flanco de subida",
              pt: "Borda de subida",
            }}
            isDirty={isDirtyFields.includes("2313")}
          />
        </Stack>
      </Stack>

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

export default WireSettings;

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

  h2 {
    font-weight: 500;
    font-size: 15px;
    line-height: 14px;
  }
`;
