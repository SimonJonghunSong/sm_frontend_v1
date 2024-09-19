import { useEffect, useRef, useState } from "react";

export const HEALTH_CHECK = "AT^$PSTRdy\nAT^$PSTVer;1234";
export const AT_GET_JSON_PACKAGE_COUNT_COMMAND = "AT^$PSTGetJson";
export const AT_GET_JSON = "AT^$ReqJsonPk;No;";

const STX = String.fromCharCode(0x02); // Start of Text
const ETX = String.fromCharCode(0x03); // End of Text
// const vid_pid = (port: SerialPort) => {
//   const info = port.getInfo();
//   return info.usbVendorId + ":" + info.usbProductId;
// };

const options = {
  baudRate: 115200,
};

export const useConnectionStore = () => {
  const portRef = useRef<SerialPort | null>(null);
  const writerRef = useRef<WritableStreamDefaultWriter<Uint8Array> | null>(
    null
  ); // writer 상태 저장
  const writableStreamClosedRef = useRef(null);
  const readerRef = useRef<ReadableStreamDefaultReader<string> | null>(null);
  const bufferRef = useRef<string>(""); // 버퍼를 useRef로 관리

  const readableStreamClosedRef = useRef(null);

  const [jsonPackets, setJsonPackets] = useState<string[]>([]); // 완성된 패킷들을 저장할 배열
  const [isReady, setIsReady] = useState(false);
  const [modelName, setModelName] = useState<string>();
  const [totalJsonGrpCount, setTotalJsonGrpCount] = useState<number>();

  const getPort = async () => {
    if (!navigator.serial) return false;

    try {
      const ports = await navigator.serial.getPorts();
    } catch (error) {
      console.log(error);
    }
  };

  const selectPort = async () => {
    try {
      if (!navigator.serial) return false;

      portRef.current = await navigator.serial.requestPort();
      await portRef.current.open(options);

      await monitor();
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const connect = async () => {
    if (!portRef.current) return;
    try {
      await portRef.current.open(options);
    } catch (e) {
      console.error(e);
      window.alert(e.message);
    }
  };

  const monitor = async () => {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = portRef.current.readable.pipeTo(
      textDecoder.writable
    );
    readableStreamClosedRef.current = readableStreamClosed;
    const reader = textDecoder.readable.getReader();
    readerRef.current = reader;

    while (true) {
      const { value, done } = await readerRef.current.read();

      // HEALTH CHECK & MODEL INFO
      if (value.includes("$PST;Rdy") || value.includes("$PST;Ver;")) {
        const splited = value.trim().split(";")[3];

        if (value.includes("$PST;Rdy") && splited === "UP") {
          setIsReady(true);
        }
        if (value.includes("$PST;Ver;")) {
          setModelName(splited);
        }
      } else if (value.includes("$PST;StartJSON;TotalGrpNo;")) {
        const splited = value.trim().split(";")[4];
        setTotalJsonGrpCount(Number(splited));
      } else {
        processIncomingData(value); // 수신된 데이터를 처리
      }

      if (done) {
        readerRef.current.releaseLock();
        break;
      }
    }
  };

  // STX와 ETX를 기준으로 데이터를 처리하는 함수
  const processIncomingData = (data: string) => {
    for (let i = 0; i < data.length; i++) {
      const char = data[i];

      if (char === STX) {
        // STX가 나타나면 버퍼를 초기화하고 데이터 수집 시작
        bufferRef.current = "";
      } else if (char === ETX) {
        // ETX가 나타나면 패킷이 완성되었으므로 배열에 추가
        const packet = bufferRef.current;

        setJsonPackets((prev) => [...prev, packet]);
        bufferRef.current = ""; // 버퍼 초기화
      } else {
        // 버퍼에 데이터 추가
        bufferRef.current += char;
      }
    }
  };

  const write = async (data: string) => {
    if (portRef.current && portRef.current.writable) {
      try {
        console.log(`Sending command: ${data}`);

        // 이미 writer가 존재하는지 확인
        if (!writerRef.current) {
          writerRef.current = portRef.current.writable.getWriter(); // 새로운 writer 생성
        }

        // 문자열을 Uint8Array로 변환
        const encodedData = new TextEncoder().encode(data + "\n");

        await writerRef.current.write(encodedData); // Uint8Array 전송
      } catch (e) {
        console.error("Error writing command:", e);
      }
    } else {
      console.error("Port is not writable or not available");
    }
  };

  const close = async () => {
    if (readerRef.current) {
      await readerRef.current.cancel();
      await readableStreamClosedRef.current.catch(() => {});
    }
    if (writerRef.current) {
      writerRef.current.close();
      await writableStreamClosedRef.current;
    }
    if (portRef.current) {
      await portRef.current.close();
    }
  };

  useEffect(() => {
    navigator.serial.addEventListener("disconnect", close);

    return () => {
      navigator.serial.removeEventListener("disconnect", close);
    };
  }, []);

  return {
    state: {
      jsonPackets,
      isReady,
      modelName,
      totalJsonGrpCount,
    },
    func: { selectPort, connect, write, close, getPort },
  };
};
