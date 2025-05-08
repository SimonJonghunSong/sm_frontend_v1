import useSerial from "@/src/hooks/useSerial";
import { AT_EDIT_PREFIX } from "@/src/hooks/useSerial/constant";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { FormField } from "app/(auth)/device-info/page";

export default function useSendFormData() {
  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const sendFormData = (formData: { [key: string]: FormField }) => {
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
      const realValue = (value as FormField).realValue;

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

    console.log("writable :::", currentPort.port.writable);

    sendMessages.forEach((message) => {
      write({
        data: `${AT_EDIT_PREFIX}${imei};${message}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    });
  };

  return { sendFormData };
}
