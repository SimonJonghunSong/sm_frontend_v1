import useLangStore from "@/utils/useLangStore";
import { Button, Tooltip } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import styled from "styled-components";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InputBox from "@/components/inputbox/InputBox";

interface Props {
  id: string;
  imei: string;
  handleSendCommand: (command: string) => void;
  buttonText: string;
}

export default function DefaultCommandField({
  id,
  imei,
  handleSendCommand,
  buttonText,
}: Props) {
  const { lang } = useLangStore();

  return (
    <Container>
      <Title>
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          const tabId = id.slice(0, 2);
          const fieldId = id.slice(2);

          handleSendCommand(`AT^CMD;${imei};${tabId};${fieldId}`);
        }}
      >
        {buttonText}
      </Button>
    </Container>
  );
}

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;

  h3 {
    width: fit-content;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
