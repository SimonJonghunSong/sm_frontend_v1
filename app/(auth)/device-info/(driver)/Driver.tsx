import { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import {
  Button,
  Stack,
  Tab as MuiTab,
  Tabs,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
} from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";
import DataTable from "@/components/dataTable";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useModal from "@/utils/useModal";
import InputBox from "@/components/inputbox/InputBox";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Modal from "@/components/Modal";
import { AddOutlined } from "@mui/icons-material";

// TODO: 세부 로직 추가 필요

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const error = {};

const fieldsIds = [];

const Driver = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);

  const [addModal, addModalToggle] = useModal();

  const formRef = useRef<HTMLFormElement>(null);
  const [filter, setFilter] = useState<"all" | "by_number" | "by_id">("all");
  const [filterValue, setFilterValue] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<
    "all" | "by_number" | "by_id"
  >("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRowIdList, setSelectedRowIdList] = useState<string[]>();

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "No.",
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
      headerName: "Driver ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Edit",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <IconButton sx={{ width: 24, height: 24 }}>
          <EditOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
    {
      field: "col4",
      headerName: "Delete",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <IconButton sx={{ width: 24, height: 24 }}>
          <DeleteForeverOutlinedIcon sx={{ width: 22, height: 22 }} />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      col1: 1,
      col2: "1234567890",
    },
    {
      id: 2,
      col1: 2,
      col2: "1234567890",
    },
    {
      id: 12,
      col1: 12,
      col2: "1234567890",
    },

    {
      id: 101,
      col1: 101,
      col2: "1234567890",
    },
  ];
  // if (!hasFormDataFields(formData, fieldsIds)) return null;

  const handleSearch = () => {
    setSearchFilter(filter);
    setSearchValue(filterValue);
  };

  const handleAddDriverId = () => {
    console.log("add driver id :::");
  };

  const handleDeleteDriverId = () => {
    if (!selectedRowIdList || !selectedRowIdList.length) return;

    console.log("delete driver ids :::", selectedRowIdList);
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
            if (fieldsIds.includes(key)) {
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
            <h1>{t("configuration.driver.driver_id")}</h1>
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
          rows={rows}
          columns={columns}
          rowHeight={52}
          onRowSelectionModelChange={(list) => {
            setSelectedRowIdList(list as string[]);
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

        <Stack direction="row" justifyContent="flex-end">
          <Button color="secondary" variant="contained" type="submit">
            {t("notify.send")}
          </Button>
        </Stack>
      </Form>

      {addModal && (
        <AddAcountModal
          onClose={addModalToggle}
          openErrorPopup={() => {}}
          handleConfirm={handleAddDriverId}
        />
      )}
    </>
  );
};

export default Driver;

const Form = styled.form`
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

function AddAcountModal({
  onClose,
  openErrorPopup,
  handleConfirm,
}: {
  onClose: () => void;
  openErrorPopup: (
    message: string,
    options?: { title: string; onErrorPopupOk?: () => void }
  ) => void;
  handleConfirm: () => void;
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
    console.log("fields :::", fields);
    console.log("fields :::", form.getValues());

    handleConfirm();
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("configuration.driver.add_driver_id")}
      confirm={handleModalConfirm}
      confirmButtonText="Add"
      width="900px"
      disabled={!form.formState.isDirty || !form.formState.isValid}
      manualToggleOpenWhenConfirm
    >
      {fields.map((field, index) => (
        <Stack direction="row" gap={"8px"}>
          <InputBox key={index.toString()}>
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
                  render={({ field }) => (
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
                      {Array.from({ length: 300 }, (_, i) => (
                        <MenuItem value={i + 1}>{i + 1}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox style={{ flex: 1 }} key={index.toString()}>
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
