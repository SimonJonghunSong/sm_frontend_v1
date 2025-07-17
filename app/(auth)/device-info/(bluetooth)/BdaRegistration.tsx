import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Checkbox,
  Divider,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal from "@/components/Modal";
import InputBox from "@/components/inputbox/InputBox";
import DataTable from '@/components/dataTable';
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { useForm, Controller } from "react-hook-form";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import useLangStore from "@/utils/useLangStore";
import { AT_EDIT_PREFIX, AT_REQ, CR } from "@/src/hooks/useSerial/constant";
import { delayPromise } from "@/src/hooks/useSerial";

interface Props {
  formData: any;
  onChange: (id: string, value: string) => void;
  isReady: boolean;
  write: any;
  port: any;
  originData: any;
}

const fieldIds = ["4300", "4301", "4302"]; // BDA 관련 필드들

const BdaRegistration = ({
  formData,
  onChange,
  isReady,
  write,
  port,
  originData,
}: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const bdaRegistrationRef = useRef<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [detailModal, setDetailModal] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);

  // info에서 max값 추출
  const infoFields = originData?.find((item: any) => Object.keys(item)[0] === "Register BDA");
  const maxCount = infoFields?.["Register BDA"]?.[0]?.info?.[0]?.max ? Number(infoFields["Register BDA"][0].info[0].max) : 100;

  // 테이블 컬럼 정의
  const columns: GridColDef[] = [
    {
      field: 'col1',
      headerName: t("configuration.ble.point"),
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'col2',
      headerName: t("configuration.ble.active"),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'col3',
      headerName: t("configuration.ble.mac_address"),
      flex: 1,
      minWidth: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'col4',
      headerName: 'data',
      flex: 1,
      minWidth: 50,
      align: 'center',
      headerAlign: 'center',
    },
    {
        field: "col12",
        headerName: t("configuration.driver.edit"),
        width: 80,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <IconButton
            sx={{ width: 24, height: 24 }}
            // onClick={() => handleEditBle(row)}
            onClick={() => handleEditBda({
              col1: row.col1,
              col2: row.col2,
              col3: row.col3,
              col4: row.col4,
            })}
          >
            <EditOutlinedIcon sx={{ width: 22, height: 22 }} />
          </IconButton>
        ),
      },
      {
        field: "col13",
        headerName: t("configuration.driver.delete"),
        width: 80,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <IconButton
            sx={{ width: 24, height: 24 }}
            // onClick={() => handleDeleteBle(row.id)}
            onClick={() => handleDeleteBda(row)}
          >
            <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
          </IconButton>
        ),
      },
  
  ];

  // 모델명 추출
  const modelInfo = originData?.[0]?.info?.[0];
  const modelName = modelInfo?.S;

  // ST4315B 모델에서만 BDA Registration 표시
  if (modelName !== "ST4315B") return null;
  
  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleAddBda = (addData: string) => {
    console.log("handleAddBda2/addData------", addData);
    // console.log("port:", port);
    // console.log("port.port:", port.port);
    // console.log("port.port.writable:", port.port?.writable);
    setIsLoading(true);
    write({
      data: `${AT_EDIT_PREFIX}${port.imei};${addData}`,
      port: port.port,
      writer: port.writer,
    });
    delayPromise(500).then(() => {
      fetch();
    });
  };

  // // BLE Registration 용 삭제 함수 (id만 받음)
  // const handleDeleteBle = (id: number) => {
  //   console.log("handleDeleteItem/id------", id);
  //   // return;
  //   setIsLoading(true);

  //   // 모델명 추출
  //   const modelInfo = originData?.[0]?.info?.[0];
  //   const modelName = modelInfo?.S;

  //   // 모델별로 0의 길이 다르게 처리
  //   const zeroLength = modelName === "ST4315B" ? 38 : 36;
  //   const zeroString = "0".repeat(zeroLength);

  //   // 전송할 데이터 구성
  //   const deleteData = `${AT_EDIT_PREFIX}${port.imei};43;${(id - 1)
  //     .toString()
  //     .padStart(2, "0")}#${zeroString}`;

  //   write({
  //     data: deleteData,
  //     port: port.port,
  //     writer: port.writer,
  //   });
  //   delayPromise(100).then(() => {
  //     fetch();
  //   });
  // }
  // BDA Registration 용 삭제 함수 (row 전체 받음)
  const handleDeleteBda = (row: any) => {
    console.log("handleDeleteBda2/row----", row);
    // row: { col1, col2, col3, col4 }
    // active만 0(Off)로, 나머지는 그대로 사용
    const point = (row.col1 - 1).toString().padStart(2, "0");
    const active = "00"; // Off
    const macAddress = row.col3.padEnd(12, "0");
    const enableData = row.col4 === "On" ? "01" : "00";
    const data = `43;${point}#${active}${macAddress}${enableData}`;
    const cmd = `${AT_EDIT_PREFIX}${port.imei};${data}`;
    console.log("[BDA DELETE CMD]", cmd);
    setIsLoading(true);
    write({
      data: cmd,
      port: port.port,
      writer: port.writer,
    });
    delayPromise(100).then(() => {
      fetch();
    });
  };

  // // BLE Registration 용 수정 함수 (row 전체 받음)
  // const handleEditBle = (row: any) => {
  //   console.log("handleEditBle/row------1111111111111", row);
  //   setEditRow({
  //     point: row.col1,
  //     active: row.col2 === "On",
  //     type: row.col3,
  //     id: row.col4,
  //     enterAlert: row.col5 === "On",
  //     exitAlert: row.col6 === "On",
  //     temperatureMin: row.col7,
  //     temperatureMax: row.col8,
  //     humidityMin: row.col9,
  //     humidityMax: row.col10,
  //   });
  //   setDetailModal(true);
  // };

  const generateRegistrationRange = (maxCount: number) => {
    const range = Array.from({ length: maxCount }, (_, i) =>
      i.toString().padStart(2, "0")
    ).join(",");
    return range;
  };

  const range = generateRegistrationRange(maxCount);

  const fetch = async () => {
    console.log("=== BDA Registration Fetch Start ===");
    setIsLoading(true);
    const total = 100;
    const batchSize = 20;
    let allResults: any[] = [];

    const sendBatch = (start: number) => {
      return new Promise<void>((resolve) => {
        const indices = Array.from({ length: batchSize }, (_, i) => (start + i).toString().padStart(2, "0"))
          .filter(idx => parseInt(idx) < total)
          .join(",");
        const command = `${AT_REQ}${port.imei};43;${indices}`;
        
        console.log(`[SEND] Batch ${start}-${start + batchSize - 1}: ${command}`);

        let responseTimeout: NodeJS.Timeout | null = null;

        port.port.onbuffervalue = (data: string) => {
          bdaRegistrationRef.current += data;
          if (!data.includes('\r')) return;

          const fullData = bdaRegistrationRef.current;
          bdaRegistrationRef.current = "";

          if (!fullData.startsWith("RRE")) {
            port.port.onbuffervalue = null;
            setTimeout(() => resolve(), 50);
            if (responseTimeout) {
              clearTimeout(responseTimeout);
              responseTimeout = null;
            }
            return;
          }

          const parts = fullData.split(";");
          const dataParts = parts.slice(3);

          for (const item of dataParts) {
            const [key, value] = item.split("#");
            if (!value || value.trim() === "" || value === "NoData" || value.includes('\r')) {
              continue;
            }
            const parsedData = {
              id: parseInt(key) + 1,
              col1: parseInt(key) + 1,
              col2: value.slice(0, 2) === "01" ? "On" : "Off", // Active
              col3: value.slice(2, 14), // MAC Address
              col4: value.slice(14, 16) === "01" ? "On" : "Off", // Enable Data
            };
            allResults.push(parsedData);
          }

          // 타임아웃 해제
          if (responseTimeout) {
            clearTimeout(responseTimeout);
            responseTimeout = null;
          }
          port.port.onbuffervalue = null;
          setTimeout(() => resolve(), 50);
        };

        write({
          data: command,
          port: port.port,
          writer: port.writer,
        });

        responseTimeout = setTimeout(() => {
          if (responseTimeout) {
            console.log(`[TIMEOUT] Batch ${start}-${start + batchSize - 1} timeout`);
            port.port.onbuffervalue = null;
            resolve();
            responseTimeout = null;
          }
        }, 15000);
      });
    };

    for (let i = 0; i < total; i += batchSize) {
      console.log(`[PROCESS] Starting batch ${i}-${i + batchSize - 1}`);
      
      // 명령어 간 delay 50ms
      if (i > 0) {
        await delayPromise(50);
      }
      
      await sendBatch(i);
      console.log(`[PROCESS] Completed batch ${i}-${i + batchSize - 1}`);
    }

    console.log(`[FINAL] All results:`, allResults);
    setRows(allResults);
    setIsLoading(false);
    console.log("=== BDA Registration Fetch End ===");
  };

  useEffect(() => {
    if (!originData) {
      console.error("기기 연결이 해제되었습니다. USB 연결을 확인하세요.");
      return;
    }
    fetch();
  }, [isReady]);

  const handleEditBda = (row: any) => {
    console.log("handleEditBda2/row------", row);
    setEditRow(row);
    setDetailModal(true);
  };

  return (
    <Container>
      <Divider sx={{ mb: 2 }} />
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Stack direction="row" alignItems="center" gap="16px">
          <h1>BDA Registration</h1>
          <InputBox.Number>43</InputBox.Number>
        </Stack>
        <Stack direction="row" gap="16px" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={() => setDetailModal(true)}>
            {t('configuration.ble.add')}
          </Button>
        </Stack>
        <DataTable
          rows={rows}
          columns={columns}
          loading={isLoading}
          checkbox={true}
          noDataMessage={t('configuration.ble.no_registered_bda')}
          rowHeight={52}
          onRowSelectionModelChange={() => {}}
        />
      </form>
      {detailModal && (
        <BdaDetailModal
          onClose={() => setDetailModal(false)}
          handleConfirm={handleAddBda}
          defaultValues={editRow}
          maxCount={maxCount}
          originData={originData}
        />
      )}
    </Container>
  );
};

function BdaDetailModal({
  onClose,
  handleConfirm,
  defaultValues,
  maxCount,
  originData,
}: {
  onClose: () => void;
  handleConfirm: (values: string) => void;
  defaultValues?: any;
  maxCount: number;
  originData: any;
}) {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  
  const form = useForm({
    mode: "onSubmit",
    defaultValues: defaultValues
      ? {
          point: (defaultValues.col1 - 1).toString().padStart(2, "0"),
          active: defaultValues.col2 === "On",
          macAddress: defaultValues.col3,
          enableData: defaultValues.col4 === "On",
        }
      : {
          point: "00",
          active: false,
          macAddress: "000000000000",
          enableData: false,
        },
  });

  const handleModalConfirm = () => {
    const values = form.getValues();

    const point = values.point;
    const active = values.active ? "01" : "00";
    const macAddress = values.macAddress.padEnd(12, "0");
    const enableData = values.enableData ? "01" : "00";

    const data = `43;${point}#${active}${macAddress}${enableData}`;

    handleConfirm(data);
    onClose();
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={defaultValues ? t("configuration.ble.edit_bda") : t("configuration.ble.add_bda")}
      confirm={form.handleSubmit(handleModalConfirm)}
      confirmButtonText={
        defaultValues ? t("configuration.ble.edit") : t("configuration.ble.add")
      }
      width="600px"
      disabled={!form.formState.isDirty}
      manualToggleOpenWhenConfirm
    >
      <Stack direction="column" gap="16px" flex={1}>
        <InputBox style={{ flex: 1 }}>
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.ble.point")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"point"}
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_ERRORS.required(
                      t("configuration.ble.point")
                    )[lang],
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    placeholder={t("configuration.ble.select")}
                    error={!!error}
                    helperText={error?.message}
                  >
                    {Array.from({ length: maxCount }, (_, i) => (
                      <MenuItem key={i} value={i.toString().padStart(2, "0")}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.ble.active")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"active"}
                control={form.control}
                render={({ field }) => (
                  <SwitchPrimary
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox style={{ flex: 1 }}>
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.ble.mac_address")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"macAddress"}
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_ERRORS.required(t("configuration.ble.mac_address"))[lang],
                  },
                  pattern: {
                    value: /^[0-9A-Fa-f]{0,12}$/,
                    message: "Hex characters (0-9, A-F) only, max 12 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Maximum 12 characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    placeholder="000000000000"
                    error={!!error}
                    helperText={error?.message}
                    inputProps={{
                      maxLength: 12,
                      style: { textTransform: 'uppercase' }
                    }}
                  />
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.ble.data_in_bda")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"enableData"}
                control={form.control}
                render={({ field }) => (
                  <SwitchPrimary
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>
      </Stack>
    </Modal>
  );
}

export default BdaRegistration;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`; 