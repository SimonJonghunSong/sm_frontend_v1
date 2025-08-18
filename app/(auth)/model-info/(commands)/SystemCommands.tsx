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

const SystemCommands = ({ renderCommand }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);

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
          {commands.systemCommands
            .slice(0, 17)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? (
                <div key={item.id} id={`command-${item.id}`}>
                  {renderCommand(item)}
                </div>
              ) : null
            )}
        </Stack>
        <Stack direction="column" gap={"24px"} flex={1}>
          {commands.systemCommands
            .slice(17)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? (
                <div key={item.id} id={`command-${item.id}`}>
                  {renderCommand(item)}
                </div>
              ) : null
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
