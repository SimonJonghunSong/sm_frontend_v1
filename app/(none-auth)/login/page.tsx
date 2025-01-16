"use client";

import { useEffect, useState } from "react";
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
  Stack,
  TextField,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SelectCountry from "../../../components/SelectCountry";
import useAuthStore from "../../../utils/useAuthStore";
import { login, me } from "@/src/api/services/auth";
import useLangStore from "@/utils/useLangStore";
import { useTranslations } from "next-intl";
import styled from "@emotion/styled";
import Modal from "@/components/Modal";
import { getNoti } from "@/src/api/services/notification";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import {
  getUserByEmail,
  insertLoginUser,
  offlineLogin,
} from "@/utils/idbLoginUtil";
import { getModels } from "@/src/api/services/model";
import useModelPkgStore from "@/src/stores/useModelPkgStore";

const REMEMBER_ME_STORAGE_KEY = "remember_user_id";

export default function page() {
  const router = useRouter();
  const { lang, setLang } = useLangStore();
  const [selectCountry, setSelectCountry] = useState("");
  const { setData } = useModelPkgStore();

  const t = useTranslations("login");
  const [errorDialog, setErrorDialog] = useState(false);
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);
  const [offlineLoginErrorDialog, setOfflineLoginErrorDialog] = useState(false);
  const [offlineRootLoginErrorDialog, setOfflineRootLoginErrorDialog] =
    useState(false);
  const [isUndefinedCountry, setIsUndefinedCountry] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { setUserId, setUserRole, setToken, setRefreshToken } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (response, body) => {
      setToken(response.data.parameter.accessToken);
      setRefreshToken(response.data.parameter.refreshToken);
      setUserRole(response.data.parameter.role);
      setUserId(response.data.parameter.email);

      getModels();
      getNoti();
      const meRes = await me();

      const data = response.data.parameter;

      insertLoginUser({
        id: body.username,
        password: body.password,
        country: body.country,
        me: JSON.stringify(meRes.data.parameter.user),
        ...data,
      });

      router.replace("/");
    },
    onError: () => {
      setErrorDialog(true);
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

  const [isOnline, setIsOnline] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOfflineClickBlock = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isOnline) {
      e.preventDefault();
      handleOpenOfflineErrorDialog();
    }
  };

  const handleOfflineLogin = async (requestBody: AuthLoginBody) => {
    const result = await offlineLogin(requestBody);

    if (!result) {
      setOfflineLoginErrorDialog(true);
      return;
    }

    if (result.response.role === "ROOT") {
      setOfflineRootLoginErrorDialog(true);
      return;
    }

    setToken(result.response.accessToken);
    setRefreshToken(result.response.refreshToken);
    setUserRole(result.response.role);
    setUserId(result.response.email);

    router.replace("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAnonymous) {
      // setUserRole("anonymous");
      // setToken("anonymous");
      // router.replace("/");
      return;
    }

    const requestBody = {
      username: inputId,
      country: selectCountry,
      password: inputPassword,
    };

    if (isOnline) {
      mutate(requestBody, {
        onSuccess: async ({ data }) => {
          const result = await getUserByEmail(data.parameter.email);

          setData(result?.modelPkgData || {});

          if (isRemberberMe) {
            localStorage.setItem(REMEMBER_ME_STORAGE_KEY, inputId);
          } else {
            localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
          }
        },
      });
    } else {
      await handleOfflineLogin(requestBody);
    }
  };

  const handleContactUsClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isOnline) {
      e.preventDefault();

      router.push("/offline");
    }
  };

  const handleOpenOfflineErrorDialog = () => {
    setOfflineErrorDialog(true);
  };

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
          target="_blank"
          href="https://stsunlab.com/board/board_form?bd_id=CONTACT"
          className="underlineTextButton"
          onClick={handleContactUsClick}
        >
          {t("login.contact_us")}
        </Link>
      </div>

      <StyledDiv className="content">
        <StyledForm onSubmit={handleSubmit} action="">
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.country")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <SelectCountry
                  defaultCountry={
                    isUndefinedCountry
                      ? undefined
                      : lang === "en"
                      ? "usa"
                      : lang === "es"
                      ? "méxico"
                      : "brasil"
                  }
                  setCountryData={(country) => {
                    setIsUndefinedCountry(false);
                    setLang(
                      country === "brasil"
                        ? "pt"
                        : country === "méxico"
                        ? "es"
                        : "en"
                    );
                    setSelectCountry(country);
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
                disabled={isAnonymous}
                value={inputId}
                sx={{
                  background: isAnonymous ? "#F3F3F3" : undefined,
                }}
                onChange={(e) => {
                  // const regex = /^[a-zA-Z0-9]*$/; // 영어 대소문자와 숫자만 허용
                  const value = e.target.value;

                  // // 입력값 중 허용되지 않는 문자 제거
                  // if (!regex.test(value)) {
                  //   e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
                  // }
                  e.target.value = value.replace(/[\u3131-\uD79D]/g, "");
                  setInputId(e.target.value);
                }}
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
                disabled={isAnonymous}
                type={showPassword ? "text" : "password"}
                value={inputPassword}
                sx={{
                  background: isAnonymous ? "#F3F3F3" : undefined,
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                  e.target.value = value.replace(/[\u3131-\uD79D]/g, "");
                  setInputPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: !isAnonymous && (
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
                    disabled={isAnonymous}
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
            sx={{ mt: 2 }}
            disabled={
              (isAnonymous && isUndefinedCountry) ||
              ((inputId.length === 0 ||
                inputPassword.length === 0 ||
                isPending) &&
                !isAnonymous)
            }
          >
            {t("login.login")}
          </Button>
        </StyledForm>
      </StyledDiv>

      <Stack direction="row" alignItems="center" pt={1} gap="4px">
        <Checkbox
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        <span>Anonymous</span>
      </Stack>

      {errorDialog && <ErrorDialog onClose={() => setErrorDialog(false)} />}
      {offlineErrorDialog && (
        <OfflineErrorDialog onClose={() => setOfflineErrorDialog(false)} />
      )}
      {offlineLoginErrorDialog && (
        <OfflineLoginErrorDialog
          onClose={() => setOfflineLoginErrorDialog(false)}
        />
      )}
      {offlineRootLoginErrorDialog && (
        <OfflineRootLoginErrorDialog
          onClose={() => setOfflineRootLoginErrorDialog(false)}
        />
      )}
    </>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 352px;
`;

const ErrorDialog = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  return (
    <Modal
      width={"357px"}
      toggleOpen={onClose}
      open
      cancelButtonText="Ok"
      title={t("common.popup.error")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>
          {t("popup.login.login.invalid_country_or_id_or_password")}
        </span>
      </Stack>
    </Modal>
  );
};

const OfflineLoginErrorDialog = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  return (
    <Modal
      width={"357px"}
      toggleOpen={onClose}
      open
      cancelButtonText="Ok"
      title={t("common.popup.error")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>
          {t(
            "popup.login.login.an_initial_internet_connection_is_required_once_to_use_offline_mode"
          )}
        </span>
      </Stack>
    </Modal>
  );
};

const OfflineRootLoginErrorDialog = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  return (
    <Modal
      width={"357px"}
      toggleOpen={onClose}
      open
      cancelButtonText="Ok"
      title={t("common.popup.error")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>
          {t(
            "popup.login.login.the_root_account_can_only_be_used_in_online_mode"
          )}
        </span>
      </Stack>
    </Modal>
  );
};
