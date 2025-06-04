import { Button, Divider } from "@mui/material";

import { Stack } from "@mui/material";
import SwitchField from "../../(components)/SwitchField";
import TextInputField from "../../(components)/TextInputField";
import { FormField } from "../../page";
import { useTranslations } from "next-intl";
import useSendFormData from "../../(utils)/useSendFormData";
import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const fieldIds = ["1046", "1047", "1048", "1049", "1050"];

export default function InputOutputConfig({
  formData,
  onChange,
  setFormData,
}: Props) {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);

  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

  return (
    <>
      <Form>
        <Stack direction="row" gap={"24px"}>
          <Stack gap={"24px"} flex={1}>
            <SwitchField
              id="1046"
              formData={formData}
              onChange={onChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1046")}
              isForceRender
            />
            <TextInputField
              type="number"
              id="1047"
              formData={formData}
              onChange={onChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1047")}
              isForceRender
            />
          </Stack>

          <Stack gap={"24px"} flex={1}>
            <TextInputField
              type="number"
              id="1048"
              formData={formData}
              onChange={onChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1048")}
              isForceRender
            />
            <TextInputField
              type="number"
              id="1049"
              formData={formData}
              onChange={onChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1049")}
              isForceRender
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            id="geofence-config-submit"
            color="secondary"
            variant="contained"
            disabled={isLoading || !isDirtyFields.length}
            onClick={(e) => {
              e.preventDefault();

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
              console.log("Form values:", fieldValues);

              // 여기에 데이터 제출 로직 추가
              sendFormData(fieldValues, setFormData);
            }}
          >
            {t("notify.send")}
          </Button>
        </Stack>
      </Form>
      <Divider />
    </>
  );
}

const Form = styled.div`
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
