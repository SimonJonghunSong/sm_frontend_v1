"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import InputBox from "../../../components/inputbox/InputBox";
import SelectCountry from "../../../components/SelectCountry";
import { findId, findPassword } from "@/src/api/services/auth";
import InputErrorText from "@/components/InputErrorText";
import useErrorDialog from "@/src/hooks/useErrorDialog";

export default function page() {
  const router = useRouter();
  const form = useForm<{ country: string; email: string }>({
    mode: "onBlur",
    defaultValues: {
      country: undefined,
      email: undefined,
    },
  });
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const { renderErrorModal, toggle } = useErrorDialog({
    description: t("popup.login.find_id.unregistered_information"),
  });

  const { mutate, data } = useMutation({
    mutationFn: findId,
    onSuccess: () => {
      setStep(2);
    },
    onError: ({}: AxiosError<{
      response: { code: number; reason: string };
    }>) => {
      toggle();
    },
  });

  const findPasswordMutation = useMutation({
    mutationFn: findPassword,
    onSuccess: () => {
      const { country, email } = form.getValues();
      router.push(`/find-password/result?country=${country}&email=${email}`);
    },
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      console.error(response, ":: find password error");
    },
  });

  const handleFindIdSubmit = ({ country, email }) => {
    mutate({
      country,
      email,
    });
  };

  const handleClickLogin = () => {
    router.replace("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickLogin();
  };

  const handleClickFindPassword = () => {
    const { country, email } = form.getValues();
    findPasswordMutation.mutate({
      country,
      email,
    });
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <div className="logo">
            <Image src={logo} alt="synctrack" />
          </div>
          <div className="pageTitle">{t("login.find_id.forgot_your_id?")}</div>
          <div className="description" style={{ width: 230 }}>
            {t(
              "login.find_id.please_enter_your_registered_email_address_to_find_your_id_first"
            )}
          </div>

          <div className="content">
            <form onSubmit={form.handleSubmit(handleFindIdSubmit)}>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>{t("login.find_id.country")}</InputBox.Title>
                </InputBox.Head>
                <InputBox.Body>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <SelectCountry
                      setCountryData={(data) => form.setValue("country", data)}
                    />
                  </FormControl>
                </InputBox.Body>
              </InputBox>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>{t("login.find_id.e-mail")}</InputBox.Title>
                </InputBox.Head>
                <InputBox.Body>
                  <Controller
                    name="email"
                    control={form.control}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 형식 정규식
                        message: t("error.invalid_email_format"), // 에러 메시지
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          type="email"
                          id="input1"
                          variant="outlined"
                          size="small"
                          fullWidth
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
                        />
                      );
                    }}
                  />

                  {form.formState.errors.email?.type === "pattern" && (
                    <InputErrorText
                      text={form.formState.errors.email?.message}
                    />
                  )}
                </InputBox.Body>
              </InputBox>
              <Stack direction={"column"}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!form.watch("country") || !form.watch("email")}
                  sx={{ mt: 2 }}
                >
                  {t("login.find_id.find_id")}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleClickLogin}
                >
                  {t("login.find_id.login")}
                </Button>
              </Stack>
            </form>
          </div>

          {renderErrorModal()}
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <div className="logo">
            <Image src={logo} alt="synctrack" />
          </div>
          <div className="pageTitle">
            {t("login.id_found.your_id_has_been_found!")}
          </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  backgroundColor: "var(--grey4)",
                  borderRadius: "8px",
                  margin: "32px 0",
                  padding: "32px 0",
                  textAlign: "center",
                }}
              >
                {data ? data.data.parameter.user_id : ""}
              </Box>
              <Stack direction={"column"}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ background: "var(--primary-gradient)", mt: 2 }}
                >
                  {t("login.id_found.login")}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleClickFindPassword}
                >
                  {t("login.id_found.find_password")}
                </Button>
              </Stack>
            </form>
          </div>
        </>
      );
    }
  };

  return <>{renderStepContent()}</>;
}
