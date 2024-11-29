"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "/public/images/logo-dark.svg";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InputBox from "../../../../components/inputbox/InputBox";
import { Controller, useForm } from "react-hook-form";
import InputErrorText from "@/components/InputErrorText";
import styled from "@emotion/styled";

export default function page() {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      pw: undefined,
      confirmedPw: undefined,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.replace("/");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">
        {t("login.pw_settings.set_your_password!")}
      </div>
      <div className="description">
        {t("login.pw_settings.set_a_password_for_your_account")}
      </div>

      <ConentDiv className="content">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.pw_settings.password")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="pw"
                control={form.control}
                rules={{
                  validate: {
                    length: (value) =>
                      value.length >= 8 || t("error.At_least_8_characters"),
                    case: (value) =>
                      (/[A-Z]/.test(value) && /[a-z]/.test(value)) ||
                      t("error.At_least_1_upper/lowercase"),
                    number: (value) =>
                      /\d/.test(value) || t("error.At_least_1_number"),
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <TextField
                        id="input1"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!error}
                        type={showPassword ? "text" : "password"}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                          e.target.value = value.replace(
                            /[\u3131-\uD79D]/g,
                            ""
                          );
                          field.onChange(e.target.value);
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
                        <InputErrorText text={error.message} />
                      )}
                    </>
                  );
                }}
              />
            </InputBox.Body>
          </InputBox>

          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                {t("login.pw_settings.confirm_password")}
              </InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="confirmedPw"
                control={form.control}
                rules={{
                  validate: {
                    same: (value, { pw }) =>
                      value === pw || t("error.Passwords_do_not_match"),
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <TextField
                        id="input1"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!error}
                        type={showPassword ? "text" : "password"}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                          e.target.value = value.replace(
                            /[\u3131-\uD79D]/g,
                            ""
                          );
                          field.onChange(e.target.value);
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
                        <InputErrorText text={error.message} />
                      )}
                    </>
                  );
                }}
              />
            </InputBox.Body>
          </InputBox>

          <Button
            disabled={!form.watch("confirmedPw") || !form.watch("pw")}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            {t("login.pw_settings.set_password")}
          </Button>
        </form>
      </ConentDiv>
    </>
  );
}

const ConentDiv = styled.div`
  width: 352px !important;
`;
