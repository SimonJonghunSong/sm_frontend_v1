import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX, CR } from "@/src/hooks/useSerial/constant";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";
import { FIELD_VALIDATIONS } from "constants/field";
import { useTranslations } from "next-intl";
import { SetStateAction, Dispatch, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useSendFormData() {
  const t = useTranslations();

  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const lang = useLangStore((state) => state.lang);
  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const alertBroadcastRef = useRef(new BroadcastChannel("err_alert"));
  const [isLoading, setIsLoading] = useState(false);

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const hasErrorRef = useRef(false);

  const sendFormData = async (
    formData: { [key: string]: FormField },
    setFormData?: Dispatch<SetStateAction<{ [key: string]: FormField }>>
  ) => {
    setIsLoading(true);
    console.log("Form values:", formData);
    const sortedFormData = Object.entries(formData)
      .sort((a, b) => {
        return a[0].localeCompare(b[0]);
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    console.log("Sorted form values:", sortedFormData);

    // 1. 키-값 쌍 배열로 변환
    const entries = Object.entries(sortedFormData);
    // 2. 20개씩 자르되, id 앞 2자리가 다르면 분리
    const chunkSize = 20;
    const chunked = [];
    let currentChunk = [];
    let lastPrefix = null;
    for (let i = 0; i < entries.length; i++) {
      const [id, value] = entries[i];
      let realValue = (value as FormField).realValue;
      const isAlert = !!(value as FormField).alert_id;

      if (isAlert) {
        const alertId = (value as FormField).alert_id;
        const hex = Number(alertId).toString(16);

        realValue = `0${Number(realValue)}${hex.length < 2 ? `0${hex}` : hex}`;
      }

      const prefix = id.slice(0, 2);
      if (
        currentChunk.length === 0 ||
        currentChunk.length >= chunkSize ||
        lastPrefix !== prefix
      ) {
        if (currentChunk.length > 0) {
          chunked.push(currentChunk);
        }
        currentChunk = [{ id, value: realValue }];
        lastPrefix = prefix;
      } else {
        currentChunk.push({ id, value: realValue });
      }
    }
    if (currentChunk.length > 0) {
      chunked.push(currentChunk);
    }
    console.log("Chunked [{id, value}] arrays:", chunked);

    const sendMessages = chunked.map((chunk) => {
      const tabId = chunk[0].id.slice(0, 2);

      return `${tabId};${chunk
        .map(({ id, value }) => {
          const fieldId = id.slice(2);

          return `${fieldId}#${value}`;
        })
        .join(";")}`;
    });

    for (const message of sendMessages) {
      const handleAlert = (event: MessageEvent) => {
        const { data } = event;

        const errorMessage = (data as string)
          .trim()
          .split(CR)
          .find((msg) => msg.includes("ERR"));

        const errorParameterNo =
          errorMessage.split(";")[errorMessage.split(";").length - 1];

        const fieldName =
          FIELD_VALIDATIONS[errorParameterNo]?.title[lang] || "";

        toast.error(
          fieldName
            ? `[${fieldName} - ${errorParameterNo}] Error`
            : errorMessage
        );

        hasErrorRef.current = true;

        alertBroadcastRef.current.removeEventListener("message", handleAlert);
      };

      alertBroadcastRef.current.addEventListener("message", handleAlert);
      currentPort.port.isAlertSend = true;

      await delayPromise(100);

      write({
        data: `${AT_EDIT_PREFIX}${imei};${message}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });

      setTimeout(() => {
        alertBroadcastRef.current.removeEventListener("message", handleAlert);
        currentPort.port.isAlertSend = false;
      }, 500);
    }

    setTimeout(() => {
      if (setFormData) {
        if (!hasErrorRef.current) {
          toast.success(t("common.send_success"));
          setFormData((prev) =>
            Object.entries(prev).reduce((acc, [key, value]) => {
              acc[key] = {
                ...value,
                beforeValue: value.realValue,
                beforeAlertId: value.alert_id,
                beforeTextNum: value.text_num,
              };
              return acc;
            }, {} as { [key: string]: FormField })
          );
        }
        setIsLoading(false);
        hasErrorRef.current = false;
      } else {
        setIsLoading(false);
      }
    }, 100);
  };

  return { sendFormData, isLoading };
}
