"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import { me, modifyMyAccount } from "@/src/api/services/auth";
import useLangStore from "@/utils/useLangStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import useAuthStore from "@/utils/useAuthStore";
import InputErrorText from "@/components/InputErrorText";
import useSuccessDialog from "@/src/hooks/useSuccessDialog";

type RoleType = "ROOT" | "CUSTOMER" | "ADMIN" | "CLIENT" | "GUEST";

const affiliationList = [
  { label: "HQ", value: "HQ" },
  { label: "SB", value: "SB" },
  { label: "STGPS", value: "STGPS" },
  { label: "STI", value: "STI" },
  { label: "SU", value: "SU" },
  { label: "FIN", value: "FIN" },
  { label: "Etc", value: "Etc" },
];

export default function MyInfoPage() {
  const t = useTranslations();
  const { lang } = useLangStore();
  const { userRole } = useAuthStore();
  const { isOnline } = useNetworkMonitor();
  const { toggle, renderSuccessModal } = useSuccessDialog({
    description: t("popup.settings.my_info.saved_successfully!"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const isRoot = userRole?.toUpperCase() === "ROOT";
  const isCustomer = userRole?.toUpperCase() === "CUSTOMER";
  const isGuest = userRole?.toUpperCase() === "GUEST";

  const { data, isPending, error, isFetched } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    refetchOnMount: true,
    select: (data) => {
      return data.data.parameter.user;
    },
  });
  const { mutate } = useMutation({
    mutationFn: modifyMyAccount,
    onSuccess: toggle,
  });

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      pw: undefined,
      confirmedPw: undefined,
      affiliation: undefined,
      department: undefined,
      taxId: undefined,
      alias: undefined,
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSave = ({ pw, affiliation, alias, department, taxId }) => {
    if (!isOnline) {
      setOfflineErrorDialog(true);
      return;
    }

    mutate({
      ...data,
      password: pw,
      department,
      affiliation,
      alias,
      tax_id: taxId,
    });
  };

  useEffect(() => {
    if (isFetched) {
      form.reset({
        affiliation: data?.affiliation,
        taxId: data?.tax_id,
        alias: data?.alias,
        department: data?.department,
      });
    }
  }, [isFetched]);

  if (isPending) return <>...</>;

  if (error) {
    return <></>;
  }

  const renderName = () => {
    if (userRole?.toUpperCase() === "ROOT") return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.name")}</div>
        <div>{data.name}</div>
      </Stack>
    );
  };

  const renderCompany = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "ADMIN" ||
      userRole?.toUpperCase() === "GUEST" ||
      userRole?.toUpperCase() === "CLIENT" ||
      userRole?.toUpperCase() === "CUSTOMER"
    )
      return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.company")}</div>
        <div>-</div>
      </Stack>
    );
  };

  const renderId = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.id")}</div>
        <div>{data.user_id}</div>
      </Stack>
    );
  };

  const renderEmail = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.e-mail")}</div>
        <div>{data.email}</div>
      </Stack>
    );
  };

  const renderPassword = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.password")}</div>
        <div>
          <Controller
            name="pw"
            control={form.control}
            rules={{
              validate: {
                length: (value) =>
                  value?.length >= 8 || t("error.At_least_8_characters"),
                case: (value) =>
                  (/[A-Z]/.test(value) && /[a-z]/.test(value)) ||
                  t("error.At_least_1_upper/lowercase"),
                number: (value) =>
                  /\d/.test(value) || t("error.At_least_1_number"),
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <Stack direction="row" gap={2} alignItems="center">
                  <TextField
                    placeholder={t("settings.my_info.change_password")}
                    id="input2"
                    variant="outlined"
                    size="small"
                    sx={{ width: 320 }}
                    error={!!error}
                    type={showPassword ? "text" : "password"}
                    {...field}
                    onChange={({ target }) => {
                      const value = target.value;

                      // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                      target.value = value.replace(/[\u3131-\uD79D]/g, "");
                      field.onChange(value);
                    }}
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
                  />

                  {error?.message && (
                    <InputErrorText
                      style={{ paddingTop: 0 }}
                      text={error.message}
                    />
                  )}
                </Stack>
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderConfirmPassword = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">
          {t("settings.my_info.confirm_password")}
        </div>
        <div>
          <Controller
            control={form.control}
            name="confirmedPw"
            rules={{
              validate: {
                same: (value, { pw }) =>
                  value === pw || t("error.Passwords_do_not_match"),
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <Stack direction="row" gap={2} alignItems="center">
                  <TextField
                    placeholder={t("settings.my_info.change_password")}
                    id="input1"
                    variant="outlined"
                    size="small"
                    sx={{ width: 320 }}
                    error={!!error}
                    type={showPassword ? "text" : "password"}
                    {...field}
                    onChange={({ target }) => {
                      const value = target.value;

                      // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                      target.value = value.replace(/[\u3131-\uD79D]/g, "");
                      field.onChange(value);
                    }}
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
                  />

                  {error?.message && (
                    <InputErrorText
                      style={{ paddingTop: 0 }}
                      text={error.message}
                    />
                  )}
                </Stack>
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderCountry = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.country")}</div>
        <div>
          {data.country?.toUpperCase() === "USA"
            ? "United States"
            : data.country
            ? data.country.charAt(0).toUpperCase() + data.country.slice(1)
            : "-"}
        </div>
      </Stack>
    );
  };

  const renderRole = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.role")}</div>
        <div>{switchRole(data.role.name.toUpperCase() as RoleType)}</div>
      </Stack>
    );
  };

  const renderAffiliation = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "GUEST" ||
      userRole?.toUpperCase() === "CLIENT" ||
      userRole?.toUpperCase() === "CUSTOMER"
    )
      return null;

    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.affiliation")}</div>
        <div>
          <Controller
            control={form.control}
            name="affiliation"
            render={({ field }) => {
              return (
                <Select
                  displayEmpty
                  renderValue={() => {
                    return field.value?.length ? (
                      affiliationList.find((item) => item.value === field.value)
                        .label
                    ) : (
                      <span className="text-grey-5">
                        {t("account.add_account_pop_up.select")}
                      </span>
                    );
                  }}
                  {...field}
                  sx={{ width: 320 }}
                >
                  {affiliationList.map(({ label, value }) => {
                    return <MenuItem value={value}>{label}</MenuItem>;
                  })}
                </Select>
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderDepartment = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "GUEST"
    )
      return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.department")}</div>
        <div>
          <Controller
            control={form.control}
            name="department"
            render={({ field }) => {
              return (
                <TextField
                  sx={{ width: 320 }}
                  {...field}
                  onChange={({ target }) => {
                    const value = target.value;

                    // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                    target.value = value.replace(/[\u3131-\uD79D]/g, "");
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderTaxId = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "GUEST" ||
      userRole?.toUpperCase() === "ADMIN"
    )
      return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.tax_id")}</div>
        <div>
          <Controller
            control={form.control}
            name="taxId"
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  error={!!error}
                  sx={{ width: 320 }}
                  {...field}
                  onChange={({ target }) => {
                    const value = target.value;

                    // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                    target.value = value.replace(/[\u3131-\uD79D]/g, "");
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderAlias = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "GUEST" ||
      userRole?.toUpperCase() === "ADMIN"
    )
      return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.alias")}</div>
        <div>
          <Controller
            control={form.control}
            name="alias"
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  sx={{ width: 320 }}
                  error={!!error}
                  {...field}
                  onChange={({ target }) => {
                    const value = target.value;

                    // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                    target.value = value.replace(/[\u3131-\uD79D]/g, "");
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
        </div>
      </Stack>
    );
  };

  const renderNdaContract = () => {
    if (
      userRole?.toUpperCase() === "ROOT" ||
      userRole?.toUpperCase() === "GUEST" ||
      userRole?.toUpperCase() === "ADMIN"
    )
      return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.nda_contract")}</div>
        <Stack direction="row" gap={1}>
          <TextField sx={{ width: 320 }} inputProps={{ readOnly: true }} />
          <Button variant="contained" color="secondary" component="label">
            <input
              style={{ display: "none" }}
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              hidden
              // onChange={handleFileChange} // TODO
            />
            {t("settings.my_info.upload")}
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <div className="pageWrap">
        <SideMenu
          sideMenuItems={
            isRoot
              ? sideMenuItems(lang, userRole).filter(
                  ({ key }) => key === "myInfo" || key === "logout"
                )
              : isCustomer || isGuest
              ? sideMenuItems(lang, userRole).filter(
                  ({ key }) => key !== "privacyPolicy"
                )
              : sideMenuItems(lang, userRole)
          }
        />
        <article className="contentWrap">
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="pageTitle">{t("settings.my_info.my_info")}</div>
            <Stack>
              {renderName()}
              {renderCompany()}
              {renderId()}
              {renderEmail()}
              {renderPassword()}
              {renderConfirmPassword()}
              {renderCountry()}
              {renderRole()}
              {renderAffiliation()}
              {renderDepartment()}
              {renderTaxId()}
              {renderAlias()}
              {renderNdaContract()}
            </Stack>
            <Stack direction="row" justifyContent="flex-end" marginTop="40px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!form.formState.isValid}
              >
                {t("settings.my_info.save")}
              </Button>
            </Stack>
          </form>
        </article>
      </div>

      {renderSuccessModal()}

      {offlineErrorDialog && (
        <OfflineErrorDialog
          onClose={() => {
            setOfflineErrorDialog(false);
          }}
        />
      )}
    </>
  );
}

const switchRole = (role: RoleType) => {
  switch (role) {
    case "ROOT":
      return "Root";
    case "ADMIN":
      return "Administrator";
    case "CUSTOMER":
      return "Customer";
    case "CLIENT":
      return "Client";
    case "GUEST":
      return "Guest";

    default:
      break;
  }
};
