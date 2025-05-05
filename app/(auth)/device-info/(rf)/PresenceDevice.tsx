import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import TextInputField from "app/(auth)/device-info/(components)/TextInputField";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";

// Invalid serial number. 에러 추가 필요(어떤 정규식을 사용해야하는지 알아봐야함)
interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}
const tooltipText = {
  en: "The serial number of the Presence function.\n* It consists of 9 or 10 numeric digits.\n* For ST4410 Series : The serial number is 9 digits, starting from the second digit of the ESN.",
  ps: "O número de série da função de Presença.\n* Consiste em 9 ou 10 dígitos numéricos.\n* Para a Série ST4410: O número de série tem 9 dígitos, começando pelo segundo dígito do ESN.",
  es: "El número de serie de la función de Presencia.\n* Consiste en 9 o 10 dígitos numéricos.\n* Para la serie ST4410: El número de serie es de 9 dígitos, comenzando desde el segundo dígito del ESN.",
};

const error = {};

const fieldsIds = [
  "2571",
  "2572",
  "2573",
  "2574",
  "2575",
  "2576",
  "2577",
  "2578",
  "2579",
  "2580",
];

const PresenceDevice = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);

  if (!hasFormDataFields(formData, fieldsIds)) return null;

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
          // 탭에 있는 필드만 포함
          if (fieldsIds.includes(key)) {
            acc[key] = {
              id: key,
              value: formData[key].value,
              realValue: formData[key].realValue,
            };
          }
          return acc;
        }, {});

        // 필드 값들을 사용하여 수행할 작업
        console.log("Form values:", fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1>{t("configuration.rf.presence_device")}</h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
        </Stack>
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
        <Stack direction="column" gap={"16px"} flex={1}>
          <TextInputField
            id="2571"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2572"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2573"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2574"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2575"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
        </Stack>
        <Stack direction="column" gap={"16px"} flex={1}>
          <TextInputField
            id="2576"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2577"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2578"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2579"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TextInputField
            id="2580"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button color="secondary" variant="contained" type="submit">
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default PresenceDevice;

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
