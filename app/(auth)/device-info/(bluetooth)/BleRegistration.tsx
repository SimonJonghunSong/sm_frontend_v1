import { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import SelectField from "../(components)/SelectField";
import DataTable from "@/components/dataTable";
import useModal from "@/utils/useModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { Controller, useController, useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";

const fieldIds = [];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const BleRegistration = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const [detailModal, detailModalToggle] = useModal();
  const [editRow, setEditRow] = useState<{
    point: string;
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
  >([
    {
      id: 1,
      type: "1",
      col1: 1,
      col2: "On",
      col3: "ELA PUCK RHT",
      col4: "abcde",
      col5: "On",
      col6: "Off",
      col7: "-55",
      col8: "125",
      col9: "30",
      col10: "70",
    },
  ]);
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
      renderCell: ({ row }) => `${row.col7}/${row.col8}`,
    },
    {
      field: "col8",
      headerName: t("configuration.ble.humidity_(%)"),
      maxWidth: 140,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => `${row.col9}/${row.col10}`,
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
        <IconButton sx={{ width: 24, height: 24 }} onClick={() => {}}>
          <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
  ];

  // if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleAddItem = () => {};
  const handleEditItem = () => {};

  const handleChange = (id: string, value: string) => {
    onChange(id, value);
  };

  return (
    <>
      <Container
        onSubmit={(e) => {
          e.preventDefault();

          // 모든 필드 값을 포함한 객체 생성
          const fieldValues = Object.keys(formData).reduce((acc, key) => {
            if (fieldIds.includes(key)) {
              acc[key] = {
                id: key,
                value: formData[key].value,
                realValue: formData[key].realValue,
              };
            }
            return acc;
          }, {});
          console.log("fieldValues :::", fieldValues);
          // 필드 값들을 사용하여 수행할 작업
          sendFormData(fieldValues);

          // 여기에 데이터 제출 로직 추가
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
          rows={rows}
          columns={columns}
          rowHeight={52}
          onRowSelectionModelChange={() => {}}
        />

        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {t("notify.send")}
          </Button>
        </Stack>
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
    font-size: 16px;
    line-height: 14px;
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
  handleConfirm: (values: {
    point: string;
    active: boolean;
    type: string;
    id: string;
    enterAlert: boolean;
    exitAlert: boolean;
    temperatureMin: string;
    temperatureMax: string;
    humidityMin: string;
    humidityMax: string;
  }) => void;
  filterNumbers: number[];
  defaultValues?: {
    point: string;
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
  console.log("defaultValues :::", defaultValues);

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const form = useForm({
    mode: "onSubmit",
    defaultValues: defaultValues || {
      point: "",
      active: false,
      type: "",
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
    const vlaues = form.getValues();
    handleConfirm(vlaues);
    console.log("submit vlaues :::", vlaues);

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
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
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
                      placeholder={t("configuration.ble.select")}
                      error={!!error}
                      helperText={error?.message}
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
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
