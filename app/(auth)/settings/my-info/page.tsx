"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import { me, modifyMyAccount } from "@/src/api/services/auth";
import useLangStore from "@/utils/useLangStore";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import useAuthStore from "@/utils/useAuthStore";

export default function MyInfoPage() {
  const t = useTranslations();
  const { lang } = useLangStore();
  const { userRole } = useAuthStore();
  const { isOnline } = useNetworkMonitor();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);

  const isRoot = userRole.toUpperCase() === "ROOT";

  const { data, isPending, error } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    select: (data) => {
      return data.data.parameter.user;
    },
  });
  const { mutate } = useMutation({
    mutationFn: modifyMyAccount,
    onSuccess: () => {
      toast(t("common.message.edit-success"), {
        type: "success",
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSave = () => {
    if (!isOnline) {
      setOfflineErrorDialog(true);
      return;
    }

    if (password !== confirmedPassword) {
      return toast(
        "Password confirmation is incorrect. Please enter the same password.",
        { type: "error", position: "top-center" }
      );
    }

    mutate({
      ...data,
      password,
      department,
    });
  };

  const renderCompany = () => {
    if (userRole.toUpperCase() === "ROOT") return null;
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
          <TextField
            placeholder={t("settings.my_info.change_password")}
            id="input2"
            variant="outlined"
            size="small"
            sx={{ width: 320 }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  ) : (
                    <VisibilityOffOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  )}
                </IconButton>
              ),
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
          <TextField
            placeholder={t("settings.my_info.change_password")}
            id="input1"
            variant="outlined"
            size="small"
            sx={{ width: 320 }}
            type={showPassword ? "text" : "password"}
            value={confirmedPassword}
            onChange={({ target }) => setConfirmedPassword(target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  ) : (
                    <VisibilityOffOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  )}
                </IconButton>
              ),
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
    if (userRole.toUpperCase() === "ROOT") return null;
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
    if (userRole.toUpperCase() === "ROOT") return null;
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
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
      </Stack>
    );
  };

  if (isPending) return <>...</>;

  if (error) {
    return <></>;
  }

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
              variant="contained"
              color="secondary"
              disabled={!password || !confirmedPassword}
              onClick={handleSave}
            >
              {t("settings.my_info.save")}
            </Button>
          </Stack>
        </article>
      </div>

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
