import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { SECTIONS } from "constants/searchField";
import { Command, commands } from "./@index";
import { FIELD_VALIDATIONS } from "constants/field";

interface Props {
  renderCommand: (command: Command) => React.ReactNode;
}

const NetworkCommands = ({ renderCommand }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.NetworkCommands.en}>
            {SECTIONS.NetworkCommands[lang]}
          </h1>
        </Stack>
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px"}>
        <Stack direction="column" gap={"24px"} flex={1}>
          {commands.networkCommands
            .slice(0, 22)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
        <Stack direction="column" gap={"24px"} flex={1}>
          {commands.networkCommands
            .slice(22)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default NetworkCommands;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
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
