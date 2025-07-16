import { Button, Divider } from "@mui/material";

import { Stack } from "@mui/material";
import SwitchField from "../../(components)/SwitchField";
import TextInputField from "../../(components)/TextInputField";
import { FormField } from "app/(auth)/device-info/page";
import { useTranslations } from "next-intl";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import styled from "styled-components";
import useSerial from "@/src/hooks/useSerial";
import useSerialStore from "@/src/stores/useSerialStore";
import useParameterStore from "@/utils/useParameterStore";

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
  const { state, func } = useSerial();
  const { portList } = state;
  const { hiddenParameter } = useParameterStore();

  // 값 조회 및 반영 useEffect
  useEffect(() => {
    if (
      !hiddenParameter &&
      portList.length > 0 &&
      portList[0].port &&
      portList[0].writer
    ) {
      const port = portList[0].port;
      const writer = portList[0].writer;

      port.onbuffervalue = (msg: string) => {
        // USP(unsupported) 응답은 무시
        if (msg.startsWith("USP;")) {
          console.log("[InputOutputConfig] USP(unsupported) 응답 무시:", msg);
          return;
        }
        if (msg.startsWith("RRE;")) {
          console.log("[InputOutputConfig] 수신된 응답:", msg);
          const parts = msg.split(";");
          const paramMap: Record<string, string> = {};
          for (let i = 3; i < parts.length; i++) {
            const split = parts[i].split("#");
            if (split.length === 2) {
              const at = split[0].trim();
              const value = split[1].trim();
              const paramId = `10${at}`;
              if (["1046","1047","1048","1049"].includes(paramId) && value !== "USP") {
                paramMap[paramId] = value;
              }
            }
          }
          setFormData((prev) => {
            const next = { ...prev };
            ["1046","1047","1048","1049"].forEach((id) => {
              if (paramMap[id] && paramMap[id] !== "USP") {
                next[id] = {
                  ...next[id],
                  realValue: paramMap[id],
                };
              }
            });
            return next;
          });
        }
      };

      const command = "AT^REQ;;10;46,47,48,49";
      console.log("[InputOutputConfig] 전송 명령:", command);
      func.write({
        data: command,
        port,
        writer,
      });
    }
    return () => {
      if (portList.length > 0 && portList[0].port)
        portList[0].port.onbuffervalue = undefined;
    };
  }, [hiddenParameter, portList, setFormData]);

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
