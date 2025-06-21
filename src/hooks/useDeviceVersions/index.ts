import { AT_GET_DEVICE_VERSIONS } from "@/src/hooks/useSerial/constant";
import { useEffect } from "react";
import { useRef, useState } from "react";

function getBackupBatteryVoltage(value: string) {
  const voltageMap = {
    100: 4060,
    90: 3970,
    80: 3890,
    70: 3830,
    60: 3770,
    50: 3750,
    40: 3730,
    30: 3660,
    20: 3530,
    10: 3490,
    0: 3300,
  };

  const percentage = parseInt(value, 10);

  if (voltageMap.hasOwnProperty(percentage)) {
    return `${voltageMap[percentage].toLocaleString()} mV`; // mV
  } else {
    return "ERR";
  }
}

const getDeviceVersionsForString = (data: string) => {
  console.log("getDeviceVersionsForString@ ::::", data);

  const resSplit = data.split(";");
  // 6자리보다 적으면 데이터가 부족한 것이므로 null 처리
  const resNumber = resSplit.length < 6 ? null : resSplit[resSplit.length - 2];
  let resData = resSplit[resSplit.length - 1];

  let key = "";

  switch (resNumber) {
    case "01":
      key = "Main";
      break;
    case "02":
      key = "MCU";
      break;
    case "03":
      key = "ACCESSORY";
      break;
    case "04":
      key = "MODEM";
      break;
    case "05":
      key = "BLE";
      break;
    case "06":
      key = "WIFI";
      break;
    case "07":
      key = "RS232_EXT1";
      break;
    case "08":
      key = "RS232_EXT2";
      break;
    case "09":
      key = "MODEM_BYPASS_MCU";
      break;
    case "10":
      key = "GNSS";
      break;
    case "22":
      key = "BATTERY_VOLTAGE";

      if (resData.includes("Unknown CMD")) {
        resData = "NotSupport";
      } else {
        resData = getBackupBatteryVoltage(resData);
      }

      break;
    default:
      break;
  }

  return { key, value: resData };
};

export default function useDeviceVersions({
  isFechedPackage,
  currentPort,
  write,
}: {
  isFechedPackage: boolean;
  currentPort: any;
  write: any;
}) {
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deviceVersionsObjectRef = useRef<Record<string, string>>({});
  const deviceVersionsCount = useRef(0);
  const [deviceVersionsObject, setDeviceVersionsObject] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    deviceVersionsObjectRef.current = {};
    deviceVersionsCount.current = 0;
    setDeviceVersionsObject({});
  }, [currentPort?.port?.imei]);
  useEffect(() => {
    if (!currentPort?.port?.writable || !currentPort?.port?.readable) {
      return;
    }
    if (currentPort?.port?.isReadyToUse && isFechedPackage) {
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsFetched(true);
          setIsLoading(false);
          currentPort.port.isDeviceVersionsFetching = false;
          currentPort.port.onEndDeviceVersionsFetched = null;
          setDeviceVersionsObject({ ...deviceVersionsObjectRef.current });
        }, 8000); // ??? 소닉 메롱
        console.log("ready~~!!!");
        const DELAY_MS = 200;

        const commands = [];

        for (let i = 0; i < 10; i++) {
          const index = i + 1;
          const command = `${AT_GET_DEVICE_VERSIONS}${index}`;

          console.log("command :::", command);
          commands.push(command);
        }

        commands.forEach((command, index) => {
          setTimeout(async () => {
            currentPort.port.isDeviceVersionsFetching = true;
            currentPort.port.onEndDeviceVersionsFetched = (data) => {
              const { key, value } = getDeviceVersionsForString(data);
              deviceVersionsObjectRef.current[key] = value;
              deviceVersionsCount.current += 1;

              console.log(
                "deviceVersionsObjectRef.current :::",
                deviceVersionsObjectRef.current
              );

              console.log(
                "deviceVersionsCount.current :::",
                deviceVersionsCount.current
              );

              if (key === "MODEM" && !currentPort.modemVersion) {
                currentPort.modemVersion = value;
              }

              if (deviceVersionsCount.current === 10) {
                currentPort.port.isDeviceVersionsFetching = false;
                currentPort.port.onEndDeviceVersionsFetched = null;

                setIsFetched(true);
                setIsLoading(false);

                setDeviceVersionsObject({ ...deviceVersionsObjectRef.current });
              }
            };

            await write({
              data: command,
              port: currentPort.port,
              writer: currentPort.writer,
            });
          }, index * DELAY_MS); // 각 명령마다 100ms씩 지연
        });
      }, 10);
    }
  }, [
    currentPort?.port?.isReadyToUse,
    currentPort?.port?.writable,
    currentPort?.port?.readable,
    isFechedPackage,
  ]);

  return { deviceVersionsObject, isLoading, isFetched };
}
