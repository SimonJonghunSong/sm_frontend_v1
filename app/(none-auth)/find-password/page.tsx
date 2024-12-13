"use client";

import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import InputBox from "../../../components/inputbox/InputBox";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import SelectCountry from "../../../components/SelectCountry";
import { findPassword } from "@/src/api/services/auth";
import useErrorDialog from "@/src/hooks/useErrorDialog";
import InputErrorText from "@/components/InputErrorText";

export default function page() {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm<{ country: string; email: string }>({
    mode: "onBlur",
    defaultValues: {
      country: undefined,
      email: undefined,
    },
  });
  const { renderErrorModal, toggle } = useErrorDialog({
    description: t("popup.login.find_id.unregistered_information"),
  });

  const { mutate } = useMutation({
    mutationFn: findPassword,
    onSuccess: () => {
      const { country, email } = form.getValues();
      router.push(`/find-password/result?country=${country}&email=${email}`);
    },
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      toggle();
    },
  });

  const handleSubmit = ({ country, email }) => {
    mutate({
      country,
      email,
    });
  };

  const handleClickLogin = () => {
    router.replace("/login");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">
        {t("login.find_pw.forgot_your_password?")}
      </div>
      <div className="description" style={{ width: 230 }}>
        {t(
          "login.find_pw.please_enter_your_registered_email_address_to_reset_your_password"
        )}
      </div>

      <div className="content">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("login.find_pw.country")}</InputBox.Title>
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
              <InputBox.Title>{t("login.find_pw.e-mail")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <Controller
                name="email"
                control={form.control}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 형식 정규식
                    message: t("error.invalid_email_format"), // 에러 메시지
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextField
                      type="email"
                      id="input1"
                      variant="outlined"
                      size="small"
                      error={!!error}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        // 한글(유니코드 범위: 0xAC00-0xD7AF) 제거
                        e.target.value = value.replace(/[\u3131-\uD79D]/g, "");
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />

              {form.formState.errors.email?.type === "pattern" && (
                <InputErrorText text={form.formState.errors.email?.message} />
              )}
            </InputBox.Body>
          </InputBox>
          <Stack direction={"column"}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                !form.watch("country") ||
                !form.watch("email") ||
                !!form.formState.errors.email
              }
              sx={{ mt: 2 }}
            >
              {t("login.find_pw.send_e-mail")}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClickLogin}
            >
              {t("login.find_pw.login")}
            </Button>
          </Stack>
        </form>
      </div>

      {renderErrorModal()}
    </>
  );
}
