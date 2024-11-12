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
// import { useTranslations } from "next-intl";

export default function page() {
  const router = useRouter();
  // const t = useTranslations("HomePage");
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

  const [inputId, setInputId] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      user_id: inputId,
      country: selectedCountry,
      password: inputPassword,
    });
  };

  return (
    <>
      {/* <h1>{t("title")}</h1> TEST 용도 입니다. */}
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Sign in to your SyncMaster account!</div>
      <div className="description">
        You can log in with your Scuti ID!
        <br />
        Don’t have an account yet?
        <Link
          href="http://www.wizardlab.co.kr/main/index_06_1"
          className="underlineTextButton"
        >
          Contact us
        </Link>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>Country</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <SelectCountry setCountryData={setSelectedCountry} />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>ID</InputBox.Title>
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
              <InputBox.Title>Password</InputBox.Title>
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
              <Link className="underlineTextButton" href="/find-id">
                Find ID
              </Link>
              /
              <Link className="underlineTextButton" href="/find-password">
                Find Password
              </Link>
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
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
                selectedCountry.length === 0 ||
                inputId.length === 0 ||
                inputPassword.length === 0
                  ? "0.5"
                  : undefined,
            }}
            disabled={
              selectedCountry.length === 0 ||
              inputId.length === 0 ||
              inputPassword.length === 0 ||
              isPending
            }
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
