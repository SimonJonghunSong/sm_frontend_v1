import useSerial from "@/src/hooks/useSerial";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

const Commands = ({ data, imei }: { data: any; imei: string }) => {
  const t = useTranslations();
  const {
    func: { write },
    state: { portList },
  } = useSerial();
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const commands = data.find((item) => item.info.hdr === "CMD");
  const fields = commands?.fields[0].list[0];

  const transformedFields = fields
    ? Object.values(fields)
        .map((field: string) => {
          const parts = field.split(";");
          const jsonId = parts[parts.length - 1];
          const title = parts[1];
          const middlePart = `${parts[2]};${parts[3]}`;

          return {
            JSON_ID: jsonId,
            title: title,
            middlePart: middlePart,
          };
        })
        .filter((field) => field.middlePart === "0;2")
    : [];

  const handleSend = async (jsonId: string) => {
    const prefixJsonId = jsonId.slice(0, 2);
    const suffixJsonId = jsonId.slice(2, 4);
    await write({
      data: `AT^CMD;${imei};${prefixJsonId};${suffixJsonId}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  return (
    <div>
      <Stack flexWrap="wrap" direction="row" gap={"40px"}>
        {transformedFields.map((field) => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              width="calc(50% - 20px)"
            >
              <Stack flex={1}>{field.title}</Stack>
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ height: 30 }}
                  onClick={() => handleSend(field.JSON_ID)}
                >
                  {t("configuration.commands.send")}
                </Button>
              </div>
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
};

export default Commands;

/**
   * fields의 값 형식
   * ;0;2 형식들은 버튼 타입
   * [{JSON_ID: 0101, title: "ReqConMntSvr", }, {JSON_ID: 0102, title: "ReqIMSI"}, {JSON_ID: 0103, title: "ReqICCID"},,,]
 * 0
: 
"0;ReqConMntSvr;0;2;0101"
1
: 
"1;ReqIMSI;0;2;0102"
2
: 
"2;ReqICCID;0;2;0103"
3
: 
"3;ReqConNtw;0;2;0104"
4
: 
"4;ReqOwnNo;0;2;0105"
5
: 
"5;SetGoogleMap;96;0;0202"
6
: 
"6;ReqGoogleMap;0;2;0203"
7
: 
"7;StatusReq;0;2;0301"
8
: 
"8;Reset;0;2;0302"
9
: 
"9;Reboot;0;2;0303"
10
: 
"10;ReqVer;1;1;0304"
11
: 
"11;EraseAll;0;2;0502"
12
: 
"12;SetOdometer;1000000000;0;0503"
13
: 
"13;InitMsgNo;0;2;0504"
14
: 
"14;SetHMeter;999999;0;0505"
15
: 
"15;InitCircleGeo;0;2;0506"
16
: 
"16;Request Server Lock;0;2;0109"
17
: 
"17;ReqSttAssignmap;0;2;0507"
18
: 
"18;ReqAltAssignmap;0;2;0508"
19
: 
"19;ReqOBD_Prot;0;2;0601"
20
: 
"20;ReqOBD_AvailPID;0;2;0602"
21
: 
"21;ReqOBD_VIN;0;2;0603"
22
: 
"22;ReqOBD_DTC;0;2;0604"
23
: 
"23;StartBleScan;0;2;0630"
24
: 
"24;StopBleScan;0;2;0631"
25
: 
"25;InitBleReg;0;2;0632"
26
: 
"26;ExistenceBleUUID;0;2;0633"
 */
// CMD;IMEI;JSON_ID[0-1];JSON_ID[2-4]
