import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { SECTIONS } from "constants/searchField";
import { Command, commands } from "app/(auth)/device-info/(commands)/@index";
import { FIELD_VALIDATIONS } from "constants/field";

interface Props {
  renderCommand: (command: Command) => React.ReactNode;
}

const GeofenceCommands = ({ renderCommand }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.GeofenceCommands.en}>
            {SECTIONS.GeofenceCommands[lang]}
          </h1>
        </Stack>
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px"}>
        <Stack direction="column" gap={"24px"} flex={1}>
          {commands.geofenceCommands
            .slice(0, 2)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
        <Stack direction="column" gap={"24px"} flex={1}>
          {commands.geofenceCommands
            .slice(2)
            .map((item) =>
              FIELD_VALIDATIONS[item.id] ? renderCommand(item) : null
            )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default GeofenceCommands;

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
