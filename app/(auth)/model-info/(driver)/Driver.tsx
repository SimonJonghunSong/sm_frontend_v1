import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import {
  Button,
  Stack,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
} from "@mui/material";
import { FormField } from "../page";
import DataTable from "@/components/dataTable";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useModal from "@/utils/useModal";
import InputBox from "@/components/inputbox/InputBox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { AddOutlined } from "@mui/icons-material";
import { delayPromise } from "@/src/hooks/useSerial";
import parseDriverIdResponseString from "./utils/driverId";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Driver.en];

const commands = [
  "18;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19",
  "18;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39",
  "18;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59",
  "18;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79",
  "18;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99",
  "38;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19",
  "38;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39",
  "38;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59",
  "38;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79",
  "38;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99",
  "39;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19",
  "39;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39",
  "39;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59",
  "39;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79",
  "39;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99",
];

const getCommandForId = (id: number): string => {
  const groupIndex = Math.floor((id - 1) / 100); // 0, 1, 2
  const offset = (id - 1) % 100; // 0~99
  const lineIndex = Math.floor(offset / 20); // 0~4
  const valueIndex = offset % 20; // 0~19

  const commandStr = commands[groupIndex * 5 + lineIndex]; // 해당 문자열
  const [prefix, valuesStr] = commandStr.split(";");

  const values = valuesStr.split(",");
  const value = values[valueIndex];

  return `${prefix};${value}`;
};

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  isReady: boolean;
  write?: (command: string) => Promise<Boolean>;
  editWrite?: (command: string) => Promise<Boolean>;
  port?: SerialPort;
}

const Driver = ({
  formData,
  onChange,
  isReady,
  write,
  editWrite,
  port,
}: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const [addModal, addModalToggle] = useModal();
  const [editModal, editModalToggle] = useModal();
  const [editRow, setEditRow] = useState<{
    number: number;
    driver_id: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [filter, setFilter] = useState<"all" | "by_number" | "by_id">("all");
  const [filterValue, setFilterValue] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<
    "all" | "by_number" | "by_id"
  >("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRowIdList, setSelectedRowIdList] = useState<number[]>([]);

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("configuration.driver.no"),
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        if (Number(value) < 10) {
          return `00${value}`;
        }
        if (Number(value) < 100) {
          return `0${value}`;
        }

        return value;
      },
    },
    {
      field: "col2",
      headerName: t("configuration.driver.driver_id"),
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col3",
      headerName: t("configuration.driver.edit"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton
          sx={{ width: 24, height: 24 }}
          onClick={() => {
            editModalToggle();
            setEditRow({ number: row.col1, driver_id: row.col2 });
          }}
        >
          <EditOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
    {
      field: "col4",
      headerName: t("configuration.driver.delete"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton
          sx={{ width: 24, height: 24 }}
          onClick={() => {
            const command = getCommandForId(row.col1);

            editWrite(`${command}#0000000000000000`);

            setRows((prev) => {
              return prev.filter((item) => item.id !== row.id);
            });
          }}
        >
          <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
  ];

  const [rows, setRows] = useState<
    {
      id: number;
      col1: number;
      col2: string;
    }[]
  >([]);

  const buffer = useRef<string>("");

  const handleSearch = () => {
    setSearchFilter(filter);
    setSearchValue(filterValue);
  };

  const handleEditDriverId = (values) => {
    if (!editRow) return;
    const command = getCommandForId(values.number);

    editWrite(`${command}#${values.driver_id}`);

    setRows((prev) => {
      const index = prev.findIndex((row) => row.col1 === values.number);

      if (index !== -1) {
        prev[index].col2 = values.driver_id;
      }

      return [
        ...prev.filter((row) => row.id !== editRow.number),
        {
          id: values.number,
          col1: values.number,
          col2: values.driver_id,
        },
      ].sort((a, b) => a.col1 - b.col1);
    });

    setEditRow(null);
  };

  const handleAddDriverId = (values) => {
    const { items } = values;

    const newRows = items.map((item) => {
      const command = getCommandForId(Number(item.number));
      return {
        id: item.number,
        col1: item.number,
        col2: item.driver_id,
        command: command, // command 정보 추가
      };
    });

    editWrite(`${newRows[0].command}#${newRows[0].col2}`);

    setRows((prev) => [...prev, ...newRows].sort((a, b) => a.col1 - b.col1));
  };

  const handleDeleteDriverId = () => {
    if (!selectedRowIdList || !selectedRowIdList.length) return;

    setRows((prev) =>
      prev.filter((row) => !selectedRowIdList.includes(row.id))
    );
  };

  const handleFetchBufferValue = (bufferValue: string) => {
    buffer.current += bufferValue;
  };

  const validateForm = (): boolean => {
    // formRef가 null이면 유효성 검사를 할 수 없음
    if (!formRef.current) return true;

    // 폼 내의 모든 input 요소 중 aria-invalid="true" 속성을 가진 요소 찾기
    const invalidInputs = formRef.current.querySelectorAll(
      '[aria-invalid="true"]'
    );

    if (invalidInputs.length > 0) {
      // 첫 번째 유효하지 않은 입력 필드로 스크롤
      (invalidInputs[0] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // 포커스 설정
      (invalidInputs[0] as HTMLElement).focus();

      return false;
    }

    return true;
  };

  useEffect(() => {
    (async () => {
      if (isReady) {
        port.onbuffervalue = handleFetchBufferValue;
        buffer.current = "";
        setIsLoading(true);
        for (const command of commands) {
          write(command);
          await delayPromise(300);
        }
        await delayPromise(500);
        port.onbuffervalue = null;
        setIsLoading(false);
      }
      const parsedResult = parseDriverIdResponseString(buffer.current);

      setRows(
        parsedResult
          .filter((item) => item.value !== "NoData")
          .map((item) => ({
            id: Number(item.id),
            col1: Number(item.id),
            col2: item.value,
          }))
      );
    })();
  }, [isReady]);

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();

          // 폼 유효성 검사 실행
          if (!validateForm()) {
            return; // 유효하지 않은 필드가 있으면 제출을 중단
          }

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
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={"4px"}>
            <h1 data-section-id={SECTIONS.Driver.en}>
              {SECTIONS.Driver[lang]}
            </h1>
          </Stack>
        </Stack>

        <Stack direction="column" gap={"12px"}>
          <Stack
            direction="row"
            gap={"8px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction="row" gap={"8px"}>
              <Select
                value={filter}
                style={{ width: "140px" }}
                onChange={(e) =>
                  setFilter(e.target.value as "by_number" | "by_id")
                }
              >
                <MenuItem value="all">{t("configuration.driver.all")}</MenuItem>
                <MenuItem value="by_number">
                  {t("configuration.driver.by_number")}
                </MenuItem>
                <MenuItem value="by_id">
                  {t("configuration.driver.by_id")}
                </MenuItem>
              </Select>
              <TextField
                id="filterValue"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
              >
                {t("configuration.driver.search")}
              </Button>
            </Stack>
            <Stack direction="row" gap={"8px"}>
              <Button
                variant="contained"
                color="secondary"
                onClick={addModalToggle}
              >
                {t("configuration.driver.add")}
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <DataTable
          rows={rows.filter((row) => {
            switch (searchFilter) {
              case "all":
                return (
                  row.col1.toString().includes(searchValue) ||
                  row.col2.toString().includes(searchValue)
                );
              case "by_number":
                return row.col1.toString().includes(searchValue);
              case "by_id":
                return row.col2.toString().includes(searchValue);
            }
          })}
          loading={isLoading}
          columns={columns}
          rowHeight={52}
          onRowSelectionModelChange={(list) => {
            setSelectedRowIdList(list as number[]);
          }}
          footerButton={
            <Button
              variant="text"
              color="info"
              onClick={handleDeleteDriverId}
              disabled={!selectedRowIdList || !selectedRowIdList.length}
            >
              {t("account.account.delete")}
            </Button>
          }
          disablePagination
        />
      </Form>

      {addModal && (
        <AddModal
          onClose={addModalToggle}
          openErrorPopup={() => {}}
          handleConfirm={handleAddDriverId}
          filterNumbers={rows.map((row) => row.col1)}
        />
      )}

      {editModal && (
        <EditModal
          onClose={editModalToggle}
          openErrorPopup={() => {}}
          handleConfirm={handleEditDriverId}
          filterNumbers={rows.map((row) => row.col1)}
          editRow={editRow}
        />
      )}
    </>
  );
};

export default Driver;

const Form = styled.form`
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

function AddModal({
  onClose,
  openErrorPopup,
  handleConfirm,
  filterNumbers,
}: {
  onClose: () => void;
  openErrorPopup: (
    message: string,
    options?: { title: string; onErrorPopupOk?: () => void }
  ) => void;
  handleConfirm: (values: {
    items: { number: string; driver_id: string }[];
  }) => void;
  filterNumbers: number[];
}) {
  const t = useTranslations();

  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      items: [{ number: "", driver_id: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleModalConfirm = () => {
    if (!form.formState.isValid) {
      return;
    }

    handleConfirm(form.getValues());
    onClose();
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("configuration.driver.add_driver_id")}
      confirm={form.handleSubmit(handleModalConfirm)}
      confirmButtonText="Add"
      width="900px"
      disabled={!form.formState.isDirty || !form.formState.isValid}
      manualToggleOpenWhenConfirm
    >
      {fields.map((field, index) => (
        <Stack key={field.id} direction="row" gap={"8px"}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.driver.no")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={`items.${index}.number`}
                  control={form.control}
                  rules={{
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      autoFocus
                      style={{
                        width: "140px",
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      {Array.from({ length: 300 }, (_, i) => i + 1)
                        .filter(
                          (value) =>
                            !filterNumbers.includes(value) &&
                            !fields.some(
                              (fieldItem) =>
                                Number(field.value) !==
                                  Number(fieldItem.number) &&
                                Number(fieldItem.number) === value
                            )
                        )
                        .map((value) => (
                          <MenuItem value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox style={{ flex: 1 }}>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.driver.driver_id")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <Controller
                  name={`items.${index}.driver_id`}
                  control={form.control}
                  rules={{
                    required: {
                      value: true,
                      message: "Driver ID is required",
                    },
                    minLength: {
                      value: 16,
                      message: "Driver ID must be 16 characters",
                    },
                    pattern: {
                      value: /^[a-fA-F0-9]*$/,
                      message: "Only hexadecimal characters are allowed",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      inputProps={{
                        maxLength: 16,
                      }}
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value;

                        value = value.replace(/[^a-fA-F0-9]/g, "");

                        field.onChange(value.toUpperCase());
                      }}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("configuration.driver.delete")}
              </InputBox.Title>
            </InputBox.Head>
            <IconButton
              sx={{ width: 40, height: 40 }}
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
            </IconButton>
          </InputBox>
        </Stack>
      ))}
      <Button
        variant="outlined"
        color="secondary"
        style={{ width: "100%" }}
        onClick={() => append({ number: "", driver_id: "" })}
      >
        <AddOutlined />
      </Button>
    </Modal>
  );
}

function EditModal({
  onClose,
  openErrorPopup,
  handleConfirm,
  filterNumbers,
  editRow,
}: {
  onClose: () => void;
  openErrorPopup: (
    message: string,
    options?: { title: string; onErrorPopupOk?: () => void }
  ) => void;
  handleConfirm: (values: { number: number; driver_id: string }) => void;
  filterNumbers: number[];
  editRow: { number: number; driver_id: string };
}) {
  const t = useTranslations();

  const form = useForm({
    mode: "onTouched",
    defaultValues: {
      number: editRow.number,
      driver_id: editRow.driver_id,
    },
  });

  const handleModalConfirm = () => {
    if (!form.formState.isValid) {
      return;
    }

    const values = form.getValues();

    handleConfirm({
      number: values.number,
      driver_id: values.driver_id,
    });
    onClose();
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("configuration.driver.edit_driver_id")}
      confirm={form.handleSubmit(handleModalConfirm)}
      confirmButtonText="Edit"
      width="900px"
      disabled={!form.formState.isDirty || !form.formState.isValid}
      manualToggleOpenWhenConfirm
    >
      <Stack direction="row" gap={"8px"}>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.driver.no")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"number"}
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: "Number is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    autoFocus
                    style={{
                      width: "140px",
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  >
                    {Array.from({ length: 300 }, (_, i) => i + 1)
                      .filter(
                        (value) =>
                          !filterNumbers
                            .filter((item) => item !== editRow.number)
                            .includes(value)
                      )
                      .map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>
        <InputBox style={{ flex: 1 }}>
          <InputBox.Head>
            <InputBox.Title>
              {t("configuration.driver.driver_id")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name={"driver_id"}
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: "Driver ID is required",
                  },
                  minLength: {
                    value: 16,
                    message: "Driver ID must be 16 characters",
                  },
                  pattern: {
                    value: /^[a-fA-F0-9]*$/,
                    message: "Only hexadecimal characters are allowed",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    inputProps={{
                      maxLength: 16,
                    }}
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/[^a-fA-F0-9]/g, "");

                      field.onChange(value.toUpperCase());
                    }}
                    error={!!error}
                    helperText={error?.message}
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
