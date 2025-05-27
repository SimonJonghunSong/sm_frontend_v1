import useLangStore from "@/utils/useLangStore";
import { Button, CircularProgress, TextField, Tooltip } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";
import { useMemo, useState } from "react";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "../(tabs)/CommandTab";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
  isLoading: boolean;
}

export default function NumberCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
  isLoading,
}: Props) {
  const [value, setValue] = useState<string>("");
  const { lang } = useLangStore();

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  const min = useMemo(() => FIELD_VALIDATIONS[id].min, [id]);
  const max = useMemo(() => FIELD_VALIDATIONS[id].max, [id]);

  if (isHiddenParameter && hiddenParameter) return null;

  return (
    <Container>
      <Title $isHiddenParameter={isHiddenParameter}>
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
      </Title>
      <InputWithButton>
        <TextField
          type="number"
          sx={{ flex: 1 }}
          value={value}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          error={
            value.length > 0 &&
            typeof min !== "undefined" &&
            typeof max !== "undefined" &&
            (Number(value) < min || Number(value) > max)
          }
          helperText={
            value.length > 0 &&
            typeof min !== "undefined" &&
            typeof max !== "undefined" &&
            (Number(value) < min || Number(value) > max)
              ? FIELD_ERRORS["minMax"](min, max)[lang]
              : undefined
          }
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={!value || isLoading}
          onClick={() => {
            const tabId = id.slice(0, 2);
            const fieldId = id.slice(2);

            handleSendCommand(`AT^CMD;${imei};${tabId};${fieldId};${value}`);
          }}
          style={{
            minWidth: "84px",
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : buttonText}
        </Button>
      </InputWithButton>
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

  h3 {
    width: fit-content;
    color: ${(props) => (props.$isHiddenParameter ? "#FF0000" : "#6f6f6f")};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;
