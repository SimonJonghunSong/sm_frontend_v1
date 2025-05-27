import useLangStore from "@/utils/useLangStore";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
  value2: {
    en: "Input only between 0 ~ 200",
    es: "Ingrese solo entre 0 ~ 200",
    pt: "Insira apenas entre 0 ~ 200",
  },
};

export default function DetectionControlSpeedCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
  isLoading,
}: Props) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      value1: "00000",
      value2: "",
    },
  });

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  if (isHiddenParameter && hiddenParameter) return null;

  const { lang } = useLangStore();

  const handleSubmit = () => {
    const values = form.getValues();
    handleSendCommand(
      `AT^CMD;${imei};${id.slice(0, 2)};${id.slice(2)};${parseInt(
        values.value1,
        2
      )},${values.value2}`
    );
  };

  return (
    <Container>
      <Title $isHiddenParameter={isHiddenParameter}>
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
          <Controller
            control={form.control}
            name="value1"
            render={({ field }) => (
              <Stack flexWrap={"wrap"} direction={"row"} gap={"24px"}>
                {field.value.split("").map((char, index) => (
                  <FormControlLabel
                    key={index}
                    value={char}
                    control={
                      <Checkbox
                        checked={char === "1"}
                        onChange={(e) => {
                          const newValue = field.value.split("");
                          newValue[index] = e.target.checked ? "1" : "0";
                          field.onChange(newValue.join(""));
                        }}
                      />
                    }
                    label={`Output ${index + 1}`}
                  />
                ))}
              </Stack>
            )}
          />
        </InputField>
        <InputField>
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
                  value: 200,
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

const Title = styled.div<{ $isHiddenParameter: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  width: 100%;

  h3 {
    width: fit-content;
    color: ${(props) => (props.$isHiddenParameter ? "#FF0000" : "#6f6f6f")};
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
