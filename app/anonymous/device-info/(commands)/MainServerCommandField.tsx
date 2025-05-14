import useLangStore from "@/utils/useLangStore";
import {
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";
import { Controller, useForm } from "react-hook-form";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "../(tabs)/CommandTab";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
  isLoading: boolean;
}

const ERROR_MESSAGES = {
  value1: {
    en: "Characters A-Z, a-z, 0-9, and symbols '-.' are allowed.",
    es: "Los caracteres A-Z, a-z, 0-9 y los símbolos '-.' son permitidos.",
    pt: "Os caracteres A-Z, a-z, 0-9 e os símbolos '-.' são permitidos.",
  },
  value2: {
    en: "Input only between 0 ~ 65535",
    es: "Ingrese solo entre 0 ~ 65535",
    pt: "Insira apenas entre 0 ~ 65535",
  },
};

export default function MainServerCommandField({
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
      value2: "",
      value3: "",
      value4: "",
    },
  });

  const { lang } = useLangStore();
  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  if (isHiddenParameter && hiddenParameter) return null;

  const handleSubmit = () => {
    const values = form.getValues();
    handleSendCommand(
      `AT^CMD;${imei};${id.slice(0, 2)};${id.slice(2)};${values.value1},${
        values.value2
      },${values.value3},${values.value4}`
    );
  };

  return (
    <Container>
      <Title isHiddenParameter={isHiddenParameter}>
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
          <div className="label">Server IP</div>
          <Controller
            control={form.control}
            name="value1"
            rules={{
              pattern: {
                value: /^[A-Za-z0-9\-.]+$/,
                message: ERROR_MESSAGES.value1[lang],
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </InputField>
        <InputField>
          <div className="label">Server Port</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value2"
              rules={{
                min: {
                  value: 0,
                  message: ERROR_MESSAGES.value2[lang],
                },
                max: {
                  value: 65535,
                  message: ERROR_MESSAGES.value2[lang],
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  type="number"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">Server Type</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value3"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  select
                >
                  <MenuItem value="TCP">TCP</MenuItem>
                  <MenuItem value="UDP">UDP</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">PW</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value4"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  type="password"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
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

const Title = styled.div<{ isHiddenParameter: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  width: 100%;

  h3 {
    width: fit-content;
    color: ${(props) => (props.isHiddenParameter ? "#FF0000" : "#6f6f6f")};
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

  & .input {
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
