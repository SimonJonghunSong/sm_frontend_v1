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

const BAND_OPTIONS = {
  value1: [
    {
      label: {
        en: "Automatic",
        es: "Automático",
        pt: "Automatico",
      },
      value: "Automatic",
    },
    {
      label: {
        en: "GSM",
        es: "GSM",
        pt: "GSM",
      },
      value: "GSM",
    },
    {
      label: {
        en: "LTE",
        es: "LTE",
        pt: "LTE",
      },
      value: "LTE",
    },
  ],
  value2: [
    {
      label: {
        en: "No change",
        es: "Sin cambios",
        pt: "Sem alteração",
      },
      value: "No change",
    },
    {
      label: {
        en: "900 MHz,",
        es: "900 MHz,",
        pt: "900 MHz,",
      },
      value: "900 MHz,",
    },
    {
      label: {
        en: "1800 MHz,",
        es: "1800 MHz,",
        pt: "1800 MHz,",
      },
      value: "1800 MHz,",
    },
    {
      label: {
        en: "850 MHz,",
        es: "850 MHz,",
        pt: "850 MHz,",
      },
      value: "850 MHz,",
    },
    {
      label: {
        en: "1900 MHz,",
        es: "1900 MHz,",
        pt: "1900 MHz,",
      },
      value: "1900 MHz,",
    },
    {
      label: {
        en: "All GSM frequencyies",
        es: "Todas las frecuencias GSM",
        pt: "Todas as frequências GSM",
      },
      value: "All GSM frequencyies",
    },
  ],
  value3: [
    {
      label: {
        en: "B1",
        es: "B1",
        pt: "B1",
      },
      value: "B1",
    },
    {
      label: {
        en: "B2",
        es: "B2",
        pt: "B2",
      },
      value: "B2",
    },
    {
      label: {
        en: "B3",
        es: "B3",
        pt: "B3",
      },
      value: "B3",
    },
    {
      label: {
        en: "B4",
        es: "B4",
        pt: "B4",
      },
      value: "B4",
    },
    {
      label: {
        en: "B5",
        es: "B5",
        pt: "B5",
      },
      value: "B5",
    },
    {
      label: {
        en: "B8",
        es: "B8",
        pt: "B8",
      },
      value: "B8",
    },
    {
      label: {
        en: "B12",
        es: "B12",
        pt: "B12",
      },
      value: "B12",
    },
    {
      label: {
        en: "B13",
        es: "B13",
        pt: "B13",
      },
      value: "B13",
    },
    {
      label: {
        en: "B14",
        es: "B14",
        pt: "B14",
      },
      value: "B14",
    },
    {
      label: {
        en: "B18",
        es: "B18",
        pt: "B18",
      },
      value: "B18",
    },
    {
      label: {
        en: "B19",
        es: "B19",
        pt: "B19",
      },
      value: "B19",
    },
    {
      label: {
        en: "B20",
        es: "B20",
        pt: "B20",
      },
      value: "B20",
    },
    {
      label: {
        en: "B25",
        es: "B25",
        pt: "B25",
      },
      value: "B25",
    },
    {
      label: {
        en: "B26",
        es: "B26",
        pt: "B26",
      },
      value: "B26",
    },
    {
      label: {
        en: "B27",
        es: "B27",
        pt: "B27",
      },
      value: "B27",
    },
    {
      label: {
        en: "B28",
        es: "B28",
        pt: "B28",
      },
      value: "B28",
    },
    {
      label: {
        en: "B31",
        es: "B31",
        pt: "B31",
      },
      value: "B31",
    },
    {
      label: {
        en: "B66",
        es: "B66",
        pt: "B66",
      },
      value: "B66",
    },
    {
      label: {
        en: "B72",
        es: "B72",
        pt: "B72",
      },
      value: "B72",
    },
    {
      label: {
        en: "B73",
        es: "B73",
        pt: "B73",
      },
      value: "B73",
    },
    {
      label: {
        en: "B85",
        es: "B85",
        pt: "B85",
      },
      value: "B85",
    },
  ],
  value4: [
    {
      label: {
        en: "B1",
        es: "B1",
        pt: "B1",
      },
      value: "B1",
    },
    {
      label: {
        en: "B2",
        es: "B2",
        pt: "B2",
      },
      value: "B2",
    },
    {
      label: {
        en: "B3",
        es: "B3",
        pt: "B3",
      },
      value: "B3",
    },
    {
      label: {
        en: "B4",
        es: "B4",
        pt: "B4",
      },
      value: "B4",
    },
    {
      label: {
        en: "B5",
        es: "B5",
        pt: "B5",
      },
      value: "B5",
    },
    {
      label: {
        en: "B8",
        es: "B8",
        pt: "B8",
      },
      value: "B8",
    },
    {
      label: {
        en: "B12",
        es: "B12",
        pt: "B12",
      },
      value: "B12",
    },
    {
      label: {
        en: "B13",
        es: "B13",
        pt: "B13",
      },
      value: "B13",
    },
    {
      label: {
        en: "B14",
        es: "B14",
        pt: "B14",
      },
      value: "B14",
    },
    {
      label: {
        en: "B18",
        es: "B18",
        pt: "B18",
      },
      value: "B18",
    },
    {
      label: {
        en: "B19",
        es: "B19",
        pt: "B19",
      },
      value: "B19",
    },
    {
      label: {
        en: "B20",
        es: "B20",
        pt: "B20",
      },
      value: "B20",
    },
    {
      label: {
        en: "B25",
        es: "B25",
        pt: "B25",
      },
      value: "B25",
    },
    {
      label: {
        en: "B26",
        es: "B26",
        pt: "B26",
      },
      value: "B26",
    },
    {
      label: {
        en: "B27",
        es: "B27",
        pt: "B27",
      },
      value: "B27",
    },
    {
      label: {
        en: "B28",
        es: "B28",
        pt: "B28",
      },
      value: "B28",
    },
    {
      label: {
        en: "B31",
        es: "B31",
        pt: "B31",
      },
      value: "B31",
    },
    {
      label: {
        en: "B66",
        es: "B66",
        pt: "B66",
      },
      value: "B66",
    },
    {
      label: {
        en: "B72",
        es: "B72",
        pt: "B72",
      },
      value: "B72",
    },
    {
      label: {
        en: "B73",
        es: "B73",
        pt: "B73",
      },
      value: "B73",
    },
    {
      label: {
        en: "B85",
        es: "B85",
        pt: "B85",
      },
      value: "B85",
    },
  ],
  value5: [
    {
      label: {
        en: "Automatic",
        es: "Automático",
        pt: "Automatico",
      },
      value: "Automatic",
    },
    {
      label: {
        en: "GSM",
        es: "GSM",
        pt: "GSM",
      },
      value: "GSM",
    },
    {
      label: {
        en: "eMTC",
        es: "eMTC",
        pt: "eMTC",
      },
      value: "eMTC",
    },
    {
      label: {
        en: "NB-IoT",
        es: "NB-IoT",
        pt: "NB-IoT",
      },
      value: "NB-IoT",
    },
  ],
  value6: [
    {
      label: {
        en: "Automatic",
        es: "Automático",
        pt: "Automatico",
      },
      value: "Automatic",
    },
    {
      label: {
        en: "GSM",
        es: "GSM",
        pt: "GSM",
      },
      value: "GSM",
    },
    {
      label: {
        en: "eMTC",
        es: "eMTC",
        pt: "eMTC",
      },
      value: "eMTC",
    },
    {
      label: {
        en: "NB-IoT",
        es: "NB-IoT",
        pt: "NB-IoT",
      },
      value: "NB-IoT",
    },
  ],
};

const placeholder = {
  en: "Select",
  es: "Seleccionar",
  pt: "Selecionar",
};

export default function LteBandCommandField({
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
      value5: "",
      value6: "",
    },
  });

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  const { lang } = useLangStore();

  const handleSubmit = () => {
    const values = form.getValues();
    handleSendCommand(
      `AT^CMD;${imei};${id.slice(0, 2)};${id.slice(2)};${values.value1},${
        values.value2
      },${values.value3},${values.value4},${values.value5},${values.value6}`
    );
  };

  if (isHiddenParameter && hiddenParameter) return null;

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
          <div className="label">RAT</div>
          <Controller
            control={form.control}
            name="value1"
            render={({ field, fieldState: { error } }) => (
              <TextField
                className="input"
                {...field}
                error={!!error}
                helperText={error?.message}
                select
                placeholder={placeholder[lang]}
              >
                {BAND_OPTIONS.value1.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label[lang]}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </InputField>
        <InputField>
          <div className="label">GSM Band</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value2"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  select
                  placeholder={placeholder[lang]}
                >
                  {BAND_OPTIONS.value2.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">eMTC Band</div>
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
                  placeholder={placeholder[lang]}
                >
                  {BAND_OPTIONS.value3.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">NB IoT Band</div>
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
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  select
                  placeholder={placeholder[lang]}
                >
                  {BAND_OPTIONS.value4.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">NW Scan Sequence</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value5"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  select
                  placeholder={placeholder[lang]}
                >
                  {BAND_OPTIONS.value5.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </InputField>
        <InputField>
          <div className="label">LTE RAT</div>
          <Stack
            flex={1}
            direction={"row"}
            gap={"8px"}
            justifyContent={"flex-end"}
          >
            <Controller
              control={form.control}
              name="value6"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  className="input"
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  select
                  placeholder={placeholder[lang]}
                >
                  {BAND_OPTIONS.value6.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label[lang]}
                    </MenuItem>
                  ))}
                </TextField>
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
