import useLangStore from "@/utils/useLangStore";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";
import { useState } from "react";
import useParameterStore from "@/utils/useParameterStore";
import { hiddenParameterId } from "../(tabs)/CommandTab";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
  isLoading: boolean;
  regex?: RegExp;
  helperText?: {
    en: string;
    es: string;
    pt: string;
  };
}

export default function TextCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
  isLoading,
  regex,
  helperText,
}: Props) {
  const [value, setValue] = useState<string>("");
  const { lang } = useLangStore();

  const { hiddenParameter } = useParameterStore();
  const isHiddenParameter = hiddenParameterId.includes(id);

  if (isHiddenParameter && hiddenParameter) return null;

  return (
    <Container>
      <Title isHiddenParameter={isHiddenParameter}>
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
          sx={{ flex: 1 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={value.length > 0 && regex && !regex.test(value)}
          helperText={
            value.length > 0 && regex && helperText && !regex.test(value)
              ? helperText[lang]
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

const Title = styled.div<{ isHiddenParameter: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;

  h3 {
    width: fit-content;
    color: ${(props) => (props.isHiddenParameter ? "#FF0000" : "#6f6f6f")};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;
