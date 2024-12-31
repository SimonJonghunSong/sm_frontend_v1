"use client";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useReducer,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/dataTable";
import Modal from "../../../components/Modal";
import useModal from "../../../utils/useModal";
import InputBox from "../../../components/inputbox/InputBox";
import SelectCountry from "../../../components/SelectCountry";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUser,
  deleteUser,
  getUsers,
  modifyUser,
} from "@/src/api/services/user";
import { toast } from "react-toastify";
import useAuthStore from "@/utils/useAuthStore";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import InputErrorText from "@/components/InputErrorText";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { AxiosError } from "axios";

export default function Account() {
  const t = useTranslations();
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("account.account.email"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("account.account.id"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: t("account.account.user"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("account.account.company"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: t("account.account.country"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col6",
      headerName: t("account.account.role"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col7",
      headerName: t("account.account.registered_date"),
      minWidth: 240,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col9",
      headerName: t("account.account.delete"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (event) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            openErrorPopup(t("popup.account.delete_account_pop_up.delete"), {
              title: t("common.popup.confrim"),
              confirmText: t("common.popup.yes"),
              onErrorPopupOk: () => {
                mutate([event.row.id]);
              },
            });
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];
  const [selectedRowIdList, setSelectedRowIdList] = useState<string[]>();

  const errorTitle = useRef("");
  const errorMessage = useRef("");
  const confirmButtonText = useRef("");
  const handleErrorPopupOk = useRef<() => void | null>(null);
  const [isOpenErrorPopup, setIsOpenErrorPopup] = useState(false);

  const openErrorPopup = (
    message: string,
    options?: {
      title?: string;
      confirmText?: string;
      onErrorPopupOk?: () => void;
    }
  ) => {
    errorTitle.current = options?.title || t("common.popup.error");
    errorMessage.current = message;
    confirmButtonText.current = options?.confirmText || t("common.popup.ok");
    handleErrorPopupOk.current = options?.onErrorPopupOk;
    setIsOpenErrorPopup(true);
  };

  const closeErrorPopup = () => {
    errorMessage.current = "";
    handleErrorPopupOk.current = null;
    setIsOpenErrorPopup(false);
  };
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [userFilter, setUserFilter] = useState<string>("All");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [modal, modalToggle] = useModal();

  const { userRole } = useAuthStore();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleDeleteUsers = () => {
    if (!selectedRowIdList || !selectedRowIdList.length) return;

    openErrorPopup(t("popup.account.delete_account_pop_up.delete"), {
      title: t("common.popup.confrim"),
      confirmText: t("common.popup.yes"),
      onErrorPopupOk: () => {
        mutate(selectedRowIdList);
      },
    });
  };

  const getCompanyText = (role: string, company: string) => {
    switch (role) {
      case "root":
      case "admin":
        return "ST Sunlab";
      case "guest":
        return "No affiliation";
      case "customer":
      case "client":
      default:
        return company;
    }
  };

  const renderMenuFilter = () => {
    switch (userRole) {
      case "ROOT":
      case "ADMIN":
      case "CUSTOMER":
        return (
          <Select
            value={roleFilter}
            onChange={(e) => handleSelectChange(e, setRoleFilter)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={"All"}>{t("account.account.all")}</MenuItem>
            <MenuItem value={"Customer"}>
              {t("account.account.customer")}
            </MenuItem>
            <MenuItem value={"Client"}>{t("account.account.client")}</MenuItem>
            <MenuItem value={"Guest"}>{t("account.account.guest")}</MenuItem>
          </Select>
        );
      case "GUEST":
      default:
        return (
          <Select
            value={roleFilter}
            onChange={(e) => handleSelectChange(e, setRoleFilter)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={"All"}>{t("account.account.all")}</MenuItem>
            <MenuItem value={"Admin"}>
              {t("account.account.administrator")}
            </MenuItem>
            <MenuItem value={"Customer"}>
              {t("account.account.customer")}
            </MenuItem>
            <MenuItem value={"Client"}>{t("account.account.client")}</MenuItem>
            <MenuItem value={"Guest"}>{t("account.account.guest")}</MenuItem>
          </Select>
        );
    }
  };

  return (
    <>
      <div className="pageWrap">
        <article className="contentWrap">
          <div className="pageTitle">{t("account.account.account")}</div>
          <Stack>
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              mb="16px"
            >
              <Stack direction="row" gap="8px">
                {renderMenuFilter()}

                <Select
                  value={userFilter}
                  onChange={(e) => handleSelectChange(e, setUserFilter)}
                  sx={{ minWidth: 160 }}
                >
                  <MenuItem value={"All"}>{t("account.account.all")}</MenuItem>
                  <MenuItem value={"ID"}>{t("account.account.id")}</MenuItem>
                  <MenuItem value={"E-mail"}>
                    {t("account.account.email")}
                  </MenuItem>
                  <MenuItem value={"Username"}>
                    {t("account.account.user")}
                  </MenuItem>
                  <MenuItem value={"CompanyName"}>
                    {t("account.account.company")}
                  </MenuItem>
                </Select>

                <TextField
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  sx={{ width: 160 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchValue(searchInputValue);
                    }
                  }}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSearchValue(searchInputValue);
                  }}
                >
                  {t("account.account.search")}
                </Button>
              </Stack>

              <Button
                variant="contained"
                color="secondary"
                onClick={modalToggle}
              >
                {t("account.account.add")}
              </Button>
            </Stack>
            <DataTable
              noDataMessage={t("account.account.no_results_found")}
              rows={(error
                ? []
                : data?.data?.user_list.filter((user) => {
                    if (roleFilter === "All") return user;
                    return (
                      user.role?.name.toUpperCase() === roleFilter.toUpperCase()
                    );
                  }) || []
              )
                .filter((item) => {
                  if (!searchValue) return true;

                  switch (userFilter) {
                    case "All":
                      return (
                        item.user_id?.includes(searchValue) ||
                        item.email?.includes(searchValue) ||
                        item.name?.includes(searchValue) ||
                        ("ST Sunlab".includes(searchValue) &&
                          (item.role.name === "root" ||
                            item.role.name === "admin")) ||
                        ("No affiliation".includes(searchValue) &&
                          item.role.name === "guest")
                      );
                    case "ID":
                      return item.user_id?.includes(searchValue);
                    case "E-mail":
                      return item.email?.includes(searchValue);
                    case "Username":
                      return item.name?.includes(searchValue);
                    case "CompanyName":
                      if (
                        "ST Sunlab".includes(searchValue) &&
                        (item.role.name === "root" ||
                          item.role.name === "admin")
                      ) {
                        return true;
                      }

                      if (
                        "No affiliation".includes(searchValue) &&
                        item.role.name === "guest"
                      ) {
                        return true;
                      }

                      return false;
                    default:
                      return item;
                  }
                })
                .map(({ email, user_id, name, country, role, reg_date }) => {
                  return {
                    id: user_id,
                    col1: email,
                    col2: user_id,
                    col3: name,
                    col4: getCompanyText(role?.name, "-"),
                    col5:
                      country?.toUpperCase() === "USA"
                        ? "United States" // tq
                        : country
                        ? country.charAt(0).toUpperCase() + country.slice(1)
                        : "-",
                    col6: role
                      ? role.name.charAt(0).toUpperCase() +
                        role.name.slice(1) +
                        (role.name === "admin" ? "istrator" : "")
                      : "-",
                    col7: dayjs(reg_date).format("MMM/DD/YYYY HH:mm"),
                    col8: { id: "1" },
                    col9: { id: "1" },
                  };
                })}
              columns={columns}
              onRowSelectionModelChange={(list) => {
                setSelectedRowIdList(list as string[]);
              }}
              footerButton={
                <Button
                  variant="text"
                  color="info"
                  onClick={handleDeleteUsers}
                  disabled={!selectedRowIdList || !selectedRowIdList.length}
                >
                  {t("account.account.delete")}
                </Button>
              }
            />
          </Stack>
        </article>

        {modal && (
          <AddAcountModal
            onClose={modalToggle}
            openErrorPopup={openErrorPopup}
          />
        )}

        {isOpenErrorPopup && (
          <Modal
            open
            width={"357px"}
            toggleOpen={closeErrorPopup}
            cancelButtonText={t("common.popup.cancel")}
            confirmButtonText={confirmButtonText.current}
            title={errorTitle.current}
            confirm={handleErrorPopupOk.current}
          >
            <Stack>
              <span style={{ wordBreak: "keep-all" }}>
                {errorMessage.current}
              </span>
            </Stack>
          </Modal>
        )}
      </div>
    </>
  );
}

interface FormState {
  role: string;
  id: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  country: string;
  company: string;
  department: string;
  taxId: string;
  alias: string;
  ndaFile: File | null;
}

// 액션 타입 정의
type FormAction =
  | { type: "SET_ROLE"; value: string }
  | { type: "SET_ID"; value: string }
  | { type: "SET_EMAIL"; value: string }
  | { type: "SET_NAME"; value: string }
  | { type: "SET_PASSWORD"; value: string }
  | { type: "SET_CONFIRM_PASSWORD"; value: string }
  | { type: "SET_COUNTRY"; value: string }
  | { type: "SET_COMPANY"; value: string }
  | { type: "SET_DEPARTMENT"; value: string }
  | { type: "SET_TAX_ID"; value: string }
  | { type: "SET_ALIAS"; value: string }
  | { type: "SET_NDA_FILE"; value: File | null };

// 초기 상태 정의
const initialState: FormState = {
  role: undefined,
  id: undefined,
  email: undefined,
  name: undefined,
  password: undefined,
  confirmPassword: undefined,
  country: undefined,
  company: undefined,
  department: undefined,
  taxId: undefined,
  alias: undefined,
  ndaFile: null,
};

// 리듀서 함수 정의
function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.value };
    case "SET_ID":
      return { ...state, id: action.value };
    case "SET_EMAIL":
      return { ...state, email: action.value };
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_PASSWORD":
      return { ...state, password: action.value };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.value };
    case "SET_COUNTRY":
      return { ...state, country: action.value };
    case "SET_COMPANY":
      return { ...state, company: action.value };
    case "SET_DEPARTMENT":
      return { ...state, department: action.value };
    case "SET_TAX_ID":
      return { ...state, taxId: action.value };
    case "SET_ALIAS":
      return { ...state, alias: action.value };
    case "SET_NDA_FILE":
      return { ...state, ndaFile: action.value };
    default:
      return state;
  }
}

const getFieldsByRole = (userRole: string) => {
  switch (userRole) {
    case "ROOT":
      return ["role", "id", "email", "name", "password", "passwordConfirm"];
    case "ADMIN":
      return [
        "role",
        "id",
        "email",
        "name",
        "password",
        "passwordConfirm",
        "country",
        "affiliation",
        "department",
      ];
    case "CUSTOMER":
    case "CLIENT":
      return [
        "role",
        "id",
        "email",
        "name",
        "password",
        "passwordConfirm",
        "country",
        "company",
        "department",
        "taxId",
        "alias",
        "affiliation",
        "department",
        "nda_file",
      ];
    case "GUEST":
      return [
        "role",
        "id",
        "email",
        "name",
        "password",
        "passwordConfirm",
        "country",
      ];
  }
};

function AddAcountModal({
  onClose,
  openErrorPopup,
}: {
  onClose: () => void;
  openErrorPopup: (
    message: string,
    options?: { title: string; onErrorPopupOk?: () => void }
  ) => void;
}) {
  const t = useTranslations();
  const selectRoleData = useCallback(() => {
    switch (userRole) {
      case "CUSTOMER":
        return [
          { label: t("account.account.customer"), value: "customer" },
          { label: t("account.account.client"), value: "client" },
          { label: t("account.account.guest"), value: "guest" },
        ];
      case "CLIENT":
      case "ROOT":
      case "ADMIN":
      case "GUEST":
      default:
        return [
          { label: t("account.account.root"), value: "root" },
          { label: t("account.account.administrator"), value: "admin" },
          { label: t("account.account.customer"), value: "customer" },
          { label: t("account.account.client"), value: "client" },
          { label: t("account.account.guest"), value: "guest" },
        ];
    }
  }, []);
  const { userRole } = useAuthStore();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      role: "",
      user_id: "",
      email: "",
      name: "",
      password: "",
      confirm_password: "",
      country: "",
      company: "",
      department: "",
      tax_id: "",
      alias: "",
      affiliation: "",
      profile: [],
      nda_contract_contents: "",
      nda_contract_path: "",
      nda_file: null as File | null,
      cmd_list: [],
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      openErrorPopup(
        t("popup.account.add_account_pop_up.added_successfully!"),
        {
          title: t("common.popup.success"),
        }
      );

      onClose();
    },
    onError: (e: AxiosError) => {
      const res = (e.response.data as any)?.response;

      if (res?.code === 5302) {
        openErrorPopup(
          t("popup.account.add_account_pop_up.this_id_already_exists")
        );
        return;
      }
      if (res?.code === 5303) {
        openErrorPopup(
          t("popup.account.add_account_pop_up.this_email_is_already_registered")
        );
        return;
      }

      openErrorPopup(
        (e.response.data as any)?.response?.reason ||
          (e.response.data as any)?.message ||
          "Error"
      );
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      form.setValue("nda_file", e.target.files?.[0]);
    }
  };

  const handleSubmit = (values: any) => {
    mutate({
      ...values,
    });
  };

  console.log(":::::::", form.watch());

  const getDisableStateWithFormHelper = (
    keys: (
      | "role"
      | "user_id"
      | "email"
      | "name"
      | "password"
      | "confirm_password"
      | "country"
      | "department"
      | "tax_id"
      | "alias"
      | "affiliation"
      | "nda_contract_contents"
      | "nda_contract_path"
      | "company"
      | "nda_file"
    )[]
  ) => {
    return (
      form.watch(keys).filter((item, index) => {
        const key = keys[index];

        if (item === "") {
          return true;
        }

        if (Array.isArray(item) && item.length === 0) {
          return true;
        }

        if (key === "nda_file" && !item) {
          console.log("ASDAS");

          return true;
        }

        return false;
      }).length > 0
    );
  };

  console.log("form.watch :::", form.watch());

  const getDisableState = () => {
    console.log(" :::", form.watch("role"));

    if (!form.watch("role")) return true;

    switch (form.watch("role")?.toUpperCase() || "") {
      case "ROOT":
        return (
          !form.formState.isValid ||
          getDisableStateWithFormHelper([
            "role",
            "user_id",
            "email",
            "name",
            "password",
            "confirm_password",
          ])
        );
      case "ADMIN":
        return (
          !form.formState.isValid ||
          getDisableStateWithFormHelper([
            "role",
            "user_id",
            "email",
            "password",
            "confirm_password",
            "name",
            "country",
          ])
        );
      case "CUSTOMER":
        return (
          !form.formState.isValid ||
          getDisableStateWithFormHelper([
            "role",
            "user_id",
            "email",
            "password",
            "confirm_password",
            "name",
            "company",
            "tax_id",
            "alias",
            "country",
            "nda_file",
          ])
        );
      case "CLIENT":
        return (
          !form.formState.isValid ||
          getDisableStateWithFormHelper([
            "role",
            "user_id",
            "email",
            "password",
            "confirm_password",
            "name",
            "company",
            "tax_id",
            "alias",
            "country",
            "nda_file",
          ])
        );
      case "GUEST":
        return (
          !form.formState.isValid ||
          getDisableStateWithFormHelper([
            "role",
            "user_id",
            "email",
            "name",
            "password",
            "confirm_password",
            "country",
          ])
        );
    }
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("account.account.add_account")}
      confirm={form.handleSubmit(handleSubmit)}
      confirmButtonText="Add"
      width="400px"
      manualToggleOpenWhenConfirm
      disabled={getDisableState()}
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.role")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl sx={{ width: "100%" }} size="small">
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Select
                    displayEmpty
                    renderValue={(v) =>
                      v?.length ? (
                        selectRoleData().find((item) => item.value === v).label
                      ) : (
                        <span className="text-grey-5">
                          {t("account.add_account_pop_up.select")}
                        </span>
                      )
                    }
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {selectRoleData().map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </InputBox.Body>
        </InputBox>

        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "id"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.id")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="user_id"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z0-9]*$/; // 영어 대소문자와 숫자만 허용
                      const value = e.target.value;

                      // 입력값 중 허용되지 않는 문자 제거
                      if (!regex.test(value)) {
                        e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
                      }

                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </InputBox.Body>
          </InputBox>
        )}

        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "email"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.e-mail")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="email"
                control={form.control}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 형식 정규식
                    message: t("error.invalid_email_format"), // 에러 메시지
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const regex =
                        /^[^\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]*$/; // 한글 및 자모 제거
                      const value = e.target.value;

                      // 입력값 중 한글 및 자모 제거
                      if (!regex.test(value)) {
                        e.target.value = value.replace(
                          /[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]/g,
                          ""
                        ); // 한글과 자모 범위 제거
                      }

                      field.onChange(e.target.value);
                    }}
                    error={!!error}
                  />
                )}
              />
              {form.formState.errors.email?.type === "pattern" && (
                <InputErrorText text={form.formState.errors.email?.message} />
              )}
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "name"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.name")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={form.watch("name")}
                onChange={(e) => {
                  const regex = /^[a-zA-Z\s]*$/; // 영어 대소문자와 숫자만 허용
                  const value = e.target.value;

                  // 입력값 중 허용되지 않는 문자 제거
                  if (!regex.test(value)) {
                    e.target.value = value.replace(/[^a-zA-Z\s]/g, "");
                  }

                  form.setValue("name", e.target.value);
                }}
              />
            </InputBox.Body>
          </InputBox>
        )}

        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "password"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.password")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="password"
                control={form.control}
                rules={{
                  validate: {
                    minLength: (value) =>
                      value.length >= 8 || t("error.At_least_8_characters"),
                    upperLowerCase: (value) =>
                      /(?=.*[a-z])(?=.*[A-Z])/.test(value) ||
                      t("error.At_least_1_upper/lowercase"),
                    containsNumber: (value) =>
                      /(?=.*\d)/.test(value) || t("error.At_least_1_number"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{ color: "var(--grey5)" }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: "var(--grey5)" }}
                              />
                            )}
                          </IconButton>
                        ),
                      }}
                      {...field}
                      onChange={(e) => {
                        const regex =
                          /^[^\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]*$/; // 한글 및 자모 제거
                        const value = e.target.value;

                        // 입력값 중 한글 및 자모 제거
                        if (!regex.test(value)) {
                          e.target.value = value.replace(
                            /[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]/g,
                            ""
                          ); // 한글과 자모 범위 제거
                        }

                        field.onChange(e.target.value);
                      }}
                      error={!!error}
                    />
                    {error?.message && <InputErrorText text={error.message} />}
                  </>
                )}
              />
            </InputBox.Body>
          </InputBox>
        )}

        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "passwordConfirm"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.password_confirm")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="confirm_password"
                control={form.control}
                rules={{
                  validate: {
                    same: (value, { password }) =>
                      value === password || t("error.Passwords_do_not_match"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{ color: "var(--grey5)" }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: "var(--grey5)" }}
                              />
                            )}
                          </IconButton>
                        ),
                      }}
                      {...field}
                      onChange={(e) => {
                        const regex =
                          /^[^\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]*$/; // 한글 및 자모 제거
                        const value = e.target.value;

                        // 입력값 중 한글 및 자모 제거
                        if (!regex.test(value)) {
                          e.target.value = value.replace(
                            /[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]/g,
                            ""
                          ); // 한글과 자모 범위 제거
                        }

                        field.onChange(e.target.value);
                      }}
                      error={!!error}
                    />
                    {error?.message && <InputErrorText text={error.message} />}
                  </>
                )}
              />
            </InputBox.Body>
          </InputBox>
        )}

        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "country"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.country")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <SelectCountry
                setCountryData={(value) => {
                  form.setValue("country", value as string);
                }}
              />
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "company"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.account.company")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={form.watch("company")}
                onChange={(e) => {
                  form.setValue("company", e.target.value);
                }}
              />
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "department"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.department")}
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={form.watch("department")}
                onChange={(e) => form.setValue("department", e.target.value)}
              />
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "taxId"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.tax_id")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={form.watch("tax_id")}
                onChange={(e) => {
                  form.setValue("tax_id", e.target.value);
                }}
              />
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "alias"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.alias")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={form.watch("alias")}
                onChange={(e) => {
                  form.setValue("alias", e.target.value);
                }}
              />
            </InputBox.Body>
          </InputBox>
        )}
        {(getFieldsByRole(form.watch("role").toUpperCase()) || "").includes(
          "nda_file"
        ) && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.nda_contract")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Stack direction="row" gap="8px">
                <TextField
                  fullWidth
                  value={form.watch("nda_file")?.name || ""}
                  inputProps={{ readOnly: true }}
                />
                <Button variant="contained" color="secondary" component="label">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    hidden
                    onChange={handleFileChange}
                  />
                  {t("account.add_account_pop_up.upload")}
                </Button>
              </Stack>
            </InputBox.Body>
          </InputBox>
        )}
      </Stack>
    </Modal>
  );
}
