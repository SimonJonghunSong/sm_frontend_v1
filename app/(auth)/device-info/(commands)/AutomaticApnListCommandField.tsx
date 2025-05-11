import useLangStore from "@/utils/useLangStore";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";
import { useState } from "react";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import { SwitchPrimary } from "@/components/switches";
import { Controller, useForm } from "react-hook-form";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
  isLoading: boolean;
}

const ERROR_MESSAGES = {
  value1: {
    en: "Must be 5~6 digits long.",
    es: "Debe tener entre 5 y 6 dígitos.",
    pt: "Deve ter entre 5 e 6 dígitos.",
  },
  value3: {
    en: "APN must be 100 characters or less.",
    es: "El APN debe tener 100 caracteres o menos.",
    pt: "O APN deve ter 100 caracteres ou menos.",
  },
  value4: {
    en: "ID must be 32 characters or less.",
    es: "El ID debe tener 32 caracteres o menos.",
    pt: "O ID deve ter 32 caracteres ou menos.",
  },
  value5: {
    en: "PW must be 32 characters or less.",
    es: "La contraseña debe tener 32 caracteres o menos.",
    pt: "A senha deve ter 32 caracteres ou menos.",
  },
};

export default function AutomaticApnListCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
  isLoading,
}: Props) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      value1: "",
      value2: "0",
      value3: "",
      value4: "",
      value5: "",
    },
  });

  const { lang } = useLangStore();

  const handleSubmit = () => {
    const values = form.getValues();
    handleSendCommand(
      `AT^CMD;${imei};${id.slice(0, 2)};${id.slice(2)};${values.value1},${
        values.value2
      },${values.value3},${values.value4},${values.value5}`
    );
  };

  return (
    <Container>
      <Title>
        <div>
          <h3>{FIELD_VALIDATIONS[id].title[lang]}</h3>
          <Tooltip
            title={FIELD_VALIDATIONS[id].tooltip[lang]}
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -12],
                    },
                  },
                ],
              },
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "22px", color: "var(--grey5)" }}
            />
          </Tooltip>
          <InputBox.Number>{id}</InputBox.Number>
        </div>
        <Button
          variant="contained"
          color="secondary"
          disabled={!form.formState.isValid || isLoading}
          onClick={form.handleSubmit(handleSubmit)}
          style={{
            minWidth: "84px",
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : buttonText}
        </Button>
      </Title>
      <Stack width={"100%"} gap={"12px"}>
        <InputField>
          <div className="label">MCC/MNC</div>
          <Controller
            control={form.control}
            name="value1"
            rules={{
              minLength: {
                value: 5,
                message: ERROR_MESSAGES.value1[lang],
              },
              maxLength: {
                value: 6,
                message: ERROR_MESSAGES.value1[lang],
              },
              pattern: {
                value: /^[0-9]+$/,
                message: ERROR_MESSAGES.value1[lang],
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                inputProps={{
                  minLength: 5,
                  maxLength: 6,
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </InputField>
        <InputField>
          <div className="label">Authentication</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value2"
              render={({ field }) => (
                <SwitchPrimary
                  checked={field.value === "1"}
                  onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                />
              )}
            />
          </Stack>
        </InputField>

        <InputField>
          <div className="label">APN</div>
          <Controller
            control={form.control}
            name="value3"
            rules={{
              maxLength: {
                value: 100,
                message: ERROR_MESSAGES.value3[lang],
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                inputProps={{
                  maxLength: 100,
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </InputField>

        <InputField>
          <div className="label">ID</div>
          <Controller
            control={form.control}
            name="value4"
            rules={{
              maxLength: {
                value: 32,
                message: ERROR_MESSAGES.value4[lang],
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                inputProps={{
                  maxLength: 32,
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </InputField>

        <InputField>
          <div className="label">PW</div>
          <Controller
            control={form.control}
            name="value5"
            rules={{
              maxLength: {
                value: 32,
                message: ERROR_MESSAGES.value5[lang],
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                inputProps={{
                  maxLength: 32,
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </InputField>
      </Stack>
    </Container>
  );
}

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  width: 100%;

  h3 {
    width: fit-content;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  width: 100%;

  & > .label {
    width: 100px;
    font-weight: 400;
    font-size: 15px;
    line-height: 14px;
    color: #6f6f6f;
  }

  & > .input {
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;
