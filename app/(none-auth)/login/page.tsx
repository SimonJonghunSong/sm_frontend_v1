"use client";

import { useState } from "react";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import Link from "next/link";
import InputBox from "../../../components/inputbox/InputBox";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SelectCountry from "../../../components/SelectCountry";
import useAuthStore from "../../../utils/useAuthStore";
import { login } from "@/src/api/services/auth";
import GlobalLoading from "@/components/GlobalLoading";
import useLangStore from "@/utils/useLangStore";
import { useTranslations } from "next-intl";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { toast } from "react-toastify";

const REMEMBER_ME_STORAGE_KEY = "remember_user_id";

export default function page() {
  const router = useRouter();
  const { lang, setLang } = useLangStore();
  const t = useTranslations("login");
  const { setUserId, setUserRole, setToken, setRefreshToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.parameter.accessToken);
      setRefreshToken(response.data.parameter.refreshToken);
      setUserRole(response.data.parameter.role);
      setUserId(response.data.parameter.email);
      router.replace("/");
    },
  });
  const [isRemberberMe, setIsRememberMe] = useState(
    typeof window !== "undefined"
      ? !!localStorage.getItem(REMEMBER_ME_STORAGE_KEY)
      : false
  );

  const [inputId, setInputId] = useState<string>(
    isRemberberMe ? localStorage.getItem(REMEMBER_ME_STORAGE_KEY) : ""
  );
  const [inputPassword, setInputPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const { isOnline } = useNetworkMonitor();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getCountryByLang = () => {
    switch (lang) {
      case "en":
        return "usa";
      case "pt":
        return "portugal";
      case "es":
        return "spain";
    }
  };

  const handleOfflineClickBlock = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isOnline) {
      e.preventDefault();
      toast(t("common.message.no-network-connection"), {
        type: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        user_id: inputId,
        country: getCountryByLang(),
        password: inputPassword,
      },
      {
        onSuccess: () => {
          if (isRemberberMe) {
            localStorage.setItem(REMEMBER_ME_STORAGE_KEY, inputId);
          } else {
            localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
          }
        },
      }
    );
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">
        {t("login.sign_in_to_your_syncmaster_account!")}
      </div>
      <div className="description">
        {t("login.you_can_log_in_with_your_scuti_id!")}
        <br />
        {t("login.don’t_have_an_account_yet?")}
        <Link
          href="http://www.wizardlab.co.kr/main/index_06_1"
          className="underlineTextButton"
        >
          {t("login.contact_us")}
        </Link>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.country")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <SelectCountry
                  defaultCountry={
                    lang === "en" ? "usa" : lang === "es" ? "spain" : "portugal"
                  }
                  setCountryData={(country) => {
                    setLang(
                      country === "usa"
                        ? "en"
                        : country === "portugal"
                        ? "pt"
                        : "es"
                    );
                  }}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.id")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="id"
                variant="outlined"
                size="small"
                fullWidth
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.password")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                id="password"
                variant="outlined"
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
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
            </InputBox.Body>
          </InputBox>
          <div className={styles.loginHelpWrap}>
            <div>
              <Link
                className="underlineTextButton"
                href="/find-id"
                onClick={handleOfflineClickBlock}
              >
                {t("login.find_id")}
              </Link>
              /
              <Link
                className="underlineTextButton"
                href="/find-password"
                onClick={handleOfflineClickBlock}
              >
                {t("login.find_password")}
              </Link>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRemberberMe}
                    onChange={(e) => setIsRememberMe(e.target.checked)}
                  />
                }
                label={t("login.remember_me")}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "var(--primary-gradient)",
              mt: 2,
              opacity:
                inputId.length === 0 || inputPassword.length === 0
                  ? "0.5"
                  : undefined,
            }}
            disabled={
              inputId.length === 0 || inputPassword.length === 0 || isPending
            }
          >
            {t("login.login")}
          </Button>
        </form>
      </div>
    </>
  );
}
