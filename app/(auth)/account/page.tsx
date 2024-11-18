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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
      headerName: t("account.account.company(account)"),
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
      headerName: t("account.account.date"),
      minWidth: 240,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col8",
      headerName: t("account.account.edit"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (event) => {
        return (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(event.row);
              editmodalToggle();
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
        );
      },
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
            mutate([event.row.id]);
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];
  const [selectedRowIdList, setSelectedRowIdList] = useState<string[]>();
  const [selectedUser, setSelectedUser] = useState<{
    col1: string; // email
    col2: string; // id
    col3: string; // username
    col4: string; // company(account)
    col5: string; // country
    col6: string; // role
    col7: string; // date
  }>();

  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast(t("common.message.add-success"), {
        type: "success",
      });
    },
  });
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [userFilter, setUserFilter] = useState<string>("All");

  const [modal, modalToggle] = useModal();
  const [editmodal, editmodalToggle] = useModal();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleDeleteUsers = () => {
    if (!selectedRowIdList || !selectedRowIdList.length) return;
    mutate(selectedRowIdList);
  };

  return (
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
              <Select
                value={roleFilter}
                onChange={(e) => handleSelectChange(e, setRoleFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>{t("account.account.all")}</MenuItem>
                <MenuItem value={"Admin"}>
                  {t("account.account.admin")}
                </MenuItem>
                <MenuItem value={"Customer"}>
                  {t("account.account.customer")}
                </MenuItem>
                <MenuItem value={"Guest"}>
                  {t("account.account.guest")}
                </MenuItem>
              </Select>

              <Select
                value={userFilter}
                onChange={(e) => handleSelectChange(e, setUserFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>{t("account.account.all")}</MenuItem>
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

              <TextField sx={{ width: 160 }} />

              <Button variant="contained" color="secondary">
                {t("account.account.search")}
              </Button>
            </Stack>

            <Button variant="contained" color="secondary" onClick={modalToggle}>
              {t("account.account.add")}
            </Button>
          </Stack>
          <DataTable
            rows={(error
              ? []
              : data?.data?.user_list.filter((user) => {
                  if (roleFilter === "All") return user;
                  return (
                    user.role.name.toUpperCase() === roleFilter.toUpperCase()
                  );
                }) || []
            ).map(({ email, user_id, name, country, role, reg_date }) => {
              return {
                id: user_id,
                col1: email,
                col2: user_id,
                col3: name,
                col4: "-",
                col5: country,
                col6: role.name,
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
              <Button variant="text" color="info" onClick={handleDeleteUsers}>
                {t("account.account.delete")}
              </Button>
            }
          />
        </Stack>
      </article>

      {modal && <AddAcountModal onClose={modalToggle} />}
      {editmodal && (
        <EditAcountModal
          onClose={editmodalToggle}
          role={selectedUser.col6}
          email={selectedUser.col1}
          id={selectedUser.col2}
          name={selectedUser.col3}
          department={
            data.data.user_list.find(
              ({ user_id }) => user_id === selectedUser.col2
            ).department
          }
          taxId={
            data.data.user_list.find(
              ({ user_id }) => user_id === selectedUser.col2
            ).tax_id
          }
          company=""
          password=""
          alias={
            data.data.user_list.find(
              ({ user_id }) => user_id === selectedUser.col2
            ).alias
          }
          country={
            data.data.user_list.find(
              ({ user_id }) => user_id === selectedUser.col2
            ).country
          }
        />
      )}
    </div>
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
      return ["role", "id", "email", "password", "passwordConfirm"];
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

function AddAcountModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const selectRoleData = useRef([
    { label: t("account.account.all"), value: "root" },
    { label: t("account.account.admin"), value: "admin" },
    { label: t("account.account.customer"), value: "customer" },
    { label: t("account.account.guest"), value: "guest" },
  ]);
  const { userRole } = useAuthStore();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    role,
    id,
    email,
    name,
    password,
    confirmPassword,
    company,
    taxId,
    alias,
    country,
  } = state;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast("Successfully added!", {
        type: "success",
      });
      onClose();
    },
  });

  // 일시적인 미사용
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     dispatch({ type: "SET_NDA_FILE", value: e.target.files[0] });
  //   }
  // };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      return toast(t("account.add_account_pop_up.password_confirm_error"), {
        type: "error",
        position: "top-center",
      });
    }

    mutate({
      role: state.role,
      user_id: state.id,
      email: state.email,
      name: state.name,
      password: state.password,
      country: state.country,
      department: state.department,
      tax_id: state.taxId,
      alias: state.alias,
      affiliation: "",
      profile: [],
      nda_contract_contents: "",
      nda_contract_path: "",
      cmd_list: [],
    });
  };

  const getDisableState = () => {
    switch (userRole) {
      case "ROOT":
        return !role || !id || !email || !password || !confirmPassword;
      case "ADMIN":
        return (
          !role ||
          !id ||
          !email ||
          !password ||
          !confirmPassword ||
          !name ||
          !country
        );
      case "CUSTOMER":
        return (
          !role ||
          !id ||
          !email ||
          !password ||
          !confirmPassword ||
          !name ||
          !country ||
          !company ||
          !taxId ||
          !alias
        );
      case "GUEST":
        return (
          !role ||
          !id ||
          !email ||
          !password ||
          !confirmPassword ||
          !name ||
          !country
        );
    }
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("account.account.add_account")}
      confirm={handleSubmit}
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
              <Select
                displayEmpty
                renderValue={(v) =>
                  v?.length ? (
                    selectRoleData.current.find((item) => item.value === v)
                      .label
                  ) : (
                    <span className="text-grey-5">
                      {t("account.add_account_pop_up.select")}
                    </span>
                  )
                }
                value={state.role}
                onChange={(e) =>
                  dispatch({ type: "SET_ROLE", value: e.target.value })
                }
              >
                {selectRoleData.current.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.id")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.id}
              onChange={(e) =>
                dispatch({ type: "SET_ID", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.e-mail")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>
        {getFieldsByRole(userRole).includes("name") && (
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
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.password")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.password_confirm")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  value: e.target.value,
                })
              }
            />
          </InputBox.Body>
        </InputBox>

        {getFieldsByRole(userRole).includes("country") && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.country")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <SelectCountry
                setCountryData={(value) =>
                  dispatch({ type: "SET_COUNTRY", value: value as string })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}
        {getFieldsByRole(userRole).includes("company") && (
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
                value={state.company}
                onChange={(e) =>
                  dispatch({ type: "SET_COMPANY", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}
        {getFieldsByRole(userRole).includes("department") && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.department")}
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={state.department}
                onChange={(e) =>
                  dispatch({ type: "SET_DEPARTMENT", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}
        {getFieldsByRole(userRole).includes("taxId") && (
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
                value={state.taxId}
                onChange={(e) =>
                  dispatch({ type: "SET_TAX_ID", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}
        {getFieldsByRole(userRole).includes("alias") && (
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
                value={state.alias}
                onChange={(e) =>
                  dispatch({ type: "SET_ALIAS", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}
        {/* <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            NDA Contract<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Stack direction="row" gap="8px">
            <TextField
              fullWidth
              value={file?.name || ""}
              inputProps={{ readOnly: true }}
            />
            <Button variant="contained" color="secondary" component="label">
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              Upload
            </Button>
          </Stack>
        </InputBox.Body>
      </InputBox> */}
      </Stack>
    </Modal>
  );
}

function EditAcountModal({
  onClose,
  role,
  email,
  id,
  name,
  password,
  company,
  taxId,
  alias,
  country,
  department,
}: {
  role: string;
  email: string;
  id: string;
  name: string;
  password: string;
  company: string;
  taxId: string;
  alias: string;
  country: string;
  department: string;
  onClose: () => void;
}) {
  const t = useTranslations();
  const selectRoleData = useRef([
    { label: t("account.account.all"), value: "root" },
    { label: t("account.account.admin"), value: "admin" },
    { label: t("account.account.customer"), value: "customer" },
    { label: t("account.account.guest"), value: "guest" },
  ]);
  const { userRole } = useAuthStore();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    role,
    email,
    id,
    name,
    password,
    company,
    taxId,
    alias,
    country,
    department,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: modifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast(t("common.message.edit-success"), {
        type: "success",
      });
      onClose();
    },
  });
  // 일시적인 미사용
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     dispatch({ type: "SET_NDA_FILE", value: e.target.files[0] });
  //   }
  // };

  const getDisableState = () => {
    switch (userRole) {
      case "ROOT":
        return (
          !state.role ||
          !state.id ||
          !state.email ||
          !state.password ||
          !state.confirmPassword
        );
      case "ADMIN":
        return (
          !state.role ||
          !state.id ||
          !state.email ||
          !state.password ||
          !state.confirmPassword ||
          !state.name ||
          !state.country
        );
      case "CUSTOMER":
        return (
          !state.role ||
          !state.id ||
          !state.email ||
          !state.password ||
          !state.confirmPassword ||
          !state.name ||
          !state.country ||
          !state.company ||
          !state.taxId ||
          !state.alias
        );
      case "GUEST":
        return (
          !state.role ||
          !state.id ||
          !state.email ||
          !state.password ||
          !state.confirmPassword ||
          !state.name ||
          !state.country
        );
    }
  };

  const handleSubmit = () => {
    if (state.password !== state.confirmPassword) {
      return toast(t("account.add_account_pop_up.password_confirm_error"), {
        type: "error",
        position: "top-center",
      });
    }

    mutate({
      role: state.role,
      user_id: state.id,
      email: state.email,
      name: state.name,
      password: state.password,
      country: state.country,
      department: state.department,
      tax_id: state.taxId,
      alias: state.alias,
      affiliation: "",
      profile: [],
      nda_contract_contents: "",
      nda_contract_path: "",
      cmd_list: [],
    });
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title={t("account.account.edit_account")}
      confirm={handleSubmit}
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
              <Select
                displayEmpty
                renderValue={(v) =>
                  v?.length ? (
                    selectRoleData.current.find((item) => item.value === v)
                      .label
                  ) : (
                    <span className="text-grey-5">
                      {t("account.add_account_pop_up.select")}
                    </span>
                  )
                }
                value={state.role}
                onChange={(e) =>
                  dispatch({ type: "SET_ROLE", value: e.target.value })
                }
              >
                {selectRoleData.current.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.id")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.id}
              onChange={(e) =>
                dispatch({ type: "SET_ID", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.e-mail")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>

        {getFieldsByRole(userRole).includes("name") && (
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
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.password")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", value: e.target.value })
              }
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("account.add_account_pop_up.password_confirm")}
              <i>*</i>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  value: e.target.value,
                })
              }
            />
          </InputBox.Body>
        </InputBox>
        {getFieldsByRole(userRole).includes("country") && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.country")}
                <i>*</i>
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <SelectCountry
                defaultCountry={state.country.toLowerCase()}
                setCountryData={(value) =>
                  dispatch({ type: "SET_COUNTRY", value: value as string })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        {getFieldsByRole(userRole).includes("company") && (
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
                value={state.company}
                onChange={(e) =>
                  dispatch({ type: "SET_COMPANY", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        {getFieldsByRole(userRole).includes("department") && (
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("account.add_account_pop_up.department")}
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                fullWidth
                value={state.department}
                onChange={(e) =>
                  dispatch({ type: "SET_DEPARTMENT", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        {getFieldsByRole(userRole).includes("taxId") && (
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
                value={state.taxId}
                onChange={(e) =>
                  dispatch({ type: "SET_TAX_ID", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        {getFieldsByRole(userRole).includes("alias") && (
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
                value={state.alias}
                onChange={(e) =>
                  dispatch({ type: "SET_ALIAS", value: e.target.value })
                }
              />
            </InputBox.Body>
          </InputBox>
        )}

        {/* <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            NDA Contract<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Stack direction="row" gap="8px">
            <TextField
              fullWidth
              value={file?.name || ""}
              inputProps={{ readOnly: true }}
            />
            <Button variant="contained" color="secondary" component="label">
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              Upload
            </Button>
          </Stack>
        </InputBox.Body>
      </InputBox> */}
      </Stack>
    </Modal>
  );
}
