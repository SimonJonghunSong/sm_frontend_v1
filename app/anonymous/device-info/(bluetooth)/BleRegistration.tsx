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
} from "@mui/material";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { SECTIONS } from "constants/searchField";
import DataTable from "@/components/dataTable";
import useModal from "@/utils/useModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { Controller, useController, useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import { hasFormDataFields } from "../(utils)/@index";
import { SerialPortState } from "@/src/stores/useSerialStore";
import { AT_EDIT_PREFIX, AT_REQ, CR } from "@/src/hooks/useSerial/constant";
import { delayPromise } from "@/src/hooks/useSerial";

const fieldIds = ["4100"];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  write: any;
  port: SerialPortState;
  isReady: boolean;
}

const BleRegistration = ({
  formData,
  onChange,
  write,
  port,
  isReady,
}: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const bleRegistrationRef = useRef<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [detailModal, detailModalToggle] = useModal();
  const [editRow, setEditRow] = useState<{
    point: number;
    active: boolean;
    type: string;
    id: string;
    enterAlert: boolean;
    exitAlert: boolean;
    temperatureMin: string;
    temperatureMax: string;
    humidityMin: string;
    humidityMax: string;
  } | null>(null);

  const [rows, setRows] = useState<
    {
      id: number;
      type: string;
      col1: number;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
      col6: string;
      col7: string;
      col8: string;
      col9: string;
      col10: string;
    }[]
  >([]);
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("configuration.ble.point"),
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("configuration.ble.active"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: t("configuration.ble.sensor"),
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row.col3 === "00"
          ? "-"
          : row.col3 === "01"
          ? "ELA PUCK RHT"
          : "ELA COIN T";
      },
    },
    {
      field: "col4",
      headerName: t("configuration.ble.id"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: t("configuration.ble.enter_alert"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col6",
      headerName: t("configuration.ble.exit_alert"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col7",
      headerName: t("configuration.ble.temperature_(°c)"),
      maxWidth: 140,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) =>
        `${parseInt(row.col7, 16)}°C / ${parseInt(row.col8, 16)}°C`,
    },
    {
      field: "col8",
      headerName: t("configuration.ble.humidity_(%)"),
      maxWidth: 140,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) =>
        `${parseInt(row.col9, 16) / 10}% / ${parseInt(row.col10, 16) / 10}%`,
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
          onClick={() => {
            setEditRow({
              point: row.col1,
              active: row.col2 === "On",
              type: row.type,
              id: row.col4,
              enterAlert: row.col5 === "On",
              exitAlert: row.col6 === "On",
              temperatureMin: row.col7,
              temperatureMax: row.col8,
              humidityMin: row.col9,
              humidityMax: row.col10,
            });

            setTimeout(() => {
              detailModalToggle();
            }, 0);
          }}
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
          onClick={() => handleDeleteItem(row.id)}
        >
          <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
  ];

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleAddItem = (addData: string) => {
    setIsLoading(true);
    write({
      data: `${AT_EDIT_PREFIX}${port.imei};${addData}`,
      port: port.port,
      writer: port.writer,
    });
    delayPromise(100).then(() => {
      fetch();
    });
  };

  const handleDeleteItem = (id: number) => {
    setIsLoading(true);
    write({
      data: `${AT_EDIT_PREFIX}${port.imei};41;${(id - 1)
        .toString()
        .padStart(2, "0")}#000000000000000000000000000000000000`,
      port: port.port,
      writer: port.writer,
    });
    delayPromise(100).then(() => {
      fetch();
    });
  };

  const fetch = () => {
    port.port.onbuffervalue = (data) => {
      bleRegistrationRef.current += data;

      if (data.includes(CR)) {
        const bleRegistrationData = bleRegistrationRef.current;

        const parts = bleRegistrationData.split(";");
        const dataParts = parts.slice(3);
        // 추출할 키 목록
        const targetKeys = ["00", "01", "02", "03", "04"];

        // 결과 생성
        const result = {};

        for (const item of dataParts) {
          const [key, value] = item.split("#");
          if (targetKeys.includes(key)) {
            result[key] = value.trim();
          }
        }

        const bleData = Object.values(result).reduce(
          (acc, ble: string, idx) => {
            if (ble === "NoData") return acc;

            (acc as Array<any>).push({
              id: idx + 1,
              type: "1",
              col1: idx + 1,
              col2: ble.slice(2, 4) === "01" ? "On" : "Off",
              col3: ble.slice(0, 2),
              col4: ble.slice(4, 16),
              col5: ble.slice(16, 18) === "01" ? "On" : "Off",
              col6: ble.slice(18, 20) === "01" ? "On" : "Off",
              col7: ble.slice(24, 28),
              col8: ble.slice(20, 24),
              col9: ble.slice(32, 36),
              col10: ble.slice(28, 32),
            });
            return acc;
          },
          []
        );

        bleRegistrationRef.current = "";
        console.log("bleData :::", bleData);
        setRows(bleData as any);
        setIsLoading(false);
        port.port.onbuffervalue = null;
      }
    };

    write({
      data: `${AT_REQ}${port.imei};41;00,01,02,03,04`,
      port: port.port,
      writer: port.writer,
    });
  };

  useEffect(() => {
    fetch();
  }, [isReady]);

  return (
    <>
      <Container
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap="16px">
            <h1 data-section-id={SECTIONS.BleRegistration.en}>
              {SECTIONS.BleRegistration[lang]}
            </h1>
            <InputBox.Number>41</InputBox.Number>
          </Stack>
        </Stack>

        <Stack direction="row" gap="16px" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              detailModalToggle();
            }}
          >
            {t("configuration.ble.add")}
          </Button>
        </Stack>
        <DataTable
          noDataMessage={t("configuration.ble.no_registered_ble")}
          loading={isLoading}
          rows={rows}
          columns={columns}
          rowHeight={52}
          onRowSelectionModelChange={() => {}}
        />
      </Container>

      {detailModal && (
        <DetailModal
          onClose={() => {
            setEditRow(null);
            detailModalToggle();
          }}
          openErrorPopup={() => {}}
          handleConfirm={handleAddItem}
          filterNumbers={rows.map((row) => row.col1)}
          defaultValues={editRow}
        />
      )}
    </>
  );
};

export default BleRegistration;

const Container = styled.div`
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
`;

function DetailModal({
  onClose,
  openErrorPopup,
  handleConfirm,
  filterNumbers,
  defaultValues,
}: {
  onClose: () => void;
  openErrorPopup: (
    message: string,
    options?: { title: string; onErrorPopupOk?: () => void }
  ) => void;
  handleConfirm: (values: string) => void;
  filterNumbers: number[];
  defaultValues?: {
    point: number;
    active: boolean;
    type: string;
    id: string;
    enterAlert: boolean;
    exitAlert: boolean;
    temperatureMin: string;
    temperatureMax: string;
    humidityMin: string;
    humidityMax: string;
  };
}) {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const form = useForm({
    mode: "onSubmit",
    defaultValues: defaultValues
      ? {
          point: (defaultValues.point - 1).toString().padStart(2, "0"),
          active: defaultValues.active,
          type: defaultValues.type.padStart(2, "0"),
          id: defaultValues.id,
          enterAlert: defaultValues.enterAlert,
          exitAlert: defaultValues.exitAlert,
          temperatureMin: parseInt(defaultValues.temperatureMin, 16),
          temperatureMax: parseInt(defaultValues.temperatureMax, 16),
          humidityMin: parseInt(defaultValues.humidityMin, 16) / 10,
          humidityMax: parseInt(defaultValues.humidityMax, 16) / 10,
        }
      : {
          point: "00",
          active: false,
          type: "00",
          id: "",
          enterAlert: false,
          exitAlert: false,
          temperatureMin: "",
          temperatureMax: "",
          humidityMin: "",
          humidityMax: "",
        },
  });

  const temperatureMinControl = useController({
    control: form.control,
    name: "temperatureMin",
  });
  const temperatureMaxControl = useController({
    control: form.control,
    name: "temperatureMax",
  });
  const humidityMinControl = useController({
    control: form.control,
    name: "humidityMin",
  });
  const humidityMaxControl = useController({
    control: form.control,
    name: "humidityMax",
  });

  const temperatureErrors = new Set(
    form.formState.isSubmitted
      ? [
          temperatureMinControl.fieldState.error?.message,
          temperatureMaxControl.fieldState.error?.message,
        ]
      : []
  );
  const humidityErrors = new Set(
    form.formState.isSubmitted
      ? [
          humidityMinControl.fieldState.error?.message,
          humidityMaxControl.fieldState.error?.message,
        ]
      : []
  );

  const validateTemperatureRange = (value, context) => {
    const min = context.getValues("temperatureMin");
    const max = context.getValues("temperatureMax");
    if (min === "" || max === "") return true;
    if (Number(min) >= Number(max)) {
      return FIELD_ERRORS.temperatureRange[lang]; // "최소값은 최대값보다 작아야 합니다" 등
    }
    return true;
  };

  const validateHumidityRange = (value, context) => {
    const min = context.getValues("humidityMin");
    const max = context.getValues("humidityMax");
    if (min === "" || max === "") return true;
    if (Number(min) >= Number(max)) {
      return FIELD_ERRORS.humidityRange[lang];
    }
    return true;
  };

  const handleModalConfirm = () => {
    const values = form.getValues();

    const point = values.point;
    const active = values.active ? "01" : "00";
    const type = values.type;
    const id = values.id.padEnd(12, "0");
    const enterAlert = values.enterAlert ? "01" : "00";
    const exitAlert = values.exitAlert ? "01" : "00";
    const highTemperature = Number(values.temperatureMax)
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
    const lowTemperature = Number(values.temperatureMin)
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
    const highHumidity = (Number(values.humidityMax) * 10)
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
    const lowHumidity = (Number(values.humidityMin) * 10)
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();

    const data = `41;${point}#${type}${active}${id}${enterAlert}${exitAlert}${highTemperature}${lowTemperature}${highHumidity}${lowHumidity}`;

    handleConfirm(data);
    onClose();
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("configuration.ble.add_ble")}
      confirm={form.handleSubmit(handleModalConfirm)}
      confirmButtonText={
        defaultValues ? t("configuration.ble.edit") : t("configuration.ble.add")
      }
      width="900px"
      disabled={!form.formState.isDirty}
      manualToggleOpenWhenConfirm
    >
      <ModalForm>
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
                      <MenuItem value={"00"}>1</MenuItem>
                      <MenuItem value={"01"}>2</MenuItem>
                      <MenuItem value={"02"}>3</MenuItem>
                      <MenuItem value={"03"}>4</MenuItem>
                      <MenuItem value={"04"}>5</MenuItem>
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
                {t("configuration.ble.type")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={"type"}
                  control={form.control}
                  rules={{
                    required: {
                      value: true,
                      message: FIELD_ERRORS.required(
                        t("configuration.ble.type")
                      )[lang],
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      error={!!error}
                      helperText={error?.message}
                    >
                      <MenuItem value={"00"}>
                        {t("configuration.ble.select")}
                      </MenuItem>
                      <MenuItem value={"01"}>ELA PUCK RHT</MenuItem>
                      <MenuItem value={"02"}>ELA COIN T</MenuItem>
                    </TextField>
                  )}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox style={{ flex: 1 }}>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.ble.id")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={"id"}
                  control={form.control}
                  rules={{
                    required: {
                      value: true,
                      message: FIELD_ERRORS.required(t("configuration.ble.id"))[
                        lang
                      ],
                    },
                    maxLength: {
                      value: 12,
                      message: "Max: 12 Characters",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: FIELD_ERRORS.alphaNumericPattern[lang],
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      placeholder={t("configuration.ble.id")}
                      error={!!error}
                      helperText={error?.message}
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
                {t("configuration.ble.enter_alert")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={"enterAlert"}
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
                {t("configuration.ble.exit_alert")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={"exitAlert"}
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
        <Stack direction="column" gap="16px" flex={1}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.ble.temperature_threshold_(°c)")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px" alignItems="center">
                <FormControl sx={{ width: "100%" }} size="small">
                  <Controller
                    name={"temperatureMin"}
                    control={form.control}
                    rules={{
                      required: {
                        value: true,
                        message: FIELD_ERRORS.required(
                          t("configuration.ble.temperature")
                        )[lang],
                      },
                      min: {
                        value: -55,
                        message: FIELD_ERRORS.minMax(-55, 125)[lang],
                      },
                      max: {
                        value: 125,
                        message: FIELD_ERRORS.minMax(-55, 125)[lang],
                      },
                      validate: (value) =>
                        validateTemperatureRange(value, form),
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("temperatureMax");
                        }}
                        type="number"
                        error={!!error}
                      />
                    )}
                  />
                </FormControl>
                ~
                <FormControl sx={{ width: "100%" }} size="small">
                  <Controller
                    name={"temperatureMax"}
                    control={form.control}
                    rules={{
                      required: {
                        value: true,
                        message: FIELD_ERRORS.required(
                          t("configuration.ble.temperature")
                        )[lang],
                      },
                      min: {
                        value: -55,
                        message: FIELD_ERRORS.minMax(-55, 125)[lang],
                      },
                      max: {
                        value: 125,
                        message: FIELD_ERRORS.minMax(-55, 125)[lang],
                      },
                      validate: (value) =>
                        validateTemperatureRange(value, form),
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("temperatureMin");
                        }}
                        type="number"
                        error={!!error}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
              {temperatureErrors.size > 0 && (
                <Stack
                  direction="column"
                  gap="2px"
                  marginTop="3px"
                  marginLeft="14px"
                >
                  {Array.from(temperatureErrors).map((item) => (
                    <ErrorText>{item}</ErrorText>
                  ))}
                </Stack>
              )}
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.ble.humidity_threshold_(%)")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px" alignItems="center">
                <FormControl sx={{ width: "100%" }} size="small">
                  <Controller
                    name={"humidityMin"}
                    control={form.control}
                    rules={{
                      required: {
                        value: true,
                        message: FIELD_ERRORS.required(
                          t("configuration.ble.humidity")
                        )[lang],
                      },
                      min: {
                        value: 0,
                        message: FIELD_ERRORS.minMax(0, 100)[lang],
                      },
                      max: {
                        value: 100,
                        message: FIELD_ERRORS.minMax(0, 100)[lang],
                      },
                      validate: (value) => validateHumidityRange(value, form),
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("humidityMax");
                        }}
                        type="number"
                        error={!!error}
                      />
                    )}
                  />
                </FormControl>
                ~
                <FormControl sx={{ width: "100%" }} size="small">
                  <Controller
                    name={"humidityMax"}
                    control={form.control}
                    rules={{
                      required: {
                        value: true,
                        message: FIELD_ERRORS.required(
                          t("configuration.ble.humidity")
                        )[lang],
                      },
                      min: {
                        value: 0,
                        message: FIELD_ERRORS.minMax(0, 100)[lang],
                      },
                      max: {
                        value: 100,
                        message: FIELD_ERRORS.minMax(0, 100)[lang],
                      },
                      validate: (value) => validateHumidityRange(value, form),
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("humidityMin");
                        }}
                        type="number"
                        error={!!error}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
              {humidityErrors.size > 0 && (
                <Stack
                  direction="column"
                  gap="2px"
                  marginTop="3px"
                  marginLeft="14px"
                >
                  {Array.from(humidityErrors).map((item) => (
                    <ErrorText>{item}</ErrorText>
                  ))}
                </Stack>
              )}
            </InputBox.Body>
          </InputBox>
        </Stack>
      </ModalForm>
    </Modal>
  );
}

const ModalForm = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
const ErrorText = styled.p`
  color: #fb4343;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
`;
