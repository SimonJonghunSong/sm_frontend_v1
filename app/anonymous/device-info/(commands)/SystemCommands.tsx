import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { SECTIONS } from "constants/searchField";
import { Command, commands } from "./@index";
import { FIELD_VALIDATIONS } from "constants/field";

interface Props {
  renderCommand: (command: Command) => React.ReactNode;
  commandData: string[];
}

const SystemCommands = ({ renderCommand, commandData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const comandList = commands.systemCommands.filter((item) =>
    commandData.includes(item.id)
  );

  if (comandList.length === 0) {
    return null;
  }

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.SystemCommands.en}>
            {SECTIONS.SystemCommands[lang]}
          </h1>
        </Stack>
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px"}>
        <Stack direction="column" gap={"24px"} flex={1}>
          {comandList
            .slice(0, Math.ceil(comandList.length / 2))
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
        <Stack direction="column" gap={"24px"} flex={1}>
          {comandList
            .slice(Math.ceil(comandList.length / 2))
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SystemCommands;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }

  h3 {
    font-weight: 500;
    font-size: 15px;
    line-height: 14px;
    color: #6f6f6f;
  }
`;
