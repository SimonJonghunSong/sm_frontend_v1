"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, IconButton, Stack, TextField } from "@mui/material";
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

export default function MyInfoPage() {
  const t = useTranslations();
  const { lang } = useLangStore();
  const { userRole } = useAuthStore();
  const { isOnline } = useNetworkMonitor();
  const { toggle, renderSuccessModal } = useSuccessDialog({
    description: t("popup.settings.my_info.saved_successfully!"),
  });

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      pw: undefined,
      confirmedPw: undefined,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState<string>();
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const isRoot = userRole?.toUpperCase() === "ROOT";

  const { data, isPending, error } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    select: (data) => {
      return data.data.parameter.user;
    },
  });
  const { mutate } = useMutation({
    mutationFn: modifyMyAccount,
    onSuccess: toggle,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSave = ({ pw }) => {
    if (!isOnline) {
      setOfflineErrorDialog(true);
      return;
    }

    mutate({
      ...data,
      password: pw,
      department,
    });
  };

  if (isPending) return <>...</>;

  if (error) {
    return <></>;
  }

  const renderCompany = () => {
    if (userRole?.toUpperCase() === "ROOT") return null;
    return (
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        height="56px"
        borderBottom="1px solid var(--grey3)"
      >
        <div className="list-title">{t("settings.my_info.company")}</div>
        <div>James Franco</div>
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
        <div>{data.country}</div>
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
        <div>{data.role.name.toUpperCase()}</div>
      </Stack>
    );
  };

  const renderAffiliation = () => {
    if (userRole?.toUpperCase() === "ROOT") return null;
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
          {/* TODO 기존 Select로 이루어짐
       <Select
        value={affilication}
        onChange={handleChange}
        sx={{ width: 320 }}
      >
        <MenuItem value={"su"}>SU</MenuItem> 
      </Select> */}
          <div>{data.affiliation}</div>
        </div>
      </Stack>
    );
  };

  const renderDepartment = () => {
    if (userRole?.toUpperCase() === "ROOT") return null;
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
          <TextField
            sx={{ width: 320 }}
            defaultValue={data.department}
            onChange={({ target }) => {
              const value = target.value;

              // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
              target.value = value.replace(/[\u3131-\uD79D]/g, "");
              setDepartment(value);
            }}
          />
        </div>
      </Stack>
    );
  };

  return (
    <>
      <div className="pageWrap">
        <SideMenu
          sideMenuItems={
            isRoot
              ? sideMenuItems(lang).filter(
                  ({ key }) => key === "myInfo" || key === "logout"
                )
              : sideMenuItems(lang)
          }
        />
        <article className="contentWrap">
          <form onSubmit={form.handleSubmit(handleSave)}>
            <div className="pageTitle">{t("settings.my_info.my_info")}</div>
            <Stack>
              {renderCompany()}
              {renderId()}
              {renderEmail()}
              {renderPassword()}
              {renderConfirmPassword()}
              {renderCountry()}
              {renderRole()}
              {renderAffiliation()}
              {renderDepartment()}
            </Stack>
            <Stack direction="row" justifyContent="flex-end" marginTop="40px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!form.watch("pw") || !form.watch("confirmedPw")}
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
