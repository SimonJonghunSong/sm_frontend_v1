import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import styled from "@emotion/styled";
import Link from "next/link";
import InputBox from "../../../../components/inputbox/InputBox";
import SelectCountry from "../../../../components/SelectCountry";
import { login, me } from "@/src/api/services/auth";
import { getNoti } from "@/src/api/services/notification";
import { getModels } from "@/src/api/services/model";
import useAuthStore from "../../../../utils/useAuthStore";
import useLangStore from "@/utils/useLangStore";
import useModelPkgStore from "@/src/stores/useModelPkgStore";
import {
  getUserByEmail,
  insertLoginUser,
  offlineLogin,
} from "@/utils/idbLoginUtil";
import styles from "../../styles.module.scss";
import { AuthLoginBody } from "../(hooks)/types";

const REMEMBER_ME_STORAGE_KEY = "remember_user_id";

interface LoginFormProps {
  isOnline: boolean;
  isAnonymous: boolean;
  onLoginError: () => void;
  onOfflineError: () => void;
  onOfflineLoginError: () => void;
  onOfflineRootLoginError: () => void;
}

export default function LoginForm({
  isOnline,
  isAnonymous,
  onLoginError,
  onOfflineError,
  onOfflineLoginError,
  onOfflineRootLoginError,
}: LoginFormProps) {
  const router = useRouter();
  const t = useTranslations("login");
  const { lang, setLang } = useLangStore();
  const { setData } = useModelPkgStore();
  const {
    setUserId,
    setUserRole,
    setToken,
    setRefreshToken,
    setTargetCountry,
  } = useAuthStore();

  const [isUndefinedCountry, setIsUndefinedCountry] = useState(true);
  const [selectCountry, setSelectCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRemberberMe, setIsRememberMe] = useState(
    typeof window !== "undefined"
      ? !!localStorage.getItem(REMEMBER_ME_STORAGE_KEY)
      : false
  );

  const [inputId, setInputId] = useState<string>(
    isRemberberMe ? localStorage.getItem(REMEMBER_ME_STORAGE_KEY) : ""
  );
  const [inputPassword, setInputPassword] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (response, body) => {
      setToken(response.data.parameter.accessToken);
      setRefreshToken(response.data.parameter.refreshToken);
      setUserRole(response.data.parameter.role);
      setUserId(response.data.parameter.email);
      setTargetCountry(response.data.parameter.target_svr_country);

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
      onLoginError();
    },
  });

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
      onOfflineError();
    }
  };

  const handleOfflineLogin = async (requestBody: AuthLoginBody) => {
    const result = await offlineLogin(requestBody);

    if (!result) {
      onOfflineLoginError();
      return;
    }

    if (result.response.role === "ROOT") {
      onOfflineRootLoginError();
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
      if (isOnline) {
        return router.replace("/anonymous/device");
      } else {
        return onOfflineLoginError();
      }
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

  return (
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
              const value = e.target.value;
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
                    <VisibilityOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  ) : (
                    <VisibilityOffOutlinedIcon sx={{ color: "var(--grey5)" }} />
                  )}
                </IconButton>
              ),
            }}
          />
        </InputBox.Body>
      </InputBox>
      <div className={styles.loginHelpWrap}>
        {/* <div>
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
        </div> */}
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
            !selectCountry ||
            isPending) &&
            !isAnonymous)
        }
      >
        {t("login.login")}
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 352px;
`;
